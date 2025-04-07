"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InventoryManagement } from "@/components/stock/inventory-management"
import { StockAlerts } from "@/components/stock/stock-alerts"
import { StockReport } from "@/components/stock/stock-report"

// Version simplifiée de ABCInventory pour éviter l'erreur
function SimpleABCInventory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Inventaire Tournant (ABC)</h2>
          <p className="text-sm text-muted-foreground">
            Gestion optimisée de l'inventaire basée sur la classification ABC
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribution ABC par Valeur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Classe A</h3>
              <p className="text-sm">60% de la valeur totale</p>
              <p className="text-sm">20% des articles</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Classe B</h3>
              <p className="text-sm">30% de la valeur totale</p>
              <p className="text-sm">30% des articles</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Classe C</h3>
              <p className="text-sm">10% de la valeur totale</p>
              <p className="text-sm">50% des articles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Résumé de la Classification ABC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Classe A</h3>
              <p className="text-sm">Articles à haute valeur nécessitant un contrôle strict</p>
              <p className="text-sm">Fréquence d'inventaire: Mensuelle</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Classe B</h3>
              <p className="text-sm">Articles à valeur moyenne nécessitant un contrôle régulier</p>
              <p className="text-sm">Fréquence d'inventaire: Trimestrielle</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Classe C</h3>
              <p className="text-sm">Articles à faible valeur nécessitant un contrôle minimal</p>
              <p className="text-sm">Fréquence d'inventaire: Semestrielle</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function StockPage() {
  const [activeTab, setActiveTab] = useState("inventory")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Stocks</h1>
      </div>

      {/* Navigation personnalisée au lieu du composant Tabs */}
      <div className="w-full">
        <div className="flex border-b border-gray-200">
          <Button
            variant={activeTab === "inventory" ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
            data-state={activeTab === "inventory" ? "active" : "inactive"}
            onClick={() => setActiveTab("inventory")}
          >
            Inventaire
          </Button>
          <Button
            variant={activeTab === "alerts" ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
            data-state={activeTab === "alerts" ? "active" : "inactive"}
            onClick={() => setActiveTab("alerts")}
          >
            Alertes
          </Button>
          <Button
            variant={activeTab === "abc" ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
            data-state={activeTab === "abc" ? "active" : "inactive"}
            onClick={() => setActiveTab("abc")}
          >
            Inventaire Tournant (ABC)
          </Button>
          <Button
            variant={activeTab === "reports" ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
            data-state={activeTab === "reports" ? "active" : "inactive"}
            onClick={() => setActiveTab("reports")}
          >
            Rapports
          </Button>
        </div>

        <div className="mt-6">
          {activeTab === "inventory" && (
            <Card>
              <CardHeader>
                <CardTitle>Gestion de l'Inventaire</CardTitle>
                <CardDescription>Gérez votre inventaire et suivez vos stocks</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryManagement />
              </CardContent>
            </Card>
          )}

          {activeTab === "alerts" && (
            <Card>
              <CardHeader>
                <CardTitle>Alertes de Stock</CardTitle>
                <CardDescription>Visualisez les alertes de stock et les seuils critiques</CardDescription>
              </CardHeader>
              <CardContent>
                <StockAlerts />
              </CardContent>
            </Card>
          )}

          {activeTab === "abc" && (
            <Card>
              <CardHeader>
                <CardTitle>Inventaire Tournant (ABC)</CardTitle>
                <CardDescription>Optimisez votre gestion d'inventaire avec la classification ABC</CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleABCInventory />
              </CardContent>
            </Card>
          )}

          {activeTab === "reports" && (
            <Card>
              <CardHeader>
                <CardTitle>Rapports de Stock</CardTitle>
                <CardDescription>Analysez vos mouvements de stock et vos tendances</CardDescription>
              </CardHeader>
              <CardContent>
                <StockReport />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

