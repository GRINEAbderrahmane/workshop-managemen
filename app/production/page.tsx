import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductionPlanning } from "@/components/production/production-planning"
import { ProductionTracking } from "@/components/production/production-tracking"
import { ProductionAnalytics } from "@/components/production/production-analytics"

export default function ProductionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion de Production</h1>
      </div>

      <Tabs defaultValue="planning" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planning">Planification</TabsTrigger>
          <TabsTrigger value="tracking">Suivi en Temps Réel</TabsTrigger>
          <TabsTrigger value="analytics">Analyse</TabsTrigger>
        </TabsList>
        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>Planification de Production</CardTitle>
              <CardDescription>Planifiez et organisez votre production</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductionPlanning />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle>Suivi en Temps Réel</CardTitle>
              <CardDescription>Suivez l'avancement de votre production</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductionTracking />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analyse de Production</CardTitle>
              <CardDescription>Analysez les performances de votre production</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductionAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

