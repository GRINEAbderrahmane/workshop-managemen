import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductionPlanning } from "@/components/production/production-planning"
import { ProductionTracking } from "@/components/production/production-tracking"
import { ProductionAnalytics } from "@/components/production/production-analytics"

export default function ProductionPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 px-2 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestion de Production</h1>
      </div>

      <Tabs defaultValue="planning" className="w-full">
        <TabsList className="grid w-full grid-cols-3 overflow-x-auto">
          <TabsTrigger value="planning" className="text-xs sm:text-sm">
            Planification
          </TabsTrigger>
          <TabsTrigger value="tracking" className="text-xs sm:text-sm">
            Suivi en Temps Réel
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs sm:text-sm">
            Analyse
          </TabsTrigger>
        </TabsList>
        <TabsContent value="planning">
          <Card className="mt-2 md:mt-4">
            <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-lg sm:text-xl">Planification de Production</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Planifiez et organisez votre production</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-4">
              <ProductionPlanning />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tracking">
          <Card className="mt-2 md:mt-4">
            <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-lg sm:text-xl">Suivi en Temps Réel</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Suivez l'avancement de votre production</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-4">
              <ProductionTracking />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="mt-2 md:mt-4">
            <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-lg sm:text-xl">Analyse de Production</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Analysez les performances de votre production
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-4">
              <ProductionAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

