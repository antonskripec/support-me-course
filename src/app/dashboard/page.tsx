import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage()
{
    return (
        <Tabs defaultValue="employees">
            <TabsList>
                <TabsTrigger value="employees">Employees</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>
            <TabsContent value="employees">Manage your employees here.</TabsContent>
            <TabsContent value="teams">Manage your teams here.</TabsContent>
        </Tabs>
    )
}    