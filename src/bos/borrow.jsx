export const name = '0xgh.near/widget/liquityComponentBorrow'

export const borrow = () => {
  const {
    getText,
    getInput,
    className,
    getButton,
    getTextInfo,
    getTextInput,
    inputWrapperClass,
  } = props;

  const priceFeedAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_lastGoodPrice",
          type: "uint256",
        },
      ],
      name: "LastGoodPriceUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "fetchPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
      name: "setPrice",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const troveManagerAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_activePoolAddress",
          type: "address",
        },
      ],
      name: "ActivePoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_baseRate",
          type: "uint256",
        },
      ],
      name: "BaseRateUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_newBorrowerOperationsAddress",
          type: "address",
        },
      ],
      name: "BorrowerOperationsAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_collSurplusPoolAddress",
          type: "address",
        },
      ],
      name: "CollSurplusPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_defaultPoolAddress",
          type: "address",
        },
      ],
      name: "DefaultPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_gasPoolAddress",
          type: "address",
        },
      ],
      name: "GasPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_lqtyStakingAddress",
          type: "address",
        },
      ],
      name: "LQTYStakingAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_lqtyTokenAddress",
          type: "address",
        },
      ],
      name: "LQTYTokenAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_L_ETH",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_L_LUSDDebt",
          type: "uint256",
        },
      ],
      name: "LTermsUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_newLUSDTokenAddress",
          type: "address",
        },
      ],
      name: "LUSDTokenAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_lastFeeOpTime",
          type: "uint256",
        },
      ],
      name: "LastFeeOpTimeUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_liquidatedDebt",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_liquidatedColl",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_collGasCompensation",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_LUSDGasCompensation",
          type: "uint256",
        },
      ],
      name: "Liquidation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_newPriceFeedAddress",
          type: "address",
        },
      ],
      name: "PriceFeedAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_attemptedLUSDAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_actualLUSDAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_ETHSent",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_ETHFee",
          type: "uint256",
        },
      ],
      name: "Redemption",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_sortedTrovesAddress",
          type: "address",
        },
      ],
      name: "SortedTrovesAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_stabilityPoolAddress",
          type: "address",
        },
      ],
      name: "StabilityPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_totalStakesSnapshot",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_totalCollateralSnapshot",
          type: "uint256",
        },
      ],
      name: "SystemSnapshotsUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_newTotalStakes",
          type: "uint256",
        },
      ],
      name: "TotalStakesUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_newIndex",
          type: "uint256",
        },
      ],
      name: "TroveIndexUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_debt",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_coll",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "enum TroveManager.TroveManagerOperation",
          name: "_operation",
          type: "uint8",
        },
      ],
      name: "TroveLiquidated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_L_ETH",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_L_LUSDDebt",
          type: "uint256",
        },
      ],
      name: "TroveSnapshotsUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_debt",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_coll",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_stake",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "enum TroveManager.TroveManagerOperation",
          name: "_operation",
          type: "uint8",
        },
      ],
      name: "TroveUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "BETA",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "BOOTSTRAP_PERIOD",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "BORROWING_FEE_FLOOR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "CCR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DECIMAL_PRECISION",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LUSD_GAS_COMPENSATION",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "L_ETH",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "L_LUSDDebt",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MAX_BORROWING_FEE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MCR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MINUTE_DECAY_FACTOR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MIN_NET_DEBT",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "NAME",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PERCENT_DIVISOR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "REDEMPTION_FEE_FLOOR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "SECONDS_IN_ONE_MINUTE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "TroveOwners",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "Troves",
      outputs: [
        { internalType: "uint256", name: "debt", type: "uint256" },
        { internalType: "uint256", name: "coll", type: "uint256" },
        { internalType: "uint256", name: "stake", type: "uint256" },
        {
          internalType: "enum TroveManager.Status",
          name: "status",
          type: "uint8",
        },
        { internalType: "uint128", name: "arrayIndex", type: "uint128" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_100pct",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "activePool",
      outputs: [
        { internalType: "contract IActivePool", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "addTroveOwnerToArray",
      outputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "applyPendingRewards",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "baseRate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "_troveArray", type: "address[]" },
      ],
      name: "batchLiquidateTroves",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "borrowerOperationsAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
      name: "checkRecoveryMode",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "closeTrove",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decayBaseRateFromBorrowing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_borrower", type: "address" },
        { internalType: "uint256", name: "_collDecrease", type: "uint256" },
      ],
      name: "decreaseTroveColl",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_borrower", type: "address" },
        { internalType: "uint256", name: "_debtDecrease", type: "uint256" },
      ],
      name: "decreaseTroveDebt",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "defaultPool",
      outputs: [
        { internalType: "contract IDefaultPool", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_LUSDDebt", type: "uint256" }],
      name: "getBorrowingFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_LUSDDebt", type: "uint256" }],
      name: "getBorrowingFeeWithDecay",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBorrowingRate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBorrowingRateWithDecay",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_borrower", type: "address" },
        { internalType: "uint256", name: "_price", type: "uint256" },
      ],
      name: "getCurrentICR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getEntireDebtAndColl",
      outputs: [
        { internalType: "uint256", name: "debt", type: "uint256" },
        { internalType: "uint256", name: "coll", type: "uint256" },
        {
          internalType: "uint256",
          name: "pendingLUSDDebtReward",
          type: "uint256",
        },
        { internalType: "uint256", name: "pendingETHReward", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getEntireSystemColl",
      outputs: [
        { internalType: "uint256", name: "entireSystemColl", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getEntireSystemDebt",
      outputs: [
        { internalType: "uint256", name: "entireSystemDebt", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getNominalICR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getPendingETHReward",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getPendingLUSDDebtReward",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_ETHDrawn", type: "uint256" }],
      name: "getRedemptionFeeWithDecay",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRedemptionRate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRedemptionRateWithDecay",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
      name: "getTCR",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getTroveColl",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getTroveDebt",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
      name: "getTroveFromTroveOwnersArray",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTroveOwnersCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getTroveStake",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "getTroveStatus",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "hasPendingRewards",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_borrower", type: "address" },
        { internalType: "uint256", name: "_collIncrease", type: "uint256" },
      ],
      name: "increaseTroveColl",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_borrower", type: "address" },
        { internalType: "uint256", name: "_debtIncrease", type: "uint256" },
      ],
      name: "increaseTroveDebt",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "isOwner",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lastETHError_Redistribution",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lastFeeOperationTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lastLUSDDebtError_Redistribution",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "liquidate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_n", type: "uint256" }],
      name: "liquidateTroves",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "lqtyStaking",
      outputs: [
        { internalType: "contract ILQTYStaking", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lqtyToken",
      outputs: [
        { internalType: "contract ILQTYToken", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lusdToken",
      outputs: [
        { internalType: "contract ILUSDToken", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "priceFeed",
      outputs: [
        { internalType: "contract IPriceFeed", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_LUSDamount", type: "uint256" },
        {
          internalType: "address",
          name: "_firstRedemptionHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_upperPartialRedemptionHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerPartialRedemptionHint",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_partialRedemptionHintNICR",
          type: "uint256",
        },
        { internalType: "uint256", name: "_maxIterations", type: "uint256" },
        { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      ],
      name: "redeemCollateral",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "removeStake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "rewardSnapshots",
      outputs: [
        { internalType: "uint256", name: "ETH", type: "uint256" },
        { internalType: "uint256", name: "LUSDDebt", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_borrowerOperationsAddress",
          type: "address",
        },
        { internalType: "address", name: "_activePoolAddress", type: "address" },
        { internalType: "address", name: "_defaultPoolAddress", type: "address" },
        {
          internalType: "address",
          name: "_stabilityPoolAddress",
          type: "address",
        },
        { internalType: "address", name: "_gasPoolAddress", type: "address" },
        {
          internalType: "address",
          name: "_collSurplusPoolAddress",
          type: "address",
        },
        { internalType: "address", name: "_priceFeedAddress", type: "address" },
        { internalType: "address", name: "_lusdTokenAddress", type: "address" },
        {
          internalType: "address",
          name: "_sortedTrovesAddress",
          type: "address",
        },
        { internalType: "address", name: "_lqtyTokenAddress", type: "address" },
        { internalType: "address", name: "_lqtyStakingAddress", type: "address" },
      ],
      name: "setAddresses",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_borrower", type: "address" },
        { internalType: "uint256", name: "_num", type: "uint256" },
      ],
      name: "setTroveStatus",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "sortedTroves",
      outputs: [
        { internalType: "contract ISortedTroves", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "stabilityPool",
      outputs: [
        { internalType: "contract IStabilityPool", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalCollateralSnapshot",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalStakes",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalStakesSnapshot",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "updateStakeAndTotalStakes",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
      name: "updateTroveRewardSnapshots",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const borrowerOperationAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_activePoolAddress",
          type: "address",
        },
      ],
      name: "ActivePoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_collSurplusPoolAddress",
          type: "address",
        },
      ],
      name: "CollSurplusPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_defaultPoolAddress",
          type: "address",
        },
      ],
      name: "DefaultPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_gasPoolAddress",
          type: "address",
        },
      ],
      name: "GasPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_lqtyStakingAddress",
          type: "address",
        },
      ],
      name: "LQTYStakingAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_LUSDFee",
          type: "uint256",
        },
      ],
      name: "LUSDBorrowingFeePaid",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_lusdTokenAddress",
          type: "address",
        },
      ],
      name: "LUSDTokenAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_newPriceFeedAddress",
          type: "address",
        },
      ],
      name: "PriceFeedAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_sortedTrovesAddress",
          type: "address",
        },
      ],
      name: "SortedTrovesAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_stabilityPoolAddress",
          type: "address",
        },
      ],
      name: "StabilityPoolAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "arrayIndex",
          type: "uint256",
        },
      ],
      name: "TroveCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_newTroveManagerAddress",
          type: "address",
        },
      ],
      name: "TroveManagerAddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_debt",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_coll",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "stake",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "enum BorrowerOperations.BorrowerOperation",
          name: "operation",
          type: "uint8",
        },
      ],
      name: "TroveUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "BORROWING_FEE_FLOOR",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "CCR",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DECIMAL_PRECISION",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LUSD_GAS_COMPENSATION",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MCR",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MIN_NET_DEBT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "NAME",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PERCENT_DIVISOR",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_100pct",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "activePool",
      outputs: [
        {
          internalType: "contract IActivePool",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_upperHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerHint",
          type: "address",
        },
      ],
      name: "addColl",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_maxFeePercentage",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_collWithdrawal",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_LUSDChange",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_isDebtIncrease",
          type: "bool",
        },
        {
          internalType: "address",
          name: "_upperHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerHint",
          type: "address",
        },
      ],
      name: "adjustTrove",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimCollateral",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "closeTrove",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "defaultPool",
      outputs: [
        {
          internalType: "contract IDefaultPool",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_debt",
          type: "uint256",
        },
      ],
      name: "getCompositeDebt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "getEntireSystemColl",
      outputs: [
        {
          internalType: "uint256",
          name: "entireSystemColl",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getEntireSystemDebt",
      outputs: [
        {
          internalType: "uint256",
          name: "entireSystemDebt",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lqtyStaking",
      outputs: [
        {
          internalType: "contract ILQTYStaking",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lqtyStakingAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lusdToken",
      outputs: [
        {
          internalType: "contract ILUSDToken",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          internalType: "address",
          name: "_upperHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerHint",
          type: "address",
        },
      ],
      name: "moveETHGainToTrove",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_maxFeePercentage",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_LUSDAmount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_upperHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerHint",
          type: "address",
        },
      ],
      name: "openTrove",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "priceFeed",
      outputs: [
        {
          internalType: "contract IPriceFeed",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_LUSDAmount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_upperHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerHint",
          type: "address",
        },
      ],
      name: "repayLUSD",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_troveManagerAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_activePoolAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_defaultPoolAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_stabilityPoolAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_gasPoolAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collSurplusPoolAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_priceFeedAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_sortedTrovesAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lusdTokenAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lqtyStakingAddress",
          type: "address",
        },
      ],
      name: "setAddresses",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "sortedTroves",
      outputs: [
        {
          internalType: "contract ISortedTroves",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "troveManager",
      outputs: [
        {
          internalType: "contract ITroveManager",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_collWithdrawal",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_upperHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerHint",
          type: "address",
        },
      ],
      name: "withdrawColl",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_maxFeePercentage",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_LUSDAmount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_upperHint",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lowerHint",
          type: "address",
        },
      ],
      name: "withdrawLUSD",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

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
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        {
          value: ethers.BigNumber.from(
            (state.coll * 1000000000000000000).toString()
          ),
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
    <div className={className}>
      <div className={inputWrapperClass}>
        {getTextInput({ children: "Deposit (ETH)" })}

        {getInput({
          type: "text",
          onChange: setcoll,
          value: state.displayColl,
          placeholder: "0.0000 ETH",
          disabled:
            !state.address || state.isOpenTrove || state.chainId !== 11155111,
        })}
      </div>

      <div className={inputWrapperClass}>
        {getTextInput({ children: "Borrow (LUSD)" })}

        {getInput({
          type: "text",
          onChange: setBorrow,
          value: state.displayBorrow,
          placeholder: "0.0000 LUSD",
          disabled:
            !state.address || state.isOpenTrove || state.chainId !== 11155111,
        })}
      </div>

      <div>{getText({ children: state.msg })}</div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          {getTextInfo({ children: "Liquidation Reserve" })}

          {getTextInfo({ children: state.liquidationReserve + "LUSD" })}
        </div>

        <div className="flex justify-between items-center">
          {getTextInfo({ children: "Borrowing Fee" })}

          {getTextInfo({
            children: `${state.borrowingFee.toFixed(2)} LUSD (0.50%)`,
          })}
        </div>

        <div className="flex justify-between items-center">
          {getTextInfo({ children: "Recieve" })}

          <div className="flex items-center justify-center">
            {getTextInfo({ children: state.borrow.toFixed(2) })}

            {getTextInfo({ children: "LUSD" })}
          </div>
        </div>

        <div className="flex justify-between items-center">
          {getTextInfo({ children: "Total debt" })}

          <div className="flex justify-center items-center">
            {getTextInfo({ children: state.totalcoll.toFixed(2) })}

            {getTextInfo({ children: "LUSD" })}
          </div>
        </div>

        <div className="flex justify-between items-center">
          {getTextInfo({ children: "Collateral" })}

          <div className="flex justify-center items-center">
            {getTextInfo({ children: state.collateralRatio.toFixed(1) })}

            {getTextInfo({ children: "%" })}
          </div>
        </div>
      </div>

      {getButton({
        onClick: openTrove,
        disabled: state.isBlocked || state.isOpenTrove === true || state.coll === 0 || state.borrow === 0,
        children:
          Ethers.provider() && state.chainId !== 11155111
            ? "Change network to Sepolia"
            : state?.isOpenTrove === true
              ? "You already have active Trove"
              : state?.loading
                ? "Loading..."
                : state?.complete
                  ? "Done ✅"
                  : state?.coll === 0 || state?.borrow === 0
                    ? "Enter input value"
                    : state.isBlocked
                      ? "Check stats"
                      : "Open Trove",
      })}
    </div>
  );
}
