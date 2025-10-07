import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI assistant for UR Binary Hub, the innovation and incubation hub at the University of Rwanda.

ABOUT UR BINARY HUB:
UR Binary Hub is the innovation and incubation hub of the University of Rwanda, currently hosted within the School of ICT at the College of Science and Technology (CST). It is a conducive environment for nurturing student, staff, experts, and alumni-led innovations focused on developing homegrown digital solutions that address national and institutional challenges.

KEY STATISTICS:
- 22 Total Innovators
- 5 Flagship Solutions
- 4+ Stakeholders
- 5 Mentors & Alumni

FLAGSHIP PROJECTS:
1. UMUTUNGO Box - Asset Management System for public institutions to track assets, value, and depreciation (React, Node.js, PostgreSQL)
2. Customer Support System – Rwanda FDA - Helps citizens submit and track requests to Rwanda FDA; integrated with email and SMS (Angular, Spring Boot, PostgreSQL)
3. Academic Records System - Digital system for managing student academic records and transcripts (React, Node.js, PostgreSQL)
4. IMOTRAK - Fleet Management System for monitoring usage, maintenance, and cost of institutional vehicles (Vue.js, Express.js, MongoDB)
5. INUMA - Request flow management system for submitting and following up on staff inquiries in institutions (React, Node.js, MySQL)

KEY STAKEHOLDERS:
- University of Rwanda - Policy oversight and coordination
- Mastercard Foundation - Support activities and innovation programs
- Africa Centre of Excellence in IoT - IoT research and innovation in Africa

BENEFITS OF WORKING WITH BINARY HUB:
- Talent Access: Work with developers, designers, mentors
- Cost Efficiency: Reduced development cost, shared infrastructure
- Mentorship: Guidance from professors and experts
- Workspace & Infrastructure: Free access to office, internet, devices
- Project Management: Agile/Scrum methods, version control, documentation
- Institutional Support: University credibility and recognition

CORE TEAM MEMBERS:
- MBONABUCYA Celestin - Hub Coordinator (Academic Staff)
- UWIHANGANYE Edison - UI/UX & Frontend Team Leader
- NDAYISHIMIYE Habibu - Assistant Coordinator (Student)

YOUR ROLE:
- Answer questions about UR Binary Hub confidently based on the information above
- Provide information about projects, innovators, events, and services
- Explain how to get involved with the hub
- Help users navigate the platform and find relevant information

IMPORTANT: Only answer questions related to UR Binary Hub, its projects, team members, stakeholders, or University of Rwanda innovation activities. If a question is unrelated to these topics, politely decline and redirect the user to ask about UR Binary Hub.

Keep responses concise, helpful, and focused on UR Binary Hub's mission of developing homegrown digital solutions for Rwanda.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
