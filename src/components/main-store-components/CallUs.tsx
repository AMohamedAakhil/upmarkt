import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ButtonContent() {
  return (
    <>
      <div className="flex items-center p-1">
        <Button className="text-xs text-slate-500">Call us</Button>

        <div className="">
          <svg
            width="10"
            height="8"
            viewBox="0 0 7 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.25 1.125L3.5 3.875L0.75 1.125" stroke="#9A9A9A" />
          </svg>
        </div>
      </div>
    </>
  );
}

export function CallUs() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonContent />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 m-2 bg-white">
        <DropdownMenuLabel>Contact Us</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
