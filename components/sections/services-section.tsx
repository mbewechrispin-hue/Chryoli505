import { Palette, Printer, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionReveal } from "@/components/sections/motion-reveal";
import { SERVICE_GROUPS } from "@/features/services/catalog";

const groupIcons: Record<string, LucideIcon> = {
  "Print and Branding": Printer,
  "Branding and Identity": Palette,
  "Promotional Products": Printer,
  "Packaging Solution": Printer,
  "2D, 3D Signage and Metal Fabrication": Palette,
  "Marketing Strategy and Implementation": Palette
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="container">
        <MotionReveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Our Services</h2>
          <p className="mt-4 max-w-2xl text-zinc-600">Click a service group to view the offerings inside.</p>
        </MotionReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICE_GROUPS.map((group, i) => {
            const Icon = groupIcons[group.title] ?? Printer;
            return (
              <MotionReveal key={group.title} delay={i * 0.08}>
                <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-primary/20 text-black">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <details className="group/details rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                      <summary className="cursor-pointer list-none text-sm font-medium text-zinc-800">
                        Click to view services
                      </summary>
                      <ul className="mt-3 grid gap-3 text-sm text-zinc-700">
                        {group.items.map((item) => (
                          <li key={item.name} className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                            <p className="font-medium text-zinc-900">{item.name}</p>
                            {item.description ? <p className="mt-1 text-zinc-600">{item.description}</p> : null}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </CardContent>
                </Card>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
