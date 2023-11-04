import { VmComponent } from '@/components/vm/VmComponent';
import { MetaTags } from './MetaTags';
import styled from 'styled-components';

type Props = {
  componentProps?: Record<string, unknown>;
  src: string;
  meta?: {
    title: string;
    description: string;
  };
};

export function GenericBOS(props: any) {
  return (
    <div
      className={props.className}
    >
      <VmComponent src={props.src} props={props.componentProps} />
    </div>
  );
}
