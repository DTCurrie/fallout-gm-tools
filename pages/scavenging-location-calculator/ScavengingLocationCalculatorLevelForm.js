import { useRef } from "react";

import { useScavengingLocationCalculatorStateContext } from "./ScavengingLocationCalculatorStateProvider";
import useCalculatedLocationLevel from "./use-calculated-location-level";

export default function ScavengingLocationCalculatorLevelForm() {
  const { setLevel, setState, pcLevel, setPcLevel, problem, setProblem } =
    useScavengingLocationCalculatorStateContext();

  const pcLevelRef = useRef();
  const problemRef = useRef();

  const calculateLocationLevel = useCalculatedLocationLevel(
    pcLevelRef.current?.value,
    problemRef.current?.value,
    (result) => {
      setLevel(result);
      setState("results");
    }
  );

  return (
    <>
      <h2>Level</h2>
      <p>
        Enter the number equal to your player characters&apos; level and then
        indicate whether the location has any problems, like an obstacle, a
        hazard, or inhabitants. Any problems will increase the location level by
        one for every effect rolled. The selected degree of search will also
        affect the amount of dice rolled.
      </p>
      <form className="d-flex flex-column" onSubmit={(e) => e.preventDefault()}>
        <label
          id="pcLevelLabel"
          htmlFor="pcLevel"
          className="form-label"
          required
        >
          Player Characters&apos; Levels
          <input
            id="pcLevel"
            type="number"
            className="form-control"
            placeholder="Enter the Player Characters' Level"
            min={1}
            defaultValue={pcLevel || undefined}
            ref={pcLevelRef}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 1;
              setPcLevel(value);
            }}
            aria-label="Player Characters' Level"
            aria-labelledby="pcLevelLabel"
          />
        </label>

        <label id="problemLabel" className="form-check-label" htmlFor="problem">
          <input
            id="problem"
            type="checkbox"
            className="form-check-input me-2"
            defaultValue={problem || undefined}
            ref={problemRef}
            onChange={(e) => setProblem(e.target.checked)}
            aria-labelledby="problemLabel"
          />
          This location contains a problem (obstacle, a hazard, or inhabitants)
        </label>

        <button
          id="calculateLevel"
          type="submit"
          className="btn btn-primary mt-3"
          aria-label="Calculate Location Level"
          onClick={calculateLocationLevel}
        >
          Calculate Location Level
        </button>
      </form>
    </>
  );
}
