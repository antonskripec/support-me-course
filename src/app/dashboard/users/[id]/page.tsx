// src/app/dashboard/users/[id]/page.tsx
import { notFound } from "next/navigation";
import type { User } from "@/app/api/users/data";

export default async function UserPage(
    { params }: { params: Promise<{ id: string }> },
)
{
    const { id } = await params;

    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        cache: "no-store",
    });

    if (res.status === 404) notFound();
    if (!res.ok) throw new Error("Failed to load user");

    const user: User = await res.json();

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email} — {user.role}</p>
        </div>
    );
}
