import { createClient } from "npm:@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ApplicationStatus = "submitted" | "accepted" | "rejected";

const messages: Record<ApplicationStatus, { subject: string; heading: string; body: string }> = {
  submitted: {
    subject: "Application received | UR Binary Hub",
    heading: "We received your application",
    body: "Thank you for applying to UR Binary Hub. Our team will review your application and contact you with an update.",
  },
  accepted: {
    subject: "Congratulations! Your UR Binary Hub application was accepted",
    heading: "Congratulations, your application was accepted!",
    body: "We are excited to welcome you to UR Binary Hub. Our team will share the next steps with you soon.",
  },
  rejected: {
    subject: "Update on your UR Binary Hub application",
    heading: "Thank you for applying",
    body: "We appreciate the time and thought you put into your application. Unfortunately, we are unable to move forward with it at this time. We encourage you to stay connected with UR Binary Hub and apply again when future opportunities open.",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("APPLICATION_FROM_EMAIL") || "UR Binary Hub <onboarding@resend.dev>";

    if (!authHeader || !resendApiKey) {
      return new Response(JSON.stringify({ error: "Email service is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: role } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!role) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { applicationId, status } = await req.json() as { applicationId?: string; status?: ApplicationStatus };
    if (!applicationId || !status || !messages[status]) {
      return new Response(JSON.stringify({ error: "applicationId and a supported status are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: application, error: applicationError } = await adminClient
      .from("applications")
      .select("applicant_name, applicant_email")
      .eq("id", applicationId)
      .single();

    if (applicationError || !application?.applicant_email) {
      return new Response(JSON.stringify({ error: "Applicant email was not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const message = messages[status];
    const recipientName = application.applicant_name || "Applicant";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #172033;">
        <h1 style="color: #00628b;">${message.heading}</h1>
        <p>Hello ${recipientName},</p>
        <p>${message.body}</p>
        <p>Regards,<br />UR Binary Hub</p>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [application.applicant_email],
        subject: message.subject,
        html,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend error:", errorText);
      return new Response(JSON.stringify({ error: "Email provider rejected the message" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Application email error:", error);
    return new Response(JSON.stringify({ error: "Unable to send application email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
