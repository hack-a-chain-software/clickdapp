export const name = '0xgh.near/widget/liquityComponentManage'

export const manage = () => {
  const {
    priceFeedABI,
    troveManageABI,
    borrowerOperationsABI,
  } = props

  const ManageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .option-wrapper {
      width: 100%;
      height: 2rem;
    }
    .option {
      height: 100%;
      border-radius: 10px;
      padding: 0 1rem 0 1rem;
    }
    .input-wrapper {
      display: flex;
      width: 100%;
      border: rgb(220, 220, 220) 1px solid;
      margin: 0.5rem;
      border-radius: 10px;
      overflow: hidden;
    }
    .token-wrapper {
      display: flex;
    }
    .token {
      padding: 0 0.5rem 0 0.5rem;
    }
    .error-message {
    }
    .confirm-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .confirm {
      border: none;
      border-radius: 1000px;
      width: 75%;
      height: 2rem;
      transition: 0.5s all;
      font-size: 1.1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      &.ok {
        background-color: #3a0ca3;
        color: white;
      }
      &.not-ok {
        background-color: #8e9aaf;
        color: white;
      }
    }
    .info-wrapper {
      margin: 2rem 0 2rem 0;
      width: 100%;
      div {
        height: 1.75rem;
        display: flex;
        align-items: center;
      }
      span {
      }
    }
    .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: #8e9aaf;
      // color: black;
    }
    .after {
      // transition: 0.5s all;
      font-weight: 500;
      margin: 0 0 0 0.5rem;
      &.ok {
        color: green;
      }
      &.not-ok {
        color: red;
      }
    }
    .current-info {
    }
    .unit {
      margin-left: 0.5rem;
      &.ok {
        color: green;
      }
      &.not-ok {
        color: red;
      }
    }
    .connect-wallet {
      background-color: #3a0ca3;
      color: white;
      border-radius: 1000px;
      &:hover {
        background-color: #3a0ca3;
        color: white;
      }
    }
    button {
      border: none;
      transition: 0.3s all;
      &.active {
        background-color: black;
        color: white;
      }
      &.disabled {
        background-color: rgb(240, 240, 240);
        color: gray;
      }
    }
    input {
      border: none;
    }
    input:focus {
      outline: none;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;

  State.init({
    option: "withdraw",
    token: "ETH",
    address: null,
    check: false,
    value: "",
    complete: false,
  });

  const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";

  const troveManageAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";

  const borrowerOperationsAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";

  const troveManageInterface = new ethers.utils.Interface(troveManageABI);

  const priceFeedInterface = new ethers.utils.Interface(priceFeedABI);

  const EPSILON = 2.2e-16;

  const infoHandler = () => {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        if (chainIdData?.chainId) {
          State.update({ chainId: chainIdData.chainId });
        }
      });

    // Price 조회
    const encodedForPrice = priceFeedInterface.encodeFunctionData("getPrice");
    Ethers.provider()
      .call({
        to: priceFeedAddress,
        data: encodedForPrice,
      })
      .then((raw) => {
        const receiverBalanceHex = priceFeedInterface.decodeFunctionResult(
          "getPrice",
          raw
        );
        const result = receiverBalanceHex[0].div("1000000000000000000");
        State.update({
          currentPrice: result.toString(),
          currentPriceRaw: receiverBalanceHex[0].toString(),
        });
      });

    // ICR 조회
    const encodedForICR = troveManageInterface.encodeFunctionData(
      "getCurrentICR",
      [state.address, state.currentPriceRaw || "2000000000000000000000"]
    );
    Ethers.provider()
      .call({
        to: troveManageAddress,
        data: encodedForICR,
      })
      .then((raw) => {
        const receiverBalanceHex = troveManageInterface.decodeFunctionResult(
          "getCurrentICR",
          raw
        );
        const result = receiverBalanceHex[0].div("1000000000000000000");
        State.update({ currentICR: result.toString() });
      });

    // Collateral 조회
    const encodedForColl = troveManageInterface.encodeFunctionData(
      "getTroveColl",
      [state.address]
    );
    Ethers.provider()
      .call({
        to: troveManageAddress,
        data: encodedForColl,
      })
      .then((raw) => {
        const receiverBalanceHex = troveManageInterface.decodeFunctionResult(
          "getTroveColl",
          raw
        );
        State.update({
          currentColl: ethers.utils
            .formatEther(receiverBalanceHex[0].toString())
            .toString(),
        });
      });

    // debt 조회
    const encodedForDebt = troveManageInterface.encodeFunctionData(
      "getTroveDebt",
      [state.address]
    );
    Ethers.provider()
      .call({
        to: troveManageAddress,
        data: encodedForDebt,
      })
      .then((raw) => {
        const receiverBalanceHex = troveManageInterface.decodeFunctionResult(
          "getTroveDebt",
          raw
        );
        const result = receiverBalanceHex[0].div("1000000000000000000");
        State.update({ currentDebt: result.toString() });
      });
  };

  if (Ethers.provider()) {
    const signer = Ethers.provider().getSigner();
    signer.getAddress().then((address) => {
      State.update({ address });
    });

    state.address && infoHandler();
  }

  const checkFunc = () => {
    // Ratio 1.1 이상일 것
    // Debt 가 2000 이상일 것
    if (state.token === "ETH") {
      if (!state.value) {
        State.update({ check: false });
        return;
      }
      if (state.updatedICR < 1.1) {
        State.update({ check: false });
        return;
      }
    } else if (state.token === "LUSD") {
      if (!state.value) {
        State.update({ check: false });
        return;
      }
      if (state.updatedICR < 1.1) {
        State.update({ check: false });
        return;
      }
      if (state.updatedDebt < 2000) {
        State.update({ check: false });
        return;
      }
    }
    State.update({ check: true });
  };

  console.log({ state });

  const changeHandler = (e) => {
    const value = e.target.value;
    State.update({ value: e.target.value === 0 ? "" : e.target.value });
    // deposit-ETH
    if (state.option === "deposit" && state.token === "ETH") {
      State.update({
        updatedColl: Number(state.currentColl) + Number(value),
        updatedICR:
          e.target.value === ""
            ? null
            : Math.round(
                (((Number(state.currentColl) + Number(value)) /
                  Number(state.currentDebt)) *
                  Number(state.currentPrice) +
                  EPSILON) *
                  1000
              ) / 1000,
      });
    }
    // withdraw-ETH
    else if (state.option === "withdraw" && state.token === "ETH") {
      State.update({
        updatedColl: Number(state.currentColl) - Number(value),
        updatedICR:
          e.target.value === ""
            ? null
            : Math.round(
                (((Number(state.currentColl) - Number(value)) /
                  Number(state.currentDebt)) *
                  Number(state.currentPrice) +
                  EPSILON) *
                  1000
              ) / 1000,
      });
    }
    // deposit-LUSD
    else if (state.option === "deposit" && state.token === "LUSD") {
      State.update({
        updatedDebt: Number(state.currentDebt) - Number(value),
        updatedICR:
          e.target.value === ""
            ? null
            : Math.round(
                ((Number(state.currentColl) /
                  (Number(state.currentDebt) - Number(value))) *
                  Number(state.currentPrice) +
                  EPSILON) *
                  1000
              ) / 1000,
      });
    }
    // withdraw-LUSD
    else if (state.option === "withdraw" && state.token === "LUSD") {
      console.log(
        Math.round(
          ((Number(state.currentColl) /
            (Number(state.currentDebt) + Number(value))) *
            Number(state.currentPrice) +
            EPSILON) *
            1000
        ) / 1000
      );
      State.update({
        updatedDebt: Number(state.currentDebt) + Number(value),
        updatedICR:
          e.target.value === ""
            ? null
            : Math.round(
                ((Number(state.currentColl) /
                  (Number(state.currentDebt) + Number(value))) *
                  Number(state.currentPrice) +
                  EPSILON) *
                  1000
              ) / 1000,
      });
    }
    console.log("execute");
    checkFunc();
  };

  const optionHandler = (option) => {
    State.update({ option: option });
    changeHandler({ target: { value: Number(state.value) } });
  };

  const tokenHandler = (token) => {
    State.update({ token: token });
    changeHandler({ target: { value: Number(state.value) } });
  };

  const confirmHandler = () => {
    if (state.complete) {
      State.update({ complete: false, hash: null });
      checkFunc();
    }
    if (!state.check) {
      return;
    }
    const borrowerOperationsContract = new ethers.Contract(
      borrowerOperationsAddress,
      borrowerOperationsABI,
      Ethers.provider().getSigner()
    );
    const amount = ethers.utils
      .parseUnits(state.value.toString(), "ether")
      .toString();

    if (state.option === "deposit" && state.token === "ETH") {
      borrowerOperationsContract
        .addColl(state.address, state.address, { value: amount })
        .then((transactionHash) => {
          State.update({
            loading: true,
            hash: transactionHash.hash,
            value: "",
            updatedColl: null,
            updatedDebt: null,
            updatedICR: null,
          });
          console.log(transactionHash.hash);
        });
    } else if (state.option === "withdraw" && state.token === "ETH") {
      borrowerOperationsContract
        .withdrawColl(amount.toString(), state.address, state.address)
        .then((transactionHash) => {
          State.update({
            loading: true,
            hash: transactionHash.hash,
            value: "",
            updatedColl: null,
            updatedDebt: null,
            updatedICR: null,
          });
          console.log(transactionHash.hash);
        });
    } else if (state.option === "deposit" && state.token === "LUSD") {
      borrowerOperationsContract
        .repayLUSD(amount.toString(), state.address, state.address)
        .then((transactionHash) => {
          State.update({
            loading: true,
            hash: transactionHash.hash,
            value: "",
            updatedColl: null,
            updatedDebt: null,
            updatedICR: null,
          });
          console.log(transactionHash.hash);
        });
    } else if (state.option === "withdraw" && state.token === "LUSD") {
      borrowerOperationsContract
        .withdrawLUSD(
          "5000000000000000",
          amount.toString(),
          state.address,
          state.address
        )
        .then((transactionHash) => {
          State.update({
            loading: true,
            hash: transactionHash.hash,
            value: "",
            updatedColl: null,
            updatedDebt: null,
            updatedICR: null,
          });
          console.log(transactionHash.hash);
        });
    }
  };

  Ethers.provider() &&
    Ethers.provider()
      .waitForTransaction(state.hash)
      .then((res) => {
        State.update({ loading: false, value: "", complete: true });
        infoHandler();
      })
      .catch((err) => {
        console.log(err);
        State.update({ loading: false });
      });

  const cutDecimal = (data) => {
    if (isNaN(Number(data))) {
      return data;
    }
    return Math.round((Number(data) + EPSILON) * 1000) / 1000;
  };

  return (
    <ManageWrapper>
      <div className="option-wrapper">
        <button
          className={`option ${
            state.option === "deposit" ? "active" : "disabled"
          }`}
          onClick={() => {
            optionHandler("deposit");
          }}
        >
          deposit
        </button>
        <button
          className={`option ${
            state.option === "withdraw" ? "active" : "disabled"
          }`}
          onClick={() => {
            optionHandler("withdraw");
          }}
        >
          withdraw
        </button>
      </div>
      <div className="input-wrapper">
        <input
          type="number"
          placeholder={state.token === "ETH" ? "0.0000 ETH" : "0.0000 LUSD"}
          onChange={changeHandler}
          value={state.value}
        ></input>
        <div className={`token-wrapper`}>
          <button
            onClick={() => {
              tokenHandler("ETH");
            }}
            className={`token ${state.token === "ETH" ? "active" : "disabled"}`}
          >
            ETH
          </button>
          <button
            onClick={() => {
              tokenHandler("LUSD");
            }}
            className={`token ${state.token === "LUSD" ? "active" : "disabled"}`}
          >
            LUSD
          </button>
        </div>
      </div>
      <div className="info-wrapper">
        <div className="info">
          <div>Your Collateral Ratio</div>
          <div>
            <span className="current-info">
              {!isNaN(
                (((Number(state.currentColl) / Number(state.currentDebt)) *
                  Number(state.currentPrice) +
                  EPSILON) *
                  1000) /
                  1000
              )
                ? Math.round(
                    ((Number(state.currentColl) / Number(state.currentDebt)) *
                      Number(state.currentPrice) +
                      EPSILON) *
                      1000
                  ) / 1000
                : "-"}
            </span>
            {state.updatedICR &&
              Number(state.updatedICR) !==
                Number(
                  Math.round(
                    ((Number(state.currentColl) / Number(state.currentDebt)) *
                      Number(state.currentPrice) +
                      EPSILON) *
                      1000
                  ) / 1000
                ) &&
              state.updatedICR && (
                <span
                  className={`after ${state.updatedICR >= 1.1 ? "ok" : "not-ok"}`}
                >{`=> ${
                  state.updatedICR >= 0 ? cutDecimal(state.updatedICR) : 0
                }`}</span>
              )}
          </div>
        </div>
        <div className="info">
          <div>Your Collateral</div>
          <div>
            <span className="current-info">{state.currentColl}</span>
            {state.updatedColl &&
              Number(state.updatedColl) !== Number(state.currentColl) && (
                <span
                  className={`after ${state.updatedColl > 0 ? "ok" : "not-ok"}`}
                >{`=> ${
                  state.updatedColl >= 0 ? cutDecimal(state.updatedColl) : 0
                }`}</span>
              )}
            <span className={`unit`}>ETH</span>
          </div>
        </div>
        <div className="info">
          <div>Your Debt</div>
          <div>
            <span className="current-info">{state.currentDebt}</span>
            {state.updatedDebt &&
              state.updatedDebt.toString() !== state.currentDebt.toString() &&
              state.updatedDebt > 0 && (
                <span
                  className={`after ${
                    state.updatedDebt >= 2000 ? "ok" : "not-ok"
                  }`}
                >{`=> ${cutDecimal(state.updatedDebt)}`}</span>
              )}
            <span className={`unit`}>LUSD</span>
          </div>
        </div>
        <div className="info">
          <div>Ethereum Price</div>
          <div>
            <span className="current-info">{state.currentPrice}</span>
            <span className={`unit`}>$</span>
          </div>
        </div>
      </div>
      <div className="confirm-wrapper" onClick={confirmHandler}>
        {state.address ? (
          <button className={`confirm ${state.check ? "ok" : "not-ok"}`}>
            {state.chainId !== 11155111
              ? "Change network to Sepolia"
              : state.loading
              ? "Loadig..."
              : state.complete
              ? "Done ✅"
              : state.check
              ? `Confirm ${state.option}`
              : !state.value
              ? "Enter input value"
              : "Check stats"}
          </button>
        ) : (
          <Web3Connect className={`connect-wallet`} />
        )}
      </div>
    </ManageWrapper>
  );
}
