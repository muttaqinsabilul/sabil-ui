import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsSegmented() {
  return (
    <Tabs defaultValue="monthly" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
      </TabsList>
      <TabsContent value="monthly" className="pt-3">
        <p className="text-3xl font-semibold tracking-tight">
          $24<span className="text-base font-normal text-muted-foreground">/month</span>
        </p>
      </TabsContent>
      <TabsContent value="yearly" className="pt-3">
        <p className="text-3xl font-semibold tracking-tight">
          $240<span className="text-base font-normal text-muted-foreground">/year</span>
        </p>
        <p className="text-sm text-muted-foreground">Two months free.</p>
      </TabsContent>
    </Tabs>
  )
}
