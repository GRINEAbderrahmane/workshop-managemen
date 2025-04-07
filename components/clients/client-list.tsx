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
import { Plus, Search, FileText, Edit, Trash, UserCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mettre à jour les données des clients pour l'Algérie
const initialClients = [
  {
    id: "1",
    name: "Boutique Élégance",
    contact: "Sarah Benali",
    email: "contact@elegance.dz",
    phone: "+213 21 123 456",
    address: "123 Avenue Didouche Mourad, Alger",
    type: "Boutique",
    status: "Actif",
  },
  {
    id: "2",
    name: "Mode Express",
    contact: "Karim Tazi",
    email: "karim@modeexpress.dz",
    phone: "+213 21 789 012",
    address: "45 Rue Larbi Ben M'hidi, Alger",
    type: "Grossiste",
    status: "Actif",
  },
  {
    id: "3",
    name: "Tendance Algérie",
    contact: "Fatima Alaoui",
    email: "fatima@tendancealgerie.dz",
    phone: "+213 21 345 678",
    address: "78 Boulevard Mohamed V, Alger",
    type: "Boutique",
    status: "Actif",
  },
  {
    id: "4",
    name: "Fashion House",
    contact: "Youssef Mansouri",
    email: "youssef@fashionhouse.dz",
    phone: "+213 21 901 234",
    address: "12 Rue Hassiba Ben Bouali, Oran",
    type: "Boutique",
    status: "Inactif",
  },
  {
    id: "5",
    name: "Textile Pro",
    contact: "Nadia Chaoui",
    email: "nadia@textilepro.dz",
    phone: "+213 21 567 890",
    address: "56 Zone Industrielle, Constantine",
    type: "Grossiste",
    status: "Actif",
  },
]

const clientTypes = ["Boutique", "Grossiste", "Particulier", "Entreprise"]
const clientStatuses = ["Actif", "Inactif", "Prospect"]

export function ClientList() {
  const [clients, setClients] = useState(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [newClient, setNewClient] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    type: "",
    status: "Actif",
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddClient = () => {
    const id = (clients.length + 1).toString()
    setClients([...clients, { id, ...newClient }])
    setNewClient({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      type: "",
      status: "Actif",
    })
    setDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Inactif":
        return "bg-gray-100 text-gray-800"
      case "Prospect":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau client</DialogTitle>
              <DialogDescription>Remplissez les informations du client ci-dessous.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  value={newClient.contact}
                  onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
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
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Adresse
                </Label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <select
                  id="type"
                  value={newClient.type}
                  onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Sélectionner un type</option>
                  {clientTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Statut
                </Label>
                <select
                  id="status"
                  value={newClient.status}
                  onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {clientStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddClient}>
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
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.type}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <UserCircle className="h-4 w-4" />
                    </Button>
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

