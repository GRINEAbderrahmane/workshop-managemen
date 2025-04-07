"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

// Données pour les litiges
const disputes = [
  {
    id: "LIT-001",
    supplier: "Textile Express",
    date: "15/05/2023",
    reason: "Qualité non conforme",
    financialImpact: 2500,
    status: "En cours",
  },
  {
    id: "LIT-002",
    supplier: "Boutons & Accessoires",
    date: "22/05/2023",
    reason: "Retard de livraison",
    financialImpact: 1200,
    status: "Résolu",
  },
  {
    id: "LIT-003",
    supplier: "Emballages Pro",
    date: "01/06/2023",
    reason: "Quantité manquante",
    financialImpact: 800,
    status: "Escaladé",
  },
  {
    id: "LIT-004",
    supplier: "Fils & Coutures",
    date: "10/06/2023",
    reason: "Facturation incorrecte",
    financialImpact: 1500,
    status: "En cours",
  },
  {
    id: "LIT-005",
    supplier: "Machines Textiles",
    date: "05/06/2023",
    reason: "Produit défectueux",
    financialImpact: 3000,
    status: "Résolu",
  },
]

// Données pour le graphique circulaire des motifs de litige
const disputeReasonData = [
  { name: "Qualité non conforme", value: 35 },
  { name: "Retard de livraison", value: 25 },
  { name: "Quantité manquante", value: 15 },
  { name: "Facturation incorrecte", value: 15 },
  { name: "Produit défectueux", value: 10 },
]

// Données pour le graphique à barres de l'impact financier
const financialImpactData = [
  { month: "Jan", impact: 1200 },
  { month: "Fév", impact: 1800 },
  { month: "Mar", impact: 2200 },
  { month: "Avr", impact: 1500 },
  { month: "Mai", impact: 3500 },
  { month: "Juin", impact: 2000 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

const getStatusColor = (status: string) => {
  switch (status) {
    case "En cours":
      return "bg-yellow-100 text-yellow-800"
    case "Résolu":
      return "bg-green-100 text-green-800"
    case "Escaladé":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function DisputeManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDisputes = disputes.filter(
    (dispute) =>
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un litige..."
            className="pl-8 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau litige
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Fournisseur</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Motif</TableHead>
              <TableHead>Impact financier</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDisputes.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell className="font-medium">{dispute.id}</TableCell>
                <TableCell>{dispute.supplier}</TableCell>
                <TableCell>{dispute.date}</TableCell>
                <TableCell>{dispute.reason}</TableCell>
                <TableCell>{dispute.financialImpact.toLocaleString()} MAD</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(dispute.status)}>{dispute.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardContent className="h-[300px] pt-6">
            <h3 className="text-sm font-medium mb-4">Litiges par motif</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={disputeReasonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {disputeReasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Pourcentage"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="h-[300px] pt-6">
            <h3 className="text-sm font-medium mb-4">Impact financier mensuel</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financialImpactData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} MAD`, "Impact financier"]} />
                <Bar dataKey="impact" name="Impact financier (MAD)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

