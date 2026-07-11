import React from "react";
import { getUniversities } from "@/lib/supabase/queries";
import UniversitiesListClient from "@/components/site/universities-list-client";

export default async function UniversitiesPage() {
  const universities = await getUniversities();
  return <UniversitiesListClient initialUniversities={universities} />;
}
