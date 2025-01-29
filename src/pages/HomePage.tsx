import Hero from '../components/home/Hero';
import FeaturedMenu from '../components/home/FeaturedMenu';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <Testimonials />
      <CTA />
    </>
  );
}