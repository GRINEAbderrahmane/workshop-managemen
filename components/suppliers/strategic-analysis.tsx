"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, TrendingDown, Map } from "lucide-react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

// Mettre à jour les données pour l'Algérie
const supplierDependencyData = [
  {
    id: "1",
    name: "Textile Express",
    category: "Tissus",
    purchaseVolume: 2500000,
    percentageOfTotal: 35,
    alternativeSuppliers: 3,
    riskLevel: "Élevé",
  },
  {
    id: "2",
    name: "Boutons & Accessoires",
    category: "Accessoires",
    purchaseVolume: 1200000,
    percentageOfTotal: 17,
    alternativeSuppliers: 5,
    riskLevel: "Moyen",
  },
  {
    id: "3",
    name: "Emballages Pro",
    category: "Emballages",
    purchaseVolume: 800000,
    percentageOfTotal: 11,
    alternativeSuppliers: 4,
    riskLevel: "Faible",
  },
  {
    id: "4",
    name: "Fils & Coutures",
    category: "Fils",
    purchaseVolume: 950000,
    percentageOfTotal: 13,
    alternativeSuppliers: 2,
    riskLevel: "Moyen",
  },
  {
    id: "5",
    name: "Machines Textiles",
    category: "Équipement",
    purchaseVolume: 1750000,
    percentageOfTotal: 24,
    alternativeSuppliers: 1,
    riskLevel: "Critique",
  },
]

const geographicRiskData = [
  {
    region: "Algérie",
    suppliers: 12,
    purchaseVolume: 4200000,
    percentageOfTotal: 58,
    riskLevel: "Faible",
    leadTime: "2-5 jours",
  },
  {
    region: "Europe",
    suppliers: 8,
    purchaseVolume: 1800000,
    percentageOfTotal: 25,
    riskLevel: "Moyen",
    leadTime: "7-14 jours",
  },
  {
    region: "Asie",
    suppliers: 5,
    purchaseVolume: 1200000,
    percentageOfTotal: 17,
    riskLevel: "Élevé",
    leadTime: "30-45 jours",
  },
]

const diversificationSuggestions = [
  {
    category: "Tissus",
    currentSuppliers: 3,
    recommendedSuppliers: 5,
    potentialSuppliers: ["Textile Algérie", "Soie & Coton", "Global Fabrics"],
    expectedImpact: "Réduction des coûts de 8%, diminution du risque d'approvisionnement",
  },
  {
    category: "Équipement",
    currentSuppliers: 1,
    recommendedSuppliers: 3,
    potentialSuppliers: ["Tech Machines", "Équipements Modernes"],
    expectedImpact: "Réduction de la dépendance, amélioration des conditions de maintenance",
  },
  {
    category: "Fils",
    currentSuppliers: 2,
    recommendedSuppliers: 4,
    potentialSuppliers: ["Fils Premium", "Couture Express", "Qualité Textile"],
    expectedImpact: "Meilleure qualité, réduction des délais de livraison",
  },
]

// Données pour la carte de répartition des achats
const mapData = [
  { name: "Algérie", value: 58, coordinates: [3, 28], color: "#82ca9d" },
  { name: "Europe", value: 25, coordinates: [15, 50], color: "#ffc658" },
  { name: "Asie", value: 17, coordinates: [100, 35], color: "#ff8042" },
]

