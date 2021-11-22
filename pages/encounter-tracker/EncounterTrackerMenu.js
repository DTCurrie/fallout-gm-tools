import EncounterTrackerNpcMenu from "./EncounterTrackerNpcMenu";
import EncounterTrackerPlayersMenu from "./EncounterTrackerPlayersMenu";

export default function EncounterTrackerMenu() {
  return (
    <div className="encounter-tracker-menu d-flex flex-xs-column flex-sm-column flex-md-column flex-lg-row bg-primary text-white">
      <EncounterTrackerPlayersMenu />
      <EncounterTrackerNpcMenu />
    </div>
  );
}

/* 
      Encounter Menu
        - Players should just be a name and initiative score 
        - NPCs should be chosen from a list:
          - Select category
            - Based on book categories
            - Include "Custom" category
          - Select stat block
        - Reset Button
        - Save Encounter (local storage)
        - Export Encounter (to JSON)
        - Discord channel ID
      */
