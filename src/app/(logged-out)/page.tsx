import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export default function LandingPage()
{
    return (
        <>
            <h1 className="flex items-center gap-2">
                <PersonStandingIcon size={50} className="text-pink-500" />
                SupportMe
            </h1>

            <p>
                The best dashboard to manage customer support.
            </p>

            <div className="flex gap-2 items-center mt-4">
                <Button asChild className="p-4">
                    <Link href="/login">LOG IN</Link>
                </Button>

                <small>or</small>

                <Button variant="outline" asChild className="p-4">
                    <Link href="/sign-up">SIGN UP</Link>
                </Button>
            </div>
        </>
    )
}