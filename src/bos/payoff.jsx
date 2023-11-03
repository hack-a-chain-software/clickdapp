export const name = '0xgh.near/widget/liquityComponentPayoff'

export const payoff = () => {
  const {
    borrowerOperationAbi,
  } = props

  const borrowerOperationAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";
  const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";
  const lusdTokenAddress = "0x80668Ed2e71290EB7526ABE936327b4f5dB52dA8";

  State.init({ mouse: false, loading: false, complete: false });

  const troveManagerAbi = fetch(
    "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/trove-manager-abi.json"
  );

  const lusdTokenAbi = fetch(
    "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/lusd-token-abi.json"
  );

  const closeTrove = () => {
    if (state.complete) {
      State.update({ complete: false, hash: null });
      return;
    }
    const borrowerOperationContract = new ethers.Contract(
      borrowerOperationAddress,
      borrowerOperationAbi,
      Ethers.provider().getSigner()
    );

    borrowerOperationContract.closeTrove().then((transactionHash) => {
      State.update({ loading: true, hash: transactionHash.hash });
    });
  };

  const infoHandler = () => {
    const signer = Ethers.provider().getSigner();
    signer.getAddress().then((address) => {
      State.update({ address });
      if (state.chainId === 11155111) {
        const troveManagerContract = new ethers.Contract(
          troveManagerAddress,
          troveManagerAbi.body,
          Ethers.provider().getSigner()
        );

        const lusdTokenContract = new ethers.Contract(
          lusdTokenAddress,
          lusdTokenAbi.body,
          Ethers.provider().getSigner()
        );

        troveManagerContract.getTroveDebt(address).then((troveDebtRes) => {
          const troveDebt = Number(
            ethers.utils.formatEther(troveDebtRes.toString())
          );
          State.update({
            troveDebt: troveDebt === 0 ? 0 : troveDebt - 200,
          });

          lusdTokenContract.balanceOf(address).then((lusdBalanceRes) => {
            const lusdBalance = Number(
              ethers.utils.formatEther(lusdBalanceRes.toString())
            );
            if (troveDebt - 200 - lusdBalance > 0) {
              State.update({
                isBlock: true,
              });
            }
          });
        });
      }
    });
  };

  if (Ethers.provider()) {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        if (chainIdData?.chainId) {
          State.update({ chainId: chainIdData.chainId });
        }
      });

    infoHandler();
  }

  Ethers.provider() &&
    Ethers.provider()
      .waitForTransaction(state.hash)
      .then((res) => {
        State.update({ loading: false, complete: true });
        infoHandler();
      })
      .catch((err) => {
        State.update({ loading: false });
      });

  const PayoffWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .debt-label{
      width: 100%;
      font-size: 1.3rem;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .debt-value{
      transition: 0.3s all;
      margin: 1rem 0 1rem 0;
      min-width: 190px;
      padding: 0.5rem 1rem 0.5rem 1rem;
      border: #3a0ca3 1.5px solid ;
      border-radius: 10px;
      font-weight: 600;
      background-color: white;

      &.disabled{
        &:hover{
        background-color: #8e9aaf;
        color: white;
        border-color: #8e9aaf;
      }
      }
      &.active{
      &:hover{
        background-color: #3a0ca3;
        color: white;
      }
      }
       &.loading{
        background-color: transparent !important;
        cursor: default;
        &:hover{
        background-color: transparent !important;
        color: black !important;
        border-color: #3a0ca3 !important;
      }
      }
      &.complete{
        background-color: #3a0ca3 !important;
        color: white;
        &:hover{
        background-color: #3a0ca3 !important;
        color: white !important;
        border-color: #3a0ca3 !important;
      }
    }
    .confirm-wrapper{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

    }
  `;

  return (
    <PayoffWrapper>
      <div className="debt-label">You pay for debt</div>

      <div className="confirm-wrapper">
        {state.address ? (
          <button
            onMouseEnter={() => {
              State.update({ mouse: true });
            }}
            onMouseLeave={() => {
              State.update({ mouse: false });
            }}
            className={`debt-value ${state.isBlock ? "disabled" : "active"} ${
              state.loading ? "loading" : ""
            } ${state.complete ? "complete" : ""}`}
            // disabled={state.isBlock}
            onClick={closeTrove}
          >
            {state.loading
              ? "Loading..."
              : state.complete
              ? "Done ✅"
              : state.mouse
              ? state.isBlock
                ? "Not enough LUSD 🥲"
                : state.troveDebt === 0
                ? "No debt"
                : "Pay off all debt 🔥"
              : `${state.troveDebt ?? 0}
            LUSD`}
          </button>
        ) : (
          <Web3Connect connectLabel="Connect Wallet" />
        )}
      </div>
    </PayoffWrapper>
  );
}
