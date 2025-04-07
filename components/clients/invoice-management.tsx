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
import { Plus, Search, FileText, Download, Printer, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Données fictives pour les factures
const initialInvoices = [
  {
    id: "FACT-001",
    client: "Boutique Élégance",
    date: "2023-05-15",
    dueDate: "2023-06-15",
    amount: 125000,
    status: "Payée",
    type: "Facture",
  },
  {
    id: "FACT-002",
    client: "Mode Express",
    date: "2023-05-18",
    dueDate: "2023-06-18",
    amount: 87500,
    status: "En attente",
    type: "Facture",
  },
  {
    id: "FACT-003",
    client: "Tendance Algérie",
    date: "2023-05-20",
    dueDate: "2023-06-20",
    amount: 150000,
    status: "En retard",
    type: "Facture",
  },
  {
    id: "PRO-001",
    client: "Fashion House",
    date: "2023-05-22",
    dueDate: "2023-06-22",
    amount: 95000,
    status: "En attente",
    type: "Proforma",
  },
  {
    id: "PRO-002",
    client: "Textile Pro",
    date: "2023-05-25",
    dueDate: "2023-06-25",
    amount: 220000,
    status: "Convertie",
    type: "Proforma",
  },
]

const clients = ["Boutique Élégance", "Mode Express", "Tendance Maroc", "Fashion House", "Textile Pro"]

const invoiceStatuses = ["Payée", "En attente", "En retard", "Convertie"]
const invoiceTypes = ["Facture", "Proforma"]

export function InvoiceManagement() {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    amount: 0,
    status: "En attente",
    type: "Facture",
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddInvoice = () => {
    const id = newInvoice.type === "Facture" ? `FACT-00${invoices.length + 1}` : `PRO-00${invoices.length + 1}`
    setInvoices([...invoices, { id, ...newInvoice }])
    setNewInvoice({
      client: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      amount: 0,
      status: "En attente",
      type: "Facture",
    })
    setDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Payée":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "En retard":
        return "bg-red-100 text-red-800"
      case "Convertie":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Facture":
        return "bg-purple-100 text-purple-800"
      case "Proforma":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
            <TabsTrigger value="proforma">Proforma</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle Facture
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle facture</DialogTitle>
                  <DialogDescription>Remplissez les informations de la facture ci-dessous.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={newInvoice.type}
                      onValueChange={(value) => setNewInvoice({ ...newInvoice, type: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {invoiceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client" className="text-right">
                      Client
                    </Label>
                    <Select
                      value={newInvoice.client}
                      onValueChange={(value) => setNewInvoice({ ...newInvoice, client: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner un client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client} value={client}>
                            {client}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newInvoice.date}
                      onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Date d'échéance
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Montant (MAD)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newInvoice.amount.toString()}
                      onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number.parseFloat(e.target.value) || 0 })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Statut
                    </Label>
                    <Select
                      value={newInvoice.status}
                      onValueChange={(value) => setNewInvoice({ ...newInvoice, status: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {invoiceStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddInvoice}>
                    Créer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead>Montant (MAD)</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(invoice.type)}>{invoice.type}</Badge>
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>{invoice.amount.toLocaleString()} DZD</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead>Montant (MAD)</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices
                  .filter((invoice) => invoice.type === "Facture")
                  .map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>{invoice.amount.toLocaleString()} DZD</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="proforma" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead>Montant (MAD)</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices
                  .filter((invoice) => invoice.type === "Proforma")
                  .map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>{invoice.amount.toLocaleString()} DZD</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

