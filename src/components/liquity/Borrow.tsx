import React from 'react';
import { VmComponent } from '@/components/vm/VmComponent';
import { Box, Button, Text } from "@chakra-ui/react";
import { troveManagerAbi, borrowerOperationAbi, priceFeedAbi } from '@/utils/liquity';

const chakraUIComponents: any = {
  Box,
  Text,
  Button,
  // Adicione outros componentes do Chakra UI aqui
};

//clickdapp-poc-1mateus.vercel.app/plasmic-host

export function Borrow(props: any) {
  console.log(props)
  // const tag = props.component || 'Button'

  // const component = {
  //   [tag]: chakraUIComponents[tag] as any
  // };

  return (
    <VmComponent
      src="1mateus.testnet/widget/liquity-borrow"
      props={{
        className: props.className,
        getText: (values: any) => React.cloneElement(props.text, values),
        getInput: (values: any) => React.cloneElement(props.input, values),
        inputLabelClass: '',
        inputWrapperClass: 'flex flex-col space-y-2',
        inputClass: 'rounded-[8px] px-2 py-1 text-[#060A0F] placeholder:text-[#060A0F] outline-none',
        cardClass: 'w-full h-full flex flex-col p-4 bg-[#21262D] text-[#FAFAFA] rounded-[12px] space-y-6',
      }}
    />
  );
}
