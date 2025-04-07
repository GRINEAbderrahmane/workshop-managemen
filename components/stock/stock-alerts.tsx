"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, ShoppingCart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Données fictives pour les alertes de stock
const lowStockItems = [
  {
    id: "5",
    name: "Fil noir",
    category: "Fils",
    quantity: 50,
    unit: "bobines",
    location: "Entrepôt C",
    minStock: 20,
    status: "Stock bas",
    percentage: 40,
  },
  {
    id: "6",
    name: "Fil blanc",
    category: "Fils",
    quantity: 45,
    unit: "bobines",
    location: "Entrepôt C",
    minStock: 20,
    status: "Stock bas",
    percentage: 35,
  },
  {
    id: "9",
    name: "Tissu soie rouge",
    category: "Tissus",
    quantity: 30,
    unit: "mètres",
    location: "Entrepôt A",
    minStock: 25,
    status: "Stock bas",
    percentage: 20,
  },
]

const outOfStockItems = [
  {
    id: "8",
    name: "Papier de soie",
    category: "Emballages",
    quantity: 5,
    unit: "cartons",
    location: "Entrepôt D",
    minStock: 10,
    status: "Rupture",
    percentage: 0,
  },
  {
    id: "10",
    name: "Étiquettes personnalisées",
    category: "Accessoires",
    quantity: 0,
    unit: "pièces",
    location: "Entrepôt B",
    minStock: 500,
    status: "Rupture",
    percentage: 0,
  },
  {
    id: "11",
    name: "Fil doré",
    category: "Fils",
    quantity: 0,
    unit: "bobines",
    location: "Entrepôt C",
    minStock: 15,
    status: "Rupture",
    percentage: 0,
  },
]

const expiringItems = [
  {
    id: "12",
    name: "Colle textile",
    category: "Accessoires",
    quantity: 20,
    unit: "pots",
    location: "Entrepôt B",
    expiryDate: "2023-06-15",
    daysLeft: 30,
  },
  {
    id: "13",
    name: "Teinture bleue",
    category: "Teintures",
    quantity: 15,
    unit: "litres",
    location: "Entrepôt A",
    expiryDate: "2023-06-30",
    daysLeft: 45,
  },
]

export function StockAlerts() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Articles en Stock Bas</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Articles nécessitant un réapprovisionnement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Articles en Rupture</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Articles à commander immédiatement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Articles Périssables</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiringItems.length}</div>
            <p className="text-xs text-muted-foreground">Articles avec date d'expiration proche</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Articles en Stock Bas</h3>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.category} - {item.location}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Stock bas</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          {item.quantity} {item.unit} / Min: {item.minStock} {item.unit}
                        </span>
                        <span>{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <div className="pt-2">
                      <Button size="sm" className="w-full">
                        Commander
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Articles en Rupture</h3>
          <div className="space-y-4">
            {outOfStockItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.category} - {item.location}
                        </p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">Rupture</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          {item.quantity} {item.unit} / Min: {item.minStock} {item.unit}
                        </span>
                        <span>{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <div className="pt-2">
                      <Button size="sm" className="w-full" variant="destructive">
                        Commander Urgent
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Articles avec Date d'Expiration Proche</h3>
          <div className="space-y-4">
            {expiringItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.category} - {item.location}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Expire dans {item.daysLeft} jours</Badge>
                    </div>
                    <div className="text-sm">
                      <span>
                        Quantité: {item.quantity} {item.unit}
                      </span>
                      <p>Date d'expiration: {item.expiryDate}</p>
                    </div>
                    <div className="pt-2">
                      <Button size="sm" className="w-full" variant="outline">
                        Utiliser en priorité
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

