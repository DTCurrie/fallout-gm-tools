import {
  categories,
  characterFactory,
  damageTypes,
  ranges,
  skillKeys,
  specialKeys,
} from "../stat-block";

export const vaultDwellerDefaults = {
  name: "Vault Dweller",
  level: 7,
  type: "Human",
  keywords: [],
  category: categories.wastelander,
  xp: 52,
  special: {
    STR: 5,
    PER: 6,
    END: 7,
    CHA: 6,
    INT: 6,
    AGI: 6,
    LUCK: 5,
  },
  skills: {
    barter: { rating: 2, tagged: true },
    science: { rating: 3, tagged: false },
    energyWeapons: { rating: 1, tagged: false },
    smallGuns: { rating: 3, tagged: true },
    medicine: { rating: 1, tagged: false },
    survival: { rating: 2, tagged: true },
    meleeWeapons: { rating: 2, tagged: false },
    unarmed: { rating: 1, tagged: false },
    repair: { rating: 2, tagged: true },
  },
  damageResistance: {
    physical: {
      head: 0,
      arms: 1,
      legs: 1,
      torso: 1,
      immune: false,
    },
    energy: {
      head: 0,
      arms: 1,
      legs: 1,
      torso: 1,
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
        name: "10MM PISTOL",
        damage: 4,
        type: damageTypes.physical,
        keywords: ["Close Quarters", "Reliable"],
        fireRate: 2,
        range: ranges.close,
      },
      [specialKeys.STR, skillKeys.unarmed],
    ],
  ],
  abilities: [
    {
      name: "VAULT KID",
      description:
        "Your healthier start to life at the hands of trained doctors and sophisticated autodocs means you reduce the difficulty of all END tests to resist the effects of disease. You may also work with the gamemaster to determine what sort of experiment took place within your vault. Once per quest, the GM may introduce a complication which reflects the nature of the experiment you unwittingly took part in, or introduce a complication related to your early life of isolation and confinement within the vault. If the GM does this, you immediately regain one Luck point.",
    },
    {
      name: "EDUCATED",
      description: "You have one additional tag skill.",
    },
    {
      name: "GIFTED",
      description:
        "You choose two S.P.E.C.I.A.L attributes and increase them by +1.",
    },
  ],
  inventory: {
    items: ["Vault Jumpsuit", "10mm pistol"],
    ammunition: {
      roll: `8+4CD`,
      type: "10mm rounds",
    },
    wealth: 2,
  },
};

export const vaultDwellerFactory = (options = { ...vaultDwellerDefaults }) =>
  characterFactory({
    ...vaultDwellerDefaults,
    ...options,
  });
