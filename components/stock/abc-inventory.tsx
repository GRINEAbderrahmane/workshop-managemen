"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { PieChart, BarChart, Search, Filter, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, Pie, Cell, Legend, Tooltip, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

// Mettre à jour les données pour l'Algérie
const inventoryData = [
  {
    id: "1",
    name: "Tissu coton bleu",
    category: "Tissus",
    value: 1250000,
    consumption: "Élevée",
    abcClass: "A",
    stockValue: 500000,
    turnoverRate: 2.5,
    countFrequency: "Mensuelle",
  },
  {
    id: "2",
    name: "Tissu lin beige",
    category: "Tissus",
    value: 950000,
    consumption: "Élevée",
    abcClass: "A",
    stockValue: 380000,
    turnoverRate: 2.1,
    countFrequency: "Mensuelle",
  },
  {
    id: "3",
    name: "Boutons dorés",
    category: "Accessoires",
    value: 450000,
    consumption: "Moyenne",
    abcClass: "B",
    stockValue: 150000,
    turnoverRate: 3.0,
    countFrequency: "Trimestrielle",
  },
  {
    id: "4",
    name: "Fermetures éclair noires",
    category: "Accessoires",
    value: 350000,
    consumption: "Moyenne",
    abcClass: "B",
    stockValue: 120000,
    turnoverRate: 2.8,
    countFrequency: "Trimestrielle",
  },
  {
    id: "5",
    name: "Fil noir",
    category: "Fils",
    value: 180000,
    consumption: "Élevée",
    abcClass: "B",
    stockValue: 60000,
    turnoverRate: 3.2,
    countFrequency: "Trimestrielle",
  },
  {
    id: "6",
    name: "Fil blanc",
    category: "Fils",
    value: 165000,
    consumption: "Élevée",
    abcClass: "B",
    stockValue: 55000,
    turnoverRate: 3.0,
    countFrequency: "Trimestrielle",
  },
  {
    id: "7",
    name: "Boîtes d'emballage",
    category: "Emballages",
    value: 120000,
    consumption: "Basse",
    abcClass: "C",
    stockValue: 60000,
    turnoverRate: 2.0,
    countFrequency: "Semestrielle",
  },
  {
    id: "8",
    name: "Papier de soie",
    category: "Emballages",
    value: 80000,
    consumption: "Basse",
    abcClass: "C",
    stockValue: 40000,
    turnoverRate: 1.8,
    countFrequency: "Semestrielle",
  },
  {
    id: "9",
    name: "Étiquettes personnalisées",
    category: "Accessoires",
    value: 75000,
    consumption: "Moyenne",
    abcClass: "C",
    stockValue: 30000,
    turnoverRate: 2.5,
    countFrequency: "Semestrielle",
  },
  {
    id: "10",
    name: "Aiguilles machines",
    category: "Équipement",
    value: 50000,
    consumption: "Basse",
    abcClass: "C",
    stockValue: 25000,
    turnoverRate: 2.0,
    countFrequency: "Semestrielle",
  },
]

// Données pour les graphiques
const abcDistribution = [
  { name: "Classe A", value: 2200000, percentage: 60, items: 2 },
  { name: "Classe B", value: 1145000, percentage: 31, items: 4 },
  { name: "Classe C", value: 325000, percentage: 9, items: 4 },
]

// Données pour le graphique de distribution ABC par valeur
const abcValueData = [
  { name: "Classe A", value: 60 },
  { name: "Classe B", value: 31 },
  { name: "Classe C", value: 9 },
]

// Données pour le graphique de distribution ABC par nombre d'articles
const abcItemsData = [
  { name: "Classe A", value: 20 },
  { name: "Classe B", value: 40 },
  { name: "Classe C", value: 40 },
]

