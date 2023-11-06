

PLASMIC.registerComponent(Text, textMeta)
PLASMIC.registerComponent(Input, inputMeta)
PLASMIC.registerComponent(Button, buttonMeta)
PLASMIC.registerComponent(Borrow, borrowMeta);
PLASMIC.registerComponent(Web3Connect, web3meta)

PLASMIC.registerComponent(GenericBOS, {
  name: 'bos-generic',
  displayName: '[BOS] Generic',
  props: {
      src: 'string',
      meta: {
          type: 'object',
          fields: {
            title: 'string',
            description: 'string',
          }
      },
      componentProps: 'object',
  }
});

PLASMIC.registerComponent(Gmx, {
  props: {},
  name: 'bos-gmx',
  displayName: '[BOS] Gmx',
})

PLASMIC.registerComponent(Lido, {
  props: {},
  name: 'bos-lido',
  displayName: '[BOS] Lido',
})

PLASMIC.registerComponent(ZKEVM, {
  props: {},
  name: 'bos-zk-evm',
  displayName: '[BOS] ZK-EVM',
})

// Registration
PLASMIC.registerComponent(CodeComponent, {
  name: 'CodeComponent',
  props: {
    //
  },
  actions: [
    {
      control,
      type: 'custom-action',
    }
  ]
});
