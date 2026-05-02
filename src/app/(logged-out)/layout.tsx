import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

type Props = {
    children: React.ReactNode;
};

export default function LandingLayout({ children }: Props)
{
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center  p-24">
                {children}
            </div>

            <LightDarkToggle className="fixed right-0 top-1/2" />
        </>
    );
}
