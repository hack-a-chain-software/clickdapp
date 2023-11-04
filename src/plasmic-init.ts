import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { GenericBOS } from "./components/GenericBOS";
import { Web3Connect } from './components/Web3Connect';
import { Borrow } from './components/liquity/Borrow';
import { Input, Text } from "@chakra-ui/react";
import { buttonMeta, borrowMeta, inputMeta, textMeta } from "./utils/register";

export const PLASMIC = initPlasmicLoader({
    projects: [
      {
        id: "ndA9k37xVXXNcXXffChDY6",
        token: "1k1xVXAdD1Lyh8fgBBL5Vspc5OxLAzg9zYJhjNONKHJQlZzvxD3i93OEWZqdbY9WZU0fSFR2LLTaDQgTBw"
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
PLASMIC.registerComponent(Borrow, borrowMeta);

PLASMIC.registerComponent(Web3Connect, buttonMeta)
