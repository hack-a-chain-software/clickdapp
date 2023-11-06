import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { Button, Input, Text } from "@chakra-ui/react";

import {
  Lido,
  ZKEVM,
  Gmx,
  Borrow,
  GenericBOS,
  Web3Connect,
  Tester,
  // CodeComponent,
  // CustomProp,
} from '@/components/code'

import { buttonMeta, borrowMeta, inputMeta, textMeta, web3meta } from "./utils/register";

export const PLASMIC = initPlasmicLoader({
    projects: [
      {
        id: process.env.PLASMIC_ID as string,
        token: process.env.PLASMIC_TOKEN as string
      }
    ],
    preview: process.env.NODE_ENV === 'development',
})

PLASMIC.registerComponent(Text, textMeta)
PLASMIC.registerComponent(Input, inputMeta)
PLASMIC.registerComponent(Button, buttonMeta)
PLASMIC.registerComponent(Borrow, borrowMeta);
PLASMIC.registerComponent(Web3Connect, web3meta)


PLASMIC.registerComponent(Tester, {
  props: {},
  name: 'bos-tester',
  importName: 'Tester',
  displayName: '[BOS] Tester',
  importPath: '@/components/code',
});

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

// // Registration
// PLASMIC.registerComponent(CodeComponent, {
//   name: 'CodeComponent',
//   props: {
//     //
//     value: {
//       type: "slot",
//       defaultValue: [
//         //
//       ]
//     }
//   },
//   actions: [
//     {
//       type: 'button-action',
//       label: 'Append new element',
//       onClick: ({ studioOps }) => {
//         console.log('studioops', studioOps)
//         studioOps.appendToSlot(
//           {
//             type: 'img',
//             src: '',
//             styles: {
//               maxWidth: '100%'
//             }
//           },
//           'value'
//         );
//       }
//     }
//   ]
// });
