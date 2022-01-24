import { sentenceCase } from "sentence-case";

export const specialFactory = ({
  STR = 4,
  PER = 4,
  END = 4,
  CHA = 4,
  INT = 4,
  AGI = 4,
  LUCK = 4,
}) => ({
  STR,
  PER,
  END,
  CHA,
  INT,
  AGI,
  LUCK,
});

export const specialKeys = Object.freeze({
  STR: "STR",
  PER: "PER",
  END: "END",
  CHA: "CHA",
  INT: "INT",
  AGI: "AGI",
  LUCK: "LUCK",
});

export const skillsFactory = ({
  athletics = { rating: 0, tagged: false },
  barter = { rating: 0, tagged: false },
  bigGuns = { rating: 0, tagged: false },
  energyWeapons = { rating: 0, tagged: false },
  explosives = { rating: 0, tagged: false },
  lockpick = { rating: 0, tagged: false },
  medicine = { rating: 0, tagged: false },
  meleeWeapons = { rating: 0, tagged: false },
  pilot = { rating: 0, tagged: false },
  repair = { rating: 0, tagged: false },
  science = { rating: 0, tagged: false },
  smallGuns = { rating: 0, tagged: false },
  sneak = { rating: 0, tagged: false },
  speech = { rating: 0, tagged: false },
  survival = { rating: 0, tagged: false },
  throwing = { rating: 0, tagged: false },
  unarmed = { rating: 0, tagged: false },
}) => ({
  athletics,
  barter,
  bigGuns,
  energyWeapons,
  explosives,
  lockpick,
  medicine,
  meleeWeapons,
  pilot,
  repair,
  science,
  smallGuns,
  sneak,
  speech,
  survival,
  throwing,
  unarmed,
});

export const skillKeys = Object.freeze({
  athletics: "athletics",
  barter: "barter",
  bigGuns: "bigGuns",
  energyWeapons: "energyWeapons",
  explosives: "explosives",
  lockpick: "lockpick",
  medicine: "medicine",
  meleeWeapons: "meleeWeapons",
  pilot: "pilot",
  repair: "repair",
  science: "science",
  smallGuns: "smallGuns",
  sneak: "sneak",
  speech: "speech",
  survival: "survival",
  throwing: "throwing",
  unarmed: "unarmed",
});

export const damageResistanceFactory = ({
  physical = { head: 0, arms: 0, legs: 0, torso: 0, immune: false },
  energy = { head: 0, arms: 0, legs: 0, torso: 0, immune: false },
  radiation = { head: 0, arms: 0, legs: 0, torso: 0, immune: false },
  poison = { head: 0, arms: 0, legs: 0, torso: 0, immune: false },
}) => ({ physical, energy, radiation, poison });

export const attackFactory = (
  { name, damage, type, keywords = [], effects = [], fireRate = 0, range },
  [specialKey, skillKey],
  { special, skills }
) => {
  const testNumber = special[specialKey] + skills[skillKey];

  return {
    name,
    label: `${name}: ${specialKey} + ${sentenceCase(
      skillKey
    )} (TN ${testNumber})`,
    testNumber,
    damage,
    type,
    keywords,
    effects,
    fireRate,
    range,
    // TODO: Add roll command
  };
};

export const damageTypes = Object.freeze({
  physical: "Physical",
  energy: "Energy",
});

export const ranges = Object.freeze({
  close: "C",
  medium: "M",
  long: "L",
});

export const abilityFactory = ({ name, description }) => ({
  name,
  description,
  text: `${name}: ${description}`,
});

export const inventoryFactory = ({ items, ammunition, wealth }) => {
  const value = [].concat(items);

  //   if(wealth) {
  //       value.push(`${roll(wealth)} caps`)
  //   }

  //   if (ammunition) {
  //     value.push(`${roll(ammunition.roll)} ${ammunition.type}`);
  //   }

  return value;
};

export const importanceModifier = (importance, [normal, notable, major]) => {
  switch (importance) {
    case "notable":
      return notable;
    case "major":
      return major;
    case "normal":
    default:
      return normal;
  }
};

export const characterHp = ({ special: { END, LUCK }, level, importance }) =>
  END + level + LUCK * importanceModifier(importance, [0, 1, 2]);

export const characterInjuries = ({
  head = false,
  leftArm = false,
  leftLeg = false,
  rightArm = false,
  rightLeg = false,
  torso = false,
}) => ({
  head,
  leftArm,
  leftLeg,
  rightArm,
  rightLeg,
  torso,
});

export const characterInitiative = ({ special: { PER, AGI }, importance }) =>
  PER + AGI + importanceModifier(importance, [0, 2, 4]);

export const characterMeleeBonus = ({ special: { STR } }) => {
  switch (STR) {
    case 7:
    case 8:
      return 1;
    case 9:
    case 10:
      return 2;
    case 11:
    case 12:
      return 3;
    default:
      return 0;
  }
};

export const characterLuckPoints = ({ special: { LUCK }, importance }) =>
  Math.ceil(LUCK * importanceModifier(importance, [0, 0.5, 1]));

export const characterFactory = ({
  name,
  level,
  type,
  keywords,
  category,
  importance = "normal",
  xp = 1,
  special,
  skills,
  injuries = {},
  damageResistance,
  attacks,
  abilities,
  inventory,
}) => {
  const specialValue = specialFactory(special);
  const skillsValue = skillsFactory(skills);
  const maxHp = characterHp({ special: specialValue, level, importance });

  return {
    name,
    level,
    type,
    keywords,
    category,
    importance,
    xp,
    special: specialValue,
    skills: skillsValue,
    hp: maxHp,
    maxHp,
    initiative: characterInitiative({
      special: specialValue,
      importance,
    }),
    defense: specialValue.AGI >= 9 ? 2 : 1,
    carryWeight: 150 + specialValue.STR * 10,
    meleeBonus: characterMeleeBonus({ special }),
    luckPoints: characterLuckPoints({ special, importance }),
    injuries: characterInjuries(injuries),
    damageResistance: damageResistanceFactory(damageResistance),
    attacks: attacks.map((args) =>
      attackFactory(args[0], args[1], {
        special: specialValue,
        skills: skillsValue,
      })
    ),
    abilities: abilities.map(abilityFactory),
    inventory: inventoryFactory(inventory),
  };
};

export const categories = Object.freeze({
  raider: "Raider",
  wastelander: "Wastelander",
});
