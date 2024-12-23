"use client";

import * as React from "react";
import { Crown } from "lucide-react";
import { PriceContent } from "./price-content";
import { useState } from "react";

const tiers = [
  {
    name: "Monthly",
    id: "tier-monthly",
    href: "https://buy.stripe.com/test_00g7ur2tY3WnduEcMM",
    price: "$10",
    description: "Pay month by month with flexibility.",
    duration: "monthly",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
  },
  {
    name: "3 Months",
    id: "tier-quarterly",
    href: "https://buy.stripe.com/test_9AQg0XgkO64vfCM8wy",
    price: "$29",
    description: "Save more with quarterly billing.",
    duration: "quarterly",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
  },
  {
    name: "Yearly",
    id: "tier-yearly",
    href: "https://buy.stripe.com/test_9AQ2a70lQ9gH3U43cd",
    price: "$99",
    description: "Maximum savings with annual billing.",
    duration: "yearly",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
      "Custom reporting tools",
    ],
  },
];

export default function Hero() {
  const [activePlan, setActivePlan] = useState("tier-monthly");
  const activeTier = tiers.find((tier) => tier.id === activePlan);
  

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Pricing Plans</h1>
        <div className="flex items-center gap-4 bg-gradient-to-br from-primary/10 to-primary/10 dark:from-primary/30 dark:to-primary/30 px-6 py-3 rounded-xl shadow-lg border border-primary/20 dark:border-primary/40 hover:shadow-xl transition-all duration-300">
          <Crown className="h-6 w-6 text-primary dark:text-primary/90" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-primary dark:text-primary/90">
              Current Plan
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary dark:text-primary/90">
                {activeTier?.name}
              </span>
              <div className="flex items-center px-2 py-0.5 bg-primary/10 dark:bg-primary/20 rounded-full">
                <span className="text-xs font-medium text-primary dark:text-primary/90">
                  {activeTier?.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => (
            <PriceContent
              key={tier.id}
              tier={tier}
              duration={tier.duration}
              isActive={tier.id === activePlan}
              href={tier.href}
            />
          ))}
        </div>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
        © 2024 X-Repo. All rights reserved.
      </footer>
    </div>
  );
}
