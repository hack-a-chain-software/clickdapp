export const name = '0xgh.near/widget/liquityComponentBorrow'

export const borrow = () => {
  const { priceFeedAbi, troveManagerAbi, borrowerOperationAbi } = props;

  State.init({
    displayColl: "",
    displayBorrow: "",
    coll: 0,
    borrow: 0,
    borrowingFee: 0,
    totalcoll: 200,
    collateralRatio: 0,
    liquidationReserve: 200,
    complete: false,
    loading: false,
    msg: "",
    address: undefined,
    chainId: undefined,
    balance: undefined,
    price: 0,
    isOpenTrove: undefined,
    isBlocked: true,
  });

  const setcoll = (depositChangeEvent) => {
    const value = depositChangeEvent.target.value.replace(/[^.0-9]/g, "");
    const coll = Number(value);
    const { totalcoll } = state;
    const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

    State.update({
      displayColl: value,
      coll,
      collateralRatio,
    });

    validateTrove();
  };

  const setBorrow = (borrowChangeEvent) => {
    const { coll, liquidationReserve } = state;
    const value = borrowChangeEvent.target.value.replace(/[^.0-9]/g, "");
    const borrow = Number(value);
    const borrowingFee = (borrow * 0.5) / 100;
    const totalcoll =
      borrow + Number(borrowingFee.toFixed(2)) + liquidationReserve;
    const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

    State.update({
      displayBorrow: value,
      borrow,
      borrowingFee,
      totalcoll,
      collateralRatio,
    });
    validateTrove();
  };

  const validateTrove = () => {
    const { coll, borrow, totalcoll, balance } = state;

    if (borrow < 1800) {
      State.update({
        msg: "Borrow must be at least 1800 LUSD",
        isBlocked: true,
      });
      return;
    }

    const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;
    if (collateralRatio < 110) {
      State.update({
        msg: "Collateral ratio must be at least 110%",
        isBlocked: true,
      });
      return;
    }

    if (coll > Number(balance)) {
      State.update({
        msg: `The amount you're trying to deposit exceeds your balance by ${coll} ETH`,
        isBlocked: true,
      });
      return;
    }

    State.update({ msg: "", isBlocked: false });
  };

  const borrowerOperationAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";

  const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";

  const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";

  const openTrove = () => {
    if (state.complete) {
      State.update({ complete: false, hash: null });
    }
    const borrowerOperationContract = new ethers.Contract(
      borrowerOperationAddress,
      borrowerOperationAbi,
      Ethers.provider().getSigner()
    );

    borrowerOperationContract
      .openTrove(
        ethers.BigNumber.from(5000000000000000),
        ethers.BigNumber.from(state.borrow * 100)
          .mul("10000000000000000")
          .toString(),
        // ethers.BigNumber.from((state.borrow * 10000000000000000).toString()),
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        {
          value: ethers.BigNumber.from(
            (state.coll * 1000000000000000000).toString()
          ),
          // gasPrice: state.gasPrice,
          // gasLimit: 25000000,
        }
      )
      .then((transactionHash) => {
        State.update({
          loading: true,
          hash: transactionHash.hash,
          borrow: 0,
          displayBorrow: "",
          coll: 0,
          displayColl: "",
          borrowingFee: 0,
          totalcoll: 200,
          collateralRatio: 0,
          liquidationReserve: 200,
        });
      });
  };

  if (Ethers.provider()) {
    const signer = Ethers.provider().getSigner();
    signer.getAddress().then((address) => {
      State.update({ address });
      if (state.chainId === 11155111) {
        if (state.balance === undefined) {
          Ethers.provider()
            .getBalance(address)
            .then((balance) => {
              State.update({
                balance: Big(balance).div(Big(10).pow(18)).toFixed(2),
              });
            });
        }

        if (state.isOpenTrove === undefined) {
          const troveManagerContract = new ethers.Contract(
            troveManagerAddress,
            troveManagerAbi,
            Ethers.provider().getSigner()
          );

          troveManagerContract.getTroveStatus(address).then((res) => {
            const isOpenTrove = ethers.utils.formatEther(res).includes("1");
            State.update({ isOpenTrove });
          });
        }
      }
    });

    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        if (chainIdData?.chainId) {
          State.update({ chainId: chainIdData.chainId });
        }
      });

    if (state.price === 0) {
      const priceFeedContract = new ethers.Contract(
        priceFeedAddress,
        priceFeedAbi,
        Ethers.provider().getSigner()
      );
      const troveManagerContract = new ethers.Contract(
        troveManagerAddress,
        troveManagerAbi,
        Ethers.provider().getSigner()
      );

      priceFeedContract
        .getPrice()
        .then((priceRes) => {
          const price = Number(ethers.utils.formatEther(priceRes));

          State.update({ price });
          troveManagerContract.getTCR(priceRes).then((tcrRes) => {
            const tcr = Number(ethers.utils.formatEther(tcrRes)) * 100;

            State.update({ tcr });
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  const complete = () => {
    State.update({ complete: true });
  };

  Ethers.provider() &&
    Ethers.provider()
      .waitForTransaction(state.hash)
      .then((res) => {
        State.update({
          loading: false,
        });
        complete();
      })
      .catch((err) => {
        State.update({ loading: false });
      });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col">
        <span className="">Deposit (ETH)</span>

        <input
          type="text"
          placeholder="0.0000 ETH"
          disabled={
            !state.address || state.isOpenTrove || state.chainId !== 11155111
          }
          onChange={setcoll}
          value={state.displayColl}
        />
      </div>

      <div className="flex flex-col">
        <span className="">Borrow (LUSD)</span>

        <input
          type="text"
          placeholder="0.0000 LUSD"
          disabled={
            !state.address || state.isOpenTrove || state.chainId !== 11155111
          }
          onChange={setBorrow}
          value={state.displayBorrow}
        />
      </div>

      <div>
        <span className="error-message">{state.msg}</span>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="">
            <span className="">Liquidation Reserve</span>
          </div>

          <div className="flex items-center justify-center">
            <span className="">{state.liquidationReserve}</span>

            <span className="info-unit">LUSD</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <span className="">Borrowing Fee</span>
          </div>

          <div className="flex items-center justify-center">
            <span className="">{state.borrowingFee.toFixed(2)}</span>{" "}
            <span className="">LUSD (0.50%)</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <span>Recieve</span>
          </div>

          <div className="flex items-center justify-center">
            <span className="">{state.borrow.toFixed(2)}</span>

            <span className="info-unit">LUSD</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <span>Total debt</span>
          </div>

          <div className="flex justify-center items-center">
            <span className="">{state.totalcoll.toFixed(2)}</span>

            <span className="info-unit">LUSD</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="">Collateral ratio</div>

          <div className="flex justify-center items-center">
            <span>{state.collateralRatio.toFixed(1)}</span>

            <span className="info-unit">%</span>
          </div>
        </div>
      </div>

      <div className="confirm-wrapper">
        {state.address && (
          <button
            className={`confirm ${state.isBlocked ? "not-ok" : "ok"}`}
            disabled={state.isBlocked}
            onClick={openTrove}
          >
            {Ethers.provider() && state.chainId !== 11155111
              ? "Change network to Sepolia"
              : state.isOpenTrove === true
              ? "You already have active Trove"
              : state.loading
              ? "Loading..."
              : state.complete
              ? "Done ✅"
              : state.coll === 0 || state.borrow === 0
              ? "Enter input value"
              : state.isBlocked
              ? "Check stats"
              : "Open Trove"}
          </button>
        )}
      </div>
    </div>
  );
}
