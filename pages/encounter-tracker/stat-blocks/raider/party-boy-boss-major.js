import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const partyBoyVeteranNotableDefaults = {
  name: "Party Boy Boss (Major)",
  level: 18,
  type: "Human",
  keywords: ["Raider"],
  category: categories.raider,
  importance: "major",
  xp: 390,
  special: {
    STR: 9,
    PER: 8,
    END: 9,
    CHA: 7,
    INT: 7,
    AGI: 9,
    LUCK: 9,
  },
  skills: {
    athletics: { rating: 3, tagged: false },
    explosives: { rating: 6, tagged: true },
    bigGuns: { rating: 6, tagged: true },
    medicine: { rating: 3, tagged: false },
    survival: { rating: 4, tagged: true },
    meleeWeapons: { rating: 6, tagged: true },
    unarmed: { rating: 3, tagged: false },
  },
  damageResistance: {
    physical: {
      head: 7,
      arms: 5,
      legs: 5,
      torso: 9,
      immune: false,
    },
    energy: {
      head: 4,
      arms: 3,
      legs: 3,
      torso: 6,
      immune: false,
    },
    radiation: {
      head: 7,
      arms: 7,
      legs: 7,
      torso: 9,
      immune: false,
    },
  },
  attacks: [
    [
      {
        name: "UNARMED STRIKE",
        damage: 4,
        type: damageTypes.physical,
      },
      [specialKeys.STR, skillKeys.unarmed],
    ],
    [
      {
        name: "FRAGRENADE",
        damage: 6,
        type: damageTypes.physical,
        keywords: ["Blast", "Throwing"],
        range: ranges.medium,
      },
      [specialKeys.PER, skillKeys.explosives],
    ],
    [
      {
        name: "SERRATED MACHETE",
        damage: 7,
        type: damageTypes.physical,
        keywords: ["Two-Handed"],
        effects: ["Piercing 1", "Persistent"],
      },
      [specialKeys.STR, skillKeys.meleeWeapons],
    ],
    [
      {
        name: "THE PARTY MACHINE",
        damage: 7,
        fireRate: 1,
        type: damageTypes.energy,
        keywords: ["Two-Handed", "Blast", "Inaccurate"],
        effects: ["Piercing 1", "Stun", "Radioactive"],
        range: ranges.long,
      },
      [specialKeys.END, skillKeys.bigGuns],
    ],
  ],
  abilities: [
    {
      name: "LET RIP",
      description:
        "Twice per combat, the major party boy boss may ‘let rip’ with a volley from their Party Machine. This adds the weapon’s Fire Rate of 1 to the weapon’s damage for a single attack (for 8 DC total).",
    },
    {
      name: "IN CHARGE",
      description:
        "A major party boy boss may spend a minor action to order two raiders of lower level within Close range to immediately perform a minor action. Alternatively, they may spend a major action to order another two raiders of lower level to take a major action immediately",
    },
    {
      name: "AGGRESSIVE",
      description:
        "The major party boy boss is quick to action when it senses prey. When the boss enters a scene, immediately generate 1 Action Point. If the boss is an ally, then this goes into the group pool. If they are an enemy, it goes into the GM’s pool.",
    },
    {
      name: "ACTION PACKED",
      description:
        "The major party boy boss is driven and motivated and takes matters into their own hands. The party boy boss begins each scene with a personal pool of 4 Action Points, which it may spend instead of drawing from other sources.",
    },
    {
      name: "RAIDER POWER ARMOR WELDED REBAR",
      description:
        "Enemies who attack you with a melee or unarmed attack and suffer a complication suffer 2CD damage.",
    },
  ],
  inventory: {
    items: [
      "Raider II Helm",
      "Raider II Chest (Welded Rebar)",
      "Raider II Arm x2",
      "Raider II Leg x2",
      "Serrated Machete",
      "Fragrenade x3",
      "The Party Machine",
    ],
    ammunition: {
      roll: `8+4CD`,
      type: ".45",
    },
    wealth: 5,
  },
};

export const partyBoyBossMajorFactory = (
  options = { ...partyBoyVeteranNotableDefaults }
) =>
  characterFactory({
    ...partyBoyVeteranNotableDefaults,
    ...options,
  });
