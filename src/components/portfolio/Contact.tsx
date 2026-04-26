import { Button } from "@/components/ui/button";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "mlesunyane@gmail.com", href: "mailto:mlesunyane@gmail.com" },
  { icon: Phone, label: "Phone", value: "+27 82 573 9477", href: "tel:+27825739477" },
  { icon: MapPin, label: "Location", value: "Midrand, South Africa" },
  { icon: Linkedin, label: "LinkedIn", value: "violet-lesunyane", href: "https://www.linkedin.com/in/violet-lesunyane-4a367658/" },
];

export const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-mono text-primary tracking-widest mb-4">06 / CONTACT</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Let's turn your data into <span className="text-gradient">decisions.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Open to data analyst, data scientist, and BI roles — remote, hybrid, or in South Africa.
            Get in touch and let's talk insights.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:mlesunyane@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> Send an Email
              </a>
            </Button>
            <Button variant="outline-glow" size="lg" asChild>
              <a href="https://www.linkedin.com/in/violet-lesunyane-4a367658/" target="_blank" rel="noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn
              </a>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {contacts.map((c) => {
              const Tag = c.href ? "a" : "div";
              return (
                <Tag
                  key={c.label}
                  {...(c.href ? { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
                  className="group p-5 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all text-left"
                >
                  <c.icon className="h-5 w-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">{c.label}</div>
                  <div className="text-sm font-medium mt-1 truncate">{c.value}</div>
                </Tag>
              );
            })}
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-border/60 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Violet Lesunyane. Crafted with data & care.</p>
          <p className="font-mono text-xs">Data Analyst · Data Scientist</p>
        </footer>
      </div>
    </section>
  );
};
