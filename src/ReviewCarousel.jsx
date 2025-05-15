import React, { useEffect, useState } from "react";
import { Star } from 'lucide-react';
import { cn } from "./utils";

// Sample review data - replace with your actual reviews
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "This product exceeded all my expectations. The quality is outstanding and customer service was top-notch. I'll definitely be purchasing again!",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    text: "Very satisfied with my purchase. The product works exactly as described and has made a noticeable difference in my daily routine.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    text: "Absolutely love this! It's been a game-changer for me. The design is sleek and the functionality is intuitive. Worth every penny.",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 4,
    text: "Great product that delivers on its promises. The only reason I'm not giving 5 stars is because shipping took a bit longer than expected.",
  },
  {
    id: 5,
    name: "Jessica Williams",
    rating: 5,
    text: "I've tried many similar products and this one is by far the best. The attention to detail is impressive and it's clear that a lot of thought went into the design.",
  },
  {
    id: 6,
    name: "Robert Kim",
    rating: 5,
    text: "Incredible value for the price. This product has simplified my life in ways I didn't think possible. Highly recommend to anyone on the fence!",
  },
];

function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white text-gray-900 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      className={cn("p-6 pt-6", className)}
      {...props}
    />
  );
}

export default function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll through reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation
  const goToReview = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden py-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="w-full flex-shrink-0 px-4">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-5 h-5 mr-1",
                          star <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-300 text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "{review.text}"
                  </blockquote>
                  <p className="font-semibold">— {review.name}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToReview(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              activeIndex === index ? "bg-gray-800" : "bg-gray-300"
            )}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}