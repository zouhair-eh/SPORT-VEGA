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

// Helper function to generate product image URLs
// Using Picsum Photos (reliable placeholder service) + AI-generated images for specific jerseys
const getProductImage = (query, seed, teamName = null) => {
  // Check if we have AI-generated image for this specific team
  const aiGeneratedJerseys = {
    'Maroc Home': '/images/football/jerseys/morocco_home.png',
    'Maroc Away': '/images/football/jerseys/morocco_away.png',
    'France Home': '/images/football/jerseys/france_home.png',
    'France Away': '/images/football/jerseys/france_away.png',
    'Brazil Home': '/images/football/jerseys/brazil_home.png',
    'Brazil Away': '/images/football/jerseys/brazil_away.png',
    'Argentina Home': '/images/football/jerseys/argentina_home.png',
    'Argentina Away': '/images/football/jerseys/argentina_away.png',
    'Portugal Home': '/images/football/jerseys/portugal_home.png',
  };

  if (teamName && aiGeneratedJerseys[teamName]) {
    return aiGeneratedJerseys[teamName];
  }

  // Use Picsum Photos for all other products (working placeholder service)
  return `https://picsum.photos/seed/${query}-${seed}/800/800`;
};

const generateProducts = () => {
  const p = [];

  // FOOTBALL TEAM JERSEYS - ALL 120 MAD (40+ teams)
  const footballTeams = [
    // International Teams
    { name: 'Maroc Home', query: 'morocco-football-jersey-red', team: 'Morocco', league: 'International' },
    { name: 'Maroc Away', query: 'morocco-football-jersey-white', team: 'Morocco', league: 'International' },
    { name: 'France Home', query: 'france-football-jersey-blue', team: 'France', league: 'International' },
    { name: 'France Away', query: 'france-football-jersey-white', team: 'France', league: 'International' },
    { name: 'Brazil Home', query: 'brazil-football-jersey-yellow', team: 'Brazil', league: 'International' },
    { name: 'Brazil Away', query: 'brazil-football-jersey-blue', team: 'Brazil', league: 'International' },
    { name: 'Argentina Home', query: 'argentina-football-jersey', team: 'Argentina', league: 'International' },
    { name: 'Argentina Away', query: 'argentina-football-jersey-blue', team: 'Argentina', league: 'International' },
    { name: 'Portugal Home', query: 'portugal-football-jersey-red', team: 'Portugal', league: 'International' },
    { name: 'Spain Home', query: 'spain-football-jersey-red', team: 'Spain', league: 'International' },
    { name: 'Germany Home', query: 'germany-football-jersey-white', team: 'Germany', league: 'International' },
    { name: 'England Home', query: 'england-football-jersey-white', team: 'England', league: 'International' },

    // La Liga
    { name: 'Real Madrid Home', query: 'real-madrid-jersey-white', team: 'Real Madrid', league: 'La Liga' },
    { name: 'Real Madrid Away', query: 'real-madrid-jersey-black', team: 'Real Madrid', league: 'La Liga' },
    { name: 'Barcelona Home', query: 'barcelona-jersey-blue-red', team: 'Barcelona', league: 'La Liga' },
    { name: 'Barcelona Away', query: 'barcelona-jersey-yellow', team: 'Barcelona', league: 'La Liga' },
    { name: 'Atletico Madrid', query: 'atletico-madrid-jersey', team: 'Atletico Madrid', league: 'La Liga' },
    { name: 'Sevilla', query: 'sevilla-jersey-white', team: 'Sevilla', league: 'La Liga' },

    // Premier League
    { name: 'Man City Home', query: 'manchester-city-jersey-blue', team: 'Man City', league: 'Premier League' },
    { name: 'Man United', query: 'manchester-united-jersey-red', team: 'Man United', league: 'Premier League' },
    { name: 'Liverpool', query: 'liverpool-jersey-red', team: 'Liverpool', league: 'Premier League' },
    { name: 'Chelsea', query: 'chelsea-jersey-blue', team: 'Chelsea', league: 'Premier League' },
    { name: 'Arsenal', query: 'arsenal-jersey-red', team: 'Arsenal', league: 'Premier League' },
    { name: 'Tottenham', query: 'tottenham-jersey-white', team: 'Tottenham', league: 'Premier League' },

    // Ligue 1
    { name: 'PSG Home', query: 'psg-jersey-blue-red', team: 'PSG', league: 'Ligue 1' },
    { name: 'PSG Away', query: 'psg-jersey-white', team: 'PSG', league: 'Ligue 1' },
    { name: 'Marseille', query: 'marseille-jersey-white', team: 'Marseille', league: 'Ligue 1' },
    { name: 'Lyon', query: 'lyon-jersey-white', team: 'Lyon', league: 'Ligue 1' },

    // Bundesliga
    { name: 'Bayern Munich', query: 'bayern-munich-jersey-red', team: 'Bayern', league: 'Bundesliga' },
    { name: 'Borussia Dortmund', query: 'dortmund-jersey-yellow', team: 'Dortmund', league: 'Bundesliga' },

    // Serie A
    { name: 'Juventus', query: 'juventus-jersey-black-white', team: 'Juventus', league: 'Serie A' },
    { name: 'AC Milan', query: 'ac-milan-jersey-red-black', team: 'AC Milan', league: 'Serie A' },
    { name: 'Inter Milan', query: 'inter-milan-jersey-blue', team: 'Inter Milan', league: 'Serie A' },

    // Moroccan League
    { name: 'Raja CA Home', query: 'raja-casablanca-jersey-green', team: 'Raja CA', league: 'Botola Pro' },
    { name: 'Raja CA Away', query: 'raja-casablanca-jersey-white', team: 'Raja CA', league: 'Botola Pro' },
    { name: 'Wydad AC Home', query: 'wydad-casablanca-jersey-red', team: 'Wydad AC', league: 'Botola Pro' },
    { name: 'Wydad AC Away', query: 'wydad-casablanca-jersey-white', team: 'Wydad AC', league: 'Botola Pro' },
    { name: 'RS Berkane', query: 'rs-berkane-jersey-orange', team: 'RS Berkane', league: 'Botola Pro' },
    { name: 'FUS Rabat', query: 'fus-rabat-jersey-yellow', team: 'FUS Rabat', league: 'Botola Pro' },
    { name: 'Hassania Agadir', query: 'hassania-agadir-jersey', team: 'Hassania Agadir', league: 'Botola Pro' },
  ];

  footballTeams.forEach((team, k) => {
    p.push({
      id: `fb-kit-${k}`,
      name: `Maillot ${team.name} 2026`,
      priceMAD: 120, // ALL JERSEYS 120 MAD
      category: 'football',
      short: `Maillot officiel ${team.name} avec technologie Dry-Fit.`,
      image: getProductImage(team.query, k + 100, team.name),
      customizable: true,
      stock: 50,
      rating: 4.8 + (Math.random() * 0.2),
      popularity: 90 + Math.floor(Math.random() * 10),
      team: team.team,
      league: team.league,
      tags: ['kit', team.team.toLowerCase(), 'official', 'jersey']
    });
  });

  // FOOTBALL EQUIPMENT (30 items)
  const footballEquipment = [
    { name: 'Ballon Match Pro FIFA', price: 299, query: 'professional-soccer-ball' },
    { name: 'Ballon Entraînement Elite', price: 199, query: 'training-soccer-ball' },
    { name: 'Ballon Futsal Pro', price: 249, query: 'futsal-ball' },
    { name: 'Crampons Nike Mercurial', price: 899, query: 'nike-mercurial-football-boots' },
    { name: 'Crampons Adidas Predator', price: 849, query: 'adidas-predator-boots' },
    { name: 'Crampons Puma Future', price: 799, query: 'puma-football-boots' },
    { name: 'Chaussures Futsal Nike', price: 599, query: 'futsal-shoes' },
    { name: 'Gants Gardien Pro', price: 349, query: 'goalkeeper-gloves-professional' },
    { name: 'Gants Gardien Elite', price: 449, query: 'goalkeeper-gloves-elite' },
    { name: 'Protège-tibias Nike', price: 149, query: 'nike-shin-guards' },
    { name: 'Protège-tibias Adidas', price: 139, query: 'adidas-shin-guards' },
    { name: 'Sac de Sport Nike', price: 399, query: 'nike-sports-bag-football' },
    { name: 'Sac à Dos Football', price: 299, query: 'football-backpack' },
    { name: 'Chasubles Entraînement x10', price: 249, query: 'training-bibs-football' },
    { name: 'Cônes Entraînement x20', price: 99, query: 'training-cones-football' },
    { name: 'Échelle Agilité Pro', price: 199, query: 'agility-ladder-football' },
    { name: 'Haies Entraînement x6', price: 299, query: 'training-hurdles' },
    { name: 'Pompe Ballon Pro', price: 49, query: 'ball-pump' },
    { name: 'Filet But 3x2m', price: 499, query: 'football-goal-net' },
    { name: 'But Portable 2x1.5m', price: 899, query: 'portable-football-goal' },
  ];

  footballEquipment.forEach((item, i) => {
    p.push({
      id: `fb-equip-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'football',
      short: 'Équipement de football professionnel.',
      image: getUnsplashImage(item.query, i + 200),
      stock: 25 + Math.floor(Math.random() * 30),
      rating: 4.5 + (Math.random() * 0.4),
      popularity: 75 + Math.floor(Math.random() * 20),
      tags: ['equipment', 'football', 'training']
    });
  });

  // GYM & CROSSFIT (40 items)
  const gymEquipment = [
    { name: 'Haltères 5kg (Paire)', price: 199, query: 'dumbbells-5kg' },
    { name: 'Haltères 10kg (Paire)', price: 349, query: 'dumbbells-10kg' },
    { name: 'Haltères 15kg (Paire)', price: 499, query: 'dumbbells-15kg' },
    { name: 'Haltères 20kg (Paire)', price: 649, query: 'dumbbells-20kg' },
    { name: 'Set Haltères 2-20kg', price: 2499, query: 'dumbbell-set-rack' },
    { name: 'Kettlebell 8kg', price: 249, query: 'kettlebell-8kg' },
    { name: 'Kettlebell 12kg', price: 349, query: 'kettlebell-12kg' },
    { name: 'Kettlebell 16kg', price: 449, query: 'kettlebell-16kg' },
    { name: 'Kettlebell 20kg', price: 549, query: 'kettlebell-20kg' },
    { name: 'Barre Olympique 20kg', price: 899, query: 'olympic-barbell' },
    { name: 'Disques 5kg (Paire)', price: 299, query: 'weight-plates-5kg' },
    { name: 'Disques 10kg (Paire)', price: 499, query: 'weight-plates-10kg' },
    { name: 'Disques 20kg (Paire)', price: 899, query: 'weight-plates-20kg' },
    { name: 'Banc Musculation Réglable', price: 1499, query: 'adjustable-weight-bench' },
    { name: 'Banc Plat Pro', price: 899, query: 'flat-weight-bench' },
    { name: 'Rack Squat Professionnel', price: 3999, query: 'squat-rack-professional' },
    { name: 'Cage Crossfit Complete', price: 7999, query: 'crossfit-cage-rig' },
    { name: 'Barre Traction Murale', price: 599, query: 'wall-mounted-pull-up-bar' },
    { name: 'Anneaux Gymnastique', price: 299, query: 'gymnastics-rings' },
    { name: 'Corde Ondulatoire 12m', price: 799, query: 'battle-rope' },
    { name: 'Medecine Ball 5kg', price: 349, query: 'medicine-ball-5kg' },
    { name: 'Medecine Ball 10kg', price: 499, query: 'medicine-ball-10kg' },
    { name: 'Slam Ball 15kg', price: 449, query: 'slam-ball' },
    { name: 'Wall Ball 9kg', price: 399, query: 'wall-ball' },
    { name: 'Poids Russes Set', price: 1299, query: 'kettlebell-set' },
    { name: 'Élastiques Résistance Set', price: 249, query: 'resistance-bands-set' },
    { name: 'Bandes Élastiques Lourdes', price: 349, query: 'heavy-resistance-bands' },
    { name: 'TRX Suspension Pro', price: 899, query: 'trx-suspension-trainer' },
    { name: 'Ab Wheel Pro', price: 149, query: 'ab-roller-wheel' },
    { name: 'Planche Abdominale', price: 399, query: 'ab-bench' },
    { name: 'Gants Musculation Pro', price: 199, query: 'gym-gloves-professional' },
    { name: 'Ceinture Haltérophilie', price: 449, query: 'weightlifting-belt' },
    { name: 'Sangles Poignets', price: 149, query: 'wrist-wraps' },
    { name: 'Genouillères Crossfit', price: 249, query: 'knee-sleeves-crossfit' },
    { name: 'Tapis Gym Épais', price: 399, query: 'thick-gym-mat' },
    { name: 'Plateforme Haltérophilie', price: 1999, query: 'weightlifting-platform' },
    { name: 'Bumper Plates Set 100kg', price: 3499, query: 'bumper-plates-set' },
    { name: 'Barre EZ Curl', price: 449, query: 'ez-curl-bar' },
    { name: 'Barre Triceps', price: 349, query: 'tricep-bar' },
    { name: 'Poignées Push-Up', price: 129, query: 'push-up-handles' },
  ];

  gymEquipment.forEach((item, i) => {
    p.push({
      id: `gym-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'gym',
      short: 'Équipement de musculation professionnel.',
      image: getUnsplashImage(item.query, i + 300),
      stock: 15 + Math.floor(Math.random() * 20),
      rating: 4.6 + (Math.random() * 0.3),
      popularity: 80 + Math.floor(Math.random() * 15),
      tags: ['gym', 'strength', 'muscle', 'crossfit']
    });
  });

  // BOXING & MMA (25 items)
  const boxingEquipment = [
    { name: 'Gants Boxe Cuir 10oz', price: 449, query: 'boxing-gloves-leather-10oz' },
    { name: 'Gants Boxe Cuir 12oz', price: 499, query: 'boxing-gloves-leather-12oz' },
    { name: 'Gants Boxe Cuir 14oz', price: 549, query: 'boxing-gloves-leather-14oz' },
    { name: 'Gants Boxe Cuir 16oz', price: 599, query: 'boxing-gloves-leather-16oz' },
    { name: 'Gants MMA Pro', price: 399, query: 'mma-gloves-professional' },
    { name: 'Sac de Frappe 80cm', price: 899, query: 'punching-bag-80cm' },
    { name: 'Sac de Frappe 120cm', price: 1299, query: 'punching-bag-120cm' },
    { name: 'Sac de Frappe 150cm', price: 1599, query: 'punching-bag-150cm' },
    { name: 'Sac Uppercut Pro', price: 1199, query: 'uppercut-punching-bag' },
    { name: 'Poire Vitesse Pro', price: 349, query: 'speed-bag-professional' },
    { name: 'Poire Double End', price: 299, query: 'double-end-bag' },
    { name: 'Pattes d\'Ours Pro', price: 599, query: 'focus-mitts-boxing' },
    { name: 'Bouclier Frappe', price: 799, query: 'kick-shield' },
    { name: 'Protège-dents Pro', price: 149, query: 'mouthguard-boxing' },
    { name: 'Casque Protection Complet', price: 699, query: 'boxing-headgear-full' },
    { name: 'Casque Protection Ouvert', price: 599, query: 'boxing-headgear-open' },
    { name: 'Protège-tibias MMA', price: 349, query: 'mma-shin-guards' },
    { name: 'Coquille Protection', price: 199, query: 'groin-guard-boxing' },
    { name: 'Bandages Mains 4.5m', price: 99, query: 'hand-wraps-boxing' },
    { name: 'Corde à Sauter Pro', price: 149, query: 'speed-rope-boxing' },
    { name: 'Corde à Sauter Lestée', price: 249, query: 'weighted-jump-rope' },
    { name: 'Mannequin Frappe Bob', price: 2499, query: 'bob-punching-dummy' },
    { name: 'Support Sac Plafond', price: 399, query: 'punching-bag-ceiling-mount' },
    { name: 'Support Sac Sur Pied', price: 1499, query: 'punching-bag-stand' },
    { name: 'Ring Boxe Complet 5x5m', price: 15999, query: 'boxing-ring-professional' },
  ];

  boxingEquipment.forEach((item, i) => {
    p.push({
      id: `box-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'boxing',
      short: 'Équipement de boxe et MMA professionnel.',
      image: getUnsplashImage(item.query, i + 400),
      stock: 12 + Math.floor(Math.random() * 15),
      rating: 4.7 + (Math.random() * 0.2),
      popularity: 85 + Math.floor(Math.random() * 12),
      tags: ['boxing', 'mma', 'combat', 'training']
    });
  });

  // CARDIO EQUIPMENT (20 items)
  const cardioEquipment = [
    { name: 'Tapis Course Électrique Pro', price: 8999, query: 'electric-treadmill-professional' },
    { name: 'Tapis Course Pliable', price: 5999, query: 'foldable-treadmill' },
    { name: 'Vélo Spinning Pro', price: 4999, query: 'spinning-bike-professional' },
    { name: 'Vélo Appartement', price: 2999, query: 'exercise-bike' },
    { name: 'Vélo Elliptique Pro', price: 6999, query: 'elliptical-machine-professional' },
    { name: 'Rameur Magnétique', price: 3999, query: 'rowing-machine-magnetic' },
    { name: 'Rameur Air Pro', price: 5999, query: 'air-rowing-machine' },
    { name: 'Stepper Cardio', price: 1999, query: 'cardio-stepper-machine' },
    { name: 'Vélo Air Bike Assault', price: 7999, query: 'air-assault-bike' },
    { name: 'Ski Erg Pro', price: 8999, query: 'ski-erg-machine' },
    { name: 'Tapis Course Manuel', price: 1999, query: 'manual-treadmill' },
    { name: 'Mini Vélo Portable', price: 899, query: 'portable-mini-bike' },
    { name: 'Stepper Twist', price: 699, query: 'twist-stepper' },
    { name: 'Corde Sauter Cardio', price: 99, query: 'cardio-jump-rope' },
    { name: 'Trampoline Fitness', price: 1299, query: 'fitness-trampoline' },
    { name: 'Step Aérobic Réglable', price: 499, query: 'adjustable-aerobic-step' },
    { name: 'Vélo Bureau', price: 3499, query: 'desk-exercise-bike' },
    { name: 'Tapis Marche Bureau', price: 4999, query: 'under-desk-treadmill' },
    { name: 'Moniteur Cardiaque', price: 399, query: 'heart-rate-monitor' },
    { name: 'Montre Cardio GPS', price: 1999, query: 'gps-heart-rate-watch' },
  ];

  cardioEquipment.forEach((item, i) => {
    p.push({
      id: `cardio-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'cardio',
      short: 'Équipement cardio pour entraînement intensif.',
      image: getUnsplashImage(item.query, i + 500),
      stock: 5 + Math.floor(Math.random() * 10),
      rating: 4.5 + (Math.random() * 0.3),
      popularity: 78 + Math.floor(Math.random() * 15),
      tags: ['cardio', 'endurance', 'fitness', 'training']
    });
  });

  // RUNNING & TRACK (25 items)
  const runningEquipment = [
    { name: 'Nike Air Zoom Pegasus', price: 1299, query: 'nike-air-zoom-pegasus' },
    { name: 'Nike ZoomX Vaporfly', price: 2499, query: 'nike-zoomx-vaporfly' },
    { name: 'Adidas Ultraboost 23', price: 1799, query: 'adidas-ultraboost-23' },
    { name: 'Adidas Adizero Pro', price: 2199, query: 'adidas-adizero-pro' },
    { name: 'Asics Gel-Nimbus', price: 1599, query: 'asics-gel-nimbus' },
    { name: 'Asics Gel-Kayano', price: 1699, query: 'asics-gel-kayano' },
    { name: 'New Balance 1080', price: 1499, query: 'new-balance-1080' },
    { name: 'Hoka Clifton 9', price: 1599, query: 'hoka-clifton-9' },
    { name: 'Hoka Speedgoat 5', price: 1799, query: 'hoka-speedgoat-trail' },
    { name: 'Brooks Ghost 15', price: 1399, query: 'brooks-ghost-running' },
    { name: 'Saucony Endorphin Pro', price: 2299, query: 'saucony-endorphin-pro' },
    { name: 'Pointes Athlétisme Sprint', price: 899, query: 'sprint-spikes-track' },
    { name: 'Pointes Distance', price: 949, query: 'distance-spikes-track' },
    { name: 'Chaussures Trail Pro', price: 1699, query: 'trail-running-shoes-professional' },
    { name: 'Brassard Téléphone', price: 149, query: 'phone-armband-running' },
    { name: 'Ceinture Hydratation', price: 299, query: 'hydration-belt-running' },
    { name: 'Sac Hydratation Trail', price: 899, query: 'trail-running-hydration-pack' },
    { name: 'Lampe Frontale Running', price: 399, query: 'running-headlamp' },
    { name: 'Brassard LED Sécurité', price: 99, query: 'led-safety-armband' },
    { name: 'Gilet Réfléchissant', price: 149, query: 'reflective-running-vest' },
    { name: 'Chaussettes Compression', price: 199, query: 'compression-running-socks' },
    { name: 'Manchons Mollets', price: 249, query: 'calf-compression-sleeves' },
    { name: 'Gourde Running 500ml', price: 129, query: 'running-water-bottle' },
    { name: 'Montre GPS Garmin', price: 2999, query: 'garmin-gps-running-watch' },
    { name: 'Écouteurs Sport Bluetooth', price: 599, query: 'sport-bluetooth-earbuds' },
  ];

  runningEquipment.forEach((item, i) => {
    p.push({
      id: `run-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'running',
      short: 'Équipement de course professionnel.',
      image: getUnsplashImage(item.query, i + 600),
      stock: 20 + Math.floor(Math.random() * 25),
      rating: 4.7 + (Math.random() * 0.2),
      popularity: 88 + Math.floor(Math.random() * 10),
      tags: ['running', 'marathon', 'trail', 'track']
    });
  });

  // BASKETBALL (20 items)
  const basketballEquipment = [
    { name: 'Ballon NBA Official', price: 499, query: 'nba-official-basketball' },
    { name: 'Ballon Spalding TF-1000', price: 599, query: 'spalding-tf1000-basketball' },
    { name: 'Ballon Wilson Evolution', price: 549, query: 'wilson-evolution-basketball' },
    { name: 'Ballon Molten GG7X', price: 649, query: 'molten-gg7x-basketball' },
    { name: 'Nike LeBron 21', price: 1899, query: 'nike-lebron-21-shoes' },
    { name: 'Nike KD 16', price: 1699, query: 'nike-kd-16-shoes' },
    { name: 'Adidas Dame 8', price: 1599, query: 'adidas-dame-8-shoes' },
    { name: 'Air Jordan 38', price: 2199, query: 'air-jordan-38-shoes' },
    { name: 'Under Armour Curry 11', price: 1799, query: 'under-armour-curry-11' },
    { name: 'Puma MB.02', price: 1499, query: 'puma-mb-02-basketball' },
    { name: 'Maillot NBA Lakers', price: 399, query: 'nba-lakers-jersey' },
    { name: 'Maillot NBA Warriors', price: 399, query: 'nba-warriors-jersey' },
    { name: 'Maillot NBA Bulls', price: 399, query: 'nba-bulls-jersey' },
    { name: 'Short Basketball Pro', price: 249, query: 'basketball-shorts-professional' },
    { name: 'Chaussettes NBA Elite', price: 149, query: 'nba-elite-socks' },
    { name: 'Manchons Bras NBA', price: 199, query: 'nba-arm-sleeves' },
    { name: 'Genouillères Basketball', price: 249, query: 'basketball-knee-pads' },
    { name: 'Panier Basket Mural', price: 1999, query: 'wall-mounted-basketball-hoop' },
    { name: 'Panier Basket Portable', price: 3999, query: 'portable-basketball-hoop' },
    { name: 'Pompe Ballon Basket', price: 79, query: 'basketball-pump' },
  ];

  basketballEquipment.forEach((item, i) => {
    p.push({
      id: `bball-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'basketball',
      short: 'Équipement basketball professionnel.',
      image: getUnsplashImage(item.query, i + 700),
      stock: 18 + Math.floor(Math.random() * 20),
      rating: 4.6 + (Math.random() * 0.3),
      popularity: 82 + Math.floor(Math.random() * 15),
      tags: ['basketball', 'nba', 'hoops']
    });
  });

  // TENNIS & PADEL (20 items)
  const tennisEquipment = [
    { name: 'Raquette Wilson Pro Staff', price: 1899, query: 'wilson-pro-staff-racket' },
    { name: 'Raquette Head Radical', price: 1799, query: 'head-radical-tennis-racket' },
    { name: 'Raquette Babolat Pure Drive', price: 1699, query: 'babolat-pure-drive' },
    { name: 'Raquette Yonex EZONE', price: 1599, query: 'yonex-ezone-racket' },
    { name: 'Raquette Padel Head Alpha', price: 1299, query: 'head-alpha-padel-racket' },
    { name: 'Raquette Padel Bullpadel', price: 1399, query: 'bullpadel-racket' },
    { name: 'Raquette Padel Nox', price: 1199, query: 'nox-padel-racket' },
    { name: 'Balles Tennis Wilson x4', price: 99, query: 'wilson-tennis-balls' },
    { name: 'Balles Padel Head x3', price: 89, query: 'head-padel-balls' },
    { name: 'Cordage Tennis Pro', price: 149, query: 'tennis-string-professional' },
    { name: 'Grip Raquette x3', price: 79, query: 'tennis-racket-grip' },
    { name: 'Surgrip Wilson x12', price: 199, query: 'wilson-overgrip' },
    { name: 'Sac Tennis Wilson', price: 799, query: 'wilson-tennis-bag' },
    { name: 'Sac Padel Head', price: 699, query: 'head-padel-bag' },
    { name: 'Chaussures Tennis Asics', price: 1299, query: 'asics-tennis-shoes' },
    { name: 'Chaussures Padel Adidas', price: 1199, query: 'adidas-padel-shoes' },
    { name: 'Short Tennis Nike', price: 299, query: 'nike-tennis-shorts' },
    { name: 'Polo Tennis Lacoste', price: 599, query: 'lacoste-tennis-polo' },
    { name: 'Bandeau Tennis', price: 99, query: 'tennis-headband' },
    { name: 'Poignet Éponge x2', price: 79, query: 'tennis-wristbands' },
  ];

  tennisEquipment.forEach((item, i) => {
    p.push({
      id: `tennis-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'tennis',
      short: 'Équipement tennis et padel professionnel.',
      image: getUnsplashImage(item.query, i + 800),
      stock: 14 + Math.floor(Math.random() * 18),
      rating: 4.5 + (Math.random() * 0.4),
      popularity: 76 + Math.floor(Math.random() * 18),
      tags: ['tennis', 'padel', 'racket']
    });
  });

  // RECOVERY & HEALTH (20 items)
  const recoveryEquipment = [
    { name: 'Pistolet Massage Theragun', price: 2999, query: 'theragun-massage-gun' },
    { name: 'Pistolet Massage Pro', price: 1999, query: 'professional-massage-gun' },
    { name: 'Pistolet Massage Mini', price: 1299, query: 'mini-massage-gun' },
    { name: 'Rouleau Mousse 90cm', price: 299, query: 'foam-roller-90cm' },
    { name: 'Rouleau Mousse Vibrant', price: 899, query: 'vibrating-foam-roller' },
    { name: 'Balle Massage Lacrosse', price: 99, query: 'lacrosse-massage-ball' },
    { name: 'Balles Massage x2', price: 149, query: 'massage-balls-set' },
    { name: 'Stick Massage Musculaire', price: 249, query: 'muscle-roller-stick' },
    { name: 'Bandes Résistance Thérapie', price: 199, query: 'therapy-resistance-bands' },
    { name: 'Bottes Compression', price: 3999, query: 'compression-boots-recovery' },
    { name: 'Manchons Compression Jambes', price: 399, query: 'leg-compression-sleeves' },
    { name: 'Chaussettes Récupération', price: 299, query: 'recovery-compression-socks' },
    { name: 'Tapis Acupression', price: 499, query: 'acupressure-mat' },
    { name: 'Coussin Acupression', price: 299, query: 'acupressure-pillow' },
    { name: 'Électrostimulateur Compex', price: 2499, query: 'compex-electrostimulator' },
    { name: 'Cryothérapie Portable', price: 1999, query: 'portable-ice-therapy' },
    { name: 'Bain Glace Portable', price: 899, query: 'portable-ice-bath' },
    { name: 'Sauna Infrarouge Portable', price: 4999, query: 'portable-infrared-sauna' },
    { name: 'Balance Impédancemètre', price: 599, query: 'body-composition-scale' },
    { name: 'Tensiomètre Digital', price: 399, query: 'digital-blood-pressure-monitor' },
  ];

  recoveryEquipment.forEach((item, i) => {
    p.push({
      id: `recovery-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'recovery',
      short: 'Équipement de récupération et santé.',
      image: getUnsplashImage(item.query, i + 900),
      stock: 10 + Math.floor(Math.random() * 15),
      rating: 4.8 + (Math.random() * 0.2),
      popularity: 86 + Math.floor(Math.random() * 12),
      tags: ['recovery', 'health', 'massage', 'therapy']
    });
  });

  // SPORTS APPAREL (30 items)
  const apparelItems = [
    { name: 'T-shirt Compression Nike', price: 299, query: 'nike-compression-shirt' },
    { name: 'T-shirt Compression Adidas', price: 279, query: 'adidas-compression-shirt' },
    { name: 'T-shirt Compression UA', price: 319, query: 'under-armour-compression-shirt' },
    { name: 'Débardeur Training Nike', price: 249, query: 'nike-training-tank' },
    { name: 'T-shirt Dry-Fit Nike', price: 269, query: 'nike-dri-fit-shirt' },
    { name: 'T-shirt Climalite Adidas', price: 259, query: 'adidas-climalite-shirt' },
    { name: 'Short Compression Nike', price: 349, query: 'nike-compression-shorts' },
    { name: 'Short Training Adidas', price: 329, query: 'adidas-training-shorts' },
    { name: 'Short Running 2-en-1', price: 399, query: '2-in-1-running-shorts' },
    { name: 'Legging Compression Homme', price: 449, query: 'mens-compression-tights' },
    { name: 'Legging Compression Femme', price: 429, query: 'womens-compression-tights' },
    { name: 'Legging 7/8 Nike', price: 499, query: 'nike-7-8-leggings' },
    { name: 'Brassière Sport Nike', price: 399, query: 'nike-sports-bra' },
    { name: 'Brassière Impact Fort', price: 449, query: 'high-impact-sports-bra' },
    { name: 'Sweat Capuche Nike', price: 699, query: 'nike-hoodie-training' },
    { name: 'Sweat Capuche Adidas', price: 679, query: 'adidas-hoodie-training' },
    { name: 'Veste Training Nike', price: 799, query: 'nike-training-jacket' },
    { name: 'Veste Coupe-Vent', price: 599, query: 'windbreaker-jacket-sport' },
    { name: 'Pantalon Jogging Nike', price: 549, query: 'nike-jogger-pants' },
    { name: 'Pantalon Training Adidas', price: 529, query: 'adidas-training-pants' },
    { name: 'Survêtement Complet Nike', price: 1199, query: 'nike-tracksuit-complete' },
    { name: 'Survêtement Complet Adidas', price: 1149, query: 'adidas-tracksuit-complete' },
    { name: 'Chaussettes Sport x3', price: 99, query: 'sport-socks-pack' },
    { name: 'Chaussettes Hautes x3', price: 119, query: 'high-sport-socks' },
    { name: 'Casquette Sport Nike', price: 199, query: 'nike-sport-cap' },
    { name: 'Bonnet Training', price: 149, query: 'training-beanie' },
    { name: 'Gants Training Hiver', price: 199, query: 'winter-training-gloves' },
    { name: 'Tour de Cou Sport', price: 129, query: 'sport-neck-gaiter' },
    { name: 'Sac Sport Nike Brasilia', price: 449, query: 'nike-brasilia-duffel-bag' },
    { name: 'Sac à Dos Training', price: 599, query: 'training-backpack' },
  ];

  apparelItems.forEach((item, i) => {
    p.push({
      id: `apparel-${i}`,
      name: item.name,
      priceMAD: item.price,
      category: 'apparel',
      short: 'Vêtements de sport techniques.',
      image: getUnsplashImage(item.query, i + 1000),
      stock: 40 + Math.floor(Math.random() * 60),
      rating: 4.6 + (Math.random() * 0.3),
      popularity: 90 + Math.floor(Math.random() * 8),
      tags: ['apparel', 'clothing', 'training', 'sport']
    });
  });

  return p;
};

