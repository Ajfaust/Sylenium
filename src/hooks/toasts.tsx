import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { ToastProps } from '@/components/ui/toast';
import { ToastResult } from '@/types';

import { useToast } from '../components/ui/use-toast';

interface MakeToastProps extends ToastProps {
  result: ToastResult;
  message: string;
}

export function useMakeToast() {
  const { toast } = useToast();

  function makeToast({ result, message, ...props }: MakeToastProps) {
    return toast({
      description: (
        <div className="flex flex-row">
          {result === ToastResult.Success ? (
            <FaCircleCheck color="teal" className="size-4 self-start" />
          ) : (
            <FaCircleXmark color="red" className="size-4 self-start" />
          )}
          <p className="text-base">{message}</p>
        </div>
      ),
      ...props,
    });
  }

  return makeToast;
}
