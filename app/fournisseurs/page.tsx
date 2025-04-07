import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupplierList } from "@/components/suppliers/supplier-list"
import { SupplierPerformance } from "@/components/suppliers/supplier-performance"
import { OrderTracking } from "@/components/suppliers/order-tracking"
import { StrategicAnalysis } from "@/components/suppliers/strategic-analysis"
import { DisputeManagement } from "@/components/suppliers/dispute-management"

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Relations Fournisseurs</h1>
      </div>

      <Tabs defaultValue="liste" className="w-full">
        <TabsList className="flex w-full overflow-x-auto snap-x snap-mandatory">
          <TabsTrigger value="liste" className="flex-shrink-0 text-xs sm:text-sm snap-start min-w-[120px] sm:min-w-0">
            Liste des Fournisseurs
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="flex-shrink-0 text-xs sm:text-sm snap-start min-w-[90px] sm:min-w-0"
          >
            Évaluation
          </TabsTrigger>
          <TabsTrigger
            value="commandes"
            className="flex-shrink-0 text-xs sm:text-sm snap-start min-w-[140px] sm:min-w-0"
          >
            Suivi des Commandes
          </TabsTrigger>
          <TabsTrigger value="litiges" className="flex-shrink-0 text-xs sm:text-sm snap-start min-w-[130px] sm:min-w-0">
            Gestion des Litiges
          </TabsTrigger>
          <TabsTrigger
            value="strategic"
            className="flex-shrink-0 text-xs sm:text-sm snap-start min-w-[140px] sm:min-w-0"
          >
            Analyse Stratégique
          </TabsTrigger>
        </TabsList>
        <TabsContent value="liste">
          <Card>
            <CardHeader>
              <CardTitle>Liste des Fournisseurs</CardTitle>
              <CardDescription>Gérez vos fournisseurs et leurs informations</CardDescription>
            </CardHeader>
            <CardContent>
              <SupplierList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Évaluation des Fournisseurs</CardTitle>
              <CardDescription>Système de scoring basé sur 5 critères clés</CardDescription>
            </CardHeader>
            <CardContent>
              <SupplierPerformance />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="commandes">
          <Card>
            <CardHeader>
              <CardTitle>Suivi des Commandes</CardTitle>
              <CardDescription>Tableau de bord des commandes en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTracking />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="litiges">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Litiges</CardTitle>
              <CardDescription>Enregistrement et suivi des réclamations</CardDescription>
            </CardHeader>
            <CardContent>
              <DisputeManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="strategic">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Stratégique des Fournisseurs</CardTitle>
              <CardDescription>Évaluez les risques et optimisez votre chaîne d'approvisionnement</CardDescription>
            </CardHeader>
            <CardContent>
              <StrategicAnalysis />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

