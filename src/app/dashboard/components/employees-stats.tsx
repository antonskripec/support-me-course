import
{
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function EmployeesStats()
{
    return (
        <div className="grid lg:grid-cols-3 gap-4">

            <Card>
                <CardHeader>
                    <CardDescription>Total employees</CardDescription>
                    <CardTitle>0</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription>Active employees</CardDescription>
                    <CardTitle>0</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription>Inactive employees</CardDescription>
                    <CardTitle>0</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}
