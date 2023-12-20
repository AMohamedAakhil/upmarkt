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

function UserLogo() {
  return (
    <>
      <div className="cursor-pointer">
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.25"
            y="0.25"
            width="46.5"
            height="46.5"
            rx="11.75"
            fill="white"
            stroke="#9A9A9A"
            stroke-width="0.5"
          />
          <path
            d="M32.3713 33.151C31.8776 31.7689 30.7895 30.5476 29.2759 29.6765C27.7623 28.8055 25.9078 28.3333 24 28.3333C22.0922 28.3333 20.2376 28.8055 18.724 29.6765C17.2105 30.5476 16.1224 31.7689 15.6286 33.151"
            stroke="#9A9A9A"
            stroke-linecap="round"
          />
          <circle
            cx="24"
            cy="19.6667"
            r="4.33333"
            stroke="#9A9A9A"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </>
  );
}

export function UserLogoDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserLogo />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 m-2 bg-white">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
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
