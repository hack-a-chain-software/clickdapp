import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { HelloWorld } from "./components/HelloWorld";
import { GenericBOS } from "./components/GenericBOS";
import { Web3Connect } from './components/Web3Connect';

export const PLASMIC = initPlasmicLoader({
    projects: [
        {
            id: "nSYtb5p5gdwufJYxWt1kVu",
            token: "VNdrdpGxwzeZ427KKjljE5a36NbUOIrqD7PuzePEzqV9GMhc7Hdm4GSRRr6J6HkhMi3zOtoOQ9X02cVVXQ"
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

PLASMIC.registerComponent(Web3Connect, {
    name: 'Web3Connect',
    props: {
        className: 'object',
    }
});