"use client";
import React from "react";



import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown, ChevronUp, SquareMinus, SquarePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/shared/dashboard/search-bar";
import { SelectDate } from "@/components/layout/SelectDate";
import InOut from "./in-out";
import { ExpenseFormDialog } from "./expense-form-dialog";


export const Hero = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 sm:flex-row sm:justify-between">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <SearchBar />
        </div>

        <div className="w-full sm:w-1/4 md:w-auto">
          <SelectDate/>
        </div>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-4 sm:space-y-6 md:space-y-8 "
      >
        <Card className="flex  sm:flex-row flex-col gap-8 justify-between p-4">
        <InOut />
          <div className="space-x-4 flex justify-center items-center">
            {" "}
            <div className="space-x-2">
            <ExpenseFormDialog
                type="income"
                trigger={
                  <Button variant="outline">
                    add Income
                    <SquarePlus />
                  </Button>
                }
                onSubmit={async (data) => {
                  // Here you'll call your server action
                  console.log("Income data:", data);
                  // Example server action call:
                  // await addExpenseAction(data)
                }}
              />
            </div>
            <CollapsibleTrigger>
              {" "}
              {isOpen ? (
                <ChevronUp className="w-8 h-8 " />
              ) : (
                <ChevronDown className="w-8 h-8" />
              )}
            </CollapsibleTrigger>
          </div>
        </Card>

        <CollapsibleContent>
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:justify-between">
            <div className="w-full sm:w-full md:w-[32%] lg:w-1/3">
   
            </div>
            <div className="w-full sm:w-full md:w-[32%] lg:w-1/3">
       
            </div>
            <div className="w-full sm:w-full md:w-[32%] lg:w-1/3">
  
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      {/* 
      ----------------------Table---------------------- */}

      <div>
 
      </div>
    </div>
  );
};
