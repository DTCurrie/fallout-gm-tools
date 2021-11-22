import { useRef } from "react";
import { useEncounterTrackerStateContext } from "./EncounterTrackerStateProvider";

export default function EncounterTrackerCreatePlayer({ closeMenu }) {
  const { createPlayer } = useEncounterTrackerStateContext();

  const playerNameRef = useRef();
  const playerInitiativeRef = useRef();

  return (
    <form
      className="encounter-tracker-menu__form add-player-form d-grid gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        createPlayer({
          name: playerNameRef.current.value,
          initiative: parseInt(playerInitiativeRef.current.value),
        });
        closeMenu();
      }}
    >
      <label
        id="createPlayerNameInputLabel"
        className="form-label"
        htmlFor="createPlayerNameInput"
      >
        Player Name
        <input
          type="text"
          id="createPlayerNameInput"
          className="form-control"
          placeholder="Enter Player Name"
          ref={playerNameRef}
          required
          aria-labelledby="createPlayerNameInputLabel"
        />
      </label>

      <label
        id="createPlayerInitiativeInputLabel"
        className="form-label"
        htmlFor="createPlayerInitiativeInput"
      >
        Player Initiative
        <input
          type="number"
          id="createPlayerInitiativeInput"
          className="form-control"
          placeholder="Enter Player Initiative"
          ref={playerInitiativeRef}
          required
          min={1}
          aria-labelledby="createPlayerInitiativeInputLabel"
        />
      </label>

      <div className="form-group d-flex flex-row w-100">
        <button className="btn btn-sm btn-light ms-auto" type="submit">
          Save
        </button>
        <button
          className="btn btn-sm btn-danger ms-2"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
