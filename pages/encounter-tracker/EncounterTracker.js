import { EncounterTrackerList } from "./EncounterTrackerList";
import EncounterTrackerMenu from "./EncounterTrackerMenu";

export function EncounterTracker() {
  return (
    <div className="encounter-tracker">
      <h1>Encounter Tracker</h1>

      <p className="lead">
        Use this tracker to keep track of combat encounters.
      </p>

      <EncounterTrackerMenu />

      <hr className="my-3" />

      <EncounterTrackerList />
    </div>
  );
}
