import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceContentProps {
  tier: {
    id: string;
    name: string;
    description: string;
    price: string;
    features: string[];
    href: string;
  };
  duration: string;
  isActive?: boolean;
  href: string;
}

export const PriceContent = ({ tier, duration, isActive = false, href }: PriceContentProps) => {
  return (
    <div className="relative h-full w-full">
      <Card 
        key={tier.id} 
        className={cn(
          "flex flex-col h-full w-full transition-all duration-200 hover:shadow-xl",
          "border-2 hover:border-primary/50",
          tier.name === "Pro" && "border-primary/50 shadow-lg",
          isActive && "border-green-500 shadow-green-100"
        )}
      >
        {tier.name === "Pro" && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full dark:text-black text-white text-xs sm:text-sm font-medium whitespace-nowrap">
            Most Popular
          </div>
        )}
        {isActive && (
          <div className="absolute -top-4 right-2 sm:right-4 bg-green-500 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium whitespace-nowrap">
            Current Plan
          </div>
        )}
        <CardHeader className="flex-none space-y-2 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">{tier.name}</CardTitle>
          <CardDescription className="text-center text-gray-600 text-sm sm:text-base">{tier.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between space-y-4 sm:space-y-6 p-4 sm:p-6">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">
              {tier.price}
              <span className="text-xs sm:text-sm font-normal text-gray-600 ml-1">
                /{duration === "quarterly" ? "quarter" : duration}
              </span>
            </div>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-center text-gray-700">
                <Check className="text-primary mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex-none p-4 sm:p-6">
          {!isActive && (
            <Button 
              className={cn(
                "w-full text-xs sm:text-sm font-semibold py-4 sm:py-6",
                tier.name === "Pro" ? "bg-primary hover:bg-primary/90" : "bg-primary/10 hover:bg-primary/20 text-primary"
              )}
              asChild
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                {`Get Started with ${tier.name}`}
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
