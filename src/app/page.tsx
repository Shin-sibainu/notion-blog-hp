import CallToAction from "@/components/CallToAction";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Templates from "@/components/Templates";

export default function Home() {
  return (
    <div className="px-3">
      <Hero />
      <Feature />
      <Templates />
      <Pricing />
      <CallToAction />
    </div>
  );
}
