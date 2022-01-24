import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const partyBoyDefaults = {
  name: "Party Boy",
  level: 10,
  type: "Human",
  keywords: ["Raider"],
  category: categories.raider,
  xp: 74,
  special: {
    STR: 9,
    PER: 5,
    END: 6,
    CHA: 4,
    INT: 4,
    AGI: 8,
    LUCK: 4,
  },
  skills: {
    athletics: { rating: 2, tagged: false },
    smallGuns: { rating: 4, tagged: true },
    medicine: { rating: 2, tagged: false },
    survival: { rating: 2, tagged: false },
    meleeWeapons: { rating: 4, tagged: true },
    unarmed: { rating: 4, tagged: false },
  },
  damageResistance: {
    physical: {
      head: 2,
      arms: 3,
      legs: 3,
      torso: 3,
      immune: false,
    },
    energy: {
      head: 2,
      arms: 3,
      legs: 3,
      torso: 3,
      immune: false,
    },
    radiation: {
      head: 0,
      arms: 0,
      legs: 0,
      torso: 0,
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
        name: "BAYONETED LONG AUTO SCOPED PIPE GUN",
        damage: 4,
        type: damageTypes.physical,
        keywords: ["Unreliable", "Two-Handed", "Accurate"],
        effects: ["Burst"],
        fireRate: 4,
        range: ranges.medium,
      },
      [specialKeys.STR, skillKeys.unarmed],
    ],
    [
      {
        name: "BAYONETED LONG AUTO SCOPED PIPE GUN (MELEE)",
        damage: 5,
        type: damageTypes.physical,
        keywords: ["Two-Handed"],
        effects: ["Piercing"],
      },
      [specialKeys.STR, skillKeys.meleeWeapons],
    ],
  ],
  abilities: [
    {
      name: "LET RIP",
      description:
        "Once per combat, the Party Boy may ‘let rip’ with a volley from their Bayoneted Long Auto Scoped Pipe Gun. This adds the weapon’s Fire Rate of 4 to the weapon’s damage for a single attack (for 8 DC total).",
    },
  ],
  inventory: {
    items: [
      "Welder's Visor",
      "Heavy Raider Chest Piece",
      "Heavy Raider Arm x2",
      "Heavy Raider Leg x2",
      "Bayoneted Long Auto Scoped Pipe Gun",
    ],
    ammunition: {
      roll: `10+5CD`,
      type: ".38",
    },
    wealth: 1,
  },
};

export const partyBoyFactory = (options = { ...partyBoyDefaults }) =>
  characterFactory({
    ...partyBoyDefaults,
    ...options,
  });
