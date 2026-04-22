export type WikiCategory = "fishermen" | "fish" | "mechanics";

export interface WikiEntry {
  id: string;
  category: WikiCategory;
  title: string;
  description: string;
  lore?: string;
  stats: Record<string, string | number>;
  tags: string[];
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  image?: string;
}

export const categoryMeta: Record<WikiCategory, { label: string; tagline: string; gradient: string }> = {
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

export const wikiEntries: WikiEntry[] = [
  // FISHERMEN
  {
    id: "old-salt",
    category: "fishermen",
    title: "Old Salt",
    description: "A grizzled veteran with a steady cast. Reliable single-target damage at long range.",
    lore: "He's been hooking abyssal fiends since before the lighthouse fell.",
    stats: { damage: 24, range: 9, attackSpeed: "1.2/s", cost: 100 },
    tags: ["starter", "single-target", "long-range"],
    rarity: "common",
    image: "https://picsum.photos/seed/old-salt/600/400",
  },
  {
    id: "net-caster",
    category: "fishermen",
    title: "Net Caster",
    description: "Hurls weighted nets that briefly slow groups of fish.",
    stats: { damage: 8, range: 5, attackSpeed: "0.8/s", cost: 150, slow: "30%" },
    tags: ["aoe", "crowd-control"],
    rarity: "common",
    image: "https://picsum.photos/seed/net-caster/600/400",
  },
  {
    id: "harpoon-mary",
    category: "fishermen",
    title: "Harpoon Mary",
    description: "A precision marksman whose harpoons pierce up to three enemies in a line.",
    stats: { damage: 42, range: 11, attackSpeed: "0.6/s", cost: 280, pierce: 3 },
    tags: ["pierce", "long-range", "elite"],
    rarity: "rare",
    image: "https://picsum.photos/seed/harpoon-mary/600/400",
  },
  {
    id: "lantern-keeper",
    category: "fishermen",
    title: "Lantern Keeper",
    description: "Lights the way. Buffs nearby fishermen attack speed by 20%.",
    stats: { damage: 0, range: 4, buff: "+20% AS", cost: 220 },
    tags: ["support", "aura"],
    rarity: "uncommon",
    image: "https://picsum.photos/seed/lantern-keeper/600/400",
  },
  {
    id: "deep-sea-diver",
    category: "fishermen",
    title: "Deep Sea Diver",
    description: "Submerges to plant explosive bait that detonates on contact.",
    stats: { damage: 110, range: 6, attackSpeed: "0.3/s", cost: 400 },
    tags: ["aoe", "burst"],
    rarity: "epic",
    image: "https://picsum.photos/seed/deep-sea-diver/600/400",
  },
  {
    id: "the-captain",
    category: "fishermen",
    title: "The Captain",
    description: "Legendary admiral. Summons a phantom trawler that drags lanes of fish to oblivion.",
    stats: { damage: 250, range: 14, ultimate: "Trawler Net", cost: 900 },
    tags: ["legendary", "ultimate", "lane-clear"],
    rarity: "legendary",
    image: "https://picsum.photos/seed/the-captain/600/400",
  },

  // FISH
  {
    id: "minnow",
    category: "fish",
    title: "Minnow",
    description: "The first wave of the swarm. Weak alone, deadly in numbers.",
    stats: { hp: 20, speed: "fast", bounty: 2 },
    tags: ["swarm", "early-wave"],
    rarity: "common",
    image: "https://picsum.photos/seed/minnow/600/400",
  },
  {
    id: "armored-tuna",
    category: "fish",
    title: "Armored Tuna",
    description: "Heavy-plated bruiser. Resists piercing damage by 40%.",
    stats: { hp: 280, speed: "medium", armor: "40%", bounty: 18 },
    tags: ["tank", "armored"],
    rarity: "uncommon",
    image: "https://picsum.photos/seed/armored-tuna/600/400",
  },
  {
    id: "electric-eel",
    category: "fish",
    title: "Electric Eel",
    description: "Stuns the nearest fisherman for 2 seconds on death.",
    stats: { hp: 90, speed: "fast", onDeath: "Stun 2s", bounty: 12 },
    tags: ["disruptor", "elite"],
    rarity: "rare",
    image: "https://picsum.photos/seed/electric-eel/600/400",
  },
  {
    id: "kraken-spawn",
    category: "fish",
    title: "Kraken Spawn",
    description: "Massive boss. Spawns three minnows every time it takes 500 damage.",
    stats: { hp: 4200, speed: "slow", spawn: "Minnow x3", bounty: 250 },
    tags: ["boss", "spawner"],
    rarity: "legendary",
    image: "https://picsum.photos/seed/kraken-spawn/600/400",
  },
  {
    id: "ghost-jellyfish",
    category: "fish",
    title: "Ghost Jellyfish",
    description: "Phases through nets. Only piercing or magic damage applies.",
    stats: { hp: 140, speed: "medium", immunity: "non-pierce", bounty: 22 },
    tags: ["ethereal", "elite"],
    rarity: "rare",
    image: "https://picsum.photos/seed/ghost-jellyfish/600/400",
  },
  {
    id: "abyssal-leviathan",
    category: "fish",
    title: "Abyssal Leviathan",
    description: "End-of-act terror. Devours nets and laughs at lanterns.",
    stats: { hp: 18000, speed: "very slow", aura: "Disable buffs", bounty: 1500 },
    tags: ["boss", "act-finale"],
    rarity: "legendary",
    image: "https://picsum.photos/seed/abyssal-leviathan/600/400",
  },

  // MAGIC
  {
    id: "dice-of-fortune",
    category: "mechanics",
    title: "Dice of Fortune",
    description: "Roll 1d6. On 6, all fish on screen take 200 damage. On 1, your gold halves.",
    stats: { cost: 50, cooldown: "20s", risk: "high" },
    tags: ["gamble", "burst"],
    rarity: "uncommon",
  },
  {
    id: "lucky-coin",
    category: "mechanics",
    title: "Lucky Coin",
    description: "Flip for a 50% chance to slow all fish by 50% for 5 seconds.",
    stats: { cost: 30, cooldown: "12s", chance: "50%" },
    tags: ["gamble", "crowd-control"],
    rarity: "common",
  },
  {
    id: "wheel-of-tides",
    category: "mechanics",
    title: "Wheel of Tides",
    description: "Spin for one of six effects: heal, freeze, double damage, gold, summon, or backfire.",
    stats: { cost: 120, cooldown: "45s", outcomes: 6 },
    tags: ["gamble", "wildcard"],
    rarity: "rare",
  },
  {
    id: "tarot-of-the-deep",
    category: "mechanics",
    title: "Tarot of the Deep",
    description: "Draw a card. Reveals a temporary buff or curse for the next wave.",
    stats: { cost: 80, cooldown: "1 wave", cards: 22 },
    tags: ["gamble", "wave-effect"],
    rarity: "epic",
  },
  {
    id: "blackjack-bait",
    category: "mechanics",
    title: "Blackjack Bait",
    description: "Hit or stand. Get to 21 to deal massive damage. Bust and stun your own towers.",
    stats: { cost: 100, cooldown: "30s", target: 21 },
    tags: ["gamble", "skill-based"],
    rarity: "rare",
  },
  {
    id: "siren-roulette",
    category: "mechanics",
    title: "Siren's Roulette",
    description: "1-in-37 chance to instantly kill the strongest fish on the map. Otherwise, gold tax.",
    stats: { cost: 200, cooldown: "60s", chance: "2.7%" },
    tags: ["gamble", "instant-kill", "legendary"],
    rarity: "legendary",
  },
];