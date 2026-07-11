"use server";

import { resend } from "@/lib/resend";
import { createClient } from "@/lib/supabase/server";

export async function submitInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const destinationInterest = formData.get("destination") as string;
  const sourcePage = formData.get("sourcePage") as string;

  // Spam Honeypot Protection
  const website = formData.get("website") as string;
  if (website && website.trim().length > 0) {
    console.warn("Honeypot filled! Silent rejection.");
    return { success: true, message: "Thank you for your submission." };
  }

  // Minimum time-to-submit check (2 seconds)
  const formLoadTime = formData.get("formLoadTime") as string;
  if (formLoadTime) {
    const loadTime = parseInt(formLoadTime);
    const now = Date.now();
    if (now - loadTime < 2000) {
      console.warn(`Spam speed check triggered: submitted in ${now - loadTime}ms. Silent rejection.`);
      return { success: true, message: "Thank you for your submission." };
    }
  }

  // 1. Supabase Client & Duplicate Prevention check
  const supabase = createClient();
  const fifteenSecondsAgo = new Date(Date.now() - 15000).toISOString();
  
  try {
    const { data: recent } = await supabase
      .from("inquiries")
      .select("id")
      .eq("email", email)
      .gte("created_at", fifteenSecondsAgo)
      .limit(1);

    if (recent && recent.length > 0) {
      console.warn("Duplicate inquiry submission within 15 seconds. Skipping emails, returning success.");
      return { success: true, message: "Thank you for your submission." };
    }
  } catch (err) {
    console.error("Duplicate check lookup failed:", err);
  }

  // 2. Insert row into public.inquiries
  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      name,
      email,
      phone,
      message,
      source_page: sourcePage || "Direct Website Visit",
      destination_interest: destinationInterest || null,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to save inquiry to database:", error);
    throw new Error(`Database error: ${error.message}`);
  }

  // 3. Send Notification & Auto-reply emails via Resend
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@downtown.edu.np";
  const notifyEmail = process.env.RESEND_NOTIFY_EMAIL || "noreply@downtown.edu.np";

  try {
    // 3a. Send staff notification email
    const staffHtml = `
      <h2>New Lead Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Destination Interest:</strong> ${destinationInterest || "General Inquiry"}</p>
      <p><strong>Source Page:</strong> ${sourcePage}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f1f5f9; padding: 15px; border-left: 4px solid #1E3A8A; margin: 10px 0;">
        ${message}
      </blockquote>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;

    // Send notification
    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      subject: `[Lead Inquiry] ${name} - ${destinationInterest || "General"}`,
      html: staffHtml,
    });

    // 3b. Send client auto-reply email with branded HTML
    const clientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Inquiry Received</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
          .header { background-color: #1e3a8a; padding: 32px; text-align: center; border-bottom: 4px solid #f97316; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .content { padding: 40px 32px; line-height: 1.6; }
          .content h2 { color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0; }
          .content p { font-size: 15px; margin-bottom: 24px; color: #475569; }
          .details-box { background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #f1f5f9; margin-bottom: 24px; }
          .details-box h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin: 0 0 12px 0; font-weight: 700; }
          .detail-item { font-size: 14px; margin-bottom: 8px; color: #334155; }
          .detail-item strong { color: #1e3a8a; }
          .footer { background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
          .footer p { margin: 4px 0; }
          .brand-accent-text { color: #f97316; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Downtown Educational Consultancy</h1>
          </div>
          <div class="content">
            <h2>Dear ${name},</h2>
            <p>Thank you for reaching out to us. We have successfully received your inquiry and our counselling department is already reviewing your request.</p>
            
            <div class="details-box">
              <h3>Your Inquiry Details</h3>
              <div class="detail-item"><strong>Topic / Destination:</strong> ${destinationInterest || "General Study Abroad"}</div>
              <div class="detail-item"><strong>Source Page:</strong> ${sourcePage}</div>
            </div>

            <p>One of our certified country advisors will get in touch with you via email or phone within <strong>24 working hours</strong> to schedule your free counselling session.</p>
            
            <p>Warm regards,<br><span class="brand-accent-text">The Downtown Consultancy Team</span></p>
          </div>
          <div class="footer">
            <p><strong>Downtown Educational Consultancy</strong></p>
            <p>Kathmandu, Nepal | +977-1-4412345 | info@downtown.edu.np</p>
            <p>&copy; ${new Date().getFullYear()} Downtown Educational Consultancy. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Thank you for contacting Downtown Educational Consultancy",
      html: clientHtml,
    });
  } catch (emailErr) {
    // Tolerant check: don't fail the return if Resend fails, just log it
    console.error("Resend API calls failed to execute:", emailErr);
  }

  return { success: true, message: "Thank you for your submission." };
}

export async function replyToInquiry(
  inquiryId: string,
  recipientEmail: string,
  message: string
) {
  const supabase = createClient();

  // 1. Check permissions
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("Unauthorized: No session found");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    throw new Error("Unauthorized: Insufficient permissions");
  }

  // 2. Send Custom Email via Resend
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@downtown.edu.np";
  const { error: mailError } = await resend.emails.send({
    from: fromEmail,
    to: recipientEmail,
    subject: "Downtown Educational Consultancy - Update regarding your inquiry",
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #334155; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="background-color: #1e3a8a; padding: 20px; text-align: center; border-radius: 6px 6px 0 0; color: white;">
          <h2 style="margin: 0; font-size: 20px;">Downtown Educational Consultancy</h2>
        </div>
        <div style="padding: 24px; background: white;">
          <p style="white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; border-radius: 0 0 6px 6px;">
          <p><strong>Downtown Educational Consultancy</strong></p>
          <p>Kathmandu, Nepal | +977-1-4412345 | info@downtown.edu.np</p>
        </div>
      </div>
    `,
  });

  if (mailError) {
    console.error("Resend custom reply failed:", mailError);
    throw new Error(`Failed to send email: ${mailError.message}`);
  }

  // 3. Update Database Inquiries (keeping status unchanged, only updating reply metadata)
  const { error: dbError } = await supabase
    .from("inquiries")
    .update({
      replied_at: new Date().toISOString(),
      reply_message: message,
    })
    .eq("id", inquiryId);

  if (dbError) {
    console.error("Failed to update inquiry reply metadata:", dbError);
    throw new Error(`Database error: ${dbError.message}`);
  }

  return { success: true };
}
