import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDate() {
  const currentYear = new Date().getFullYear()
  const years = Array.from({length: 5}, (_, i) => currentYear - i)

  return (
    <Select defaultValue={currentYear.toString()}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{currentYear}</SelectLabel>
          {years.map(year => (
            <SelectItem key={year} value={year.toString()} className=" cursor-pointer">
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
