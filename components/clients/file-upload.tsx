"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileImage, X } from "lucide-react"

interface FileUploadProps {
  id: string
  accept?: string
  onChange?: (file: File | null) => void
}

export function FileUpload({ id, accept, onChange }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFileName(file.name)
      onChange?.(file)
    } else {
      setFileName(null)
      onChange?.(null)
    }
  }

  const handleClear = () => {
    setFileName(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    onChange?.(null)
  }

  return (
    <div className="flex items-center gap-2">
      <input type="file" id={id} accept={accept} onChange={handleFileChange} ref={inputRef} className="sr-only" />
      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} className="flex-1">
        {fileName ? (
          <span className="truncate max-w-[200px]">{fileName}</span>
        ) : (
          <>
            <FileImage className="mr-2 h-4 w-4" />
            Choisir un fichier
          </>
        )}
      </Button>
      {fileName && (
        <Button type="button" variant="ghost" size="icon" onClick={handleClear}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