export const PRODUCTS = generateProducts();

// Export team list for team selector
export const TEAMS = [
  { id: 'morocco', name: 'Morocco', league: 'International', colors: ['#C1272D', '#006233'] },
  { id: 'france', name: 'France', league: 'International', colors: ['#0055A4', '#FFFFFF'] },
  { id: 'brazil', name: 'Brazil', league: 'International', colors: ['#009739', '#FEDD00'] },
  { id: 'argentina', name: 'Argentina', league: 'International', colors: ['#74ACDF', '#FFFFFF'] },
  { id: 'portugal', name: 'Portugal', league: 'International', colors: ['#FF0000', '#006600'] },
  { id: 'real-madrid', name: 'Real Madrid', league: 'La Liga', colors: ['#FFFFFF', '#FFD700'] },
  { id: 'barcelona', name: 'Barcelona', league: 'La Liga', colors: ['#A50044', '#004D98'] },
  { id: 'psg', name: 'PSG', league: 'Ligue 1', colors: ['#004170', '#DA291C'] },
  { id: 'man-city', name: 'Man City', league: 'Premier League', colors: ['#6CABDD', '#FFFFFF'] },
  { id: 'liverpool', name: 'Liverpool', league: 'Premier League', colors: ['#C8102E', '#FFFFFF'] },
  { id: 'bayern', name: 'Bayern Munich', league: 'Bundesliga', colors: ['#DC052D', '#0066B2'] },
  { id: 'raja', name: 'Raja CA', league: 'Botola Pro', colors: ['#006633', '#FFFFFF'] },
  { id: 'wydad', name: 'Wydad AC', league: 'Botola Pro', colors: ['#ED1C24', '#FFFFFF'] },
];
