import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

export default function MainMenu()
{
    return (
        <div className="bg-muted overflow-auto p-4 flex flex-col h-full">
            <div className="border-b dark:border-black border-b-zinc-300 pb-4">
                <MenuTitle />
            </div>

            <div className="py-4">
                <MenuItem href="/dashboard">
                    My Dashboard
                </MenuItem>

                <MenuItem href="/dashboard/teams">
                    Teams
                </MenuItem>

                <MenuItem href="/dashboard/employees">
                    Employees
                </MenuItem>

                <MenuItem href="/dashboard/account">
                    Account
                </MenuItem>

                <MenuItem href="/dashboard/settings">
                    Settings
                </MenuItem>
            </div>

            <div className="flex items-center gap-2 mt-auto">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                    <AvatarFallback>ASK</AvatarFallback>
                </Avatar>

                <Link href="/">
                    Logout
                </Link>

                <LightDarkToggle className="ml-auto" />
            </div>
        </div>
    )
}