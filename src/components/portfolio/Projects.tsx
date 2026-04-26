import { ArrowUpRight, BarChart3, Database, LineChart } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Coffee Shop Sales Dashboard",
    tools: ["Power BI", "Excel"],
    description:
      "Interactive dashboard analysing sales trends, customer behaviour, and product performance across multiple store locations.",
    outcome: "Identified top-performing products and peak sales windows, improving stock decisions by 32%.",
    icon: BarChart3,
    gradient: "from-primary to-primary-glow",
    visual: "bars",
    metrics: [
      { label: "Revenue ↑", value: "+24%" },
      { label: "Categories", value: "9" },
    ],
  },
  {
    id: "02",
    title: "Legal Data Analysis System",
    tools: ["SQL", "Excel"],
    description:
      "Structured and analysed legal case data to streamline document tracking, compliance reporting, and case lifecycle visibility.",
    outcome: "Cut record-retrieval time in half and improved compliance accuracy across the practice.",
    icon: Database,
    gradient: "from-secondary to-primary",
    visual: "donut",
    metrics: [
      { label: "Records", value: "5K+" },
      { label: "Time saved", value: "50%" },
    ],
  },
  {
    id: "03",
    title: "Business Performance Insights",
    tools: ["Python", "Power BI"],
    description:
      "Visual KPI reports analysing operational efficiency, financial trends, and team performance for strategic planning.",
    outcome: "Delivered actionable insights that informed quarterly strategy and budget allocation.",
    icon: LineChart,
    gradient: "from-primary-glow to-secondary",
    visual: "line",
    metrics: [
      { label: "KPIs tracked", value: "18" },
      { label: "Departments", value: "4" },
    ],
  },
];

const VisualBars = () => (
  <div className="flex items-end justify-between h-full gap-1.5 px-1">
    {[55, 80, 45, 95, 70, 88, 60, 75].map((h, i) => (
      <div
        key={i}
        className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/80 to-primary-glow opacity-90 group-hover:opacity-100 transition-opacity"
        style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
      />
    ))}
  </div>
);

const VisualDonut = () => (
  <div className="flex items-center justify-center h-full">
    <svg viewBox="0 0 100 100" className="h-full">
      <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="hsl(var(--primary))" strokeWidth="10"
        strokeDasharray="180 240" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="hsl(var(--secondary))" strokeWidth="10"
        strokeDasharray="60 240" strokeDashoffset="-180" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="55" textAnchor="middle" className="fill-foreground font-display font-bold text-[18px]">75%</text>
    </svg>
  </div>
);

const VisualLine = () => (
  <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,60 L25,45 L50,55 L75,30 L100,38 L125,18 L150,28 L175,12 L200,22 L200,80 L0,80 Z" fill="url(#lg)" />
    <path d="M0,60 L25,45 L50,55 L75,30 L100,38 L125,18 L150,28 L175,12 L200,22"
      fill="none" stroke="hsl(var(--primary-glow))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {[[25,45],[75,30],[125,18],[175,12]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill="hsl(var(--primary-glow))" />
    ))}
  </svg>
);

const visualMap: Record<string, React.FC> = { bars: VisualBars, donut: VisualDonut, line: VisualLine };

export const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-primary tracking-widest mb-4">03 / PROJECTS</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Selected work in <span className="text-gradient">analytics & insight.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Hands-on case studies blending dashboards, structured queries, and storytelling with data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => {
            const Visual = visualMap[p.visual];
            return (
              <article
                key={p.id}
                className="group relative flex flex-col rounded-3xl bg-gradient-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                {/* Visual header */}
                <div className="relative h-44 p-5 bg-background/40 border-b border-border overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${p.gradient} opacity-20 blur-2xl`} />
                  <div className="relative h-full"><Visual /></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-muted-foreground">{p.id} / CASE STUDY</span>
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>

                  <div className="grid grid-cols-2 gap-3 my-4">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="rounded-lg bg-background/60 border border-border px-3 py-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{m.label}</div>
                        <div className="font-display font-bold text-gradient">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-foreground/80 italic border-l-2 border-primary/60 pl-3 mb-5">
                    → {p.outcome}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tools.map((t) => (
                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                          {t}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
