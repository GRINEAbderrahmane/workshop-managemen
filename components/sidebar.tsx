"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Factory, Package, UserCircle } from "lucide-react"

const routes = [
  {
    label: "Tableau de Bord",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Fournisseurs",
    icon: Users,
    href: "/fournisseurs",
    color: "text-violet-500",
  },
  {
    label: "Production",
    icon: Factory,
    href: "/production",
    color: "text-pink-700",
  },
  {
    label: "Stock",
    icon: Package,
    href: "/stock",
    color: "text-orange-500",
  },
  {
    label: "Clients",
    icon: UserCircle,
    href: "/clients",
    color: "text-emerald-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex h-full flex-col space-y-4 bg-gray-50 py-4 text-white dark:bg-gray-900">
      <div className="px-3 py-2">
        <Link href="/" className="flex items-center pl-3">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">GestionPro</h1>
        </Link>
      </div>
      <div className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              className={cn(
                "flex w-full items-center justify-start rounded-lg px-3 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800",
                pathname === route.href ? "bg-gray-200 dark:bg-gray-800" : "transparent",
              )}
              onClick={() => router.push(route.href)}
            >
              <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
              {route.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

