import { VmComponent } from '@/components/vm/VmComponent';
import { Box, Button, Text } from "@chakra-ui/react";
import { troveManagerAbi, borrowerOperationAbi, priceFeedAbi } from '@/utils/liquity';

const chakraUIComponents: any = {
  Box,
  Text,
  Button,
  // Adicione outros componentes do Chakra UI aqui
};


export function Borrow(props: any) {
  console.log('props', props)

  // const tag = props.component || 'Button'

  // const component = {
  //   [tag]: chakraUIComponents[tag] as any
  // };

  return (
    <div>
      <VmComponent
        src="1mateus.testnet/widget/liquity-borrow"
        props={{ troveManagerAbi, borrowerOperationAbi, priceFeedAbi }}
      />
    </div>
  );
}
