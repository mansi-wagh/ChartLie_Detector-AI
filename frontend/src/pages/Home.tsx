import Layout from "../components/layout/Layout";
import AnimatedHero from "../components/home/AnimatedHero";
import UploadCard from "../components/upload/UploadCard";
import FeatureCards from "../components/home/FeatureCards";
import HowItWorksPipeline from "../components/home/HowItWorksPipeline";
import SupportedTypes from "../components/home/SupportedTypes";
import FAQAccordion from "../components/home/FAQAccordion";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <Layout>
      {/* Premium Floating Grid & Light Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#07070a]" />
        {/* Subtle grid pattern overlays */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
        />
        {/* Floating gradient light spots */}
        <div className="absolute top-[30vh] left-[-20vw] h-[50vh] w-[50vw] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute top-[80vh] right-[-20vw] h-[50vh] w-[50vw] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      <div className="flex flex-col items-center justify-center py-6 md:py-10">
        <AnimatedHero />
        
        {/* Existing file uploader logic maintained */}
        <UploadCard />

        <FeatureCards />
        
        <HowItWorksPipeline />
        
        <SupportedTypes />
        
        <FAQAccordion />
        
        <CTASection />
      </div>
    </Layout>
  );
}