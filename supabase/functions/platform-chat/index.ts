import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

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
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch real-time data from database
    const [projectsData, innovatorsData, stakeholdersData] = await Promise.all([
      supabase.from("projects").select("*").limit(10),
      supabase.from("innovators").select("*, skills:innovator_skills(skill)").limit(10),
      supabase.from("stakeholders").select("*").limit(10),
    ]);

    const projects = projectsData.data || [];
    const innovators = innovatorsData.data || [];
    const stakeholders = stakeholdersData.data || [];

    // Build dynamic context from database
    const projectsList = projects.map(p => 
      `- **${p.title}** (${p.category || 'N/A'}) - ${p.description}`
    ).join('\n');

    const innovatorsList = innovators.map(i => 
      `- **${i.name}** - ${i.role} (${i.department || 'N/A'})`
    ).join('\n');

    const stakeholdersList = stakeholders.map(s => 
      `- **${s.name}** (${s.category}) - ${s.contribution}`
    ).join('\n');

    const systemPrompt = `You are a knowledgeable AI assistant for UR Binary Hub, the innovation and incubation hub at the University of Rwanda. You are an EXPERT on Binary Hub and ANSWER questions - you don't ask users to teach you.

ABOUT UR BINARY HUB:
UR Binary Hub is the innovation and incubation hub of the University of Rwanda, currently hosted within the School of ICT at the College of Science and Technology (CST). It is a conducive environment for nurturing student, staff, experts, and alumni-led innovations focused on developing homegrown digital solutions that address national and institutional challenges.

Website: https://urbinaryhub.rw
Additional info: https://binaryhub.codewithedison.com

CURRENT DATA FROM DATABASE:

**PROJECTS (${projects.length} total):**
${projectsList || 'No projects available'}

**TEAM MEMBERS (${innovators.length} total):**
${innovatorsList || 'No team members available'}

**STAKEHOLDERS (${stakeholders.length} total):**
${stakeholdersList || 'No stakeholders available'}

BENEFITS OF WORKING WITH BINARY HUB:
- **Talent Access:** Work with developers, designers, mentors
- **Cost Efficiency:** Reduced development cost, shared infrastructure
- **Mentorship:** Guidance from professors and experts
- **Workspace & Infrastructure:** Free access to office, internet, devices
- **Project Management:** Agile/Scrum methods, version control, documentation
- **Institutional Support:** University credibility and recognition

RESPONSE FORMATTING RULES:
1. Use **bold text** for important terms, names, numbers, and key information
2. Use bullet points with - for lists
3. Format numbers and statistics clearly (e.g., "**5 flagship solutions**", "**22 innovators**")
4. Make responses engaging and easy to scan
5. Use proper paragraphs and spacing

YOUR ROLE - CRITICAL INSTRUCTIONS:
- You are THE EXPERT - answer questions confidently using the data provided above
- NEVER ask users to tell you about Binary Hub - YOU tell THEM
- When greeted, respond warmly and offer to help them learn about Binary Hub
- Provide specific information about projects, innovators, events, and services
- Explain how to get involved with the hub
- Direct users to specific pages when relevant (About, Innovators, Contact, Projects)

IMPORTANT: Only answer questions related to UR Binary Hub, its projects, team members, stakeholders, or University of Rwanda innovation activities. If a question is unrelated to these topics, politely decline and redirect the user to ask about UR Binary Hub.

Keep responses concise, helpful, well-formatted, and focused on UR Binary Hub's mission.`;

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
