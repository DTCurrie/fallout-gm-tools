import { DiceRoller } from "rpg-dice-roller";

const diceRoller = new DiceRoller();

export default function useDiceRoller() {
  return diceRoller;
}
