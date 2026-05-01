import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, TrendingUp, Users, Target, ShieldAlert, Sparkles, Send,
  Search, MapPin, Loader2, Bot, BarChart3, DollarSign,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ---------- Data extracted from the Strategic Market Analysis ----------
const kpis = [
  { label: "Industry CAGR (2025)", value: "+15.7%", sub: "597,000 units", icon: TrendingUp, tone: "primary" },
  { label: "Toyota Market Share", value: "23.5%", sub: "Segment leader", icon: Target, tone: "secondary" },
  { label: "NEV Growth YoY", value: "+114%", sub: "16,716 units", icon: Sparkles, tone: "primary" },
  { label: "Buyer Sentiment", value: "78 / 100", sub: "Optimistic", icon: Users, tone: "secondary" },
  { label: "CT Break-Even", value: "24 / mo", sub: "@ R40k GP/unit", icon: DollarSign, tone: "primary" },
  { label: "Theft Risk (PTA)", value: "53%", sub: "Of national", icon: ShieldAlert, tone: "secondary" },
];

const segmentSales = [
  { name: "Passenger", "Dec 2024": 27651, "Dec 2025": 33264 },
  { name: "LCV", "Dec 2024": 11042, "Dec 2025": 13659 },
  { name: "Medium", "Dec 2024": 723, "Dec 2025": 672 },
  { name: "Heavy", "Dec 2024": 1685, "Dec 2025": 1462 },
];

const marketShare = [
  { name: "Toyota", value: 11422 },
  { name: "Volkswagen", value: 4832 },
  { name: "Suzuki", value: 4514 },
  { name: "Hyundai", value: 2826 },
  { name: "Ford", value: 2607 },
  { name: "Chery", value: 1867 },
];

const monthlyTrend = [
  { m: "Jul", units: 39200 }, { m: "Aug", units: 41100 }, { m: "Sep", units: 43800 },
  { m: "Oct", units: 45200 }, { m: "Nov", units: 47600 }, { m: "Dec", units: 48983 },
];

const cityRadar = [
  { metric: "Income", "Cape Town": 92, "Pretoria": 60 },
  { metric: "Demand Density", "Cape Town": 70, "Pretoria": 88 },
  { metric: "Service Reliability", "Cape Town": 90, "Pretoria": 55 },
  { metric: "Low Theft Risk", "Cape Town": 87, "Pretoria": 35 },
  { metric: "Affordable Rent", "Cape Town": 45, "Pretoria": 78 },
  { metric: "Margin Potential", "Cape Town": 88, "Pretoria": 62 },
];

type Competitor = {
  brand: string;
  region: "Cape Town" | "Pretoria" | "National";
  hub: string;
  tier: "Budget" | "Volume" | "Premium" | "Luxury";
  priceFrom: number; // ZAR thousands
  share: number;     // % of dealer volume (proxy)
  features: string[];
  growth: number;    // YoY %
};

