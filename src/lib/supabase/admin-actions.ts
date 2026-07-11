"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ── Generic toggle published ──
export async function togglePublished(table: string, id: string, published: boolean) {
  const supabase = createClient();
  await supabase.from(table).update({ published }).eq("id", id);
  revalidatePath("/studio");
}

// ── Generic delete row ──
export async function deleteRow(table: string, id: string) {
  const supabase = createClient();
  await supabase.from(table).delete().eq("id", id);
  revalidatePath("/studio");
}

// ── Destinations ──
export async function upsertDestination(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    slug: data.slug,
    country: data.country,
    flag_icon: data.flagIcon,
    universities_count: data.universitiesCount,
    badge: data.badge,
    tagline: data.tagline,
    hero_image: data.heroImage,
    why_study_text: data.whyStudyText,
    why_study_points: data.whyStudyPoints || [],
    cost_of_living: data.costOfLiving || {},
    visa_requirements: data.visaRequirements || [],
    popular_courses: data.popularCourses || [],
    published: data.published ?? true,
    order_index: data.orderIndex ?? 0,
    hero_image_alt: data.heroImageAlt || "Destination Skyline",
  };

  if (id) {
    const { error } = await supabase.from("destinations").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("destinations").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/destinations");
  revalidatePath("/");
}

// ── Universities ──
export async function upsertUniversity(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    slug: data.slug,
    name: data.name,
    country: data.country,
    city: data.city,
    logo: data.logo,
    about_text: data.aboutText,
    courses_offered: data.coursesOffered || [],
    admission_requirements: data.admissionRequirements || [],
    gallery_images: data.galleryImages || [],
    is_featured: data.isFeatured ?? false,
    published: data.published ?? true,
    logo_alt: data.logoAlt || "University Logo",
    gallery_images_alts: data.galleryImagesAlts || [],
  };

  if (id) {
    const { error } = await supabase.from("universities").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("universities").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/universities");
  revalidatePath("/universities");
}

// ── Services ──
export async function upsertService(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    slug: data.slug,
    title: data.title,
    short_desc: data.shortDesc,
    detailed_content: data.detailedContent,
    icon_name: data.iconName,
    process_steps: data.processSteps || [],
    published: data.published ?? true,
    order_index: data.orderIndex ?? 0,
  };

  if (id) {
    const { error } = await supabase.from("services").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("services").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/services");
  revalidatePath("/services");
}

// ── Test Prep Programs ──
export async function upsertTestPrep(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    slug: data.slug,
    name: data.name,
    tagline: data.tagline,
    overview: data.overview,
    syllabus_points: data.syllabusPoints || [],
    duration: data.duration,
    pricing: data.pricing,
    class_schedule: data.classSchedule || [],
    faq: data.faq || [],
    published: data.published ?? true,
  };

  if (id) {
    const { error } = await supabase.from("test_prep_programs").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("test_prep_programs").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/test-prep");
}

// ── Team Members ──
export async function upsertTeamMember(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    name: data.name,
    role: data.role,
    bio: data.bio,
    image: data.image,
    order_index: data.orderIndex ?? 0,
    published: data.published ?? true,
    image_alt: data.imageAlt || "Team Member Photo",
  };

  if (id) {
    const { error } = await supabase.from("team_members").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("team_members").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/team");
  revalidatePath("/about-us");
}

// ── Branches ──
export async function upsertBranch(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    name: data.name,
    address: data.address,
    phone: data.phone,
    email: data.email,
    map_iframe: data.mapIframe,
    order_index: data.orderIndex ?? 0,
  };

  if (id) {
    const { error } = await supabase.from("branches").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("branches").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/branches");
  revalidatePath("/contact-us");
}

// ── Testimonials ──
export async function upsertTestimonial(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    name: data.name,
    destination: data.destination,
    initials: data.initials,
    quote: data.quote,
    rating: data.rating ?? 5,
    published: data.published ?? true,
    featured: data.featured ?? false,
  };

  if (id) {
    const { error } = await supabase.from("testimonials").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("testimonials").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/testimonials");
  revalidatePath("/reviews");
}

// ── Blog Posts ──
export async function upsertBlogPost(id: string | null, data: any) {
  const supabase = createClient();
  const row = {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    date: data.date,
    author: data.author,
    read_time: data.readTime,
    published: data.published ?? true,
  };

  if (id) {
    const { error } = await supabase.from("blog_posts").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("blog_posts").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/studio/blog");
  revalidatePath("/blog");
}

// ── Inquiries status update ──
export async function updateInquiryStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/studio/inquiries");
  revalidatePath("/studio");
}

// ── Site Settings ──
export async function updateSiteSetting(key: string, value: any) {
  const supabase = createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw new Error(error.message);
  revalidatePath("/studio/settings");
  revalidatePath("/");
}
