import { AccordionContent } from '@radix-ui/react-accordion';
import { Link } from '@tanstack/react-router';

import { cn } from '@/lib/utils';
import { SidebarItem } from '@/types';

import { SidebarButton } from './sidebar-button';
import { Accordion, AccordionItem, AccordionTrigger } from './ui/accordion';
import { buttonVariants } from './ui/button';

interface SidebarProps {
  sidebarItems: Array<SidebarItem>;
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">Allosta</h3>
        <div className="mt-5">
          <div className="flex w-full flex-col gap-1">
            {props.sidebarItems.map((item, index) =>
              item.children ? (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem
                    value="accounts"
                    className="my-auto border-none"
                  >
                    <AccordionTrigger
                      className={cn(
                        buttonVariants({
                          variant: 'ghost',
                        })
                      )}
                    >
                      <div className="flex w-full flex-row justify-start gap-2 align-middle">
                        {item.icon && (
                          <item.icon size={18} className="my-auto" />
                        )}
                        <span className="text-lg">Accounts</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="ml-3">
                      {item.children.map((child, index) => (
                        <Link key={index} to={child.href}>
                          <SidebarButton>{child.label}</SidebarButton>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link key={index} to={item.href}>
                  <SidebarButton icon={item.icon}>{item.label}</SidebarButton>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
