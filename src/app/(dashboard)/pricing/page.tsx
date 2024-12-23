import { ContentLayout } from "@/components/layout/navbar/content-layout";
import Hero from "@/components/shared/pricing/Hero";
import React from "react";

export default function page() {
  return (
    <div>
      <ContentLayout title="Pricing">
        <Hero />
      </ContentLayout>
    </div>
  );
}
