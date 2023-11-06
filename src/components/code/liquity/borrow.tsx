import React from 'react';
import { PLASMIC } from '@/plasmic-init';
import { VmComponent } from '@/components/vm/VmComponent';
import { Box, Button, Text } from "@chakra-ui/react";
import { troveManagerAbi, borrowerOperationAbi, priceFeedAbi } from '@/utils/liquity';
import {
  PlasmicComponent,
  PlasmicRootProvider,
} from '@plasmicapp/loader-nextjs';

import { usePlasmicComponent } from '@plasmicapp/loader-react'

const chakraUIComponents: any = {
  Box,
  Text,
  Button,
};

export function Borrow(props: any) {
  console.log('props', props)
  // (async () => {
  //   const element = await usePlasmicComponent(
  //     'Button',
  //   )

  //   console.log('Element', element)
  // })()

  const renderPlasmicElement = (element, values: any) => {
    console.log('props[element]', element)
    return React.cloneElement(props[element], values)
  }

  return (
    <>
      <VmComponent
        src="1mateus.testnet/widget/liquity-borrow"
        props={{
          renderPlasmicElement,
          plasmicRootClassName: props.className,
        }}
      />

    </>
  );
}
