import { Brain, Scale, Target, TrendingUp } from "lucide-react";

const traits = [
  { icon: Brain, title: "Analytical Mindset", text: "Decomposing complex problems into structured, data-backed solutions." },
  { icon: Scale, title: "Legal Precision", text: "Years of compliance and research bring rigour to every dataset." },
  { icon: Target, title: "Detail Oriented", text: "Accuracy first — every figure traceable, every insight defensible." },
  { icon: TrendingUp, title: "Outcome Driven", text: "Insights that move KPIs, not dashboards that gather dust." },
];

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-primary tracking-widest mb-4">01 / ABOUT</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              From legal frameworks to <span className="text-gradient">data frameworks.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              I'm a highly organized and analytical professional with a background in law,
              conveyancing, and project management — now channelling that same discipline into
              <span className="text-foreground"> data science and analytics</span>.
            </p>
            <p>
              My career has been built on research, compliance, and structured problem-solving.
              Today I apply that thinking to <span className="text-foreground">SQL, Python, and Power BI</span>,
              turning messy real-world data into clear stories that drive smarter decisions.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {traits.map((t) => (
            <div
              key={t.title}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-elegant"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold mb-1">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
