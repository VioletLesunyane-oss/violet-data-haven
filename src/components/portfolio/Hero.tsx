import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import portrait from "@/assets/violet-portrait.jpeg";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-gradient-hero"
    >
      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      {/* Floating data dots */}
      <div className="absolute top-32 left-10 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
      <div className="absolute bottom-40 right-16 h-2 w-2 rounded-full bg-secondary animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/3 h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="container relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Available for Data Analyst & Data Scientist roles
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.02] tracking-tight">
            Violet
            <br />
            <span className="text-gradient">Lesunyane</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            <span className="text-foreground font-medium">Data Analyst · Data Scientist.</span>{" "}
            Transforming data into actionable insights through analytics, technology, and strategic legal-minded thinking.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                View Projects <ArrowRight className="ml-1" />
              </a>
            </Button>
            <Button variant="outline-glow" size="lg" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
            <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
              <a href="#" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </a>
            </Button>
          </div>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { k: "8+", v: "Years Professional Experience" },
              { k: "10+", v: "Data Tools & Frameworks" },
              { k: "3", v: "Languages Spoken" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient">{s.k}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative mx-auto max-w-md">
            {/* Decorative gradient blob */}
            <div className="absolute -inset-6 bg-gradient-accent opacity-30 blur-3xl rounded-full" />
            <div className="absolute -top-4 -left-4 h-24 w-24 border border-primary/40 rounded-2xl rotate-12" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 border border-secondary/40 rounded-2xl -rotate-6" />

            <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-elegant glow-ring animate-float">
              <img
                src={portrait}
                alt="Violet Lesunyane — Data Analyst & Data Scientist portrait"
                className="w-full h-auto object-cover aspect-[4/5]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              {/* Name plate */}
              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-background/60 border border-border/60 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-sm">Violet Lesunyane</div>
                  <div className="text-[11px] text-muted-foreground font-mono">Midrand · South Africa</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse-glow" />
              </div>
            </div>

            {/* Floating mini chart */}
            <div className="absolute -left-8 top-10 hidden md:block bg-card border border-border rounded-xl p-3 shadow-card-elegant animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-[10px] font-mono text-muted-foreground mb-1">INSIGHTS</div>
              <div className="flex items-end gap-1 h-10">
                {[40, 60, 35, 80, 55, 95, 70].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-sm bg-gradient-to-t from-primary to-primary-glow"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
