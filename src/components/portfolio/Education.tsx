import { Award, GraduationCap } from "lucide-react";

const education = [
  { title: "LLB (In Progress)", school: "Regenesys Law School", period: "2023 – Present" },
  { title: "Data Visualization Bootcamp", school: "BrightLearn", period: "" },
  { title: "Career Boost Training · Power BI + AI", school: "Exodus Experts", period: "" },
  { title: "Conveyancing Practice & Finances", school: "South African Law School", period: "2022" },
  { title: "Paralegal Studies", school: "South African Law School", period: "2021" },
  { title: "National Higher Certificate · Economics & Finance", school: "Tshwane University of Technology", period: "2006 – 2008" },
  { title: "Grade 12", school: "Makgetse High School", period: "" },
];

const certs = [
  "Certified Paralegal",
  "Certified Conveyancing Paralegal",
  "Multi-stakeholder Project Management",
  "Legal Compliance & Administration",
];

export const Education = () => {
  return (
    <section id="education" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-primary tracking-widest mb-4">05 / EDUCATION</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Continuous learning, <span className="text-gradient">across disciplines.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {education.map((e) => (
              <div
                key={e.title}
                className="flex items-start gap-5 p-5 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-all"
              >
                <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold leading-tight">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{e.school}</p>
                </div>
                {e.period && (
                  <span className="text-xs font-mono text-secondary shrink-0">{e.period}</span>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-card border border-border p-6">
            <div className="flex items-center gap-2 text-secondary mb-5">
              <Award className="h-5 w-5" />
              <h3 className="font-display font-semibold">Certifications & Achievements</h3>
            </div>
            <ul className="space-y-3">
              {certs.map((c) => (
                <li key={c} className="flex gap-3 text-sm">
                  <span className="h-1.5 w-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
