import { Product, Category } from './types';

// Updated images to be perfectly matched with the product names
export const IMAGES = {
  // Industrial Generator: Big yellow/orange industrial generator
  generator: '/images/Generatorde.png',

  // Portable Room Cooler: Looks like a standing cooling unit
  cooler: '/images/cooler.webp',

  // Split Air Conditioner: Clear wall mounted white AC
  ac: '/images/ac.jpg',

  // Refrigerator: Modern stainless steel fridge
  fridge: '/images/fridge.jpg',

  // Large LED TV: Flat screen TV on wall/stand
  tv: '/images/tv.avif',

  // Portable Generator: Small red/black petrol engine generator
  portableGenerator: '/images/portable.jpg',

  // Washing Machine: Front load laundry machine
  washingMachine: '/images/washing-machine.avif',

  // Deep Freezer: Inside view of a freezer/fridge
  deepFreezer: '/images/freezer.webp',

  // Window AC: Boxy air conditioning unit
  windowAc: '/images/acwindow.jpg',

  // Logo: ZEA text logo
  logo: '/images/logo.png',

  // Hero: Modern Kitchen/Living room with appliances (No keyboards)
  hero: '/images/home.avif',

  // Placeholder: A generic "Home & Living" background if an image fails (Safe fallback)
  placeholder: '/images/placeholder.jpg'
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Titanium Series 50kVA Silent Generator",
    category: Category.Generators,
    price: 4500.00,
    image: IMAGES.generator,
    description: "High-performance diesel generator designed for industrial and large residential power backup. Features silent operation technology and fuel efficiency.",
    specs: {
      "Power Output": "50 kVA",
      "Fuel Type": "Diesel",
      "Noise Level": "65 dB",
      "Tank Capacity": "100L"
    },
    rating: 4.8,
    reviews: [
      { id: 1, user: "John D.", rating: 5, comment: "Excellent backup power, runs very quietly.", date: "2023-10-12" }
    ],
    featured: true
  },
  {
    id: 2,
    name: "Arctic Blast Room Cooler 5000",
    category: Category.RoomCoolers,
    price: 150.00,
    image: IMAGES.cooler,
    description: "Efficient room cooling solution with honeycomb pads and massive water tank capacity. Keep your room fresh and cool during hot summers.",
    specs: {
      "Capacity": "50 Liters",
      "Type": "Desert Cooler",
      "Power Consumption": "180W",
      "Air Throw": "40 ft"
    },
    rating: 4.5,
    reviews: [],
    featured: true
  },
  {
    id: 3,
    name: "FrostGuard 1.5 Ton Inverter AC",
    category: Category.AirConditioners,
    price: 550.00,
    image: IMAGES.ac,
    description: "Energy-saving inverter air conditioner with fast cooling mode and anti-bacterial filter. 10-year compressor warranty included.",
    specs: {
      "Capacity": "1.5 Ton",
      "Energy Rating": "5 Star",
      "Refrigerant": "R32",
      "Warranty": "1 Year Product, 10 Years Compressor"
    },
    rating: 4.9,
    reviews: [],
    featured: true
  },
  {
    id: 4,
    name: "Grandeur Double Door Refrigerator",
    category: Category.Refrigerators,
    price: 899.00,
    image: IMAGES.fridge,
    description: "Premium stainless steel finish double door refrigerator with smart cooling technology and convertible freezer zones.",
    specs: {
      "Capacity": "550 Liters",
      "Type": "Side-by-Side",
      "Finish": "Stainless Steel",
      "Smart Features": "Yes"
    },
    rating: 4.7,
    reviews: [],
    featured: true
  },
  {
    id: 5,
    name: "CrystalView 65\" 4K OLED TV",
    category: Category.LEDTVs,
    price: 1200.00,
    image: IMAGES.tv,
    description: "Immersive cinematic experience with pure blacks and vivid colors. Supports Dolby Vision and Atmos.",
    specs: {
      "Screen Size": "65 Inch",
      "Resolution": "4K UHD",
      "Panel Type": "OLED",
      "Smart OS": "Android TV"
    },
    rating: 4.8,
    reviews: [],
    featured: true
  },
  {
    id: 6,
    name: "PowerLite 5kVA Portable Generator",
    category: Category.Generators,
    price: 800.00,
    image: IMAGES.portableGenerator,
    description: "Portable petrol generator suitable for camping and small home backup.",
    specs: {
      "Power Output": "5 kVA",
      "Fuel Type": "Petrol",
      "Start Type": "Electric Start"
    },
    rating: 4.2,
    reviews: [],
    featured: false
  },
  {
    id: 7,
    name: "TurboWash Front Load Machine",
    category: Category.Refrigerators, // Categorizing as general appliance for now
    price: 650.00,
    image: IMAGES.washingMachine,
    description: "Heavy duty 12kg front load washing machine with steam wash and inverter direct drive motor.",
    specs: {
      "Capacity": "12 KG",
      "Type": "Front Load",
      "RPM": "1400",
      "Energy": "A+++"
    },
    rating: 4.6,
    reviews: [],
    featured: true
  },
  {
    id: 8,
    name: "Arctic Deep Freezer 400L",
    category: Category.Refrigerators,
    price: 450.00,
    image: IMAGES.deepFreezer,
    description: "Large capacity chest freezer for long term storage. Quick freeze function and lockable lid.",
    specs: {
      "Capacity": "400 Liters",
      "Type": "Chest Freezer",
      "Cooling": "Direct Cool"
    },
    rating: 4.3,
    reviews: [],
    featured: false
  },
  {
    id: 9,
    name: "CoolBreeze Window AC",
    category: Category.AirConditioners,
    price: 300.00,
    image: IMAGES.windowAc,
    description: "Powerful window air conditioner with turbo cooling and dehumidifier mode.",
    specs: {
      "Capacity": "1 Ton",
      "Type": "Window AC",
      "Energy Rating": "3 Star"
    },
    rating: 4.1,
    reviews: [],
    featured: false
  }
];