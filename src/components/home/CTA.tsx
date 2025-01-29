import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Experience Culinary Excellence?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Join us for an unforgettable dining experience. Book your table now and
          let us take you on a gastronomic journey.
        </p>
        <Link
          to="/reservation"
          className="inline-block bg-[#F7DC6F] text-black px-8 py-3 rounded-md hover:bg-white transition font-semibold"
        >
          Reserve Your Table
        </Link>
      </div>
    </section>
  );
}