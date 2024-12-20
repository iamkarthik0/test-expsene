import { auth } from "@/auth";
import { ContentLayout } from "@/components/layout/navbar/content-layout";

import { Hero } from "@/components/shared/dashboard/Hero";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <ContentLayout title="Dashboard">
        <Hero />
      </ContentLayout>
    </div>
  );
}
