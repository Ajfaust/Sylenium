import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

import { Button, ButtonProps } from './ui/button';

interface SidebarButtonProps extends ButtonProps {
  icon?: IconType;
}

export function SidebarButton({
  icon: Icon,
  className,
  children,
  ...props
}: SidebarButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn('w-full justify-start gap-2', className)}
      {...props}
    >
      {Icon && <Icon size={18} />}
      <span className="text-lg">{children}</span>
    </Button>
  );
}
