export const CHAKRA_UI_IMPORT_PATH = "@chakra-ui/react";

export const getPlasmicComponentName = (componentName: string) =>
  `chakra-ui-${componentName}`;

export const getDisplayComponentName = (componentName: string) =>
  `Chakra-UI ${componentName}`;

export const getComponentNameAndImportMeta = (
  componentName: string,
  parentComponentName?: string,
  opts?: {
    displayName?: string;
    importPath?: string;
  }
) => ({
  name: getPlasmicComponentName(componentName),
  displayName: opts?.displayName ?? getDisplayComponentName(componentName),
  importPath: opts?.importPath ?? CHAKRA_UI_IMPORT_PATH,
  importName: componentName,
  ...(parentComponentName
    ? { parentComponentName: getPlasmicComponentName(parentComponentName) }
    : {}),
});

export const borrowMeta: any = {
  name: 'liquityborrow',
  displayName: '[Liquity] Borrow',
  importPath: '@/components/liquity/Borrow',
  importName: 'Borrow',
  props: {
    input: {
      type: "slot",
      defaultValue: [
        {
          name: 'chakra-ui-Input',
          type: "component",
        }
      ]
    },
    text: {
      type: "slot",
      defaultValue: [
        {
          name: 'chakra-ui-Text',
          type: "component",
        }
      ]
    },
    textInput: {
      type: "slot",
      defaultValue: [
        {
          name: 'chakra-ui-Text',
          type: "component",
        }
      ]
    },
    textInfo: {
      type: "slot",
      defaultValue: [
        {
          name: 'chakra-ui-Text',
          type: "component",
        }
      ]
    },
    button: {
      type: "slot",
      defaultValue: [
        {
          name: 'chakra-ui-Button',
          type: "component",
        }
      ]
    },
  },
};

export const textMeta: any = {
  ...getComponentNameAndImportMeta("Text"),
  props: {
    children: {
      type: "slot",
      defaultValue: [
        {
          type: "text",
          value: "Some Text",
        },
      ],
    },
  },
};

export const inputMeta: any = {
  ...getComponentNameAndImportMeta("Input"),
  props: {
    size: {
      type: "choice",
      options: ["xl", "sm", "md", "lg"],
    },
    variant: {
      type: "choice",
      options: ["outline", "filled", "flushed", "unstyled"],
    },
    isDisabled: {
      type: "boolean",
    },
    isInvalid: {
      type: "boolean",
    },
    isReadOnly: {
      type: "boolean",
    },
    isRequired: {
      type: "boolean",
    },
    errorBorderColor: {
      type: "string",
      defaultValue: "red.500",
    },
    focusBorderColor: {
      type: "string",
      defaultValue: "blue.500",
    },
  },
};

export const web3meta: any = {
  ...getComponentNameAndImportMeta("Button"),
  name: 'bos-web3connect',
  displayName: '[BOS] Web3Connect',
  props: {
    size: {
      type: "choice",
      options: ["xl", "sm", "md", "lg"],
    },
    variant: {
      type: "choice",
      options: ["ghost", "outline", "solid", "link", "unstyled"],
      defaultValue: "solid",
    },
    colorScheme: {
      type: "choice",
      options: [
        "whiteAlpha",
        "blackAlpha",
        "gray",
        "red",
        "orange",
        "yellow",
        "green",
        "teal",
        "blue",
        "cyan",
        "purple",
        "pink",
        "linkedin",
        "facebook",
        "messenger",
        "whatsapp",
        "twitter",
        "telegram",
      ],
    },
    iconSpacing: "number",
    isActive: {
      type: "boolean",
    },
    isDisabled: {
      type: "boolean",
    },
    isLoading: {
      type: "boolean",
    },
    connectingLabel: {
      type: "string",
      defaultValue: "Connecting...",
    },
    disconnectLabel: {
      type: "string",
      defaultValue: "Disconnect",
    },
    connectLabel: {
      type: "string",
      defaultValue: "Connect",
    },
  },
};

export const buttonMeta: any = {
  ...getComponentNameAndImportMeta("Button"),
  props: {
    size: {
      type: "choice",
      options: ["xl", "sm", "md", "lg"],
    },
    variant: {
      type: "choice",
      options: ["ghost", "outline", "solid", "link", "unstyled"],
      defaultValue: "solid",
    },
    colorScheme: {
      type: "choice",
      options: [
        "whiteAlpha",
        "blackAlpha",
        "gray",
        "red",
        "orange",
        "yellow",
        "green",
        "teal",
        "blue",
        "cyan",
        "purple",
        "pink",
        "linkedin",
        "facebook",
        "messenger",
        "whatsapp",
        "twitter",
        "telegram",
      ],
    },
    iconSpacing: "number",
    isActive: {
      type: "boolean",
    },
    isDisabled: {
      type: "boolean",
    },
    isLoading: {
      type: "boolean",
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Button",
      },
    },
  },
};
