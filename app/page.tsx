import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivities } from "@/components/recent-activities"
import { ModuleCards } from "@/components/module-cards"
import { TopSellingProducts } from "@/components/top-selling-products"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Bienvenue dans votre système de gestion</span>
        </div>
      </div>

      <ModuleCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
            <CardDescription>Activité du système au cours des 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
            <CardDescription>Les dernières actions effectuées dans le système</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles les Plus Vendus</CardTitle>
          <CardDescription>Les produits les plus populaires ce mois-ci</CardDescription>
        </CardHeader>
        <CardContent>
          <TopSellingProducts />
        </CardContent>
      </Card>
    </div>
  )
}

