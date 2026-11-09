/**
 * Live Pricing Tool for KG Laundry AI Assistant
 * Includes exact verified rates from Syed bhai (Owner of KG Laundry).
 */

export interface LaundryServiceRate {
  id: string;
  title: string;
  category: string;
  basePrice: number | string;
  pricingUnit: string;
  turnaroundTime: string;
  badge?: string;
  description: string;
  features: string[];
}

export const KG_ALL_RATES: LaundryServiceRate[] = [
  {
    id: 'clean-fold-kg',
    title: 'Clean & Fold (Wash by KG)',
    category: 'bag_wash',
    basePrice: 79,
    pricingUnit: 'per_kg',
    turnaroundTime: '24 Hours',
    badge: 'Most Popular',
    description: 'Everyday casual wear, t-shirts, jeans, and socks. Separated whites & colors, washed with hypoallergenic detergent, tumbled dry, and neatly folded.',
    features: ['Washed separately from other orders', 'Whites and darks separated', 'Eco-friendly German liquid detergent', 'Folded & sealed in breathable waterproof bag'],
  },
  {
    id: 'wash-steam-iron',
    title: 'Wash & Steam Iron',
    category: 'wash_iron',
    basePrice: 119,
    pricingUnit: 'per_kg',
    turnaroundTime: '24 Hours',
    badge: 'Workwear Choice',
    description: 'Perfect for shirts, trousers, kurtas, and formal garments. Gentle wash followed by industrial steam pressing for crisp, wrinkle-free clothes.',
    features: ['Industrial vertical steam iron finish', 'Collar and cuff precision pressing', 'Packed on hangers or folded', '24-Hour guaranteed turnaround'],
  },
  {
    id: 'sofa-standard',
    title: 'Standard Sofa Seat Cleaning',
    category: 'sofa',
    basePrice: 399,
    pricingUnit: 'per_seat',
    turnaroundTime: 'On-Site (2-3 Hours)',
    badge: 'On-Site Care',
    description: 'Deep injection-extraction shampooing and vacuuming for living room fabric sofas.',
    features: ['Deep shampoo extraction', 'Dust mite & stain elimination', 'Fast drying in 2-3 hours'],
  },
  {
    id: 'sofa-leather',
    title: 'Leather Sofa Seat Cleaning',
    category: 'sofa',
    basePrice: 479,
    pricingUnit: 'per_seat',
    turnaroundTime: 'On-Site (2-3 Hours)',
    badge: 'Leather Spa',
    description: 'Specialized leather nourishment, stain removal, and protective conditioning cream.',
    features: ['Natural essential oil conditioning', 'Cracking prevention', 'Luster restoration'],
  },
  {
    id: 'dining-chair',
    title: 'Dining Chair Cleaning',
    category: 'sofa',
    basePrice: 250,
    pricingUnit: 'per_chair',
    turnaroundTime: 'On-Site',
    badge: 'Chairs',
    description: 'Deep foam shampooing and fabric stain extraction for dining chairs.',
    features: ['Food & spill stain removal', 'Sanitized hot foam treatment'],
  },
  {
    id: 'small-chair',
    title: 'Small Chair Cleaning',
    category: 'sofa',
    basePrice: 189,
    pricingUnit: 'per_chair',
    turnaroundTime: 'On-Site',
    badge: 'Chairs',
    description: 'Deep cleaning for study chairs, armchairs, and small accent seating.',
    features: ['Fabric rejuvenation', 'Dust extraction'],
  },
  {
    id: 'cushion-large',
    title: 'Large Cushion Cleaning',
    category: 'sofa',
    basePrice: 129,
    pricingUnit: 'per_pc',
    turnaroundTime: '24-48 Hours',
    badge: 'Cushions',
    description: 'Deep washing and fluffing for large sofa cushions.',
    features: ['Hypoallergenic sanitization', 'Fiber fluffing'],
  },
  {
    id: 'cushion-small',
    title: 'Small Cushion Cleaning',
    category: 'sofa',
    basePrice: 119,
    pricingUnit: 'per_pc',
    turnaroundTime: '24-48 Hours',
    badge: 'Cushions',
    description: 'Deep washing and deodorizing for small throw cushions.',
    features: ['Fabric softening', 'Odor neutralizer'],
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet & Rugs Cleaning',
    category: 'household',
    basePrice: 35,
    pricingUnit: 'per_sqft',
    turnaroundTime: '3 to 4 Days',
    badge: 'Carpet Specialist',
    description: 'Deep rotary brush shampooing and industrial moisture extraction at ₹35 per square feet.',
    features: ['₹35 per square feet pricing', 'Removes deep ground-in dirt', 'Anti-microbial rinse'],
  },
  {
    id: 'dry-clean-pieces',
    title: 'Premium Dry Cleaning',
    category: 'dry_cleaning',
    basePrice: 149,
    pricingUnit: 'per_piece_starts',
    turnaroundTime: '48 Hours',
    badge: 'Delicates & Suits',
    description: 'Blazers, silk sarees, lehengas, suits, winter jackets, and delicate fabrics.',
    features: ['Non-toxic hydrocarbon solvents', 'Pre-wash stain inspection', 'Dust-proof packaging'],
  },
  {
    id: 'wedding-wears',
    title: 'Wedding Wears & Fancy Garments',
    category: 'wedding',
    basePrice: 499,
    pricingUnit: 'per_piece_starts',
    turnaroundTime: '72 Hours',
    badge: 'Royal Care',
    description: 'Heavy bridal lehengas, groom sherwanis, designer gowns with zari and stone work.',
    features: ['Protective net washing', 'Hand inspection', 'Acid-free tissue pack'],
  },
  {
    id: 'saree-polishing',
    title: 'Saree Roll Polishing',
    category: 'wedding',
    basePrice: 199,
    pricingUnit: 'per_saree',
    turnaroundTime: '48 Hours',
    badge: 'Silk & Zari',
    description: 'Heated steel roll polishing bringing back original silk shine and crisp drape.',
    features: ['Heated gloss roll finish', 'Zari anti-tarnish care'],
  },
  {
    id: 'darning-rafoo',
    title: 'Darning / Rafoo',
    category: 'repair',
    basePrice: 99,
    pricingUnit: 'per_tear_starts',
    turnaroundTime: '48 Hours',
    badge: 'Invisible Mending',
    description: 'Expert cloth tear reweaving and invisible mending matching the exact fabric grain.',
    features: ['Invisible stitching', 'Exact color matching yarn'],
  },
  {
    id: 'fabric-dyeing',
    title: 'Fabric Dyeing',
    category: 'repair',
    basePrice: 249,
    pricingUnit: 'per_piece',
    turnaroundTime: '4 to 5 Days',
    badge: 'Color Revival',
    description: 'Vat dyeing restoring faded jeans, kurtas, and cottons with colorfast German pigments.',
    features: ['Uniform non-patchy shade', 'Colorfast guarantee'],
  },
  {
    id: 'curtain-cleaning',
    title: 'Curtain & Drapes Cleaning',
    category: 'household',
    basePrice: 120,
    pricingUnit: 'per_panel',
    turnaroundTime: '72 Hours',
    badge: 'Window Care',
    description: 'Heavy drapery cleaning, pleat retention, and on-site vertical steam refresh.',
    features: ['Pleat shape retention', 'Deep steam deodorization'],
  },
  {
    id: 'shoe-spa',
    title: 'Sneakers & Bag Spa',
    category: 'spa',
    basePrice: 299,
    pricingUnit: 'per_pair',
    turnaroundTime: '72 Hours',
    badge: 'Footwear & Bags',
    description: 'Midsole scrubbing, suede revival, and luxury handbag leather conditioning.',
    features: ['Midsole unyellowing', 'Deodorization', 'Waterproof nanotech shield'],
  },
];

export async function getLiveServiceRates(): Promise<LaundryServiceRate[]> {
  return KG_ALL_RATES;
}
