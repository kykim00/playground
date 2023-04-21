import { Popover } from '@headlessui/react';

interface TooltipProps {
  text?: string;
}
export const Tooltip = ({ text }: TooltipProps) => {
  return (
    <Popover className="relative">
      <Popover.Button>Solutions</Popover.Button>

      <Popover.Panel className="absolute z-10">
        <p>{text}</p>
      </Popover.Panel>
    </Popover>
  );
};
