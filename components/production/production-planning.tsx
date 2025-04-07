"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

// Données fictives pour les tâches de production
const initialTasks = [
  {
    id: "1",
    title: "Coupe de tissu - Collection Été",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 5, 3),
    priority: "Haute",
    assignedTo: "Équipe A",
    status: "En cours",
  },
  {
    id: "2",
    title: "Assemblage - Robes modèle R102",
    startDate: new Date(2023, 5, 4),
    endDate: new Date(2023, 5, 7),
    priority: "Moyenne",
    assignedTo: "Équipe B",
    status: "Planifié",
  },
  {
    id: "3",
    title: "Finitions - Vestes modèle V205",
    startDate: new Date(2023, 5, 8),
    endDate: new Date(2023, 5, 10),
    priority: "Basse",
    assignedTo: "Équipe C",
    status: "Planifié",
  },
  {
    id: "4",
    title: "Contrôle qualité - Collection Printemps",
    startDate: new Date(2023, 5, 11),
    endDate: new Date(2023, 5, 12),
    priority: "Haute",
    assignedTo: "Équipe QC",
    status: "Planifié",
  },
  {
    id: "5",
    title: "Emballage - Commande client #4567",
    startDate: new Date(2023, 5, 13),
    endDate: new Date(2023, 5, 14),
    priority: "Moyenne",
    assignedTo: "Équipe D",
    status: "Planifié",
  },
]

const teams = ["Équipe A", "Équipe B", "Équipe C", "Équipe D", "Équipe QC"]
const priorities = ["Haute", "Moyenne", "Basse"]
const statuses = ["Planifié", "En cours", "Terminé", "Retardé"]

export function ProductionPlanning() {
  const [tasks, setTasks] = useState(initialTasks)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [newTask, setNewTask] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    priority: "Moyenne",
    assignedTo: "",
    status: "Planifié",
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddTask = () => {
    const id = (tasks.length + 1).toString()
    setTasks([...tasks, { id, ...newTask }])
    setNewTask({
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      priority: "Moyenne",
      assignedTo: "",
      status: "Planifié",
    })
    setDialogOpen(false)
  }

  const filteredTasks = date
    ? tasks.filter(
        (task) =>
          (task.startDate <= date && task.endDate >= date) ||
          format(task.startDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") ||
          format(task.endDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
      )
    : tasks

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "text-red-600"
      case "Moyenne":
        return "text-amber-600"
      case "Basse":
        return "text-green-600"
      default:
        return ""
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Calendrier</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" locale={fr} />
          <div className="mt-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une tâche
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
                  <DialogDescription>Remplissez les informations de la tâche ci-dessous.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Titre
                    </Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Date de début
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !newTask.startDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newTask.startDate ? (
                              format(newTask.startDate, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newTask.startDate}
                            onSelect={(date) => date && setNewTask({ ...newTask, startDate: date })}
                            initialFocus
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      Date de fin
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !newTask.endDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newTask.endDate ? (
                              format(newTask.endDate, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newTask.endDate}
                            onSelect={(date) => date && setNewTask({ ...newTask, endDate: date })}
                            initialFocus
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priorité
                    </Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner une priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assignedTo" className="text-right">
                      Assigné à
                    </Label>
                    <Select
                      value={newTask.assignedTo}
                      onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner une équipe" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team} value={team}>
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Statut
                    </Label>
                    <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddTask}>
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {date ? `Tâches pour le ${format(date, "d MMMM yyyy", { locale: fr })}` : "Toutes les tâches"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Aucune tâche planifiée pour cette date</p>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="flex flex-col p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{task.title}</h3>
                    <span className={`font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Début:</span> {format(task.startDate, "d MMM yyyy", { locale: fr })}
                    </div>
                    <div>
                      <span className="font-medium">Fin:</span> {format(task.endDate, "d MMM yyyy", { locale: fr })}
                    </div>
                    <div>
                      <span className="font-medium">Assigné à:</span> {task.assignedTo}
                    </div>
                    <div>
                      <span className="font-medium">Statut:</span> {task.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

