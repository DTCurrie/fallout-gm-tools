import { useCallback } from "react";

import useDiceRoller from "../../behaviors/use-dice-roller";
import useDegreeOfSearch from "./use-degree-of-search";

const locationScaleModifiers = Object.freeze({
  tiny: 1,
  small: 2,
  average: 3,
  large: 4,
});

const locationCategoryItemMaximums = Object.freeze({
  residential: {
    clothing: 1,
    food: 1,
    beverages: 1,
    junk: 2,
    other: 1,
  },
  commercial: {
    food: 1,
    beverages: 1,
    junk: 2,
    other: 2,
  },
  industry: {
    clothing: 1,
    armor: 1,
    beverages: 1,
    junk: 2,
    other: 1,
  },
  medical: {
    clothing: 1,
    chems: 2,
    junk: 2,
    other: 1,
  },
  agriculture: {
    food: 3,
    beverages: 1,
    junk: 1,
    other: 1,
  },
  military: {
    ammunition: 1,
    armor: 1,
    clothing: 1,
    weapons: 1,
    other: 2,
  },
});

const getOtherItemCategory = (num) => {
  switch (num) {
    case 1:
    case 2:
    case 3:
      return "ammunition";
    case 4:
    case 5:
      return "armor";
    case 6:
    case 7:
    case 8:
      return "clothing";
    case 9:
    case 10:
    case 11:
      return "food";
    case 12:
    case 13:
    case 14:
      return "beverages";
    case 15:
    case 16:
      return "chems";
    case 17:
    case 18:
      return "weapons";
    case 19:
    case 20:
      return "oddities";
    default:
      return "other";
  }
};

export default function useCalculatedLocation(scale, category, degree, effect) {
  const diceRoller = useDiceRoller();

  const degreeOfSearch = useDegreeOfSearch(degree);

  const calculateLocation = useCallback(() => {
    const scaleModifier = locationScaleModifiers[scale];
    const locationItemMaximums = locationCategoryItemMaximums[category];

    const locationItems = Object.keys(locationItemMaximums).reduce(
      (acc, cur) => {
        const value = locationItemMaximums[cur] * scaleModifier;

        acc[cur] = {
          min: value,
          max: value,
          potentialMax: value,
        };

        return acc;
      },
      {}
    );

    let others = locationItems["other"]?.max || 0;

    if (others > 0) {
      do {
        const { total } = diceRoller.roll("1d20");
        const category = getOtherItemCategory(total);

        if (category !== "other") {
          if (!locationItems[category]) {
            locationItems[category] = { min: 0, max: 0 };
          }

          locationItems[category].min++;
          locationItems[category].max++;
        }

        others--;
      } while (others > 0);

      delete locationItems["other"];
    }

    const degreeOfSearchValue = {
      ...degreeOfSearch,
      itemMinimumReduction: (degreeOfSearch.itemMinimumReduction *=
        scaleModifier),
    };

    effect({
      scale,
      category,
      degree,
      locationItems,
      degreeOfSearchValue,
    });
  }, [category, degree, degreeOfSearch, diceRoller, effect, scale]);

  return calculateLocation;
}
