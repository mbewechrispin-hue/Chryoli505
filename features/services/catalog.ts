export type ServiceItem = {
  name: string;
  description: string;
};

export type ServiceGroup = {
  title: string;
  items: ServiceItem[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Print and Branding",
    items: [
      {
        name: "Business Cards",
        description: "Premium-quality business cards designed to make a lasting impression."
      },
      {
        name: "Brochures",
        description: "Professionally designed brochures that effectively communicate your message."
      },
      {
        name: "Flyers",
        description: "Eye-catching flyers to promote your events, products, or services."
      },
      {
        name: "Banners",
        description: "Durable and vibrant banners suitable for indoor and outdoor use."
      },
      {
        name: "Signage",
        description: "Custom signage solutions for businesses, events, and promotions."
      }
    ]
  },
  {
    title: "Branding and Identity",
    items: [
      {
        name: "Logo Design",
        description: "Memorable logo concepts crafted to represent your brand clearly and professionally."
      },
      {
        name: "Brand Guidelines",
        description: "Clear usage rules for colors, typography, and visual style to keep your brand consistent."
      },
      {
        name: "Brand Messaging",
        description: "Strategic messaging that defines your voice and communicates your value with clarity."
      }
    ]
  },
  {
    title: "Promotional Products",
    items: [
      {
        name: "Branded T-Shirts",
        description: "Custom printed shirts that promote your brand at events, campaigns, and team activities."
      },
      {
        name: "Branded Mugs",
        description: "High-quality branded mugs ideal for office use, gifts, and customer promotions."
      },
      {
        name: "Branded Pens",
        description: "Affordable promotional pens with your logo for everyday brand visibility."
      }
    ]
  },
  {
    title: "Packaging Solution",
    items: [
      {
        name: "Product Boxes",
        description: "Custom packaging boxes designed to protect products and improve shelf appeal."
      },
      {
        name: "Labels and Stickers",
        description: "Branded labels and stickers for product identification and strong visual presence."
      },
      {
        name: "Carrier Bags",
        description: "Printed paper and reusable bags tailored for retail, events, and promotions."
      }
    ]
  },
  {
    title: "2D, 3D Signage and Metal Fabrication",
    items: [
      {
        name: "2D and 3D Signage",
        description: "Custom indoor and outdoor signage with durable finishes and strong visual impact."
      },
      {
        name: "CNC Machine Services",
        description: "Precision CNC cutting and engraving for signs, panels, and branded components."
      },
      {
        name: "Metal Fabrication",
        description: "Fabrication of metal structures and branded metal works for business and industrial use."
      }
    ]
  },
  {
    title: "Marketing Strategy and Implementation",
    items: [
      {
        name: "Online Marketing",
        description: "Digital campaigns across web and social channels to increase visibility, traffic, and leads."
      },
      {
        name: "Social Media Marketing",
        description: "Content planning, audience targeting, and campaign management for major social platforms."
      },
      {
        name: "Search Engine Optimization (SEO)",
        description: "On-page and technical optimization to improve search rankings and organic discovery."
      },
      {
        name: "Paid Advertising",
        description: "Performance-driven ads on Google and social media with clear conversion goals."
      }
    ]
  }
];

export const SERVICE_OPTIONS = SERVICE_GROUPS.flatMap((group) =>
  group.items.map((item) => `${group.title} - ${item.name}`)
);
