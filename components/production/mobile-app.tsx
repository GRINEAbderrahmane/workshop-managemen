"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Smartphone, QrCode, BarChart, CheckCircle, AlertTriangle, Clock } from "lucide-react"

export function MobileApp() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Application Mobile pour Chefs d'Atelier</h2>
          <p className="text-sm text-muted-foreground">Suivez et gérez la production directement depuis le terrain</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">Disponible</Badge>
          <Button size="sm">
            <Smartphone className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
          <TabsTrigger value="integration">Intégration</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Scan & Suivi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Scan de codes-barres des produits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Mise à jour instantanée du statut</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Traçabilité complète des lots</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Tableaux de Bord</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>KPIs en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Suivi de productivité par équipe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Visualisation des goulots d'étranglement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Alertes & Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Alertes de retard en production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Notifications de problèmes qualité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Rappels de maintenance préventive</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalités Avancées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Gestion des Ressources Humaines</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Pointage des équipes avec géolocalisation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Suivi des compétences et formations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Gestion des plannings et rotations</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contrôle Qualité</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Formulaires de contrôle qualité digitalisés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Capture photo des défauts avec annotation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Historique des contrôles par lot</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Maintenance</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Signalement des pannes avec photo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Suivi des interventions techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Accès aux manuels techniques</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Communication</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Messagerie instantanée entre équipes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Partage de documents et instructions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Diffusion d'annonces importantes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu de l'Application</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <div className="border-8 border-black rounded-[40px] w-[280px] h-[560px] bg-gray-100 overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black"></div>
                  <div className="absolute top-8 left-0 right-0 h-12 bg-primary flex items-center px-4">
                    <span className="text-white font-medium">GestionPro Mobile</span>
                  </div>
                  <div className="mt-20 p-4 space-y-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Tableau de Bord</span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Production du jour</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Qualité</span>
                            <span>95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Tâches en cours</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                          <span>Coupe - Lot #A123</span>
                          <Badge className="bg-yellow-100 text-yellow-800">En cours</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                          <span>Assemblage - Lot #B456</span>
                          <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                          <span>Finition - Lot #C789</span>
                          <Badge className="bg-blue-100 text-blue-800">À venir</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Alertes</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs p-2 bg-red-50 rounded text-red-800">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Machine #3 en panne</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-yellow-50 rounded text-yellow-800">
                          <Clock className="h-3 w-3" />
                          <span>Retard sur commande #45678</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avantages Clés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">1. Mobilité et Réactivité</h3>
                    <p className="text-sm text-muted-foreground">
                      Les chefs d'atelier peuvent superviser la production en se déplaçant librement dans l'usine, sans
                      être attachés à un poste fixe. Cela permet une réaction immédiate aux problèmes et une meilleure
                      supervision des équipes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">2. Données en Temps Réel</h3>
                    <p className="text-sm text-muted-foreground">
                      Toutes les informations sont synchronisées instantanément avec le système central, garantissant
                      que les décisions sont prises sur la base des données les plus récentes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">3. Réduction des Erreurs</h3>
                    <p className="text-sm text-muted-foreground">
                      La saisie directe des données à la source élimine les erreurs de transcription et les délais de
                      mise à jour, améliorant la précision des informations de production.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">4. Amélioration de la Communication</h3>
                    <p className="text-sm text-muted-foreground">
                      Les problèmes peuvent être signalés immédiatement avec photos et contexte, facilitant la
                      résolution rapide et la coordination entre les équipes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">5. Traçabilité Complète</h3>
                    <p className="text-sm text-muted-foreground">
                      Chaque action est horodatée et associée à un utilisateur, créant un historique complet de la
                      production qui peut être utilisé pour l'analyse et l'amélioration continue.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Témoignages Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm italic mb-4">
                    "L'application mobile a transformé notre façon de gérer l'atelier. Je peux maintenant superviser
                    toutes les lignes de production en temps réel et intervenir immédiatement en cas de problème."
                  </p>
                  <div className="text-sm font-medium">Mohammed L.</div>
                  <div className="text-xs text-muted-foreground">Chef d'Atelier, Textile Express</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm italic mb-4">
                    "Le scan des codes-barres a éliminé les erreurs de saisie et nous a fait gagner un temps précieux.
                    Notre productivité a augmenté de 15% depuis que nous utilisons l'application."
                  </p>
                  <div className="text-sm font-medium">Fatima B.</div>
                  <div className="text-xs text-muted-foreground">Responsable Production, Mode Élégance</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm italic mb-4">
                    "Les alertes en temps réel nous permettent d'anticiper les problèmes avant qu'ils ne deviennent
                    critiques. C'est un outil indispensable pour notre gestion quotidienne."
                  </p>
                  <div className="text-sm font-medium">Karim T.</div>
                  <div className="text-xs text-muted-foreground">Directeur Technique, Confection Moderne</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intégration avec le Système Central</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  L'application mobile se synchronise parfaitement avec le système central de gestion, offrant une
                  expérience unifiée et des données cohérentes à travers toute l'organisation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Synchronisation des Données</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Synchronisation bidirectionnelle en temps réel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Mode hors ligne avec mise à jour automatique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Gestion intelligente des conflits de données</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Sécurité</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Authentification biométrique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Chiffrement des données de bout en bout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Contrôle d'accès basé sur les rôles</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Modules Intégrés</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">Production</div>
                      <Badge className="bg-green-100 text-green-800">Intégré</Badge>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">Stock</div>
                      <Badge className="bg-green-100 text-green-800">Intégré</Badge>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">Qualité</div>
                      <Badge className="bg-green-100 text-green-800">Intégré</Badge>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">Maintenance</div>
                      <Badge className="bg-green-100 text-green-800">Intégré</Badge>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">RH</div>
                      <Badge className="bg-green-100 text-green-800">Intégré</Badge>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">Fournisseurs</div>
                      <Badge className="bg-yellow-100 text-yellow-800">Partiel</Badge>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">Clients</div>
                      <Badge className="bg-yellow-100 text-yellow-800">Partiel</Badge>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="font-medium mb-1">Comptabilité</div>
                      <Badge className="bg-blue-100 text-blue-800">À venir</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Déploiement & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Processus de Déploiement</h3>
                  <ol className="space-y-2 text-sm list-decimal pl-5">
                    <li>Installation et configuration du serveur de synchronisation</li>
                    <li>Paramétrage des droits d'accès et des rôles utilisateurs</li>
                    <li>Formation des administrateurs système</li>
                    <li>Déploiement pilote sur un groupe restreint d'utilisateurs</li>
                    <li>Ajustements basés sur les retours d'expérience</li>
                    <li>Déploiement complet à tous les utilisateurs</li>
                    <li>Suivi et optimisation continue</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Support Technique</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Support technique 24/7 via chat et téléphone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Base de connaissances complète avec tutoriels vidéo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Mises à jour automatiques avec nouvelles fonctionnalités</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Formation continue pour les nouveaux utilisateurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Audit trimestriel d'utilisation et recommandations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">Planifier une démonstration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

