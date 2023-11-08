import { Text as TextChakra } from "@chakra-ui/react";

export const textMeta = {
  name: 'ui-text',
  importName: 'Text',
  displayName: '[UI] Text',
  importPath: '@/components/code',
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
}

export const Text = TextChakra
