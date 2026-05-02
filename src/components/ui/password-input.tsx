"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function PasswordInput(
    {
        className,
        ...props
    }: React.ComponentProps<"input">)
{
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="relative">
            <Input
                data-slot="password-input"
                className={cn("pr-9", className)}
                {...props}
                type={showPassword ? "text" : "password"}
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-1 top-1/2 size-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
                {showPassword ? (
                    <EyeOffIcon className="size-4" />
                ) : (
                    <EyeIcon className="size-4" />
                )}
            </Button>
        </div>
    )
}

export { PasswordInput }
