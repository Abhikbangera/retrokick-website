export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'retro' | 'club' | 'international';
  team: string;
  year?: string;
  image: string;
  stock: number;
  limitedEdition?: boolean;
  description: string;
  sizes: string[];
}

export const products: Product[] = [
  // Club Jerseys 25-26
  {
    id: '1',
    name: 'Barcelona Home 2025-26',
    price: 6999,
    category: 'club',
    team: 'Barcelona',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=600',
    stock: 25,
    description: 'New season Blaugrana home jersey featuring the iconic stripes with modern performance fabric.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '2',
    name: 'Real Madrid Home 2025-26',
    price: 7499,
    category: 'club',
    team: 'Real Madrid',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1578158032457-9376dc91c1dc?w=600',
    stock: 30,
    description: 'Pure white excellence for the new season. Champions League glory awaits.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '3',
    name: 'Manchester United 2025-26',
    price: 6999,
    category: 'club',
    team: 'Manchester United',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=600',
    stock: 22,
    description: 'Iconic red devil jersey for the new era at Old Trafford.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'Arsenal Third Kit 2025-26',
    price: 6499,
    category: 'club',
    team: 'Arsenal',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1578158032457-9376dc91c1dc?w=600',
    stock: 18,
    description: 'Bold new third kit featuring premium tech fleece for ultimate comfort.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  // Retro Jerseys
  {
    id: '5',
    name: 'AC Milan 2006-07 Retro',
    price: 8999,
    category: 'retro',
    team: 'AC Milan',
    year: '2007',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=600',
    stock: 8,
    limitedEdition: true,
    description: 'The legendary jersey from Milan\'s 6th Champions League trophy. Featuring Kaká, Pirlo, and Seedorf.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '6',
    name: 'England 2006 World Cup Retro',
    price: 8499,
    category: 'retro',
    team: 'England',
    year: '2006',
    image: 'https://images.unsplash.com/photo-1607417307259-afd87bdf92a5?w=600',
    stock: 10,
    limitedEdition: true,
    description: 'Classic white shirt from Germany 2006. Beckham, Rooney, and Gerrard era.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  // International 25-26
  {
    id: '7',
    name: 'Argentina 2025-26 Home',
    price: 7999,
    category: 'international',
    team: 'Argentina',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1607417307259-afd87bdf92a5?w=600',
    stock: 15,
    description: 'New season Albiceleste jersey. Continuing the legacy of World Cup champions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '8',
    name: 'England 2025-26 Home',
    price: 7499,
    category: 'international',
    team: 'England',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1607417307259-afd87bdf92a5?w=600',
    stock: 20,
    description: 'Three Lions new home kit. Hope and glory for the upcoming tournaments.',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

export const categories = [
  {
    id: 'club',
    name: 'Club Jerseys',
    description: 'Support your favorite teams with official gear',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=800',
    count: products.filter(p => p.category === 'club').length
  },
  {
    id: 'retro',
    name: 'Retro Jerseys',
    description: 'Timeless classics from football\'s golden eras',
    image: 'https://images.unsplash.com/photo-1697736667820-84fc04ef7462?w=800',
    count: products.filter(p => p.category === 'retro').length
  },
  {
    id: 'international',
    name: 'International Team Jerseys',
    description: 'Represent your nation with pride',
    image: 'https://images.unsplash.com/photo-1607417307259-afd87bdf92a5?w=800',
    count: products.filter(p => p.category === 'international').length
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Football Enthusiast',
    content: 'Amazing quality! The retro jerseys are exactly what I wanted. Authentic feel and great material.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Collector',
    content: 'RetroKick has the best collection of vintage jerseys in India. Fast delivery and excellent customer service!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
  {
    id: '3',
    name: 'Arjun Patel',
    role: 'Manchester United Fan',
    content: 'The new season jersey is amazing. Perfect fit and authentic design. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  }
];

