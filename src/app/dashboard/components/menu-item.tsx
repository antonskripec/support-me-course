"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props =
    {
        children: React.ReactNode;
        href: string;
    };

export default function MenuItem({ children, href }: Props)
{
    const pathName = usePathname();
    const isActive = pathName === href;

    return (
        <Link href={href} className={`block p-2 hover:bg-white
            dark:hover:bg-zinc-700 rounded-md hover:text-foreground 
            ${isActive
                ? "bg-white dark:bg-zinc-700 text-foreground"
                : "text-muted-foreground"
            }`}>
            {children}
        </ Link>
    )
}