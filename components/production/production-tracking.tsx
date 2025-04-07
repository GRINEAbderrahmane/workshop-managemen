"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Données fictives pour le suivi de production
const productionData = [
  {
    id: "PROD-001",
    name: "Robes modèle R102",
    total: 200,
    completed: 120,
    inProgress: 50,
    quality: 98,
    team: "Équipe B",
    startDate: "2023-05-04",
    endDate: "2023-05-15",
    status: "En cours",
  },
  {
    id: "PROD-002",
    name: "Vestes modèle V205",
    total: 150,
    completed: 30,
    inProgress: 70,
    quality: 95,
    team: "Équipe C",
    startDate: "2023-05-08",
    endDate: "2023-05-20",
    status: "En cours",
  },
  {
    id: "PROD-003",
    name: "Chemises modèle C103",
    total: 300,
    completed: 300,
    inProgress: 0,
    quality: 99,
    team: "Équipe A",
    startDate: "2023-04-20",
    endDate: "2023-05-10",
    status: "Terminé",
  },
  {
    id: "PROD-004",
    name: "Pantalons modèle P401",
    total: 250,
    completed: 0,
    inProgress: 0,
    quality: 0,
    team: "Équipe D",
    startDate: "2023-05-20",
    endDate: "2023-06-05",
    status: "Planifié",
  },
]

// Données pour le graphique circulaire
const statusData = [
  { name: "Terminé", value: 1, color: "#10b981" },
  { name: "En cours", value: 2, color: "#3b82f6" },
  { name: "Planifié", value: 1, color: "#9ca3af" },
]

const qualityData = [
  { name: "Excellent (>98%)", value: 2, color: "#10b981" },
  { name: "Bon (95-98%)", value: 1, color: "#3b82f6" },
  { name: "À améliorer (<95%)", value: 1, color: "#f59e0b" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "En cours":
      return "bg-blue-100 text-blue-800"
    case "Terminé":
      return "bg-green-100 text-green-800"
    case "Planifié":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ProductionTracking() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Productions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Productions actives et planifiées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unités Produites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">Sur 900 unités planifiées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de Qualité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.3%</div>
            <p className="text-xs text-muted-foreground">Moyenne de toutes les productions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Efficacité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Ratio production/capacité</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statut des Productions</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Qualité des Productions</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="in-progress">En cours</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
          <TabsTrigger value="planned">Planifiées</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {productionData.map((production) => (
            <Card key={production.id}>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{production.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {production.id}</p>
                    </div>
                    <Badge className={getStatusColor(production.status)}>{production.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>
                        {production.completed} / {production.total} unités (
                        {Math.round((production.completed / production.total) * 100) || 0}%)
                      </span>
                    </div>
                    <Progress value={(production.completed / production.total) * 100} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Équipe:</span> {production.team}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Qualité:</span> {production.quality}%
                    </div>
                    <div>
                      <span className="text-muted-foreground">Début:</span> {production.startDate}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fin prévue:</span> {production.endDate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          {productionData
            .filter((p) => p.status === "En cours")
            .map((production) => (
              <Card key={production.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{production.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {production.id}</p>
                      </div>
                      <Badge className={getStatusColor(production.status)}>{production.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>
                          {production.completed} / {production.total} unités (
                          {Math.round((production.completed / production.total) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(production.completed / production.total) * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Équipe:</span> {production.team}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Qualité:</span> {production.quality}%
                      </div>
                      <div>
                        <span className="text-muted-foreground">Début:</span> {production.startDate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fin prévue:</span> {production.endDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {productionData
            .filter((p) => p.status === "Terminé")
            .map((production) => (
              <Card key={production.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{production.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {production.id}</p>
                      </div>
                      <Badge className={getStatusColor(production.status)}>{production.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>
                          {production.completed} / {production.total} unités (
                          {Math.round((production.completed / production.total) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(production.completed / production.total) * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Équipe:</span> {production.team}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Qualité:</span> {production.quality}%
                      </div>
                      <div>
                        <span className="text-muted-foreground">Début:</span> {production.startDate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fin prévue:</span> {production.endDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="planned" className="space-y-4">
          {productionData
            .filter((p) => p.status === "Planifié")
            .map((production) => (
              <Card key={production.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{production.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {production.id}</p>
                      </div>
                      <Badge className={getStatusColor(production.status)}>{production.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>
                          {production.completed} / {production.total} unités (
                          {Math.round((production.completed / production.total) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(production.completed / production.total) * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Équipe:</span> {production.team}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Qualité:</span> {production.quality}%
                      </div>
                      <div>
                        <span className="text-muted-foreground">Début:</span> {production.startDate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fin prévue:</span> {production.endDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

