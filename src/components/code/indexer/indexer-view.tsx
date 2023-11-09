import React from 'react';
import { VmComponent } from '@/components/vm/VmComponent';
import { useVMContext } from '@/vm-context';

export const indexerViewMeta = {
  name: 'bos-indexer-view',
  displayName: '[BOS] Indexer View',
  importPath: '@/components/code',
  importName: 'IndexerView',
  props: {
    table: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-table',
          type: "component",
        }
      ]
    },
    thead: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-table-head',
          type: "component",
        }
      ]
    },
    tbody: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-table-body',
          type: "component",
        }
      ]
    },
    tr: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-table-tr',
          type: "component",
        }
      ]
    },
    th: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-table-th',
          type: "component",
        }
      ]
    },
    td: {
      type: "slot",
      defaultValue: [
        {
          name: 'ui-table-td',
          type: "component",
        }
      ]
    },
  },
}

export function IndexerView (props: any) {
  console.log('props', props)

  const context = useVMContext()

  const renderPlasmicElement = (element: any, values: any) => {
    return React.cloneElement(props[element], values)
  }

  return (
    <VmComponent
      src="1mateus.testnet/widget/indexer-view"
      props={{
        ...context,
        renderPlasmicElement,
        plasmicRootClassName: props.className,
        registry: "dev-queryapi.dataplatform.near",
        endpoint: "https://queryapi-hasura-graphql-mainnet-vcqilefdcq-ew.a.run.app",
      }}
    />
  );
}
