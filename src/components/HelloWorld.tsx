import * as React from 'react';

export interface HelloWorldProps {
  children?: React.ReactNode;
  className?: string;
  verbose?: boolean;
}

export function HelloWorld({ children, className, verbose }: HelloWorldProps) {
  return (
    <div className={className} style={{ padding: '20px' }}>
      <p>Hello there! {verbose && 'Really nice to meet you!'}</p>
      <div>{children}</div>
    </div>
  );
}