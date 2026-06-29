import { Card, CardContent } from "@/components/ui/card";
import { MotionReveal } from "@/components/sections/motion-reveal";

const benefits = [
  "Quality Service",
  "Fast Delivery",
  "Professional Team",
  "Reliable Support",
  "Customized Solutions",
  "Competitive Pricing"
];

const stats = [
  { label: "Projects Delivered", value: "1,200+" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Average Delivery Time", value: "35% Faster" }
];

export function WhyYolicSection() {
  return (
    <section className="py-20">
      <div className="container">
        <MotionReveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Why Choose Yolic</h2>
        </MotionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <MotionReveal key={benefit} delay={i * 0.04}>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-medium">{benefit}</p>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <MotionReveal key={stat.label} delay={i * 0.08}>
              <Card className="border-black/10 bg-black text-white">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-sm text-zinc-300">{stat.label}</p>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
