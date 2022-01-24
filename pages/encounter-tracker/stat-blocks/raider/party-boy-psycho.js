import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const partyBoyPsychoDefaults = {
  name: "Party Boy Psycho",
  level: 13,
  type: "Human",
  keywords: ["Raider"],
  category: categories.raider,
  xp: 95,
  special: {
    STR: 9,
    PER: 6,
    END: 6,
    CHA: 4,
    INT: 4,
    AGI: 9,
    LUCK: 4,
  },
  skills: {
    athletics: { rating: 2, tagged: false },
    explosives: { rating: 2, tagged: false },
    smallGuns: { rating: 4, tagged: true },
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
      name: "CHEMS OR KABOOM",
      description:
        "A party boy psycho carries either one Molotov Cocktail or one dose of Psycho. Which they are carrying is determined by which of the following actions they take first: after using one, they may not use the other in that combat.",
    },
    {
      name: "MOLOTOV",
      description:
        "Once per combat, a party boy psycho may throw a Molotov Cocktail, using the profile above.",
    },
    {
      name: "PSYCHO",
      description:
        "A party boy psycho may use a dose of Psycho as a minor action. For the remainder of the combat, the raider psycho adds +2 DC  to all damage rolls they make and add +2 to Physical and Energy damage resistances.",
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
    wealth: 1,
  },
};

export const partyBoyPsychoFactory = (
  options = { ...partyBoyPsychoDefaults }
) =>
  characterFactory({
    ...partyBoyPsychoDefaults,
    ...options,
  });