// Données pour le graphique de diversification
const diversificationData = [
  { name: "Tissus", current: 3, recommended: 5, gap: 2 },
  { name: "Équipement", current: 1, recommended: 3, gap: 2 },
  { name: "Fils", current: 2, recommended: 4, gap: 2 },
  { name: "Accessoires", current: 4, recommended: 4, gap: 0 },
  { name: "Emballages", current: 3, recommended: 3, gap: 0 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Faible":
      return "bg-green-100 text-green-800"
    case "Moyen":
      return "bg-yellow-100 text-yellow-800"
    case "Élevé":
      return "bg-orange-100 text-orange-800"
    case "Critique":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function StrategicAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous")

  const filteredDependencyData =
    selectedCategory === "Tous"
      ? supplierDependencyData
      : supplierDependencyData.filter((item) => item.category === selectedCategory)

  const categories = ["Tous", ...new Set(supplierDependencyData.map((item) => item.category))]

  // Données pour le graphique circulaire de répartition des achats par région
  const regionPieData = geographicRiskData.map((item) => ({
    name: item.region,
    value: item.percentageOfTotal,
  }))

  return (
    <div className="space-y-6">
      <Tabs defaultValue="dependency">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dependency">Dépendance Fournisseur</TabsTrigger>
          <TabsTrigger value="geographic">Risque Géographique</TabsTrigger>
          <TabsTrigger value="diversification">Diversification</TabsTrigger>
        </TabsList>

        <TabsContent value="dependency" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Analyse de Dépendance Fournisseur</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Dépendance Critique</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Fournisseurs avec risque élevé ou critique</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Concentration d'Achats</CardTitle>
                <TrendingDown className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">59%</div>
                <p className="text-xs text-muted-foreground">Des achats concentrés chez 2 fournisseurs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Alternatives</CardTitle>
                <Map className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.0</div>
                <p className="text-xs text-muted-foreground">Nombre moyen d'alternatives par fournisseur</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analyse de Dépendance par Fournisseur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={filteredDependencyData}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      label={{ value: "Volume d'achat (DZD)", angle: -90, position: "insideLeft" }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Alternatives", angle: 90, position: "insideRight" }}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "purchaseVolume") return [`${value.toLocaleString()} DZD`, "Volume d'achat"]
                        if (name === "alternativeSuppliers") return [value, "Alternatives"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="purchaseVolume" barSize={60} fill="#8884d8" name="Volume d'achat" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="alternativeSuppliers"
                      stroke="#ff7300"
                      name="Alternatives"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Volume d'Achat (MAD)</TableHead>
                    <TableHead>% du Total</TableHead>
                    <TableHead>Alternatives</TableHead>
                    <TableHead>Niveau de Risque</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDependencyData.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.category}</TableCell>
                      <TableCell>{supplier.purchaseVolume.toLocaleString()} DZD</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={supplier.percentageOfTotal} className="h-2 w-16" />
                          <span>{supplier.percentageOfTotal}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{supplier.alternativeSuppliers}</TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(supplier.riskLevel)}>{supplier.riskLevel}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Analyse du Risque Géographique</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Répartition des Achats par Zone Géographique</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse par Région</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Région</TableHead>
                      <TableHead>Fournisseurs</TableHead>
                      <TableHead>Volume d'Achat</TableHead>
                      <TableHead>% du Total</TableHead>
                      <TableHead>Niveau de Risque</TableHead>
                      <TableHead>Délai Moyen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {geographicRiskData.map((region) => (
                      <TableRow key={region.region}>
                        <TableCell className="font-medium">{region.region}</TableCell>
                        <TableCell>{region.suppliers}</TableCell>
                        <TableCell>{region.purchaseVolume.toLocaleString()} DZD</TableCell>
                        <TableCell>{region.percentageOfTotal}%</TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(region.riskLevel)}>{region.riskLevel}</Badge>
                        </TableCell>
                        <TableCell>{region.leadTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facteurs de Risque Géographique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Stabilité Politique</span>
                      <span className="text-sm font-medium">Moyen</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Risque de Transport</span>
                      <span className="text-sm font-medium">Élevé</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fluctuations de Devises</span>
                      <span className="text-sm font-medium">Moyen</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Risques Climatiques</span>
                      <span className="text-sm font-medium">Faible</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Barrières Commerciales</span>
                      <span className="text-sm font-medium">Moyen</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diversification" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Suggestions de Diversification</h3>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analyse des Écarts de Diversification</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={diversificationData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" stackId="a" fill="#8884d8" name="Fournisseurs actuels" />
                  <Bar dataKey="gap" stackId="a" fill="#82ca9d" name="Écart à combler" />
                  <Line type="monotone" dataKey="recommended" stroke="#ff7300" name="Objectif recommandé" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {diversificationSuggestions.map((suggestion, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">{suggestion.category}</h3>
                      <Badge
                        className={
                          suggestion.currentSuppliers < suggestion.recommendedSuppliers
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {suggestion.currentSuppliers} / {suggestion.recommendedSuppliers} fournisseurs
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Fournisseurs potentiels :</div>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.potentialSuppliers.map((supplier, i) => (
                          <Badge key={i} variant="outline" className="bg-blue-50">
                            {supplier}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Impact attendu :</div>
                      <p className="text-sm mt-1">{suggestion.expectedImpact}</p>
                    </div>
                    <div className="pt-2">
                      <Progress
                        value={(suggestion.currentSuppliers / suggestion.recommendedSuppliers) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Situation actuelle</span>
                        <span>Objectif</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

