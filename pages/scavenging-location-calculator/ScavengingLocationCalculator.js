import ScavengingLocationCalculatorItemsForm from "./ScavengingLocationCalculatorItemsForm";
import ScavengingLocationCalculatorLevelForm from "./ScavengingLocationCalculatorLevelForm";
import ScavengingLocationCalculatorLocationForm from "./ScavengingLocationCalculatorLocationForm";
import ScavengingLocationCalculatorNavigation from "./ScavengingLocationCalculatorNavigation";
import ScavengingLocationCalculatorResults from "./ScavengingLocationCalculatorResults";
import { useScavengingLocationCalculatorStateContext } from "./ScavengingLocationCalculatorStateProvider";

export default function ScavengingLocationCalculator() {
  const { state } = useScavengingLocationCalculatorStateContext();

  return (
    <div className="scavenging-location-calculator">
      <h1>Scavenging Location Calculator</h1>

      <p className="lead">
        Use this calculator to determine scavenging item minimums and maximums
        and location levels.
      </p>

      <ScavengingLocationCalculatorNavigation />

      <div className="mt-3">
        {state === "location" && <ScavengingLocationCalculatorLocationForm />}
        {state === "items" && <ScavengingLocationCalculatorItemsForm />}
        {state === "level" && <ScavengingLocationCalculatorLevelForm />}
        {state === "results" && <ScavengingLocationCalculatorResults />}
      </div>
    </div>
  );
}
