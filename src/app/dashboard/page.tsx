import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage()
{
    return (
        <Tabs defaultValue="employees">
            <TabsList>
                <TabsTrigger value="employees">Employees stats</TabsTrigger>
                <TabsTrigger value="teams">Teams stats</TabsTrigger>
            </TabsList>
            <TabsContent value="employees">Manage your employees here.</TabsContent>
            <TabsContent value="teams">Manage your teams here.</TabsContent>
        </Tabs>
    )
}    