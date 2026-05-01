// Edge function: AI chatbot grounded in the Strategic Market Analysis
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ANALYSIS_CONTEXT = `
You are an expert assistant grounded in the following Strategic Market Analysis comparing Cape Town and Pretoria for an automotive dealership expansion (2025/2026 data). Answer in plain English, concise and helpful. If asked something outside this analysis, say so politely.

KEY FACTS:
- South Africa 2025: 597,000 new vehicle registrations (+15.7% YoY). Dec 2025: 48,983 units (+19.2%).
- Drivers: 150bps rate cuts since Sept 2024, 1.5% vehicle price inflation, "two-pot" pension liquidity, pent-up demand.
- 61% of passenger market in R150k–R400k range.
- Top brands (Dec): Toyota 11,422 (~23.5% share), Volkswagen 4,832, Suzuki 4,514 (now #2 in SA, +22.5% growth), Hyundai 2,826, Ford 2,607, Chery 1,867.
- NEVs 2025: 16,716 units (vs 7,782 in 2024); hybrids 12,818 dominate.

CITY COMPARISON:
- Cape Town: Pop 4.77M, median household income R169,599, expenditure R248,539 (highest in SA), lowest metro unemployment, 13% of national vehicle theft, industrial rental growth 9%+, high reliability service delivery, discerning quality-focused buyers.
- Pretoria (Tshwane): Pop ~3.5M, median income ~R120k, expenditure ~R180k, household car access 0.51 (vs 0.31 national) — "forced demand" from sprawl, 53% of national vehicle theft, industrial rental growth ~3.3%, infrastructure constraints, price-sensitive value-focused buyers.

DEALER HUBS:
- Pretoria: Menlyn (very high competition, premium), Hatfield, Gezina (saturated used-car).
- Cape Town: Century City (luxury/high-tech, maturing), Tygervalley/Bellville (all tiers, established), Claremont (south).
- 92% of buyers research online before visiting.

OPEX & BREAK-EVEN (per month, 1,000 sqm):
- Pretoria: rent R165k + staffing R450k + marketing R250k = ~R865k → BEP 22 units/mo.
- Cape Town: rent R250k + staffing R450k + marketing R250k = ~R950k → BEP 24 units/mo.
- Avg gross profit per vehicle (incl. F&I): R40,000.

OPPORTUNITIES: Budget-premium Chinese SUVs (Chery Omoda, Jaecoo, BYD); NEV readiness in Cape Town (BYD Sealion 6 + solar charging); SME fleet/last-mile LCVs.

RISKS: Household debt-to-income 73.2%; Rand volatility; Cape Town rent inflation; Pretoria saturation/theft.

RECOMMENDATION: Mixed-Model Dealership in Cape Town (Tygervalley or Century City). Anchor with Suzuki or Chery (volume) + Certified Pre-Owned luxury division. Differentiation: 90% digital journey, NEV specialist service, door-to-door collection. Justification pillars: (1) higher household expenditure, (2) lower theft + better service delivery, (3) semigration wealth inflow.

12-MONTH GTM: Phase 1 (M1–3) lease + dealer agreements + senior hires + FICA/POPI; Phase 2 (M4–6) 30 new + 15 CPO units, website with 360° tours, soft launch event; Phase 3 (M7–9) 15km hyper-local social, zero-friction service, SME fleet contracts; Phase 4 (M10–12) review vs 24 unit BEP, optimise mix.
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: ANALYSIS_CONTEXT },
          ...(messages ?? []),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Lovable workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("dashboard-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