// Données pour le graphique de taux de rotation par catégorie
const turnoverByCategoryData = [
  { name: "Tissus", turnover: 2.3 },
  { name: "Accessoires", turnover: 2.8 },
  { name: "Fils", turnover: 3.1 },
  { name: "Emballages", turnover: 1.9 },
  { name: "Équipement", turnover: 0.8 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

const getClassColor = (abcClass: string) => {
  switch (abcClass) {
    case "A":
      return "bg-red-100 text-red-800"
    case "B":
      return "bg-yellow-100 text-yellow-800"
    case "C":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getFrequencyColor = (frequency: string) => {
  switch (frequency) {
    case "Mensuelle":
      return "bg-purple-100 text-purple-800"
    case "Trimestrielle":
      return "bg-blue-100 text-blue-800"
    case "Semestrielle":
      return "bg-teal-100 text-teal-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ABCInventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState<string>("Tous")
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous")

  const filteredInventory = inventoryData.filter(
    (item) =>
      (selectedClass === "Tous" || item.abcClass === selectedClass) &&
      (selectedCategory === "Tous" || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const categories = ["Tous", ...new Set(inventoryData.map((item) => item.category))]
  const classes = ["Tous", "A", "B", "C"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Inventaire Tournant (ABC)</h2>
          <p className="text-sm text-muted-foreground">
            Gestion optimisée de l'inventaire basée sur la classification ABC
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="inventory">Inventaire ABC</TabsTrigger>
          <TabsTrigger value="planning">Planification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Valeur Totale de Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 670 000 DZD</div>
                <p className="text-xs text-muted-foreground">Répartie sur 10 catégories d'articles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux de Rotation Moyen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4</div>
                <p className="text-xs text-muted-foreground">Rotations par an</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Précision d'Inventaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">+1.2% depuis le dernier trimestre</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Distribution ABC par Valeur</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={abcValueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {abcValueData.map((entry, index) => (
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
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Distribution ABC par Nombre d'Articles</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={abcItemsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="value" name="Pourcentage d'articles" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Résumé de la Classification ABC</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Classe</TableHead>
                    <TableHead>Valeur (MAD)</TableHead>
                    <TableHead>% de la Valeur Totale</TableHead>
                    <TableHead>Nombre d'Articles</TableHead>
                    <TableHead>% des Articles</TableHead>
                    <TableHead>Fréquence d'Inventaire</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {abcDistribution.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell>
                        <Badge className={getClassColor(item.name.split(" ")[1])}>{item.name}</Badge>
                      </TableCell>
                      <TableCell>{item.value.toLocaleString()} DZD</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={item.percentage} className="h-2 w-16" />
                          <span>{item.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.items}</TableCell>
                      <TableCell>{Math.round((item.items / 10) * 100)}%</TableCell>
                      <TableCell>
                        <Badge
                          className={getFrequencyColor(
                            item.name === "Classe A"
                              ? "Mensuelle"
                              : item.name === "Classe B"
                                ? "Trimestrielle"
                                : "Semestrielle",
                          )}
                        >
                          {item.name === "Classe A"
                            ? "Mensuelle"
                            : item.name === "Classe B"
                              ? "Trimestrielle"
                              : "Semestrielle"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-1 max-w-sm items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Classe" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls === "Tous" ? "Toutes les classes" : `Classe ${cls}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
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
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Valeur (MAD)</TableHead>
                    <TableHead>Consommation</TableHead>
                    <TableHead>Classe ABC</TableHead>
                    <TableHead>Taux de Rotation</TableHead>
                    <TableHead>Fréquence d'Inventaire</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.value.toLocaleString()} DZD</TableCell>
                      <TableCell>{item.consumption}</TableCell>
                      <TableCell>
                        <Badge className={getClassColor(item.abcClass)}>Classe {item.abcClass}</Badge>
                      </TableCell>
                      <TableCell>{item.turnoverRate.toFixed(1)}</TableCell>
                      <TableCell>
                        <Badge className={getFrequencyColor(item.countFrequency)}>{item.countFrequency}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taux de Rotation par Catégorie</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={turnoverByCategoryData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
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
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier d'Inventaire Tournant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Inventaire Mensuel (Classe A)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Article</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Valeur (MAD)</TableHead>
                        <TableHead>Date Prévue</TableHead>
                        <TableHead>Responsable</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Tissu coton bleu</TableCell>
                        <TableCell>Tissus</TableCell>
                        <TableCell>125 000 MAD</TableCell>
                        <TableCell>15/06/2023</TableCell>
                        <TableCell>Ahmed M.</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Planifié</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tissu lin beige</TableCell>
                        <TableCell>Tissus</TableCell>
                        <TableCell>95 000 MAD</TableCell>
                        <TableCell>15/06/2023</TableCell>
                        <TableCell>Ahmed M.</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Planifié</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Inventaire Trimestriel (Classe B)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Article</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Valeur (MAD)</TableHead>
                        <TableHead>Date Prévue</TableHead>
                        <TableHead>Responsable</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Boutons dorés</TableCell>
                        <TableCell>Accessoires</TableCell>
                        <TableCell>45 000 MAD</TableCell>
                        <TableCell>30/06/2023</TableCell>
                        <TableCell>Fatima L.</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Planifié</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fermetures éclair noires</TableCell>
                        <TableCell>Accessoires</TableCell>
                        <TableCell>35 000 MAD</TableCell>
                        <TableCell>30/06/2023</TableCell>
                        <TableCell>Fatima L.</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Planifié</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fil noir</TableCell>
                        <TableCell>Fils</TableCell>
                        <TableCell>18 000 MAD</TableCell>
                        <TableCell>01/07/2023</TableCell>
                        <TableCell>Karim B.</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Planifié</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fil blanc</TableCell>
                        <TableCell>Fils</TableCell>
                        <TableCell>16 500 MAD</TableCell>
                        <TableCell>01/07/2023</TableCell>
                        <TableCell>Karim B.</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Planifié</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Inventaire Semestriel (Classe C)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Article</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Valeur (MAD)</TableHead>
                        <TableHead>Date Prévue</TableHead>
                        <TableHead>Responsable</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Boîtes d'emballage</TableCell>
                        <TableCell>Emballages</TableCell>
                        <TableCell>12 000 MAD</TableCell>
                        <TableCell>15/09/2023</TableCell>
                        <TableCell>Samira H.</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">À venir</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Papier de soie</TableCell>
                        <TableCell>Emballages</TableCell>
                        <TableCell>8 000 MAD</TableCell>
                        <TableCell>15/09/2023</TableCell>
                        <TableCell>Samira H.</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">À venir</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimisation de l'Inventaire Tournant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Notre système d'inventaire tournant est optimisé pour maximiser la précision tout en minimisant les
                  efforts et les interruptions de production.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Avantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-green-500 mt-2"></div>
                        <span>Réduction de 65% du temps consacré aux inventaires complets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-green-500 mt-2"></div>
                        <span>Amélioration de la précision des stocks de 92% à 98.5%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-green-500 mt-2"></div>
                        <span>Détection précoce des écarts pour les articles à forte valeur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-green-500 mt-2"></div>
                        <span>Réduction des ruptures de stock de 75% pour les articles critiques</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Méthodologie</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-blue-500 mt-2"></div>
                        <span>Classification dynamique basée sur la valeur et la consommation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-blue-500 mt-2"></div>
                        <span>Ajustement automatique des fréquences selon les écarts constatés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-blue-500 mt-2"></div>
                        <span>Rotation des équipes d'inventaire pour éviter les biais</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full h-2 w-2 bg-blue-500 mt-2"></div>
                        <span>Utilisation de scanners mobiles pour une saisie précise et rapide</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

