import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { Borrow } from './components/liquity/Borrow';
import { Button, Input, Text } from "@chakra-ui/react";
import {
  Lido,
  ZKEVM,
  Gmx,
  GenericBOS,
  Web3Connect,
} from '@/components/bos'

import { buttonMeta, borrowMeta, inputMeta, textMeta, web3meta } from "./utils/register";

export const PLASMIC = initPlasmicLoader({
    projects: [
      {
        id: process.env.PLASMIC_ID as string,
        token: process.env.PLASMIC_TOKEN as string
      }
    ],
    preview: true,
})

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
