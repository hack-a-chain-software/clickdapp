import { VmComponent } from '@/components/vm/VmComponent';

export function GenericBOS(props: any) {
  return (
    <div
      className={props.className + ' relative w-max h-max bos'}
      style={{ overflow: 'hidden', maxHeight: '100%' }}
    >
      <VmComponent src={props.src} props={props.componentProps} />
    </div>
  );
}
