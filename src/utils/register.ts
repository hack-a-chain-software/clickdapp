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
  name: '[Liquity] Borrow',
  props: {
    //
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
