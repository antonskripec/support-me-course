"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { User } from "@/app/api/users/data";

function SortableHeader<TData>({
    column,
    label,
}: {
    column: import("@tanstack/react-table").Column<TData, unknown>;
    label: string;
})
{
    const sorted = column.getIsSorted();
    const Icon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(sorted === "asc")}
            className="-ml-2.5"
        >
            {label}
            <Icon />
        </Button>
    );
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => <SortableHeader column={column} label="ID" />,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader column={column} label="Name" />,
        cell: ({ row }) => (
            <Link
                href={`/dashboard/users/${row.original.id}`}
                className="hover:underline font-medium"
            >
                {row.original.name}
            </Link>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => <SortableHeader column={column} label="Email" />,
    },
    {
        accessorKey: "role",
        header: ({ column }) => <SortableHeader column={column} label="Role" />,
        cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
    },
];