const competitors: Competitor[] = [
  { brand: "Toyota", region: "National", hub: "Multi-hub", tier: "Volume", priceFrom: 220, share: 23.5, features: ["Hybrid","Bakkies","Service Network"], growth: 6 },
  { brand: "Suzuki", region: "Cape Town", hub: "Tygervalley", tier: "Budget", priceFrom: 180, share: 9.2, features: ["Fuel Efficient","Compact","Long Warranty"], growth: 22.5 },
  { brand: "Volkswagen", region: "Pretoria", hub: "Menlyn", tier: "Premium", priceFrom: 320, share: 9.9, features: ["German Engineering","DSG","Polo Vivo"], growth: -3 },
  { brand: "Hyundai", region: "Cape Town", hub: "Century City", tier: "Volume", priceFrom: 250, share: 5.8, features: ["7-yr Warranty","SUV Range"], growth: 4 },
  { brand: "Ford", region: "Pretoria", hub: "Hatfield", tier: "Premium", priceFrom: 380, share: 5.3, features: ["Ranger","LCV","Performance"], growth: 1 },
  { brand: "Chery", region: "Cape Town", hub: "Tygervalley", tier: "Volume", priceFrom: 300, share: 3.8, features: ["Tiggo SUV","Tech Stack","Aggressive Pricing"], growth: 38 },
  { brand: "BYD", region: "Cape Town", hub: "Century City", tier: "Premium", priceFrom: 650, share: 1.2, features: ["EV","Sealion 6","Solar Ready"], growth: 95 },
  { brand: "Haval", region: "Pretoria", hub: "Menlyn", tier: "Volume", priceFrom: 290, share: 2.4, features: ["Jolion","H6","HEV"], growth: 28 },
  { brand: "Foton", region: "Pretoria", hub: "Menlyn", tier: "Budget", priceFrom: 240, share: 1.1, features: ["LCV","eView","Fleet"], growth: 18 },
  { brand: "Kia", region: "Pretoria", hub: "Menlyn", tier: "Premium", priceFrom: 340, share: 3.1, features: ["Sonet","Sportage","Warranty"], growth: 5 },
  { brand: "Mercedes-Benz", region: "Cape Town", hub: "Century City", tier: "Luxury", priceFrom: 950, share: 1.8, features: ["GLC","EQ EV","CPO Program"], growth: 2 },
  { brand: "BMW", region: "Cape Town", hub: "Claremont", tier: "Luxury", priceFrom: 920, share: 1.6, features: ["X3","i4","M Sport"], growth: 0 },
];

const tierColors: Record<Competitor["tier"], string> = {
  Budget: "hsl(178 70% 45%)",
  Volume: "hsl(200 60% 55%)",
  Premium: "hsl(220 50% 65%)",
  Luxury: "hsl(45 80% 60%)",
};

const PIE_COLORS = ["hsl(178 70% 45%)","hsl(200 60% 55%)","hsl(220 50% 65%)","hsl(174 78% 55%)","hsl(210 25% 65%)","hsl(45 80% 60%)"];

// ---------- Components ----------
const KpiCard = ({ k }: { k: typeof kpis[number] }) => {
  const Icon = k.icon;
  return (
    <div className="rounded-xl bg-brushed border border-border p-5 hover:border-primary/50 transition-all hover:shadow-elegant group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{k.label}</span>
        <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
      </div>
      <div className="font-display text-3xl font-bold text-foreground">{k.value}</div>
      <div className="text-xs text-muted-foreground mt-1">{k.sub}</div>
    </div>
  );
};

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="rounded-xl bg-card border border-border p-5">
    <div className="mb-4">
      <h3 className="font-display font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <div className="h-64">{children}</div>
  </div>
);

const tooltipStyle = {
  background: "hsl(215 28% 14%)",
  border: "1px solid hsl(215 22% 22%)",
  borderRadius: 8,
  fontSize: 12,
  color: "hsl(210 30% 94%)",
};

