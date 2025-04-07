"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon, Download, Filter, Printer } from "lucide-react"
import {
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
  ComposedChart,
  Area,
} from "recharts"

// Données pour les graphiques
const monthlyProductionData = [
  { month: "Jan", "Robes R102": 120, "Chemises C103": 85, "Vestes V205": 65, "Pantalons P401": 45 },
  { month: "Fév", "Robes R102": 110, "Chemises C103": 95, "Vestes V205": 70, "Pantalons P401": 50 },
  { month: "Mar", "Robes R102": 130, "Chemises C103": 100, "Vestes V205": 75, "Pantalons P401": 55 },
  { month: "Avr", "Robes R102": 140, "Chemises C103": 110, "Vestes V205": 80, "Pantalons P401": 60 },
  { month: "Mai", "Robes R102": 150, "Chemises C103": 120, "Vestes V205": 85, "Pantalons P401": 65 },
  { month: "Juin", "Robes R102": 160, "Chemises C103": 130, "Vestes V205": 90, "Pantalons P401": 70 },
]

const efficiencyTrendData = [
  { month: "Jan", efficacité: 82 },
  { month: "Fév", efficacité: 84 },
  { month: "Mar", efficacité: 83 },
  { month: "Avr", efficacité: 85 },
  { month: "Mai", efficacité: 87 },
  { month: "Juin", efficacité: 89 },
]

const defectTypeData = [
  { name: "Couture", value: 45 },
  { name: "Tissu", value: 25 },
  { name: "Couleur", value: 15 },
  { name: "Boutons", value: 10 },
  { name: "Autres", value: 5 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

export function ProductionAnalytics() {
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

      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Efficacité Globale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3%</div>
              <div className="text-xs text-muted-foreground">+2.5% par rapport au mois dernier</div>
              <Progress value={87.3} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de Qualité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.8%</div>
              <div className="text-xs text-muted-foreground">+0.3% par rapport au mois dernier</div>
              <Progress value={96.8} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Respect des Délais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.1%</div>
              <div className="text-xs text-muted-foreground">-1.2% par rapport au mois dernier</div>
              <Progress value={92.1} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Coût par Unité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1850 DZD</div>
              <div className="text-xs text-muted-foreground">-5.2% par rapport au mois dernier</div>
              <Progress value={75} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Production Mensuelle</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyProductionData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Robes R102" fill="#8884d8" />
                  <Bar dataKey="Chemises C103" fill="#82ca9d" />
                  <Bar dataKey="Vestes V205" fill="#ffc658" />
                  <Bar dataKey="Pantalons P401" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tendance d'Efficacité</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={efficiencyTrendData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[75, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Efficacité"]} />
                  <Legend />
                  <Area type="monotone" dataKey="efficacité" fill="#8884d8" stroke="#8884d8" />
                  <Line type="monotone" dataKey="efficacité" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Analyse détaillée */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance par Équipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Équipe A</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Équipe B</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Équipe C</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Équipe D</span>
                    <span className="text-sm font-medium">84%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Répartition des Défauts</CardTitle>
            </CardHeader>
            <CardContent className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={defectTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {defectTypeData.map((entry, index) => (
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

        {/* Recommandations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recommandations d'Amélioration</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full h-2 w-2 bg-green-500 mt-2"></div>
                <span className="text-sm">
                  Augmenter la formation de l'Équipe D pour améliorer leur efficacité de 5%
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full h-2 w-2 bg-green-500 mt-2"></div>
                <span className="text-sm">
                  Réduire les défauts de couture qui représentent 45% des problèmes de qualité
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full h-2 w-2 bg-green-500 mt-2"></div>
                <span className="text-sm">
                  Optimiser le processus de coupe pour réduire le temps de production de 8%
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

