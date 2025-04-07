"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const topProducts = [
  {
    id: 1,
    name: "Robe modèle R102",
    category: "Vêtements",
    sales: 120,
    revenue: 1440000,
    growth: 15,
    stock: 45,
  },
  {
    id: 2,
    name: "Chemise modèle C103",
    category: "Vêtements",
    sales: 95,
    revenue: 760000,
    growth: 8,
    stock: 32,
  },
  {
    id: 3,
    name: "Veste modèle V205",
    category: "Vêtements",
    sales: 85,
    revenue: 1530000,
    growth: 12,
    stock: 28,
  },
  {
    id: 4,
    name: "Pantalon modèle P401",
    category: "Vêtements",
    sales: 78,
    revenue: 624000,
    growth: -3,
    stock: 50,
  },
  {
    id: 5,
    name: "Jupe modèle J301",
    category: "Vêtements",
    sales: 65,
    revenue: 455000,
    growth: 5,
    stock: 38,
  },
]

const chartData = topProducts.map((product) => ({
  name: product.name.replace("modèle ", ""),
  ventes: product.sales,
  revenu: product.revenue / 10000, // Scaled for better visualization
}))

export function TopSellingProducts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Ventes par Produit</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "ventes") return [`${value} unités`, "Ventes"]
                    if (name === "revenu") return [`${(value * 10000).toLocaleString()} DZD`, "Revenu"]
                    return [value, name]
                  }}
                />
                <Legend />
                <Bar dataKey="ventes" name="Ventes (unités)" fill="#8884d8" />
                <Bar dataKey="revenu" name="Revenu (DZD)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Détails des Produits</h3>
            <div className="space-y-6">
              {topProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{product.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge
                          className={product.growth >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {product.growth >= 0 ? `+${product.growth}%` : `${product.growth}%`}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{product.sales} vendus</div>
                      <div className="text-sm text-muted-foreground">{product.revenue.toLocaleString()} DZD</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Stock</span>
                      <span>{product.stock} unités</span>
                    </div>
                    <Progress value={(product.stock / 100) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Produit</th>
              <th className="text-left py-3 px-4">Catégorie</th>
              <th className="text-right py-3 px-4">Ventes</th>
              <th className="text-right py-3 px-4">Revenu</th>
              <th className="text-right py-3 px-4">Croissance</th>
              <th className="text-right py-3 px-4">Stock</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{product.name}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4 text-right">{product.sales} unités</td>
                <td className="py-3 px-4 text-right">{product.revenue.toLocaleString()} DZD</td>
                <td className="py-3 px-4 text-right">
                  <span className={product.growth >= 0 ? "text-green-600" : "text-red-600"}>
                    {product.growth >= 0 ? `+${product.growth}%` : `${product.growth}%`}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">{product.stock} unités</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

