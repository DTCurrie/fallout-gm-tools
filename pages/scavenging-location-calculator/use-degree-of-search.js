import { useEffect, useState } from "react";

const degreeOfSearchValues = Object.freeze({
  untouched: { difficulty: 0, itemMinimumReduction: 2, timeToSearch: 1 },
  partlySearched: { difficulty: 1, itemMinimumReduction: 3, timeToSearch: 10 },
  mostlySearched: { difficulty: 2, itemMinimumReduction: 4, timeToSearch: 30 },
  heavilySearched: {
    difficulty: 3,
    itemMinimumReduction: 5,
    timeToSearch: 120,
  },
});

export default function useDegreeOfSearch(degree) {
  const [value, setValue] = useState(degreeOfSearchValues[degree]);

  useEffect(() => setValue(degreeOfSearchValues[degree]), [degree]);

  return value;
}
