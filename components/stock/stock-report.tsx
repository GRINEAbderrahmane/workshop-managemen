"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon, Download, Filter, Printer } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Données pour les graphiques
const stockMovementData = [
  { date: "Jan", entrées: 1200, sorties: 950, ajustements: 50 },
  { date: "Fév", entrées: 1500, sorties: 1100, ajustements: -30 },
  { date: "Mar", entrées: 1300, sorties: 1250, ajustements: 20 },
  { date: "Avr", entrées: 1700, sorties: 1400, ajustements: -15 },
  { date: "Mai", entrées: 1400, sorties: 1350, ajustements: 25 },
  { date: "Juin", entrées: 1600, sorties: 1500, ajustements: -10 },
]

const stockValueData = [
  { date: "Jan", valeur: 4500000 },
  { date: "Fév", valeur: 4750000 },
  { date: "Mar", valeur: 4600000 },
  { date: "Avr", valeur: 4850000 },
  { date: "Mai", valeur: 4700000 },
  { date: "Juin", valeur: 4900000 },
]

const regionPieData = [
  { name: "Algérie", value: 58 },
  { name: "Europe", value: 25 },
  { name: "Asie", value: 17 },
]

const topMovingItems = [
  { id: 1, name: "Tissu coton bleu", category: "Tissus", entrées: 500, sorties: 450, turnover: 4.5 },
  { id: 2, name: "Boutons dorés", category: "Accessoires", entrées: 2000, sorties: 1800, turnover: 3.8 },
  { id: 3, name: "Tissu lin beige", category: "Tissus", entrées: 300, sorties: 280, turnover: 3.5 },
  { id: 4, name: "Fermetures éclair noires", category: "Accessoires", entrées: 800, sorties: 750, turnover: 3.2 },
  { id: 5, name: "Fil noir", category: "Fils", entrées: 100, sorties: 90, turnover: 3.0 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

export function StockReport() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("movement")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Select
            defaultValue="6months"
            onValueChange={(value) => {
              const today = new Date()
              const fromDate = new Date()

              switch (value) {
                case "1month":
                  fromDate.setMonth(today.getMonth() - 1)
                  break
                case "3months":
                  fromDate.setMonth(today.getMonth() - 3)
                  break
                case "6months":
                  fromDate.setMonth(today.getMonth() - 6)
                  break
                case "1year":
                  fromDate.setFullYear(today.getFullYear() - 1)
                  break
              }

              setDateRange({ from: fromDate, to: today })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Dernier mois</SelectItem>
              <SelectItem value="3months">3 derniers mois</SelectItem>
              <SelectItem value="6months">6 derniers mois</SelectItem>
              <SelectItem value="1year">Dernière année</SelectItem>
              <SelectItem value="custom">Personnalisé</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[240px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "P", { locale: fr })} - {format(dateRange.to, "P", { locale: fr })}
                      </>
                    ) : (
                      format(dateRange.from, "P", { locale: fr })
                    )
                  ) : (
                    <span>Sélectionner une période</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range) => range && setDateRange(range as { from: Date; to: Date | undefined })}
                  numberOfMonths={2}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="movement" onValueChange={setReportType} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="movement">Mouvements de Stock</TabsTrigger>
          <TabsTrigger value="value">Valeur du Stock</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="turnover">Rotation</TabsTrigger>
        </TabsList>

        <TabsContent value="movement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mouvements de Stock</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockMovementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} unités`, ""]} />
                  <Legend />
                  <Bar dataKey="entrées" name="Entrées" fill="#8884d8" />
                  <Bar dataKey="sorties" name="Sorties" fill="#82ca9d" />
                  <Bar dataKey="ajustements" name="Ajustements" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Entrées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,700</div>
                <p className="text-xs text-muted-foreground">unités sur la période</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sorties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,550</div>
                <p className="text-xs text-muted-foreground">unités sur la période</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bilan Net</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+1,150</div>
                <p className="text-xs text-muted-foreground">unités sur la période</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Articles les Plus Mouvementés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Article</th>
                      <th className="text-left py-3 px-4">Catégorie</th>
                      <th className="text-right py-3 px-4">Entrées</th>
                      <th className="text-right py-3 px-4">Sorties</th>
                      <th className="text-right py-3 px-4">Bilan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMovingItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4 text-right">{item.entrées}</td>
                        <td className="py-3 px-4 text-right">{item.sorties}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={item.entrées - item.sorties >= 0 ? "text-green-600" : "text-red-600"}>
                            {item.entrées - item.sorties >= 0 ? "+" : ""}
                            {item.entrées - item.sorties}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="value" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la Valeur du Stock</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockValueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} DZD`, "Valeur"]} />
                  <Legend />
                  <Line type="monotone" dataKey="valeur" name="Valeur du stock" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Valeur Actuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,900,000 DZD</div>
                <p className="text-xs text-muted-foreground">au {format(new Date(), "P", { locale: fr })}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Variation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+400,000 DZD</div>
                <p className="text-xs text-muted-foreground">depuis le début de la période</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Croissance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+8.9%</div>
                <p className="text-xs text-muted-foreground">sur la période</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Répartition de la Valeur par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {regionPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Catégorie</th>
                        <th className="text-right py-3 px-4">Valeur (DZD)</th>
                        <th className="text-right py-3 px-4">Pourcentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionPieData.map((item, index) => (
                        <tr key={item.name} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              {item.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">{(item.value * 49000).toLocaleString()} DZD</td>
                          <td className="py-3 px-4 text-right">{item.value}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution par Catégorie</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribution par Emplacement</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Entrepôt A", value: 40 },
                        { name: "Entrepôt B", value: 30 },
                        { name: "Entrepôt C", value: 20 },
                        { name: "Entrepôt D", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[0, 1, 2, 3].map((index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Répartition Détaillée</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Catégorie</th>
                      <th className="text-left py-3 px-4">Emplacement</th>
                      <th className="text-right py-3 px-4">Quantité</th>
                      <th className="text-right py-3 px-4">Valeur (DZD)</th>
                      <th className="text-right py-3 px-4">% du Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Tissus</td>
                      <td className="py-3 px-4">Entrepôt A</td>
                      <td className="py-3 px-4 text-right">800 mètres</td>
                      <td className="py-3 px-4 text-right">2,205,000</td>
                      <td className="py-3 px-4 text-right">45%</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Accessoires</td>
                      <td className="py-3 px-4">Entrepôt B</td>
                      <td className="py-3 px-4 text-right">2,800 pièces</td>
                      <td className="py-3 px-4 text-right">1,225,000</td>
                      <td className="py-3 px-4 text-right">25%</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Fils</td>
                      <td className="py-3 px-4">Entrepôt C</td>
                      <td className="py-3 px-4 text-right">95 bobines</td>
                      <td className="py-3 px-4 text-right">735,000</td>
                      <td className="py-3 px-4 text-right">15%</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Emballages</td>
                      <td className="py-3 px-4">Entrepôt D</td>
                      <td className="py-3 px-4 text-right">1,005 pièces</td>
                      <td className="py-3 px-4 text-right">490,000</td>
                      <td className="py-3 px-4 text-right">10%</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Équipement</td>
                      <td className="py-3 px-4">Entrepôt B</td>
                      <td className="py-3 px-4 text-right">Divers</td>
                      <td className="py-3 px-4 text-right">245,000</td>
                      <td className="py-3 px-4 text-right">5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taux de Rotation par Catégorie</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Tissus", turnover: 2.8 },
                    { name: "Accessoires", turnover: 3.5 },
                    { name: "Fils", turnover: 3.2 },
                    { name: "Emballages", turnover: 2.0 },
                    { name: "Équipement", turnover: 0.8 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} rotations/an`, "Taux de rotation"]} />
                  <Legend />
                  <Bar dataKey="turnover" name="Taux de rotation" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Articles à Rotation Rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Article</th>
                      <th className="text-left py-3 px-4">Catégorie</th>
                      <th className="text-right py-3 px-4">Entrées</th>
                      <th className="text-right py-3 px-4">Sorties</th>
                      <th className="text-right py-3 px-4">Taux de Rotation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMovingItems
                      .sort((a, b) => b.turnover - a.turnover)
                      .map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4 text-right">{item.entrées}</td>
                          <td className="py-3 px-4 text-right">{item.sorties}</td>
                          <td className="py-3 px-4 text-right">{item.turnover.toFixed(1)} rotations/an</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Articles à Rotation Lente</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Les articles suivants ont un taux de rotation inférieur à 1.0 et pourraient nécessiter une attention
                    particulière :
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Machines à coudre (0.3 rotations/an) - Considérer une réduction du stock</li>
                    <li>Tissus spéciaux (0.8 rotations/an) - Évaluer la demande future</li>
                    <li>Équipements de maintenance (0.5 rotations/an) - Optimiser les niveaux de stock</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Optimisation des Stocks</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Recommandations pour améliorer la gestion des stocks :
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Augmenter les niveaux de stock pour les articles à rotation rapide (&gt;3.0)</li>
                    <li>Mettre en place un système de réapprovisionnement automatique pour les articles critiques</li>
                    <li>Revoir les prévisions de demande pour les articles saisonniers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

