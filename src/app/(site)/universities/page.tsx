import { getUniversities } from "@/lib/supabase/queries";
import UniversitiesListClient from "@/components/site/universities-list-client";

export const metadata = {
  title: "Partner Universities & Global Colleges | Downtown Consultancy",
  description: "Browse our list of partner universities and top-tier colleges across Australia, Canada, USA, UK, and New Zealand. View courses, admissions, and requirements.",
};

export default async function UniversitiesPage() {
  const universities = await getUniversities();
  return <UniversitiesListClient initialUniversities={universities} />;
}
