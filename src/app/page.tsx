import { Hero } from "@/sections/Hero";
import { Timeline } from "@/sections/Timeline";
import { Projects } from "@/sections/Projects";
import { EngineerDNA } from "@/sections/EngineerDNA";
import { Sharpening } from "@/sections/Sharpening";
import { Writing } from "@/sections/Writing";
import { BeyondCode } from "@/sections/BeyondCode";
import { Contact } from "@/sections/Contact";
import { TechMarquee } from "@/components/ui/TechMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Timeline />
      <Projects />
      <EngineerDNA />
      <Sharpening />
      <Writing />
      <BeyondCode />
      <Contact />
    </>
  );
}
