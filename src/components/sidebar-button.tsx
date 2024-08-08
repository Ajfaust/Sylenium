import { IconType } from 'react-icons';

import { cn } from '../lib/utils';

import { Button, ButtonProps } from 'react-aria-components';

interface SidebarButtonProps extends ButtonProps {
  icon?: IconType;
  title: string;
}

export function SidebarButton({
  icon: Icon,
  title,
  className,
  ...props
}: SidebarButtonProps) {
  return (
    <Button className={cn('w-full justify-start gap-2', className)} {...props}>
      {Icon && <Icon size={18} />}
      <span className="text-lg">{title}</span>
    </Button>
  );
}
