import React from 'react';
import { VmComponent } from '@/components/vm/VmComponent';
import { useVMContext } from '@/vm-context';

export function Borrow(props: any) {
  const context = useVMContext()

  const renderPlasmicElement = (element: any, values: any) => {
    return React.cloneElement(props[element], values)
  }

  return (
    <VmComponent
      src="1mateus.testnet/widget/liquity-borrow"
      props={{
        ...context,
        renderPlasmicElement,
        plasmicRootClassName: props.className,
      }}
    />
  );
}
