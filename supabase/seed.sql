-- seed.sql: Initial seed dataset representing realistic consultancy data models

-- 1. Site Settings singleton keys
insert into public.site_settings (key, value) values (
  'announcement_bar',
  '{"text": "Bookings open for Fall 2026 Admissions. Register for our upcoming Mega Education Fair this Sunday!", "link_text": "Register Now", "link_url": "/fair", "enabled": true}'
) on conflict (key) do update set value = excluded.value;

insert into public.site_settings (key, value) values (
  'contact_numbers',
  '{"mobile": "+9779841307624", "telephone": "014500099", "email": "info@downtown.edu.np", "whatsapp": "+9779841307624", "address": "Dillibazar-30, Kathmandu 44600", "map_iframe": "https://maps.google.com/maps?q=27.7054777,85.3258023&z=17&output=embed"}'
) on conflict (key) do update set value = excluded.value;

insert into public.site_settings (key, value) values (
  'social_links',
  '{"facebook": "https://www.facebook.com/share/1BH5RJdhKR/?mibextid=wwXIfr", "instagram": "https://www.instagram.com/down_townedu?igsh=MWk2dHVjOThvajZqdQ==", "tiktok": "https://www.tiktok.com/@downtownedu?_r=1&_t=ZS-97weHFVTLgf"}'
) on conflict (key) do update set value = excluded.value;

-- 2. Destinations
insert into public.destinations (
  slug, country, flag_icon, universities_count, badge, tagline, hero_image, why_study_text, why_study_points, cost_of_living, visa_requirements, popular_courses, published, order_index
) values (
  'australia',
  'Australia',
  '🇦🇺',
  '42',
  'Most Popular',
  'Study in Australia: World-Class Education & Vibrant Student Life',
  '/images/destinations/australia.jpg',
  'Australia offers high-quality qualifications, excellent support services for international students, and opportunities to gain work experience while studying. It is renowned for its world-class research institutes and highly livable cities.',
  array[
    'Universities consistently ranked in the global Top 100.',
    'Up to 2-4 years of post-study work rights depending on study location.',
    'Work up to 48 hours per fortnight during study semesters.',
    'High standard of living and multicultural society.'
  ],
  '{"rent": "AUD 180 - AUD 440 per week", "food": "AUD 80 - AUD 200 per week", "transport": "AUD 30 - AUD 70 per week", "overallEstimate": "AUD 21,041 per year (standard student visa minimum)"}'::jsonb,
  '[
    {"title": "Confirmation of Enrolment (CoE)", "details": "An official document issued by your university confirming you have accepted their offer and paid the deposit."},
    {"title": "Genuine Student (GS) Requirement", "details": "Evidence demonstrating your true intention to study in Australia, including educational background, local ties, and career goals."},
    {"title": "Financial Capacity Documentation", "details": "Proof of funds covering one year of tuition fees, living costs, travel expenses, and health insurance."},
    {"title": "English Language Proficiency", "details": "Minimum scores in tests like IELTS (typically 6.0 or 6.5) or PTE Academic (58 or higher)."}
  ]'::jsonb,
  array['Information Technology', 'Business & MBA', 'Nursing & Public Health', 'Engineering', 'Hospitality Management'],
  true,
  0
) on conflict (slug) do nothing;

-- 3. Universities
insert into public.universities (
  slug, name, country, city, logo, about_text, courses_offered, admission_requirements, gallery_images, is_featured, published
) values (
  'anu-australia',
  'Australian National University (ANU)',
  'Australia',
  'Canberra',
  'ANU',
  'The Australian National University is a world-leading university in Australia''s capital city, Canberra. ANU is consistently ranked among the top universities globally and is renowned for its intensive research and academic excellence.',
  array[
    'Bachelor of Information Technology',
    'Bachelor of Finance',
    'Master of Computing (Advanced)',
    'Master of Business Administration (MBA)',
    'Master of Public Health'
  ],
  array[
    'Academic: Minimum 70% equivalent in High School (for Bachelor''s) or 2.8+ GPA in Bachelor''s (for Master''s).',
    'English: IELTS Academic 6.5 overall (minimum 6.0 in each band) or PTE Academic 58+ overall.'
  ],
  array[
    '/images/univ/anu-1.jpg',
    '/images/univ/anu-2.jpg'
  ],
  true,
  true
) on conflict (slug) do nothing;

-- 4. Services
insert into public.services (
  slug, title, short_desc, detailed_content, icon_name, process_steps, published, order_index
) values (
  'test-prep',
  'Test Preparation',
  'Intensive coaching for IELTS, PTE, TOEFL, and SAT with experienced trainers.',
  'Securing a top score in standard proficiency tests is a crucial step towards your admission and visa. We offer daily structured classes, mock exams under exact testing setups, and specialized material to prepare you.',
  'GraduationCap',
  array[
    'Diagnostic Assessment: Free test on enrollment to track initial capabilities.',
    'Strategic Coaching: Conceptual training on test parameters with expert trainers.',
    'Mock Tests: Full length mock tests every Sunday with detailed scoring reviews.',
    'Performance Counseling: Personalized feedback to bridge learning gaps.'
  ],
  true,
  0
) on conflict (slug) do nothing;

