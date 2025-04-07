import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: "Ahmed M.",
    action: "a ajouté une nouvelle commande",
    time: "il y a 5 minutes",
    initials: "AM",
  },
  {
    user: "Fatima L.",
    action: "a mis à jour le stock de tissu",
    time: "il y a 15 minutes",
    initials: "FL",
  },
  {
    user: "Karim B.",
    action: "a généré une facture pour client #1234",
    time: "il y a 30 minutes",
    initials: "KB",
  },
  {
    user: "Samira H.",
    action: "a ajouté un nouveau fournisseur",
    time: "il y a 1 heure",
    initials: "SH",
  },
  {
    user: "Youssef D.",
    action: "a terminé la production #5678",
    time: "il y a 2 heures",
    initials: "YD",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user} <span className="text-muted-foreground">{activity.action}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

