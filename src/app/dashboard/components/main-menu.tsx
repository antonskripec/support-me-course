import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";

export default function MainMenu()
{
    return (
        <div className="bg-muted overflow-auto p-4">
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
        </div>
    )
}