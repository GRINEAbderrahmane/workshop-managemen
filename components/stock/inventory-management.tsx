"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash, ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mettre à jour les données pour l'Algérie
const initialInventory = [
  {
    id: "1",
    name: "Tissu coton bleu",
    category: "Tissus",
    quantity: 500,
    unit: "mètres",
    location: "Entrepôt A",
    minStock: 100,
    status: "En stock",
  },
  {
    id: "2",
    name: "Tissu lin beige",
    category: "Tissus",
    quantity: 300,
    unit: "mètres",
    location: "Entrepôt A",
    minStock: 50,
    status: "En stock",
  },
  {
    id: "3",
    name: "Boutons dorés",
    category: "Accessoires",
    quantity: 2000,
    unit: "pièces",
    location: "Entrepôt B",
    minStock: 500,
    status: "En stock",
  },
  {
    id: "4",
    name: "Fermetures éclair noires",
    category: "Accessoires",
    quantity: 800,
    unit: "pièces",
    location: "Entrepôt B",
    minStock: 200,
    status: "En stock",
  },
  {
    id: "5",
    name: "Fil noir",
    category: "Fils",
    quantity: 50,
    unit: "bobines",
    location: "Entrepôt C",
    minStock: 20,
    status: "Stock bas",
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
  },
  {
    id: "7",
    name: "Boîtes d'emballage",
    category: "Emballages",
    quantity: 1000,
    unit: "pièces",
    location: "Entrepôt D",
    minStock: 300,
    status: "En stock",
  },
  {
    id: "8",
    name: "Papier de soie",
    category: "Emballages",
    quantity: 5,
    unit: "cartons",
    location: "Entrepôt D",
    minStock: 10,
    status: "Rupture",
  },
]

const categories = ["Tissus", "Accessoires", "Fils", "Emballages", "Équipement"]
const locations = ["Entrepôt A", "Entrepôt B", "Entrepôt C", "Entrepôt D"]
const units = ["mètres", "pièces", "bobines", "cartons", "kg"]

const getStatusColor = (status: string) => {
  switch (status) {
    case "En stock":
      return "bg-green-100 text-green-800"
    case "Stock bas":
      return "bg-yellow-100 text-yellow-800"
    case "Rupture":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    location: "",
    minStock: 0,
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedInventory = [...inventory].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const filteredInventory = sortedInventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddItem = () => {
    const id = (inventory.length + 1).toString()
    const status = newItem.quantity === 0 ? "Rupture" : newItem.quantity <= newItem.minStock ? "Stock bas" : "En stock"

    setInventory([
      ...inventory,
      {
        id,
        ...newItem,
        status,
      },
    ])

    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      location: "",
      minStock: 0,
    })

    setDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un article..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un article
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel article</DialogTitle>
              <DialogDescription>Remplissez les informations de l'article ci-dessous.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Catégorie
                </Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une catégorie" />
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantité
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity.toString()}
                  onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unité
                </Label>
                <Select value={newItem.unit} onValueChange={(value) => setNewItem({ ...newItem, unit: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une unité" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Emplacement
                </Label>
                <Select value={newItem.location} onValueChange={(value) => setNewItem({ ...newItem, location: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un emplacement" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minStock" className="text-right">
                  Stock minimum
                </Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newItem.minStock.toString()}
                  onChange={(e) => setNewItem({ ...newItem, minStock: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddItem}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Nom
                  {sortColumn === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                <div className="flex items-center">
                  Catégorie
                  {sortColumn === "category" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("quantity")}>
                <div className="flex items-center justify-end">
                  Quantité
                  {sortColumn === "quantity" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead>Unité</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                <div className="flex items-center">
                  Emplacement
                  {sortColumn === "location" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

