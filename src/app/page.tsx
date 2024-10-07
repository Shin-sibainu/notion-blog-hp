import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Templates from "@/components/Templates";

//https://tailwindui.com/templates#browse
//https://salient.tailwindui.com/

export default function Home() {
  return (
    <div className="px-3">
      <Hero />
      <Feature />
      <Templates />
      {/* price */}
      {/* contact(select template and contact) */}
    </div>
  );
}
