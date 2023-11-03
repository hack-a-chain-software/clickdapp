import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { HelloWorld } from "./components/HelloWorld";
import { GenericBOS } from "./components/GenericBOS";
import { Web3Connect } from './components/Web3Connect';
import { Borrow } from './components/liquity/Borrow';
import { buttonMeta, borrowMeta } from "./utils/register";

export const PLASMIC = initPlasmicLoader({
    projects: [
      {
        id: "ndA9k37xVXXNcXXffChDY6",
        token: "1k1xVXAdD1Lyh8fgBBL5Vspc5OxLAzg9zYJhjNONKHJQlZzvxD3i93OEWZqdbY9WZU0fSFR2LLTaDQgTBw"
      }
    ],
    preview: true,
})

PLASMIC.registerComponent(HelloWorld, {
    name: 'HelloWorld',
    props: {
        verbose: 'boolean',
        children: 'slot'
    }
});

type Props = {
    componentProps?: Record<string, unknown>;
    src: string;
    meta?: {
      title: string;
      description: string;
    };
  };

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

PLASMIC.registerComponent(Borrow, borrowMeta);

PLASMIC.registerComponent(Web3Connect, buttonMeta)
