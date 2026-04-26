import { Briefcase } from "lucide-react";

const roles = [
  {
    role: "Conveyancing Paralegal & Legal Secretary",
    company: "Ntsoane Attorneys",
    period: "2022 – 2025",
    points: [
      "Managed full conveyancing processes end-to-end",
      "Drafted contracts, transfer documents and bonds",
      "Conducted property and legal research",
      "Ensured compliance with legal frameworks",
      "Liaised with clients, banks, and stakeholders",
    ],
  },
  {
    role: "Personal Assistant",
    company: "Molepe Mathaila Inc",
    period: "2021 – 2022",
    points: [
      "Managed legal documents and complex schedules",
      "Supported conveyancing processes",
      "Conducted legal and property research",
    ],
  },
  {
    role: "Project Manager",
    company: "Mapogo Civils",
    period: "2016 – 2018",
    points: [
      "Delivered construction projects on time and on budget",
      "Ensured compliance with safety and legal standards",
      "Coordinated multidisciplinary teams",
    ],
  },
  {
    role: "Founder",
    company: "HVAC – VMLES Projects (Pty) Ltd",
    period: "2012 – 2015",
    points: [
      "Led full business operations and strategy",
      "Managed a team of 15 professionals",
      "Oversaw planning, execution, and budgeting",
      "Built client relationships and negotiated contracts",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 relative bg-muted/20 border-y border-border/50">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-primary tracking-widest mb-4">04 / EXPERIENCE</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            A career built on <span className="text-gradient">precision & people.</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent" />

          <div className="space-y-12">
            {roles.map((r, i) => (
              <div
                key={r.company}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>div:first-child]:col-start-2"}`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-3 h-3 w-3 rounded-full bg-primary shadow-glow" />

                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className={`inline-flex items-center gap-2 text-xs font-mono text-secondary mb-2 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <Briefcase className="h-3.5 w-3.5" />
                    {r.period}
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug">{r.role}</h3>
                  <p className="text-primary font-medium text-sm">{r.company}</p>
                  <ul className={`mt-4 space-y-1.5 text-sm text-muted-foreground ${i % 2 === 0 ? "md:[&>li]:list-none" : ""}`}>
                    {r.points.map((p) => (
                      <li key={p} className="leading-relaxed">— {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