// ---------- Competitor Hub ----------
const CompetitorHub = () => {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [tier, setTier] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(1000);

  const filtered = useMemo(() => competitors.filter(c => {
    const matchesQ = q === "" ||
      c.brand.toLowerCase().includes(q.toLowerCase()) ||
      c.features.some(f => f.toLowerCase().includes(q.toLowerCase())) ||
      c.hub.toLowerCase().includes(q.toLowerCase());
    const matchesR = region === "All" || c.region === region;
    const matchesT = tier === "All" || c.tier === tier;
    const matchesP = c.priceFrom <= maxPrice;
    return matchesQ && matchesR && matchesT && matchesP;
  }), [q, region, tier, maxPrice]);

  const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
      active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50"
    }`}>{label}</button>
  );

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="p-5 border-b border-border bg-brushed">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-xl font-bold">Competitor Comparison Hub</h3>
            <p className="text-xs text-muted-foreground mt-1">Filter by region, tier, price or feature.</p>
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search brand, feature, hub..."
              className="pl-9 bg-background border-border"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground self-center mr-1">Region</span>
          {["All","Cape Town","Pretoria","National"].map(r => (
            <Pill key={r} label={r} active={region === r} onClick={() => setRegion(r)} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground self-center mr-1">Tier</span>
          {["All","Budget","Volume","Premium","Luxury"].map(t => (
            <Pill key={t} label={t} active={tier === t} onClick={() => setTier(t)} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Max price</span>
          <input
            type="range" min={150} max={1000} step={10}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="flex-1 accent-[hsl(var(--primary))]"
          />
          <span className="font-mono text-xs text-primary w-20 text-right">R{maxPrice}k</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="px-5 py-3">Brand</th>
              <th className="px-5 py-3">Region / Hub</th>
              <th className="px-5 py-3">Tier</th>
              <th className="px-5 py-3">From</th>
              <th className="px-5 py-3">Share</th>
              <th className="px-5 py-3">YoY</th>
              <th className="px-5 py-3">Key Features</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">No competitors match these filters.</td></tr>
            ) : filtered.map(c => (
              <tr key={c.brand} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                <td className="px-5 py-3 font-display font-semibold">{c.brand}</td>
                <td className="px-5 py-3 text-muted-foreground">
                  <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{c.region}</div>
                  <div className="text-[11px] opacity-70">{c.hub}</div>
                </td>
                <td className="px-5 py-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border" style={{ color: tierColors[c.tier], borderColor: tierColors[c.tier] + "55" }}>
                    {c.tier}
                  </span>
                </td>
                <td className="px-5 py-3 font-mono">R{c.priceFrom}k</td>
                <td className="px-5 py-3 font-mono">{c.share}%</td>
                <td className={`px-5 py-3 font-mono ${c.growth > 0 ? "text-primary" : "text-destructive"}`}>
                  {c.growth > 0 ? "+" : ""}{c.growth}%
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {c.features.map(f => (
                      <span key={f} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{f}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-border text-[11px] font-mono text-muted-foreground">
        Showing {filtered.length} of {competitors.length} competitors
      </div>
    </div>
  );
};

// ---------- Chatbot ----------
type Msg = { role: "user" | "assistant"; content: string };

const Chatbot = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your market analyst assistant. Ask me anything about the Cape Town vs Pretoria dealership analysis — CAGR, break-even, brand performance, risks, or the recommendation." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dashboard-chat`;
    let assistantSoFar = "";

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) throw new Error("Rate limit exceeded. Please try again shortly.");
        if (resp.status === 402) throw new Error("AI credits exhausted.");
        throw new Error("Chat service unavailable.");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;

      const upsert = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.content !== "") {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      };

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl); buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content as string | undefined;
            if (c) upsert(c);
          } catch { buf = line + "\n" + buf; break; }
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: e instanceof Error ? e.message : "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Why Cape Town over Pretoria?",
    "What is the break-even?",
    "Which brands grew fastest?",
    "What are the biggest risks?",
  ];

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden flex flex-col h-[560px]">
      <div className="p-4 border-b border-border bg-brushed flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-semibold">Market Analyst AI</h3>
          <p className="text-[11px] text-muted-foreground">Grounded in the Strategic Market Analysis</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm border border-border"
            }`}>
              {m.content || <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-2.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>

      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)}
              className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-background text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 border-t border-border flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Ask about CAGR, brands, risks..."
          disabled={loading}
          className="bg-background border-border"
        />
        <Button onClick={send} disabled={loading || !input.trim()} size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

// ---------- Page ----------
const Dashboard = () => {
  useEffect(() => {
    document.title = "Market Intelligence Dashboard — Violet Lesunyane";
    const desc = "Live operational dashboard tracking automotive market KPIs, competitor intelligence, and AI-powered Q&A grounded in real strategic analysis.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <div className="theme-corporate min-h-screen">
      {/* Top bar */}
      <header className="border-b border-border bg-brushed sticky top-0 z-40 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </Link>
            <span className="hidden sm:block h-5 w-px bg-border" />
            <div className="hidden sm:flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="font-display font-semibold tracking-tight">Market Intelligence</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground uppercase tracking-widest">Live · 2025/26 data</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-blueprint border-b border-border">
        <div className="container py-12 md:py-16 relative">
          <div className="text-[10px] font-mono tracking-widest text-primary mb-3">CASE STUDY · AUTOMOTIVE EXPANSION</div>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
            Cape Town vs Pretoria <span className="text-primary">Dealership</span> Intelligence
          </h1>
          <p className="text-muted-foreground max-w-2xl mt-4">
            Operational dashboard, competitor hub, and an AI agent — all grounded in a real strategic market analysis comparing two of South Africa's largest metros.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["CAGR","Market Share","Sentiment","Break-Even","NEV Growth","Risk"].map(t => (
              <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-primary/5">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="container py-10">
        <h2 className="font-display text-xl font-bold mb-5">Operational KPIs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map(k => <KpiCard key={k.label} k={k} />)}
        </div>
      </section>

      {/* Charts */}
      <section className="container pb-10">
        <h2 className="font-display text-xl font-bold mb-5">Market Performance</h2>
        <div className="grid lg:grid-cols-2 gap-5">
          <ChartCard title="Segment Sales: Dec 2024 vs Dec 2025" subtitle="Units sold, by vehicle segment">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentSales}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.4)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Dec 2024" fill="hsl(210 25% 55%)" radius={[4,4,0,0]} />
                <Bar dataKey="Dec 2025" fill="hsl(178 70% 45%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Industry Volume Trend (H2 2025)" subtitle="Total units, monthly">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="units" stroke="hsl(178 70% 45%)" strokeWidth={2.5}
                  dot={{ fill: "hsl(174 78% 55%)", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Brand Market Share (Dec 2025)" subtitle="Top 6 brands by units">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={marketShare} dataKey="value" nameKey="name" cx="50%" cy="50%"
                  outerRadius={85} innerRadius={45} paddingAngle={2}>
                  {marketShare.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="City Suitability Index" subtitle="Cape Town vs Pretoria across 6 vectors">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={cityRadar}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <PolarRadiusAxis stroke="hsl(var(--border))" fontSize={9} />
                <Radar name="Cape Town" dataKey="Cape Town" stroke="hsl(178 70% 45%)" fill="hsl(178 70% 45%)" fillOpacity={0.4} />
                <Radar name="Pretoria" dataKey="Pretoria" stroke="hsl(210 25% 65%)" fill="hsl(210 25% 65%)" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* Competitor Hub */}
      <section className="container pb-10">
        <CompetitorHub />
      </section>

      {/* Chatbot */}
      <section className="container pb-16">
        <h2 className="font-display text-xl font-bold mb-5">Ask the Analysis</h2>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2"><Chatbot /></div>
          <div className="rounded-xl bg-brushed border border-border p-5 space-y-4">
            <h3 className="font-display font-semibold">Recommendation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mixed-Model Dealership in <span className="text-primary font-semibold">Cape Town</span> — Tygervalley or Century City — anchored by a budget-volume brand (Suzuki / Chery) plus a Certified Pre-Owned luxury division.
            </p>
            <div className="space-y-2">
              {[
                ["Higher household expenditure", "R248,539 — highest in SA"],
                ["Lower theft + better service", "13% of national vs 53% PTA"],
                ["Semigration wealth inflow", "Quality-focused buyers"],
              ].map(([t, s]) => (
                <div key={t} className="border-l-2 border-primary/60 pl-3">
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-border text-[11px] font-mono text-muted-foreground">
              Source: Strategic Market Analysis 2025/26
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © Violet Lesunyane · Built with Lovable Cloud + AI
      </footer>
    </div>
  );
};

export default Dashboard;
