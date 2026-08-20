/**
 * Unified testimonials data.
 * Each entry drives BOTH left (image) and right (video or text) sides.
 * - If `video` is set → right side shows a video player
 * - If `video` is null → right side shows the text testimonial card
 */
export const TestimonialsData = [
  // --- Video testimonials ---
  {
    image: "/testimonials/img1.jpeg",
    video: "/testimonials/video1.mp4",
    name: "Shweta Singh",
    about: "Founder, Raskrti Art",
    testimonial: "",
  },
  {
    image: "/testimonials/img3.jpeg",
    video: "/testimonials/video2.mp4",
    name: "Student Testimonial",
    about: "Art Student",
    testimonial: "",
  },
  {
    image: "/testimonials/shweta.png",
    video: "/testimonials/video3.mp4",
    name: "Student Testimonial",
    about: "Art Student",
    testimonial: "",
  },

  // --- Text testimonials ---
  {
    image: "/testimonials/img1.jpeg",
    video: null,
    name: "Punita Puri",
    about: "Interior Designer, Student",
    testimonial:
      "The Artist Shweta is very Talented, I am learning different techniques of water painting currently, Have completed Tanjore and acrylic and oil paintings under her guidance, She is a phenomenal artist with so much enthusiasm to help everyone do their best that I absolutely enjoy her classes 🤗",
  },
  {
    image: "/testimonials/img3.jpeg",
    video: null,
    name: "Swati Kumari",
    about: "Art Enthusiast, Blogger",
    testimonial:
      "She is a phenomenal artist. My daughter Kriti has been going there for about 8 months now and has learnt so much. She made fabulous paintings and has a great time painting and learning something new from Shweta Ma'am. I recommend these art classes for any age group as they are both fun and interactive!",
  },
  {
    image: "/testimonials/img12.jpeg",
    video: null,
    name: "Gitanjali Sharma",
    about: "Art Enthusiast",
    testimonial:
      "It was very good experience in three months we can learn everything ❤️ the teacher is also very good and very supportive.",
  },
  {
    image: "/testimonials/shweta2.png",
    video: null,
    name: "Usha Sinha",
    about: "Corporate Client",
    testimonial:
      "Rashmi's art shows a superb, distinctive skill. Her talent is unquestionable, and her output exhibits her hard work in pursuit of excellence. We are fortunate to have access to her work. Congratulations, Shweta!!",
  },
  {
    image: "/testimonials/shweta.png",
    video: null,
    name: "Megha Kotwal",
    about: "Parent",
    testimonial:
      "Excellent teacher to have for your kids. Apart from the skills that she inherently has, her Patience and Passion for her work makes her an outstanding teacher",
  },
  {
    image: "/shweta.jpeg",
    video: null,
    name: "Hiran Vyas",
    about: "Art Student",
    testimonial:
      "It was nice to know about the art class, I learn a lot from here. Ma'am taught very uniquely different techniques.",
  },
];