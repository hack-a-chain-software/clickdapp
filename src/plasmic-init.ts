import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { GenericBOS } from "./components/GenericBOS";
import { Web3Connect } from './components/Web3Connect';
import { Borrow } from './components/liquity/Borrow';
import { Button, Input, Text } from "@chakra-ui/react";
import { buttonMeta, borrowMeta, inputMeta, textMeta, web3meta } from "./utils/register";

export const PLASMIC = initPlasmicLoader({
    projects: [
      {
        id: "nSYtb5p5gdwufJYxWt1kVu",
        token: "VNdrdpGxwzeZ427KKjljE5a36NbUOIrqD7PuzePEzqV9GMhc7Hdm4GSRRr6J6HkhMi3zOtoOQ9X02cVVXQ"
      }
    ],
    preview: true,
})

PLASMIC.registerComponent(GenericBOS, {
    name: 'GenericBOS',
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

PLASMIC.registerComponent(Text, textMeta)
PLASMIC.registerComponent(Input, inputMeta)
PLASMIC.registerComponent(Button, buttonMeta)
PLASMIC.registerComponent(Borrow, borrowMeta);
PLASMIC.registerComponent(Web3Connect, web3meta)
