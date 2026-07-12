import { createClient } from "./server";
import {
  Destination,
  University,
  Service,
  TestPrep,
  TeamMember,
  Branch,
  Testimonial,
  BlogPost
} from "@/lib/types/mock-data";

// 1. Fetch settings (singletons)
export async function getAnnouncementBar() {
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "announcement_bar")
      .single();
    return data?.value || null;
  } catch (e) {
    return null;
  }
}

// 2. Fetch Destinations
export async function getDestinations(): Promise<Destination[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("published", true)
      .order("order_index", { ascending: true });
    
    if (error || !data) return [];
    
    return data.map((d: any) => ({
      id: d.id,
      slug: d.slug,
      country: d.country,
      flagIcon: d.flag_icon,
      universitiesCount: d.universities_count,
      badge: d.badge,
      tagline: d.tagline,
      heroImage: d.hero_image,
      heroImageAlt: d.hero_image_alt,
      whyStudyText: d.why_study_text,
      whyStudyPoints: d.why_study_points,
      costOfLiving: d.cost_of_living,
      visaRequirements: d.visa_requirements,
      popularCourses: d.popular_courses
    }));
  } catch {
    return [];
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("slug", slug.toLowerCase())
      .eq("published", true)
      .single();
      
    if (error || !data) return null;
    
    return {
      id: data.id,
      slug: data.slug,
      country: data.country,
      flagIcon: data.flag_icon,
      universitiesCount: data.universities_count,
      badge: data.badge,
      tagline: data.tagline,
      heroImage: data.hero_image,
      heroImageAlt: data.hero_image_alt,
      whyStudyText: data.why_study_text,
      whyStudyPoints: data.why_study_points,
      costOfLiving: data.cost_of_living,
      visaRequirements: data.visa_requirements,
      popularCourses: data.popular_courses
    };
  } catch {
    return null;
  }
}

// 3. Fetch Universities
export async function getUniversities(country?: string): Promise<University[]> {
  const supabase = createClient();
  try {
    let query = supabase.from("universities").select("*").eq("published", true);
    if (country) {
      query = query.eq("country", country);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    
    return data.map((u: any) => ({
      id: u.id,
      slug: u.slug,
      name: u.name,
      country: u.country,
      city: u.city,
      logo: u.logo,
      aboutText: u.about_text,
      coursesOffered: u.courses_offered,
      admissionRequirements: u.admission_requirements,
      galleryImages: u.gallery_images,
      isFeatured: u.is_featured
    }));
  } catch {
    return [];
  }
}

export async function getUniversityBySlug(slug: string): Promise<University | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("universities")
      .select("*")
      .eq("slug", slug.toLowerCase())
      .eq("published", true)
      .single();
      
    if (error || !data) return null;
    
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      country: data.country,
      city: data.city,
      logo: data.logo,
      aboutText: data.about_text,
      coursesOffered: data.courses_offered,
      admissionRequirements: data.admission_requirements,
      galleryImages: data.gallery_images,
      isFeatured: data.is_featured
    };
  } catch {
    return null;
  }
}

// 4. Fetch Services
export async function getServices(): Promise<Service[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("order_index", { ascending: true });
      
    if (error || !data) return [];
    
    return data.map((s: any) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      shortDesc: s.short_desc,
      detailedContent: s.detailed_content,
      iconName: s.icon_name,
      processSteps: s.process_steps
    }));
  } catch {
    return [];
  }
}

// 5. Fetch Test Prep Programs
export async function getTestPreps(): Promise<TestPrep[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("test_prep_programs")
      .select("*")
      .eq("published", true);
      
    if (error || !data) return [];
    
    return data.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      overview: p.overview,
      syllabusPoints: p.syllabus_points,
      duration: p.duration,
      pricing: p.pricing,
      classSchedule: p.class_schedule,
      faq: p.faq
    }));
  } catch {
    return [];
  }
}

export async function getTestPrepBySlug(slug: string): Promise<TestPrep | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("test_prep_programs")
      .select("*")
      .eq("slug", slug.toLowerCase())
      .eq("published", true)
      .single();
      
    if (error || !data) return null;
    
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      tagline: data.tagline,
      overview: data.overview,
      syllabusPoints: data.syllabus_points,
      duration: data.duration,
      pricing: data.pricing,
      classSchedule: data.class_schedule,
      faq: data.faq
    };
  } catch {
    return null;
  }
}

// 6. Fetch Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("published", true)
      .order("order_index", { ascending: true });
      
    if (error || !data) return [];
    
    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      bio: t.bio,
      image: t.image
    }));
  } catch {
    return [];
  }
}

// 7. Fetch Branches
export async function getBranches(): Promise<Branch[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .order("order_index", { ascending: true });
      
    if (error || !data) return [];
    
    return data.map((b: any) => ({
      id: b.id,
      name: b.name,
      address: b.address,
      phone: b.phone,
      telephone: b.telephone || "",
      email: b.email,
      mapIframe: b.map_iframe
    }));
  } catch {
    return [];
  }
}

// 8. Fetch Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true);
      
    if (error || !data) return [];
    
    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      destination: t.destination,
      initials: t.initials,
      quote: t.quote,
      rating: t.rating
    }));
  } catch {
    return [];
  }
}

// 9. Fetch Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
      
    if (error || !data) return [];
    
    return data.map((b: any) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      date: b.date,
      author: b.author,
      readTime: b.read_time
    }));
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug.toLowerCase())
      .eq("published", true)
      .single();
      
    if (error || !data) return null;
    
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      date: data.date,
      author: data.author,
      readTime: data.read_time
    };
  } catch {
    return null;
  }
}
