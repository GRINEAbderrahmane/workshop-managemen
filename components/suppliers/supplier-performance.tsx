"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const supplierScores = [
  {
    id: "1",
    name: "Textile Express",
    category: "Tissus",
    scores: [
      { criterion: "Délais", value: 4.2 },
      { criterion: "Qualité", value: 4.5 },
      { criterion: "Conformité", value: 4.0 },
      { criterion: "Réactivité", value: 3.8 },
      { criterion: "Prix", value: 4.3 },
    ],
    overall: 4.16,
  },
  {
    id: "2",
    name: "Boutons & Accessoires",
    category: "Accessoires",
    scores: [
      { criterion: "Délais", value: 3.9 },
      { criterion: "Qualité", value: 4.7 },
      { criterion: "Conformité", value: 4.5 },
      { criterion: "Réactivité", value: 4.2 },
      { criterion: "Prix", value: 3.5 },
    ],
    overall: 4.16,
  },
  {
    id: "3",
    name: "Emballages Pro",
    category: "Emballages",
    scores: [
      { criterion: "Délais", value: 4.8 },
      { criterion: "Qualité", value: 4.0 },
      { criterion: "Conformité", value: 4.2 },
      { criterion: "Réactivité", value: 4.5 },
      { criterion: "Prix", value: 3.7 },
    ],
    overall: 4.24,
  },
  {
    id: "4",
    name: "Fils & Coutures",
    category: "Fils",
    scores: [
      { criterion: "Délais", value: 3.5 },
      { criterion: "Qualité", value: 4.8 },
      { criterion: "Conformité", value: 4.6 },
      { criterion: "Réactivité", value: 3.9 },
      { criterion: "Prix", value: 4.0 },
    ],
    overall: 4.16,
  },
  {
    id: "5",
    name: "Machines Textiles",
    category: "Équipement",
    scores: [
      { criterion: "Délais", value: 4.0 },
      { criterion: "Qualité", value: 4.9 },
      { criterion: "Conformité", value: 4.7 },
      { criterion: "Réactivité", value: 4.1 },
      { criterion: "Prix", value: 3.2 },
    ],
    overall: 4.18,
  },
]

const getBadgeColor = (score: number) => {
  if (score >= 4.5) return "bg-green-100 text-green-800"
  if (score >= 4.0) return "bg-blue-100 text-blue-800"
  if (score >= 3.5) return "bg-yellow-100 text-yellow-800"
  return "bg-red-100 text-red-800"
}

export function SupplierPerformance() {
  const selectedSupplier = supplierScores[0] // Par défaut, afficher le premier fournisseur

  const radarData = selectedSupplier.scores.map((item) => ({
    subject: item.criterion,
    A: item.value,
    fullMark: 5,
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance de {selectedSupplier.name}</CardTitle>
            <CardDescription>Évaluation basée sur 5 critères clés</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails des Critères</CardTitle>
            <CardDescription>Scores individuels pour chaque critère</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedSupplier.scores.map((score) => (
                <div key={score.criterion} className="flex items-center justify-between">
                  <span className="font-medium">{score.criterion}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(score.value / 5) * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium">{score.value.toFixed(1)}/5</span>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Score Global</span>
                  <span className="font-bold">{selectedSupplier.overall.toFixed(2)}/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classement des Fournisseurs</CardTitle>
          <CardDescription>Comparaison des performances de tous les fournisseurs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Délais</TableHead>
                <TableHead>Qualité</TableHead>
                <TableHead>Conformité</TableHead>
                <TableHead>Réactivité</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Score Global</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierScores.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  {supplier.scores.map((score) => (
                    <TableCell key={score.criterion}>
                      <Badge className={getBadgeColor(score.value)}>{score.value.toFixed(1)}</Badge>
                    </TableCell>
                  ))}
                  <TableCell>
                    <Badge className={getBadgeColor(supplier.overall)}>{supplier.overall.toFixed(2)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

