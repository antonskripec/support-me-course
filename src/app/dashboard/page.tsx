import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeesStats from "./components/employees-stats";
import TeamsStats from "./components/teams-stats";

export default function DashboardPage()
{
    return (
        <Tabs defaultValue="employees">
            <TabsList>
                <TabsTrigger value="employees">Employees stats</TabsTrigger>
                <TabsTrigger value="teams">Teams stats</TabsTrigger>
            </TabsList>
            <TabsContent value="employees">
                <EmployeesStats />
            </TabsContent>
            <TabsContent value="teams">
                <TeamsStats />
            </TabsContent>
        </Tabs>
    )
}    