"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"


const categories = ["Business Income"] as const
const paymentMethods = ["VISA", "MASTER", "CASH", "eTRANSFER", "CHECK", "PAYPAL"] as const

const formSchema = z.object({
  invoiceDate: z.string().min(1, "Date is required"),
  month: z.string(),
  description: z.string().min(2, "Description must be at least 2 characters"),
  category: z.enum(categories, {
    required_error: "Please select a category",
  }),
  totalAmount: z.string().min(1, "Amount is required"),
  tax: z.string(),
  paymentMethod: z.enum(paymentMethods, {
    required_error: "Please select a payment method",
  }),
  type: z.enum(["expense", "income"])
})

type FormValues = z.infer<typeof formSchema>

interface ExpenseFormDialogProps {
  type: 'expense' | 'income'
  initialData?: FormValues
  trigger: React.ReactNode
  onSubmit: (data: FormValues) => void
}

export function ExpenseFormDialog({ 
  type, 
  initialData, 
  trigger,
  onSubmit 
}: ExpenseFormDialogProps) {
  const [open, setOpen] = useState(false)

  const defaultValues: Partial<FormValues> = {
    invoiceDate: initialData?.invoiceDate || new Date().toISOString().split('T')[0],
    month: initialData?.month || new Date().toLocaleString('default', { month: 'long' }),
    description: initialData?.description || "",
    category: categories[0],
    totalAmount: initialData?.totalAmount || "",
    tax: initialData?.tax || "",
    paymentMethod: initialData?.paymentMethod || "eTRANSFER",
    type: type
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleSubmit = (data: FormValues) => {
    onSubmit(data)
    setOpen(false)
    form.reset()
    toast.success(`${type} ${initialData ? 'updated' : 'added'} successfully!`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto  ">
        <DialogHeader>
          <DialogTitle>{initialData ? 'EDIT' : 'ADD'} {type.toUpperCase()}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="number"
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl >
                    <Input 
                      type="date"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        const date = new Date(e.target.value)
                        const month = date.toLocaleString('default', { month: 'long' })
                        form.setValue('month', month)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter description"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>Business Income</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Payment Method</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {initialData ? 'UPDATE' : 'ADD'} {type.toUpperCase()}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}