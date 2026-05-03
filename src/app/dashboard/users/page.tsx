import type { User } from "@/app/api/users/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersPage()
{
    const res = await fetch("http://localhost:3000/api/users", {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to load users");

    const users: User[] = await res.json();

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Users</h2>
            <DataTable columns={columns} data={users} />
        </div>
    );
}