-- 5. Test Preparation Programs
insert into public.test_prep_programs (
  slug, name, tagline, overview, syllabus_points, duration, pricing, class_schedule, faq, published
) values (
  'ielts',
  'IELTS Academic',
  'IELTS Masterclass: Achieve Your Target Band (7.0+ Overall)',
  'The International English Language Testing System (IELTS) is the world''s most popular English language proficiency test for higher education and global migration. Our program focuses on advanced strategies across Listening, Reading, Writing, and Speaking.',
  array[
    'Listening: Practice on audio accents, maps labeling, and matching lists.',
    'Reading: Skimming and scanning techniques, understanding ''True/False/Not Given''.',
    'Writing: Task 1 (Report writing for charts/diagrams) & Task 2 (Opinion/Discussion essays).',
    'Speaking: Mock speaking assessments, interactive vocabulary training, and fluency drills.'
  ],
  '6 Weeks (Sun - Fri)',
  'NPR 5,500 (Including study materials & mock tests)',
  '[
    {"batch": "Morning Batch A", "timing": "7:00 AM - 8:30 AM", "instructor": "Mr. Prabin Shrestha"},
    {"batch": "Morning Batch B", "timing": "9:00 AM - 10:30 AM", "instructor": "Mr. Prabin Shrestha"},
    {"batch": "Afternoon Batch", "timing": "1:00 PM - 2:30 PM", "instructor": "Mrs. Alina Subedi"},
    {"batch": "Evening Batch", "timing": "5:00 PM - 6:30 PM", "instructor": "Mr. Ramesh Karki"}
  ]'::jsonb,
  '[
    {"question": "How long is the IELTS test score valid?", "answer": "Your IELTS test score is valid for 2 years from the date of the test."},
    {"question": "Does the course fee cover test registration?", "answer": "No, the course fee only covers classes, study materials, and mock tests. Test registration fees must be paid separately to British Council or IDP."},
    {"question": "Are mock tests conducted regularly?", "answer": "Yes, we conduct full-length mock tests every Sunday morning, replicating actual test conditions with descriptive reviews."}
  ]'::jsonb,
  true
) on conflict (slug) do nothing;

-- 6. Team Members
insert into public.team_members (
  name, role, bio, image, order_index, published
) values (
  'Raju Niroula',
  'Managing Director / Senior Counsellor',
  'Over 12 years of experience in student counseling. Raju is a qualified advisor specializing in USA and Canada admissions.',
  'RN',
  0,
  true
);

-- 7. Branches
insert into public.branches (
  name, address, phone, telephone, email, map_iframe, order_index
) values (
  'Downtown Educational Consultancy — Head Office',
  'Dillibazar-30, Kathmandu 44600',
  '+977-9841307624',
  '014500099',
  'info@downtown.edu.np',
  'https://www.google.com/maps?q=27.7054777,85.3258023&z=17&output=embed',
  0
);

-- 8. Testimonials
insert into public.testimonials (
  name, destination, initials, quote, rating, published, featured
) values (
  'Sajina Shrestha',
  'University of Technology Sydney (UTS), Australia',
  'SS',
  'Downtown Consultancy guided me so well throughout my visa application for Australia. Their visa guidance class helped me gain confidence for my GTE review. Highly recommended if you want transparent and honest processing.',
  5,
  true,
  true
);

-- 9. Blog Posts
insert into public.blog_posts (
  slug, title, excerpt, content, category, date, author, read_time, published
) values (
  'australia-visa-guide',
  'Essential Guide to Australia Student Visas for Fall 2026',
  'Everything you need to know about the latest visa guidelines, financial requirements, and GTE criteria for Nepali students.',
  '<p>Australia has introduced major changes to its international student visa framework. The previous GTE (Genuine Temporary Entrant) has transitioned, and embassy criteria are stricter regarding student ties, income validation, and program continuity.</p><h4>Key updates you should prepare for:</h4><ul><li><strong>GS (Genuine Student) Requirements:</strong> Detailed questionnaire replacing the old SOP structure.</li><li><strong>Financial Funds:</strong> Evidence of at least AUD 21,041 for living costs.</li><li><strong>Sponsor Verification:</strong> Tax reviews and bank validation.</li></ul><p>Consult with our QEAC directors before filing your application to confirm details match current guidelines.</p>',
  'Visa Guide',
  'Jul 10, 2026',
  'Prabin Shrestha',
  '5 Min Read',
  true
) on conflict (slug) do nothing;

-- 10. Inquiries
insert into public.inquiries (
  name, email, phone, message, source_page, destination_interest, status
) values (
  'Demo Student',
  'student@example.com',
  '+9779800000000',
  'This is a seed demo inquiry. I want to check eligibility for Australia MS in IT.',
  'home_page',
  'australia',
  'pending'
);
