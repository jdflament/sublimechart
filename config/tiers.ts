import { Tier } from "@/types";

export const freeTier: Tier = {
  name: 'Free',
  id: 'tier-free',
  price: '$0',
  description: "Give a try to SublimeChart with our free tier.",
  features: ['Line, Bar and Doughnut charts', 'Up to 3 charts saved', 'Basic editor options', 'PNG and Chart.js config export'],
  featured: false,
};

export const proTier: Tier = {
  name: 'Pro',
  id: 'tier-pro',
  price: '$69',
  discount: {
    price: '$49',
    code: 'SUBLIMELAUNCH24',
    limit: 50,
  },
  priceHelpText: 'one time',
  description: 'Get the pro version for unlimited charts, export and more. Lifetime access.',
  features: [
    'All chart types',
    'Unlimited charts saved',
    'Animated charts with video export',
    'Predefined templates',
    'All editor options',
    'No watermark',
  ],
  featured: true,
};

export const tiers: Tier[] = [
  freeTier,
  proTier,
]
