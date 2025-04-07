"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    commandes: 40,
    production: 24,
    livraisons: 18,
  },
  {
    name: "Fév",
    commandes: 30,
    production: 28,
    livraisons: 22,
  },
  {
    name: "Mar",
    commandes: 45,
    production: 35,
    livraisons: 30,
  },
  {
    name: "Avr",
    commandes: 50,
    production: 40,
    livraisons: 35,
  },
  {
    name: "Mai",
    commandes: 55,
    production: 45,
    livraisons: 40,
  },
  {
    name: "Juin",
    commandes: 60,
    production: 50,
    livraisons: 45,
  },
  {
    name: "Juil",
    commandes: 65,
    production: 55,
    livraisons: 50,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="commandes" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="production" fill="#82ca9d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="livraisons" fill="#ffc658" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

