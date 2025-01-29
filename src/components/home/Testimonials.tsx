import { Star } from 'lucide-react';
import { FC } from 'react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Food Critic",
    content: "The attention to detail in every dish is remarkable. A true culinary masterpiece.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    text: "The attention to detail in every dish is remarkable. A true culinary masterpiece.",
    date: "2022-01-01"
  },
  {
    name: "Michael Chen",
    role: "Regular Customer",
    content: "The fusion of flavors is unlike anything I've experienced before. Simply outstanding.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    text: "The fusion of flavors is unlike anything I've experienced before. Simply outstanding.",
    date: "2022-01-02"
  },
  {
    name: "Emily Rodriguez",
    role: "Food Blogger",
    content: "Not just a meal, but a journey through tastes and textures. Absolutely recommended.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    text: "Not just a meal, but a journey through tastes and textures. Absolutely recommended.",
    date: "2022-01-03"
  }
];

const Testimonials: FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-primary-600">Guests</span> Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what our valued customers have to say about their dining experience with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
            >
              <div className="flex text-primary-600 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? 'fill-primary-600' : 'fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-primary-600">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;