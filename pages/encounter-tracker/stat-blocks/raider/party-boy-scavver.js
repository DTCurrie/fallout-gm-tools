import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const partyBoyScavverDefaults = {
  name: "Party Boy Scavver",
  level: 13,
  type: "Human",
  keywords: ["Raider"],
  category: categories.raider,
  xp: 95,
  special: {
    STR: 9,
    PER: 4,
    END: 8,
    CHA: 4,
    INT: 4,
    AGI: 9,
    LUCK: 4,
  },
  skills: {
    athletics: { rating: 3, tagged: false },
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
        name: "BAYONETED LONG TACTICAL CALIBRATED COMBAT SHOTGUN",
        damage: 5,
        type: damageTypes.physical,
        keywords: ["Two-Handed"],
        effects: ["Spread", "Vicious"],
        fireRate: 2,
        range: ranges.medium,
      },
      [specialKeys.AGI, skillKeys.smallGuns],
    ],
    [
      {
        name: "BAYONETED LONG TACTICAL CALIBRATED COMBAT SHOTGUN (MELEE)",
        damage: 6,
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
        "Once per combat, the party boy scavver may ‘let rip’ with a volley from their Bayoneted Long Tactical Calibrated Combat Shotgun. This adds the weapon’s Fire Rate of 2 to the weapon’s damage for a single attack (for 7 DC total).",
    },
    {
      name: "AGGRESSIVE",
      description:
        "The party boy scavver is quick to action when it senses prey. When the scavver enters a scene, immediately generate 1 Action Point. If the scavver is an ally, then this goes into the group pool. If they are an enemy, it goes into the GM’s pool.",
    },
  ],
  inventory: {
    items: [
      "Welder's Visor",
      "Heavy Raider Chest Piece",
      "Heavy Raider Arm x2",
      "Heavy Raider Leg x2",
      "Bayoneted Long Tactical Calibrated Combat Shotgun",
    ],
    ammunition: {
      roll: `6+3CD`,
      type: "Shotgun Shells",
    },
    wealth: 1,
  },
};

export const partyBoyScavverFactory = (
  options = { ...partyBoyScavverDefaults }
) =>
  characterFactory({
    ...partyBoyScavverDefaults,
    ...options,
  });
