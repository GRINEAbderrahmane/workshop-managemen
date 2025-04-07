"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Palette } from "lucide-react"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(color)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)

      // Add colors
      gradient.addColorStop(0, "rgb(255, 0, 0)")
      gradient.addColorStop(1 / 6, "rgb(255, 255, 0)")
      gradient.addColorStop(2 / 6, "rgb(0, 255, 0)")
      gradient.addColorStop(3 / 6, "rgb(0, 255, 255)")
      gradient.addColorStop(4 / 6, "rgb(0, 0, 255)")
      gradient.addColorStop(5 / 6, "rgb(255, 0, 255)")
      gradient.addColorStop(1, "rgb(255, 0, 0)")

      // Fill with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create vertical gradient (white to transparent to black)
      const verticalGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      verticalGradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      verticalGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)")
      verticalGradient.addColorStop(0.5, "rgba(0, 0, 0, 0)")
      verticalGradient.addColorStop(1, "rgba(0, 0, 0, 1)")

      ctx.fillStyle = verticalGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [isOpen])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(x, y, 1, 1).data
    const r = imageData[0]
    const g = imageData[1]
    const b = imageData[2]

    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
    onChange(hex)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      onChange(e.target.value)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer">
          <div className="flex items-center gap-2 w-full">
            <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: color }} />
            <span>{color}</span>
          </div>
          <Palette className="h-4 w-4 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="w-full h-40 rounded cursor-crosshair"
            onClick={handleCanvasClick}
          />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: color }} />
            <Input value={inputValue} onChange={handleInputChange} className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

