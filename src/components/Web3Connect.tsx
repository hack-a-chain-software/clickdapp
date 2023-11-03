import { VmComponent } from '@/components/vm/VmComponent';
import { Box, Button, Text } from "@chakra-ui/react";

const chakraUIComponents: any = {
  Box,
  Text,
  Button,
  // Adicione outros componentes do Chakra UI aqui
};


export function Web3Connect(props: any) {
  const tag = props.component || 'Button'

  const component = {
    [tag]: chakraUIComponents[tag] as any
  };

  return (
    <div>
      <VmComponent
        src="1mateus.testnet/widget/web3connect"
        props={{...props, ...component}}
      />
    </div>
  );
}
