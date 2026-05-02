"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import
{
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import
{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import
{
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

function isOver18(date: Date)
{
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();

    if (age > 18) return true;
    if (age < 18) return false;

    if (today.getMonth() > date.getMonth()) return true;
    if (today.getMonth() < date.getMonth()) return false;

    return today.getDate() >= date.getDate();
}

const formSchema = z
    .object({
        email: z.email("Please enter a valid email address."),
        accountType: z.enum(["personal", "company"]),
        companyName: z.string().optional(),
        numberOfEmployees: z.coerce.number().optional(),
        dateOfBirth: z.date().refine((date) => isOver18(date), {
            message: "You must be at least 18 years old.",
        }),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
            .regex(/[0-9]/, "Password must contain at least one number."),
        passwordConfirm: z.string(),
    })
    .superRefine((data, ctx) =>
    {
        if (data.accountType === "company" && !data.companyName)
        {
            ctx.addIssue(
                {
                    code: z.ZodIssueCode.custom,
                    path: ["companyName"],
                    message: "Company name is required for company accounts.",
                });
        }

        if (data.accountType === "company" && (!data.numberOfEmployees || data.numberOfEmployees < 1))
        {
            ctx.addIssue(
                {
                    code: z.ZodIssueCode.custom,
                    path: ["numberOfEmployees"],
                    message: "Number of employees is required for company accounts.",
                });
        }

        if (data.password !== data.passwordConfirm)
        {
            ctx.addIssue(
                {
                    code: z.ZodIssueCode.custom,
                    path: ["passwordConfirm"],
                    message: "Passwords do not match.",
                });
        }
    });

export default function SignUpPage()
{
    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues:
            {
                email: "",
                accountType: undefined,
                companyName: undefined,
                numberOfEmployees: undefined,
                password: "",
                passwordConfirm: "",
            },
        });

    const handleSubmit = (data: z.infer<typeof formSchema>) =>
    {
        console.log("sign up submitted", data);
    };

    const accountType = form.watch("accountType");

    return (
        <>
            <PersonStandingIcon size={50} />

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create a new SupportMe account</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="flex flex-col gap-4"
                        >
                            {/* email     */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* account type */}
                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select account type" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value="personal">Personal</SelectItem>
                                                <SelectItem value="company">Company</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {accountType === "company" && (
                                <>
                                    {/* company name field */}
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Company Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* number of employees field */}
                                    <FormField
                                        control={form.control}
                                        name="numberOfEmployees"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number of Employees</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Number of Employees"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            {/* date of birth field */}
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of Birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date()}
                                                    captionLayout="dropdown"
                                                    weekStartsOn={1}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* password field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* confirm password field */}
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Sign up</Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="justify-between">
                    <small>Already have an account?</small>

                    <Button asChild variant="outline" size="sm">
                        <Link href="/login">Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
