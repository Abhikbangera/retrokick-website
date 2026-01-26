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
  {
    id: '1',
    name: 'Brazil 1970 World Cup Jersey',
    price: 8999,
    category: 'retro',
    team: 'Brazil',
    year: '1970',
    image: 'https://images.unsplash.com/photo-1578158032457-9376dc91c1dc?w=600',
    stock: 12,
    limitedEdition: true,
    description: 'Iconic yellow jersey worn by Pelé during the legendary 1970 World Cup victory.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '2',
    name: 'Manchester United Retro 99',
    price: 7499,
    category: 'retro',
    team: 'Manchester United',
    year: '1999',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=600',
    stock: 8,
    limitedEdition: true,
    description: 'Treble-winning season jersey - a true piece of football history.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'AC Milan Home Jersey 2024',
    price: 6999,
    category: 'club',
    team: 'AC Milan',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=600',
    stock: 25,
    description: 'Classic Rossoneri stripes - the spirit of San Siro in every thread.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '4',
    name: 'Argentina 2022 World Cup',
    price: 9999,
    category: 'international',
    team: 'Argentina',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1607417307259-afd87bdf92a5?w=600',
    stock: 5,
    limitedEdition: true,
    description: 'Championship-winning jersey from Qatar 2022 - Messi\'s ultimate triumph.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '5',
    name: 'Real Madrid Galácticos 2003',
    price: 7999,
    category: 'retro',
    team: 'Real Madrid',
    year: '2003',
    image: 'https://images.unsplash.com/photo-1578158032457-9376dc91c1dc?w=600',
    stock: 15,
    description: 'Worn by legends like Zidane, Ronaldo, and Beckham in their prime.',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: '6',
    name: 'Barcelona Home 2024',
    price: 6499,
    category: 'club',
    team: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=600',
    stock: 30,
    description: 'Blaugrana colors with modern performance fabric - more than a club.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '7',
    name: 'Germany 1990 World Cup',
    price: 8499,
    category: 'retro',
    team: 'Germany',
    year: '1990',
    image: 'https://images.unsplash.com/photo-1697736667820-84fc04ef7462?w=600',
    stock: 10,
    limitedEdition: true,
    description: 'Championship jersey from Italia \'90 - timeless German engineering.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '8',
    name: 'France 2018 World Cup',
    price: 9499,
    category: 'international',
    team: 'France',
    year: '2018',
    image: 'https://images.unsplash.com/photo-1607417307259-afd87bdf92a5?w=600',
    stock: 18,
    description: 'Les Bleus\' victorious jersey from Russia 2018 - Mbappé\'s breakthrough.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '9',
    name: 'Liverpool Home 2024',
    price: 6899,
    category: 'club',
    team: 'Liverpool',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=600',
    stock: 22,
    description: 'You\'ll Never Walk Alone - legendary red with modern performance tech.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '10',
    name: 'Italy Azzurri 2020',
    price: 8999,
    category: 'international',
    team: 'Italy',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1657957746418-6a38df9e1ea7?w=600',
    stock: 14,
    description: 'Euro 2020 champions - the pride of Italian football reborn.',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: '11',
    name: 'Arsenal Invincibles 2004',
    price: 8499,
    category: 'retro',
    team: 'Arsenal',
    year: '2004',
    image: 'https://images.unsplash.com/photo-1578158032457-9376dc91c1dc?w=600',
    stock: 7,
    limitedEdition: true,
    description: 'Unbeaten season jersey - Henry, Bergkamp, and Vieira\'s masterpiece.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '12',
    name: 'Netherlands 1988 Euro',
    price: 7999,
    category: 'retro',
    team: 'Netherlands',
    year: '1988',
    image: 'https://images.unsplash.com/photo-1697736667820-84fc04ef7462?w=600',
    stock: 9,
    limitedEdition: true,
    description: 'Van Basten\'s legendary volley jersey - Total Football at its peak.',
    sizes: ['M', 'L', 'XL']
  }
];

export const categories = [
  {
    id: 'retro',
    name: 'Retro Jerseys',
    description: 'Timeless classics from football\'s golden eras',
    image: 'https://images.unsplash.com/photo-1697736667820-84fc04ef7462?w=800',
    count: products.filter(p => p.category === 'retro').length
  },
  {
    id: 'club',
    name: 'Club Jerseys',
    description: 'Support your favorite teams with official gear',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=800',
    count: products.filter(p => p.category === 'club').length
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
    content: 'Amazing quality! The Brazil 1970 jersey is exactly what I wanted. Authentic feel and great material.',
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
    content: 'The Treble 99 jersey brought back so many memories. Perfect fit and authentic design. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  }
];
