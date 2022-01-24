import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const triggermanDefaults = {
  name: "Triggerman",
  level: 10,
  type: "Human",
  keywords: [],
  category: categories.wastelander,
  xp: 74,
  special: {
    STR: 5,
    PER: 7,
    END: 7,
    CHA: 4,
    INT: 5,
    AGI: 8,
    LUCK: 4,
  },
  skills: {
    speech: { rating: 2, tagged: false },
    barter: { rating: 2, tagged: false },
    smallGuns: { rating: 4, tagged: true },
    medicine: { rating: 2, tagged: false },
    survival: { rating: 2, tagged: false },
    meleeWeapons: { rating: 4, tagged: true },
    unarmed: { rating: 3, tagged: false },
  },
  damageResistance: {
    physical: {
      head: 0,
      arms: 2,
      legs: 2,
      torso: 2,
      immune: false,
    },
    energy: {
      head: 0,
      arms: 2,
      legs: 2,
      torso: 2,
      immune: false,
    },
    radiation: {
      head: 0,
      arms: 2,
      legs: 2,
      torso: 2,
      immune: false,
    },
  },
  attacks: [
    [
      {
        name: "UNARMED STRIKE",
        damage: 3,
        type: damageTypes.physical,
      },
      [specialKeys.STR, skillKeys.unarmed],
    ],
    [
      {
        name: "PIPE REVOLVER",
        damage: 4,
        type: damageTypes.physical,
        keywords: ["Close Quarters", "Unreliable"],
        fireRate: 1,
        range: ranges.close,
      },
      [specialKeys.AGI, skillKeys.smallGuns],
    ],
    [
      {
        name: "SUBMACHINE GUN",
        damage: 3,
        type: damageTypes.physical,
        keywords: ["Inaccurate", "Two-Handed"],
        fireRate: 3,
        range: ranges.close,
      },
      [specialKeys.AGI, skillKeys.smallGuns],
    ],
  ],
  abilities: [
    {
      name: "LET RIP",
      description:
        "Once per combat, the Triggerman may ‘let rip’ with a volley from their Pipe Revolver or Submachine gun. This adds the weapon’s Fire Rate of 1/3 to the weapon’s damage for a single attack (for 5/6 DC total).",
    },
  ],
  inventory: {
    items: ["Heavy Coat", "Formal Hat", "Pipe Revolver", "Submachine Gun"],
    ammunition: {
      roll: `10+5CD`,
      type: ".38",
    },
    wealth: 1,
  },
};

export const triggermanFactory = (options = { ...triggermanDefaults }) =>
  characterFactory({
    ...triggermanDefaults,
    ...options,
  });
