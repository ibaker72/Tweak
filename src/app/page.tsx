import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Testimonials } from "@/components/testimonials";
import { Founder } from "@/components/founder";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
import { FAQ, ContactBar } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Founder />
      <Process />
      <Pricing />
      <FAQ />
      <ContactBar />
    </>
  );
}
