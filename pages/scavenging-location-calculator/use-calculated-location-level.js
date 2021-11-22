import { useCallback } from "react";
import useDiceRoller from "../../behaviors/use-dice-roller";

export default function useCalculatedLocationLevel(
  pcLevel,
  hasProblem,
  effect
) {
  const diceRoller = useDiceRoller();

  const calculateLocationLevel = useCallback(() => {
    const { rolls } = diceRoller.roll(`${pcLevel}d6`);

    effect(
      rolls[0].rolls.reduce((acc, { value }) => {
        switch (value) {
          case 1:
            return acc + 1;
          case 2:
            return acc + 2;
          case 5:
          case 6:
            return acc + (hasProblem ? 2 : 1);
          case 3:
          case 4:
          default:
            return acc;
        }
      }, 0)
    );
  }, [diceRoller, pcLevel, effect, hasProblem]);

  return calculateLocationLevel;
}
