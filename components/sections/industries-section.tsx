import { BriefcaseBusiness, Fuel, Handshake, Landmark, Rocket, School, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  { label: "Retail Businesses", icon: Store },
  { label: "Corporate Organizations", icon: BriefcaseBusiness },
  { label: "Startups", icon: Rocket },
  { label: "NGOs", icon: Handshake },
  { label: "Government Institutions", icon: Landmark },
  { label: "Schools", icon: School },
  { label: "Banks", icon: Landmark },
  { label: "Filling Stations", icon: Fuel }
];

export function IndustriesSection() {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Industries We Serve</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Card key={industry.label} className="transition hover:-translate-y-1">
                <CardContent className="flex items-center gap-3 pt-6">
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/20">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-sm font-semibold">{industry.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
