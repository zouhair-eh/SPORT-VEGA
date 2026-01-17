export const CATEGORIES = [
  { id: 'gym', label: 'Gym & Crossfit', icon: 'FaDumbbell' },
  { id: 'cardio', label: 'Cardio Training', icon: 'FaRunning' },
  { id: 'football', label: 'Football / Soccer', icon: 'FaFutbol' },
  { id: 'boxing', label: 'Boxing & MMA', icon: 'FaHandRock' },
  { id: 'basketball', label: 'Basketball', icon: 'FaBasketballBall' },
  { id: 'tennis', label: 'Tennis & Padel', icon: 'FaTableTennis' },
  { id: 'running', label: 'Running & Track', icon: 'FaShoePrints' },
  { id: 'recovery', label: 'Recovery & Health', icon: 'FaHeartbeat' },
  { id: 'apparel', label: 'Activewear', icon: 'FaTshirt' },
  { id: 'teamkits', label: 'Team Kits (Custom)', icon: 'FaUsers' },
];

const generateProducts = () => {
  const p = [];

  // GYM (20 items)
  for (let i = 1; i <= 20; i++) {
    p.push({
      id: `gym-${i}`,
      name: i % 3 === 0 ? `Dumbbell Set Pro ${i * 5}kg` : (i % 2 === 0 ? `Olympic Barbell ${i}x` : `Kettlebell Steel ${i * 2}kg`),
      priceMAD: 200 + (i * 50),
      category: 'gym',
      short: 'Equipement de musculation haute résistance.',
      stock: 10 + i,
      rating: 4.5 + (i % 5) / 10,
      popularity: 80 + (i % 20),
      imageQuery: 'gym equipment weights',
      tags: ['muscle', 'strength', 'pro']
    });
  }

  // FOOTBALL (30 items)
  const footballTeams = ['Maroc Home', 'Maroc Away', 'Real Madrid', 'Barça', 'PSG', 'Man City', 'Bayern', 'Raja CA', 'Wydad AC', 'RS Berkane'];
  footballTeams.forEach((team, k) => {
    p.push({
      id: `fb-kit-${k}`,
      name: `Maillot ${team} 2026`,
      priceMAD: 350,
      category: 'football',
      short: `Maillot officiel ${team} avec technologie Dry-Fit.`,
      customizable: true,
      stock: 50,
      rating: 4.9,
      popularity: 95,
      imageQuery: `football jersey ${team}`,
      tags: ['kit', team.toLowerCase(), 'official']
    });
  });
  for (let i = 1; i <= 20; i++) {
    p.push({
      id: `fb-item-${i}`,
      name: i % 2 === 0 ? `Ballon Match Pro V${i}` : `Crampons SpeedTech ${i}`,
      priceMAD: 250 + (i * 30),
      category: 'football',
      short: 'Performance maximale sur le terrain.',
      stock: 15 + i,
      rating: 4.7,
      popularity: 88,
      imageQuery: i % 2 === 0 ? 'soccer ball' : 'football boots',
      tags: ['gear', 'pro']
    });
  }

  // BOXING & MMA (20 items)
  for (let i = 1; i <= 20; i++) {
    p.push({
      id: `box-${i}`,
      name: i % 2 === 0 ? `Gants Cuir Vega ${i}` : `Sac de frappe Heavy ${i}kg`,
      priceMAD: 300 + (i * 40),
      category: 'boxing',
      short: 'Protection et durabilité pour combattants.',
      stock: 8 + i,
      rating: 4.8,
      popularity: 92,
      imageQuery: i % 2 === 0 ? 'boxing gloves' : 'punching bag',
      tags: ['combat', 'mma']
    });
  }

  // CARDIO (15 items)
  for (let i = 1; i <= 15; i++) {
    p.push({
      id: `cardio-${i}`,
      name: i % 3 === 0 ? `Tapis de course X${i}` : (i % 2 === 0 ? `Vélo Spinning Pro ${i}` : `Rameur Air ${i}`),
      priceMAD: 2500 + (i * 500),
      category: 'cardio',
      short: 'Cardio intense à domicile ou en salle.',
      stock: 5,
      rating: 4.6,
      popularity: 85,
      imageQuery: 'treadmill gym bike',
      tags: ['cardio', 'endurance']
    });
  }

  // BASKETBALL (15 items)
  for (let i = 1; i <= 15; i++) {
    p.push({
      id: `bk-${i}`,
      name: i % 2 === 0 ? `Ballon NBA Vega ${i}` : `Maillot Basket Pro ${i}`,
      priceMAD: 200 + (i * 20),
      category: 'basketball',
      short: 'Equipement basketball professionnel.',
      stock: 20,
      rating: 4.7,
      popularity: 89,
      imageQuery: 'basketball ball hoop',
      tags: ['nba', 'ball']
    });
  }

  // TENNIS & PADEL (15 items)
  for (let i = 1; i <= 15; i++) {
    p.push({
      id: `tn-${i}`,
      name: i % 2 === 0 ? `Raquette Padel Carbon ${i}` : `Raquette Tennis Pro ${i}`,
      priceMAD: 800 + (i * 100),
      category: 'tennis',
      short: 'Contrôle et puissance pour chaque frappe.',
      stock: 12,
      rating: 4.5,
      popularity: 82,
      imageQuery: 'tennis racket padel',
      tags: ['tennis', 'padel']
    });
  }

  // RUNNING (20 items)
  for (let i = 1; i <= 20; i++) {
    p.push({
      id: `rn-${i}`,
      name: `Chaussures RunUltra V${i}`,
      priceMAD: 600 + (i * 25),
      category: 'running',
      short: 'Amorti exceptionnel pour marathons et sprints.',
      stock: 30,
      rating: 4.8,
      popularity: 94,
      imageQuery: 'running shoes sneaker',
      tags: ['run', 'comfort']
    });
  }

  // RECOVERY (10 items)
  for (let i = 1; i <= 10; i++) {
    p.push({
      id: `rc-${i}`,
      name: i % 2 === 0 ? `Pistolet de massage G${i}` : `Rouleau Mousse Pro ${i}`,
      priceMAD: 150 + (i * 100),
      category: 'recovery',
      short: 'Optimisez votre récupération après l\'effort.',
      stock: 15,
      rating: 4.9,
      popularity: 91,
      imageQuery: 'massage gun foam roller',
      tags: ['health', 'rest']
    });
  }

  // APPAREL (20 items)
  for (let i = 1; i <= 20; i++) {
    p.push({
      id: `ap-${i}`,
      name: i % 2 === 0 ? `Short Compression ${i}` : `T-shirt TechFit ${i}`,
      priceMAD: 150 + (i * 10),
      category: 'apparel',
      short: 'Textile technique respirant.',
      stock: 100,
      rating: 4.7,
      popularity: 96,
      imageQuery: 'sports t-shirt shorts',
      tags: ['wear', 'tech']
    });
  }

  return p;
};

export const PRODUCTS = generateProducts();

