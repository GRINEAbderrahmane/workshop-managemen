"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Factory, Package, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function ModuleCards() {
  const router = useRouter()

  const modules = [
    {
      title: "Gestion des Relations Fournisseurs",
      description: "Gérez vos fournisseurs, commandes et évaluations",
      icon: Users,
      color: "bg-violet-100 text-violet-700",
      href: "/fournisseurs",
    },
    {
      title: "Gestion de Production",
      description: "Planifiez et suivez votre production en temps réel",
      icon: Factory,
      color: "bg-pink-100 text-pink-700",
      href: "/production",
    },
    {
      title: "Gestion des Stocks",
      description: "Suivez vos stocks et gérez vos inventaires",
      icon: Package,
      color: "bg-orange-100 text-orange-700",
      href: "/stock",
    },
    {
      title: "Gestion des Relations Clients",
      description: "Gérez vos clients et vos factures",
      icon: UserCircle,
      color: "bg-emerald-100 text-emerald-700",
      href: "/clients",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {modules.map((module) => (
        <Card key={module.title} className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
            <div className={`rounded-full p-2 ${module.color}`}>
              <module.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{module.description}</p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full" onClick={() => router.push(module.href)}>
              Accéder
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

