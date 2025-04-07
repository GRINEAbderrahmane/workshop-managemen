"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Données fictives pour les commandes
const initialOrders = [
  {
    id: "CMD-001",
    supplier: "Textile Express",
    date: "2023-05-15",
    items: "Tissu coton (200m), Tissu lin (150m)",
    status: "En cours",
    progress: 60,
    eta: "2023-06-01",
  },
  {
    id: "CMD-002",
    supplier: "Boutons & Accessoires",
    date: "2023-05-18",
    items: "Boutons dorés (500), Fermetures éclair (200)",
    status: "En attente",
    progress: 20,
    eta: "2023-06-10",
  },
  {
    id: "CMD-003",
    supplier: "Emballages Pro",
    date: "2023-05-10",
    items: "Boîtes carton (1000), Papier de soie (500)",
    status: "Livré",
    progress: 100,
    eta: "2023-05-25",
  },
  {
    id: "CMD-004",
    supplier: "Fils & Coutures",
    date: "2023-05-20",
    items: "Fil noir (50), Fil blanc (50), Fil rouge (30)",
    status: "En cours",
    progress: 40,
    eta: "2023-06-05",
  },
  {
    id: "CMD-005",
    supplier: "Machines Textiles",
    date: "2023-05-05",
    items: "Machine à coudre industrielle (1), Pièces détachées",
    status: "Livré",
    progress: 100,
    eta: "2023-05-20",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "En cours":
      return "bg-blue-100 text-blue-800"
    case "En attente":
      return "bg-yellow-100 text-yellow-800"
    case "Livré":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function OrderTracking() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof initialOrders)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (order: (typeof initialOrders)[0]) => {
    setSelectedOrder(order)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une commande..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtrer
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Date prévue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={order.progress} className="h-2 w-40" />
                      <span className="text-xs">{order.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.eta}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de la commande {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Informations complètes sur la commande</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fournisseur</p>
                  <p className="text-lg font-semibold">{selectedOrder.supplier}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date de commande</p>
                  <p className="text-lg font-semibold">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date prévue de livraison</p>
                  <p className="text-lg font-semibold">{selectedOrder.eta}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Progression</p>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={selectedOrder.progress} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{selectedOrder.progress}%</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Articles commandés</p>
                <p className="text-base mt-1">{selectedOrder.items}</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-muted-foreground">Historique</p>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm">
                    <span className="font-medium">{selectedOrder.date}</span> - Commande créée
                  </li>
                  {selectedOrder.progress >= 20 && (
                    <li className="text-sm">
                      <span className="font-medium">
                        {selectedOrder.date.replace(/\d+$/, (n) => String(Number(n) + 2))}
                      </span>{" "}
                      - Commande confirmée par le fournisseur
                    </li>
                  )}
                  {selectedOrder.progress >= 50 && (
                    <li className="text-sm">
                      <span className="font-medium">
                        {selectedOrder.date.replace(/\d+$/, (n) => String(Number(n) + 7))}
                      </span>{" "}
                      - Commande en préparation
                    </li>
                  )}
                  {selectedOrder.progress >= 75 && (
                    <li className="text-sm">
                      <span className="font-medium">
                        {selectedOrder.date.replace(/\d+$/, (n) => String(Number(n) + 12))}
                      </span>{" "}
                      - Commande expédiée
                    </li>
                  )}
                  {selectedOrder.progress === 100 && (
                    <li className="text-sm">
                      <span className="font-medium">{selectedOrder.eta}</span> - Commande livrée
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

