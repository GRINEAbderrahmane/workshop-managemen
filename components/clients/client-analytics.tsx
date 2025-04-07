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
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"

// Données pour les graphiques
const salesData = [
  { month: "Jan", ventes: 1200000 },
  { month: "Fév", ventes: 1500000 },
  { month: "Mar", ventes: 1300000 },
  { month: "Avr", ventes: 1700000 },
  { month: "Mai", ventes: 1400000 },
  { month: "Juin", ventes: 1600000 },
]

const clientTypeData = [
  { name: "Boutique", value: 45 },
  { name: "Grossiste", value: 30 },
  { name: "Particulier", value: 15 },
  { name: "Entreprise", value: 10 },
]

const regionData = [
  { name: "Alger", value: 40 },
  { name: "Oran", value: 25 },
  { name: "Constantine", value: 15 },
  { name: "Annaba", value: 10 },
  { name: "Autres", value: 10 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

const topClients = [
  {
    id: 1,
    name: "Boutique Élégance",
    type: "Boutique",
    region: "Alger",
    purchases: 2500000,
    orders: 15,
    lastOrder: "2023-06-10",
  },
  {
    id: 2,
    name: "Mode Express",
    type: "Grossiste",
    region: "Oran",
    purchases: 1800000,
    orders: 8,
    lastOrder: "2023-06-05",
  },
  {
    id: 3,
    name: "Tendance Algérie",
    type: "Boutique",
    region: "Alger",
    purchases: 1500000,
    orders: 12,
    lastOrder: "2023-06-15",
  },
  {
    id: 4,
    name: "Fashion House",
    type: "Boutique",
    region: "Constantine",
    purchases: 1200000,
    orders: 10,
    lastOrder: "2023-05-28",
  },
  {
    id: 5,
    name: "Textile Pro",
    type: "Grossiste",
    region: "Annaba",
    purchases: 950000,
    orders: 6,
    lastOrder: "2023-06-02",
  },
]

const customerLifetimeValue = [
  { segment: "Premium", clv: 5000000, clients: 10, retention: 95 },
  { segment: "Standard", clv: 2000000, clients: 25, retention: 80 },
  { segment: "Occasionnel", clv: 500000, clients: 65, retention: 60 },
]

export function ClientAnalytics() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    to: new Date(),
  })

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
                  onSelect={(range) => range && setDateRange(range)}
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
          <TabsTrigger value="lifetime">Valeur Client</TabsTrigger>
          <TabsTrigger value="retention">Fidélisation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">clients actifs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,700,000 DZD</div>
                <p className="text-xs text-muted-foreground">sur la période</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145,000 DZD</div>
                <p className="text-xs text-muted-foreground">par commande</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Évolution des Ventes</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} DZD`, "Ventes"]} />
                  <Legend />
                  <Line type="monotone" dataKey="ventes" name="Ventes" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Type de Client</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clientTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {clientTypeData.map((entry, index) => (
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
                <CardTitle>Répartition Géographique</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionData.map((entry, index) => (
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
              <CardTitle>Top Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Région</th>
                      <th className="text-right py-3 px-4">Achats Totaux</th>
                      <th className="text-right py-3 px-4">Commandes</th>
                      <th className="text-right py-3 px-4">Dernière Commande</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClients.map((client) => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{client.name}</td>
                        <td className="py-3 px-4">{client.type}</td>
                        <td className="py-3 px-4">{client.region}</td>
                        <td className="py-3 px-4 text-right">{client.purchases.toLocaleString()} DZD</td>
                        <td className="py-3 px-4 text-right">{client.orders}</td>
                        <td className="py-3 px-4 text-right">{client.lastOrder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Segmentation par Type</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clientTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {clientTypeData.map((entry, index) => (
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
                <CardTitle>Segmentation par Volume d'Achat</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { segment: "Premium (>2M DZD)", clients: 15, valeur: 45 },
                      { segment: "Standard (500K-2M DZD)", clients: 35, valeur: 40 },
                      { segment: "Occasionnel (<500K DZD)", clients: 75, valeur: 15 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="clients" name="Nombre de clients" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="valeur" name="% du CA total" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Matrice RFM (Récence, Fréquence, Montant)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Segment</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-right py-3 px-4">Clients</th>
                      <th className="text-right py-3 px-4">% du CA</th>
                      <th className="text-right py-3 px-4">Stratégie</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <Badge className="bg-green-100 text-green-800">Champions</Badge>
                      </td>
                      <td className="py-3 px-4">Acheteurs récents, fréquents et à forte valeur</td>
                      <td className="py-3 px-4 text-right">12 (10%)</td>
                      <td className="py-3 px-4 text-right">35%</td>
                      <td className="py-3 px-4 text-right">Fidélisation, programmes VIP</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <Badge className="bg-blue-100 text-blue-800">Loyaux</Badge>
                      </td>
                      <td className="py-3 px-4">Acheteurs fréquents mais pas récents</td>
                      <td className="py-3 px-4 text-right">18 (14%)</td>
                      <td className="py-3 px-4 text-right">25%</td>
                      <td className="py-3 px-4 text-right">Réactivation, offres spéciales</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <Badge className="bg-yellow-100 text-yellow-800">Potentiels</Badge>
                      </td>
                      <td className="py-3 px-4">Acheteurs récents à valeur moyenne</td>
                      <td className="py-3 px-4 text-right">25 (20%)</td>
                      <td className="py-3 px-4 text-right">20%</td>
                      <td className="py-3 px-4 text-right">Développement, cross-selling</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <Badge className="bg-orange-100 text-orange-800">À risque</Badge>
                      </td>
                      <td className="py-3 px-4">Anciens bons clients inactifs récemment</td>
                      <td className="py-3 px-4 text-right">15 (12%)</td>
                      <td className="py-3 px-4 text-right">15%</td>
                      <td className="py-3 px-4 text-right">Programmes de réactivation</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">
                        <Badge className="bg-red-100 text-red-800">Perdus</Badge>
                      </td>
                      <td className="py-3 px-4">Clients inactifs depuis longtemps</td>
                      <td className="py-3 px-4 text-right">55 (44%)</td>
                      <td className="py-3 px-4 text-right">5%</td>
                      <td className="py-3 px-4 text-right">Campagnes de reconquête</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommandations par Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Segment Premium</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Actions recommandées pour les clients à haute valeur :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Programme de fidélité exclusif avec avantages spéciaux</li>
                      <li>Accès prioritaire aux nouvelles collections</li>
                      <li>Service client dédié et personnalisé</li>
                      <li>Invitations à des événements exclusifs</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Segment Standard</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Stratégies pour développer les clients réguliers :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Programmes de cross-selling et up-selling</li>
                      <li>Offres promotionnelles ciblées</li>
                      <li>Communications régulières sur les nouveautés</li>
                      <li>Incitations à augmenter le volume d'achat</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Segment Occasionnel</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Actions pour convertir les clients occasionnels :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Offres de bienvenue pour encourager un second achat</li>
                      <li>Programmes de parrainage</li>
                      <li>Communications ciblées basées sur les achats précédents</li>
                      <li>Enquêtes de satisfaction pour identifier les freins</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Clients Inactifs</h3>
                    <p className="text-sm text-muted-foreground mb-2">Stratégies de réactivation :</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Campagnes de réactivation avec offres spéciales</li>
                      <li>Enquêtes pour comprendre les raisons de l'inactivité</li>
                      <li>Nouvelles propositions de valeur</li>
                      <li>Programmes de reconquête ciblés</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifetime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valeur Client à Vie (CLV) par Segment</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerLifetimeValue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "clv") return [`${value.toLocaleString()} DZD`, "Valeur à vie"]
                      if (name === "clients") return [`${value}`, "Nombre de clients"]
                      if (name === "retention") return [`${value}%`, "Taux de rétention"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="clv" name="Valeur à vie (DZD)" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="retention" name="Taux de rétention (%)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">CLV Moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,850,000 DZD</div>
                <p className="text-xs text-muted-foreground">par client</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Coût d'Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120,000 DZD</div>
                <p className="text-xs text-muted-foreground">par nouveau client</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ratio CLV/CAC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">15.4</div>
                <p className="text-xs text-muted-foreground">valeur générée par DZD investi</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Facteurs d'Influence de la CLV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Facteurs Positifs</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Fidélité</span>
                        <span className="text-sm font-medium">Très élevé</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Fréquence d'achat</span>
                        <span className="text-sm font-medium">Élevé</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Valeur du panier</span>
                        <span className="text-sm font-medium">Moyen</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Facteurs Négatifs</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Taux d'attrition</span>
                        <span className="text-sm font-medium">Moyen</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Coût de service</span>
                        <span className="text-sm font-medium">Faible</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Retours produits</span>
                        <span className="text-sm font-medium">Très faible</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stratégies d'Amélioration de la CLV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Augmentation de la Rétention</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Une augmentation de 5% du taux de rétention peut accroître la CLV de 25% à 95% selon le secteur.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Mettre en place un programme de fidélité avec des avantages progressifs</li>
                    <li>Améliorer le service client et le suivi post-achat</li>
                    <li>Créer des expériences d'achat personnalisées</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Augmentation du Panier Moyen</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Stratégies pour augmenter la valeur de chaque transaction.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Mettre en place des techniques de cross-selling et up-selling</li>
                    <li>Créer des offres groupées à valeur ajoutée</li>
                    <li>Proposer des services complémentaires</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Augmentation de la Fréquence d'Achat</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tactiques pour encourager des achats plus fréquents.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Mettre en place des programmes d'abonnement ou de réapprovisionnement</li>
                    <li>Créer des offres saisonnières et des collections limitées</li>
                    <li>Utiliser le marketing par email pour des rappels et offres personnalisées</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux de Rétention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">clients actifs sur 12 mois</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux d'Attrition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28%</div>
                <p className="text-xs text-muted-foreground">clients perdus sur 12 mois</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Durée de Vie Moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.6 ans</div>
                <p className="text-xs text-muted-foreground">par client</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Évolution du Taux de Rétention</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", retention: 68 },
                    { month: "Fév", retention: 70 },
                    { month: "Mar", retention: 69 },
                    { month: "Avr", retention: 72 },
                    { month: "Mai", retention: 74 },
                    { month: "Juin", retention: 72 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 80]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Taux de rétention"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    name="Taux de rétention"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analyse des Causes d'Attrition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Concurrence", value: 35 },
                          { name: "Qualité produit", value: 25 },
                          { name: "Prix", value: 20 },
                          { name: "Service client", value: 15 },
                          { name: "Autres", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {clientTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Principales Causes d'Attrition</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>
                        <span className="font-medium">Concurrence (35%)</span> - Offres plus attractives des concurrents
                      </li>
                      <li>
                        <span className="font-medium">Qualité produit (25%)</span> - Insatisfaction concernant la
                        durabilité ou les finitions
                      </li>
                      <li>
                        <span className="font-medium">Prix (20%)</span> - Perception de prix trop élevés par rapport à
                        la valeur
                      </li>
                      <li>
                        <span className="font-medium">Service client (15%)</span> - Problèmes non résolus ou délais trop
                        longs
                      </li>
                      <li>
                        <span className="font-medium">Autres (5%)</span> - Déménagement, changement de besoins, etc.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Points d'Intervention</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Amélioration de la proposition de valeur face à la concurrence</li>
                      <li>Renforcement des contrôles qualité et du processus de feedback</li>
                      <li>Révision de la stratégie de prix et de la communication sur la valeur</li>
                      <li>Formation du personnel et optimisation des processus de service client</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan d'Action pour la Fidélisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Programme de Fidélité</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Mise en place d'un programme de fidélité à plusieurs niveaux avec des avantages progressifs.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Système de points convertibles en remises ou produits</li>
                    <li>Avantages exclusifs pour les clients fidèles (livraison gratuite, retours facilités)</li>
                    <li>Accès prioritaire aux nouvelles collections et ventes privées</li>
                    <li>Cadeaux d'anniversaire et offres personnalisées</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Amélioration de l'Expérience Client</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Initiatives pour créer une expérience client exceptionnelle à chaque point de contact.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Formation approfondie du personnel sur le service client</li>
                    <li>Mise en place d'un système de suivi post-achat</li>
                    <li>Personnalisation des interactions basée sur l'historique client</li>
                    <li>Simplification des processus de commande et de retour</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Communication Proactive</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Stratégie de communication pour maintenir l'engagement des clients.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Emails personnalisés basés sur les préférences et l'historique d'achat</li>
                    <li>Programme de réactivation pour les clients à risque d'attrition</li>
                    <li>Partage de contenu à valeur ajoutée (conseils, tendances)</li>
                    <li>Enquêtes régulières de satisfaction avec suivi des retours</li>
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

