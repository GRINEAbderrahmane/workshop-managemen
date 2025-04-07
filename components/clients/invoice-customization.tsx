"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ColorPicker } from "@/components/clients/color-picker"
import { FileUpload } from "@/components/clients/file-upload"
import { Check, Copy, Download, Eye } from "lucide-react"

export function InvoiceCustomization() {
  const [activeTab, setActiveTab] = useState("design")
  const [primaryColor, setPrimaryColor] = useState("#4f46e5")
  const [secondaryColor, setSecondaryColor] = useState("#f9fafb")
  const [logoPreview, setLogoPreview] = useState("/placeholder.svg?height=60&width=120")
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Personnalisation des Factures</h2>
          <p className="text-sm text-muted-foreground">Créez des modèles de factures personnalisés à votre image</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? "Masquer l'aperçu" : "Voir l'aperçu"}
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${showPreview ? "md:grid-cols-2" : ""} gap-6`}>
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Identité Visuelle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo de l'entreprise</Label>
                    <FileUpload
                      id="logo"
                      accept="image/*"
                      onChange={(file) => {
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            setLogoPreview(e.target?.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <div className="h-16 w-32 border rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Couleur Principale</Label>
                      <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
                    </div>
                    <div className="space-y-2">
                      <Label>Couleur Secondaire</Label>
                      <ColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Modèle de Facture</Label>
                    <Select defaultValue="modern">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un modèle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Moderne</SelectItem>
                        <SelectItem value="classic">Classique</SelectItem>
                        <SelectItem value="minimal">Minimaliste</SelectItem>
                        <SelectItem value="elegant">Élégant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="font">Police de caractères</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une police" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mise en Page</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="header-style">Style d'En-tête</Label>
                    <Select defaultValue="centered">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centered">Centré</SelectItem>
                        <SelectItem value="split">Divisé</SelectItem>
                        <SelectItem value="left">Aligné à gauche</SelectItem>
                        <SelectItem value="right">Aligné à droite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="table-style">Style de Tableau</Label>
                    <Select defaultValue="striped">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="striped">Rayé</SelectItem>
                        <SelectItem value="bordered">Bordé</SelectItem>
                        <SelectItem value="minimal">Minimaliste</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-logo">Afficher le logo</Label>
                    <Switch id="show-logo" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-footer">Afficher le pied de page</Label>
                    <Switch id="show-footer" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-watermark">Filigrane "PAYÉ" sur les factures réglées</Label>
                    <Switch id="show-watermark" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de l'Entreprise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nom de l'entreprise</Label>
                    <Input id="company-name" defaultValue="Atelier de Confection Moderne" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-address">Adresse</Label>
                    <Textarea id="company-address" defaultValue="123 Avenue Didouche Mourad, Alger, Algérie" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Téléphone</Label>
                      <Input id="company-phone" defaultValue="+213 21 123 456" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email</Label>
                      <Input id="company-email" defaultValue="contact@ateliermoderne.dz" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-tax-id">Identifiant Fiscal</Label>
                      <Input id="company-tax-id" defaultValue="12345678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-rc">Registre de Commerce</Label>
                      <Input id="company-rc" defaultValue="RC123456" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Textes Personnalisés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-title">Titre de la facture</Label>
                    <Input id="invoice-title" defaultValue="FACTURE" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proforma-title">Titre de la facture proforma</Label>
                    <Input id="proforma-title" defaultValue="FACTURE PROFORMA" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thank-you-message">Message de remerciement</Label>
                    <Textarea
                      id="thank-you-message"
                      defaultValue="Merci pour votre confiance. Nous vous souhaitons une excellente journée!"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-terms">Conditions de paiement</Label>
                    <Textarea
                      id="payment-terms"
                      defaultValue="Paiement à 30 jours à compter de la date de facturation. Tout retard de paiement entraînera des pénalités."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="footer-text">Texte de pied de page</Label>
                    <Textarea
                      id="footer-text"
                      defaultValue="Atelier de Confection Moderne - Qualité et élégance depuis 1995"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de Facturation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix">Préfixe des factures</Label>
                    <Input id="invoice-prefix" defaultValue="FACT-" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proforma-prefix">Préfixe des factures proforma</Label>
                    <Input id="proforma-prefix" defaultValue="PRO-" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="next-invoice-number">Prochain numéro de facture</Label>
                    <Input id="next-invoice-number" defaultValue="0042" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Format de date</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">JJ/MM/AAAA</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/JJ/AAAA</SelectItem>
                        <SelectItem value="yyyy-mm-dd">AAAA-MM-JJ</SelectItem>
                        <SelectItem value="dd-mm-yyyy">JJ-MM-AAAA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise par défaut</Label>
                    <Select defaultValue="dzd">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une devise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dzd">Dinar Algérien (DZD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                        <SelectItem value="usd">Dollar Américain (USD)</SelectItem>
                        <SelectItem value="gbp">Livre Sterling (GBP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Taux de TVA par défaut</Label>
                    <Select defaultValue="20">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un taux" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="7">7%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="14">14%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-send">Envoi automatique par email</Label>
                    <Switch id="auto-send" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-reminder">Rappels automatiques pour factures impayées</Label>
                    <Switch id="auto-reminder" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Options d'Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pdf-export">Export PDF</Label>
                    <Switch id="pdf-export" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="excel-export">Export Excel</Label>
                    <Switch id="excel-export" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="xml-export">Export XML</Label>
                    <Switch id="xml-export" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pdf-size">Format PDF</Label>
                    <Select defaultValue="a4">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pdf-orientation">Orientation PDF</Label>
                    <Select defaultValue="portrait">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Paysage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {showPreview && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu de la Facture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 bg-white">
                  <div className="flex justify-between items-center mb-8" style={{ color: primaryColor }}>
                    <div>
                      <img src={logoPreview || "/placeholder.svg"} alt="Logo" className="h-12 mb-2" />
                      <h2 className="text-xl font-bold">Atelier de Confection Moderne</h2>
                      <p className="text-sm">123 Avenue Didouche Mourad, Alger, Algérie</p>
                      <p className="text-sm">+213 21 123 456 | contact@ateliermoderne.dz</p>
                    </div>
                    <div className="text-right">
                      <h1 className="text-2xl font-bold mb-2">FACTURE</h1>
                      <p className="text-sm">FACT-0042</p>
                      <p className="text-sm">Date: 01/06/2023</p>
                      <p className="text-sm">Échéance: 01/07/2023</p>
                    </div>
                  </div>

                  <div className="mb-8 flex justify-between">
                    <div>
                      <h3 className="font-medium mb-2" style={{ color: primaryColor }}>
                        Facturer à:
                      </h3>
                      <p className="text-sm">Boutique Élégance</p>
                      <p className="text-sm">Sarah Benali</p>
                      <p className="text-sm">123 Avenue Mohammed V, Casablanca</p>
                      <p className="text-sm">contact@elegance.ma</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2" style={{ color: primaryColor }}>
                        Informations de paiement:
                      </h3>
                      <p className="text-sm">Banque: BMCE Bank</p>
                      <p className="text-sm">IBAN: MA123456789012345678901234</p>
                      <p className="text-sm">SWIFT: BMCEMAMC</p>
                    </div>
                  </div>

                  <table className="w-full mb-8">
                    <thead>
                      <tr style={{ backgroundColor: secondaryColor }}>
                        <th className="text-left p-2 border-b" style={{ color: primaryColor }}>
                          Description
                        </th>
                        <th className="text-right p-2 border-b" style={{ color: primaryColor }}>
                          Quantité
                        </th>
                        <th className="text-right p-2 border-b" style={{ color: primaryColor }}>
                          Prix unitaire
                        </th>
                        <th className="text-right p-2 border-b" style={{ color: primaryColor }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border-b">Robes modèle R102</td>
                        <td className="text-right p-2 border-b">10</td>
                        <td className="text-right p-2 border-b">1 200,00 MAD</td>
                        <td className="text-right p-2 border-b">12 000,00 DZD</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-b">Chemises modèle C103</td>
                        <td className="text-right p-2 border-b">15</td>
                        <td className="text-right p-2 border-b">800,00 MAD</td>
                        <td className="text-right p-2 border-b">12 000,00 DZD</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-b">Vestes modèle V205</td>
                        <td className="text-right p-2 border-b">5</td>
                        <td className="text-right p-2 border-b">1 800,00 MAD</td>
                        <td className="text-right p-2 border-b">9 000,00 DZD</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end mb-8">
                    <div className="w-64">
                      <div className="flex justify-between py-2">
                        <span>Sous-total:</span>
                        <span>33 000,00 DZD</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>TVA (19%):</span>
                        <span>6 270,00 DZD</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold" style={{ color: primaryColor }}>
                        <span>Total:</span>
                        <span>39 270,00 DZD</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 text-center text-sm">
                    <p className="mb-2">Merci pour votre confiance. Nous vous souhaitons une excellente journée!</p>
                    <p className="text-xs text-muted-foreground">
                      Paiement à 30 jours à compter de la date de facturation. Tout retard de paiement entraînera des
                      pénalités.
                    </p>
                    <p className="mt-4 text-xs" style={{ color: primaryColor }}>
                      Atelier de Confection Moderne - Qualité et élégance depuis 1995
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Dupliquer
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Appliquer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

