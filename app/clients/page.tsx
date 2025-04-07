import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientList } from "@/components/clients/client-list"
import { InvoiceManagement } from "@/components/clients/invoice-management"
import { InvoiceCustomization } from "@/components/clients/invoice-customization"
import { ClientAnalytics } from "@/components/clients/client-analytics"

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Relations Clients</h1>
      </div>

      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="invoices">Factures</TabsTrigger>
          <TabsTrigger value="customization">Personnalisation</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
        </TabsList>
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Liste des Clients</CardTitle>
              <CardDescription>Gérez vos clients et leurs informations</CardDescription>
            </CardHeader>
            <CardContent>
              <ClientList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Factures</CardTitle>
              <CardDescription>Créez et gérez vos factures et factures proforma</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customization">
          <Card>
            <CardHeader>
              <CardTitle>Personnalisation des Factures</CardTitle>
              <CardDescription>Personnalisez vos modèles de factures et factures proforma</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceCustomization />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analyses Clients</CardTitle>
              <CardDescription>Analysez les données de vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <ClientAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

