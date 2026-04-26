const technical = [
  { name: "SQL", level: 88 },
  { name: "Python", level: 78 },
  { name: "Power BI", level: 90 },
  { name: "Excel", level: 95 },
  { name: "Data Visualization", level: 85 },
  { name: "Data Studio", level: 75 },
  { name: "Databricks", level: 65 },
  { name: "Dashboard Creation", level: 88 },
];

const professional = [
  "Leadership",
  "Project Management",
  "Research & Reporting",
  "Administrative Expertise",
  "Client Relations",
  "Legal & Compliance",
  "Stakeholder Liaison",
  "Strategic Planning",
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative bg-muted/20 border-y border-border/50">
      <div className="container">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-primary tracking-widest mb-4">02 / SKILLS</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            A <span className="text-gradient">data-fluent</span> toolkit, sharpened by professional rigour.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-16">
          {/* Technical */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span>Technical · Data</span>
              <span className="h-px w-12 bg-primary" />
            </h3>
            <div className="space-y-5">
              {technical.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-mono text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-accent rounded-full animate-grow-bar"
                      style={{ width: `${s.level}%`, animationDelay: `${i * 0.08}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span>Professional · Strategy</span>
              <span className="h-px w-12 bg-secondary" />
            </h3>
            <div className="flex flex-wrap gap-3">
              {professional.map((p) => (
                <span
                  key={p}
                  className="px-4 py-2.5 rounded-full border border-border bg-card text-sm hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-card border border-border">
              <div className="text-xs font-mono text-primary mb-3">LANGUAGES</div>
              <div className="flex flex-wrap gap-6">
                {["English", "Tswana", "Afrikaans"].map((l) => (
                  <div key={l} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    <span className="font-medium">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
