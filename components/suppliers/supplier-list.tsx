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
import { Plus, Search, FileText, Edit, Trash } from "lucide-react"

// Mettre à jour les données des fournisseurs pour l'Algérie
const initialSuppliers = [
  {
    id: "1",
    name: "Textile Express",
    contact: "Mohammed Amrani",
    email: "contact@textileexpress.dz",
    phone: "+213 21 123 456",
    category: "Tissus",
  },
  {
    id: "2",
    name: "Boutons & Accessoires",
    contact: "Fatima Benali",
    email: "info@boutons-accessoires.dz",
    phone: "+213 21 789 012",
    category: "Accessoires",
  },
  {
    id: "3",
    name: "Emballages Pro",
    contact: "Karim Tazi",
    email: "karim@emballages-pro.dz",
    phone: "+213 21 345 678",
    category: "Emballages",
  },
  {
    id: "4",
    name: "Fils & Coutures",
    contact: "Nadia Chaoui",
    email: "nadia@fils-coutures.dz",
    phone: "+213 21 901 234",
    category: "Fils",
  },
  {
    id: "5",
    name: "Machines Textiles",
    contact: "Hassan Mansouri",
    email: "hassan@machines-textiles.dz",
    phone: "+213 21 567 890",
    category: "Équipement",
  },
]

export function SupplierList() {
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [searchTerm, setSearchTerm] = useState("")
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    category: "",
  })
  const [open, setOpen] = useState(false)

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddSupplier = () => {
    const id = (suppliers.length + 1).toString()
    setSuppliers([...suppliers, { id, ...newSupplier }])
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      phone: "",
      category: "",
    })
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un fournisseur..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un fournisseur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau fournisseur</DialogTitle>
              <DialogDescription>Remplissez les informations du fournisseur ci-dessous.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  value={newSupplier.contact}
                  onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Catégorie
                </Label>
                <Input
                  id="category"
                  value={newSupplier.category}
                  onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddSupplier}>
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
              <TableHead>Nom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
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

