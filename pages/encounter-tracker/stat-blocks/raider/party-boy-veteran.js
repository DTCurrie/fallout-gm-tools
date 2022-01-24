import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const partyBoyVeteranDefaults = {
  name: "Party Boy Veteran",
  level: 13,
  type: "Human",
  keywords: ["Raider"],
  category: categories.raider,
  xp: 95,
  special: {
    STR: 9,
    PER: 5,
    END: 5,
    CHA: 4,
    INT: 6,
    AGI: 9,
    LUCK: 4,
  },
  skills: {
    athletics: { rating: 2, tagged: false },
    explosives: { rating: 3, tagged: false },
    smallGuns: { rating: 5, tagged: true },
    medicine: { rating: 2, tagged: false },
    survival: { rating: 3, tagged: false },
    meleeWeapons: { rating: 5, tagged: true },
    unarmed: { rating: 3, tagged: false },
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
        name: "QUICK CALIBRATED SCOPED COMBAT RIFLE",
        damage: 5,
        type: damageTypes.physical,
        keywords: ["Two-Handed", "Reliable", "Accurate"],
        effects: ["Vicious"],
        fireRate: 2,
        range: ranges.medium,
      },
      [specialKeys.AGI, skillKeys.smallGuns],
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
  ],
  abilities: [
    {
      name: "LET RIP",
      description:
        "Once per combat, the party boy veteran may ‘let rip’ with a volley from their Quick Calibrated Scoped Combat Rifle. This adds the weapon’s Fire Rate of 2 to the weapon’s damage for a single attack (for 7 DC total).",
    },
    {
      name: "IN CHARGE",
      description:
        "A party boy veteran may spend a minor action to order a raider of lower level within Close range to immediately perform a minor action. Alternatively, they may spend a major action to order another raider to take a major action immediately",
    },
  ],
  inventory: {
    items: [
      "Welder's Visor",
      "Heavy Raider Chest Piece",
      "Heavy Raider Arm x2",
      "Heavy Raider Leg x2",
      "Quick Calibrated Scoped Combat Rifle",
      "Serrated Machete",
    ],
    ammunition: {
      roll: `8+4CD`,
      type: ".45",
    },
    wealth: 1,
  },
};

export const partyBoyVeteranFactory = (
  options = { ...partyBoyVeteranDefaults }
) =>
  characterFactory({
    ...partyBoyVeteranDefaults,
    ...options,
  });
