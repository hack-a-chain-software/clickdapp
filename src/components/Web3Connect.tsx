import { VmComponent } from '@/components/vm/VmComponent';

type Props = {
  componentProps?: Record<string, unknown>;
  src: string;
  meta?: {
    title: string;
    description: string;
  };
};

export function Web3Connect(props: any) {  
  return (
    <div>
      <VmComponent 
        src="1mateus.testnet/widget/web3connect"
        props={...props}
      />
    </div>
  );
}