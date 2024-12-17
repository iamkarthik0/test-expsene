import { ContentLayout } from "@/components/layout/navbar/content-layout";
import { Hero } from "@/components/shared/dashboard/Hero";
import React from "react";

export default function page() {
  return (
    <div>
      <ContentLayout title="Dashboard">
        <Hero />
        <h1 className=" h2">
          asdasda
        </h1>
      </ContentLayout>
    </div>
  );
}
