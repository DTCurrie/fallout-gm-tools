import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const partyBoyPsychoNotableDefaults = {
  name: "Party Boy Psycho (Notable)",
  level: 13,
  type: "Human",
  keywords: ["Raider"],
  importance: "notable",
  category: categories.raider,
  xp: 190,
  special: {
    STR: 9,
    PER: 8,
    END: 8,
    CHA: 4,
    INT: 5,
    AGI: 9,
    LUCK: 5,
  },
  skills: {
    athletics: { rating: 2, tagged: false },
    explosives: { rating: 4, tagged: true },
    smallGuns: { rating: 5, tagged: true },
    medicine: { rating: 2, tagged: false },
    survival: { rating: 2, tagged: false },
    meleeWeapons: { rating: 5, tagged: true },
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
        name: "DOUBLE-BARRELED SHOTGUN",
        damage: 6,
        type: damageTypes.physical,
        keywords: ["Inaccurate", "Two-Handed"],
        effects: ["Spread", "Vicious"],
        range: ranges.close,
      },
      [specialKeys.AGI, skillKeys.smallGuns],
    ],
    [
      {
        name: "MACHETE",
        damage: 5,
        type: damageTypes.physical,
        effects: ["Piercing 1"],
      },
      [specialKeys.STR, skillKeys.meleeWeapons],
    ],
    [
      {
        name: "MOLOTOV COCKTAIL",
        damage: 4,
        type: damageTypes.energy,
        keywords: ["Blast", "Throwing"],
        effects: ["Persistent"],
        range: ranges.medium,
      },
      [specialKeys.PER, skillKeys.explosives],
    ],
  ],
  abilities: [
    {
      name: "CHEMS AND KABOOM",
      description:
        "A notable party boy psycho carries one Molotov Cocktail and one dose of Psycho.",
    },
    {
      name: "MOLOTOV",
      description:
        "Once per combat, a notable party boy psycho may throw a Molotov Cocktail, using the profile above.",
    },
    {
      name: "PSYCHO",
      description:
        "A notable party boy psycho may use a dose of Psycho as a minor action. For the remainder of the combat, the raider psycho adds +2 DC  to all damage rolls they make and add +2 to Physical and Energy damage resistances.",
    },
  ],
  inventory: {
    items: [
      "Welder's Visor",
      "Heavy Raider Chest Piece",
      "Heavy Raider Arm x2",
      "Heavy Raider Leg x2",
      "Double-Barreled Shotgun",
      "Machete",
    ],
    ammunition: {
      roll: `6+3CD`,
      type: "Shotgun Shells",
    },
    wealth: 3,
  },
};

export const partyBoyPsychoNotableFactory = (
  options = { ...partyBoyPsychoNotableDefaults }
) =>
  characterFactory({
    ...partyBoyPsychoNotableDefaults,
    ...options,
  });
