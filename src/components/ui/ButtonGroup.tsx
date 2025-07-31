import React from "react";

type ButtonGroupProps = {
    children: React.ReactNode;
    direction?: 'row' | 'column';
    size?: 'sm' | 'md' | 'lg';

}

const ButtonGroup = ({ children, direction = 'row', size = 'md' }: ButtonGroupProps) => {

  const directionClass = direction === 'column' ? 'flex-col' : 'items-center';
  const gapClass = size === 'sm' ? 'gap-2' : size === 'lg' ? 'gap-4' : 'gap-3';
  const marginClass = size === 'sm' ? 'mt-4' : size === 'lg' ? 'mt-8' : 'mt-6';

  return (<div className={`flex ${directionClass} ${gapClass} ${marginClass}`}>
    {children}
  </div>);
}

export default ButtonGroup;