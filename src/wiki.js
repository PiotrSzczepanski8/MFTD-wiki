const categoryMeta = {
  fishermen: {
    label: "Fishermen",
    tagline: "The towers that defend the dock.",
    gradient: "bg-gradient-grey",
  },
  fish: {
    label: "Fish",
    tagline: "Threats swimming in from the deep.",
    gradient: "bg-gradient-blue",
  },
  mechanics: {
    label: "Mechanics",
    tagline: "Gambling magic and other systems that bend the tides.",
    gradient: "bg-gradient-cyan",
  },
};

const wikiEntries = [
  // fishermen
  {
    id: crypto.randomUUID(),
    category: "fishermen",
    title: "Fisherman",
    description: "A grizzled veteran with a steady cast. Reliable single-target damage at medium range.",
    stats: { damage: 10, range: 188, type: "range", cost: 100 },
    tags: ["starter", "single-target", "medium-range"],
    rarity: "common",
    image: "/images/rybak.png",
  },
  {
    id: crypto.randomUUID(),
    category: "fishermen",
    title: "Net Caster",
    description: "Casts weighted nets that catch groups of fish.",
    stats: { damage: 15, range: 84, type: "melee", cost: 140},
    tags: ["melee", "crowd-control"],
    rarity: "rare",
    image: "/images/meleTower.png",
  },
  {
    id: crypto.randomUUID(),
    category: "fishermen",
    title: "Harpoon Angler",
    description: "A precision marksman whose harpoons hit enemies at a distance.",
    stats: { damage: 50, range: 384, type: "sniper", cost: 200, capacity: 9 },
    tags: ["sniper", "long-range", "elite", "single-target"],
    rarity: "legendary",
    image: "/images/sniper.png",
  },

  // fih
  {
    id: crypto.randomUUID(),
    category: "fish",
    title: "Roach",
    description: "The first wave of the swarm. Weak and small.",
    stats: { hp: 20, speed: "normal", bounty: 5, damage: 2 },
    tags: ["early-wave", "weak"],
    rarity: "common",
    image: "/images/plotka.png",
  },
  {
    id: crypto.randomUUID(),
    category: "fish",
    title: "Catfish",
    description: "Heavy fih that spawns another fish when killed.",
    stats: { hp: 280, speed: "slow", bounty: 23, damage: 20, spawn: "Roach, Electric Eel"},
    tags: ["tank", "spawner"],
    rarity: "uncommon",
    image: "/images/sum.png",
  },
  {
    id: crypto.randomUUID(),
    category: "fish",
    title: "Sturgeon",
    description: "Strong and dangerous enemy that spawns another fish when killed.",
    stats: { hp: 420, speed: "slow", armor: 10, bounty: 25, spawn: "Cods" },
    tags: ["elite", "spawner", "armored"],
    rarity: "legendary",
    image: "/images/jesiotr.png",
  },
  {
    id: crypto.randomUUID(),
    category: "fish",
    title: "Electric Eel",
    description: "Super fast.",
    stats: { hp: 30, speed: "fast", bounty: 10, damage: 5 },
    tags: ["fast"],
    rarity: "rare",
    image: "/images/wegorz.png",
  },
  {
    id: crypto.randomUUID(),
    category: "fish",
    title: "Cod",
    description: "Strong armored Cod.",
    stats: { hp: 65, speed: "normal", armor: 5.5, damage: 8, bounty: 8 },
    tags: ["strong", "armored"],
    rarity: "uncommon",
    image: "/images/dorsz.png",
  },

  // mechanics
  {
    id: crypto.randomUUID(),
    category: "mechanics",
    title: "Magic",
    description: "A powerful gambling mechanic that unleashes a magic burst dealing area damage and slowing all enemies, but risks rebellion that freezes all towers. Press Q to cast when available. Magic has a rebellion chance that increases with each successful cast and wave progression, potentially causing a rebellion that temporarily disables all towers. Use Purify to reduce the rebellion chance, with costs decreasing over waves and effectiveness increasing.",
    stats: { 
      cost: 35, 
      damage: 30, 
      slow_multiplier: 0.6, 
      slow_duration: 5.0, 
      cooldown: 12.0, 
      rebellion_start_chance: 0.05, 
      rebellion_cap: 0.60, 
      purify_cost_start: 20, 
      purify_cost_min: 10 
    },
    tags: ["gamble", "area-damage", "slow", "cooldown", "rebellion-risk"],
    rarity: "common"
  },
];

export default { categoryMeta, wikiEntries };