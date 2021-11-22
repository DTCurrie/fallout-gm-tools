import { useRef } from "react";
import { useEncounterTrackerStateContext } from "./EncounterTrackerStateProvider";

export default function EncounterTrackerEditPlayer({ id, closeMenu }) {
  const { getPlayer, editPlayer } = useEncounterTrackerStateContext();

  const playerNameRef = useRef();
  const playerInitiativeRef = useRef();

  const { name, initiative } = getPlayer(id);

  if (!id || !name || !initiative) {
    return null;
  }

  return (
    <form
      className="encounter-tracker-menu__form add-player-form d-grid gap-2"
      onSubmit={(e) => {
        e.preventDefault();

        editPlayer(id, {
          name: playerNameRef.current.value,
          initiative: parseInt(playerInitiativeRef.current.value),
        });

        closeMenu();
      }}
    >
      <label
        id="editPlayerNameInputLabel"
        className="form-label"
        htmlFor="editPlayerNameInput"
      >
        Player Name
        <input
          type="text"
          id="editPlayerNameInput"
          className="form-control"
          defaultValue={name}
          placeholder="Enter Player Name"
          ref={playerNameRef}
          required
          aria-labelledby="editPlayerNameInputLabel"
        />
      </label>

      <label
        id="editPlayerInitiativeInputLabel"
        className="form-label"
        htmlFor="editPlayerInitiativeInput"
      >
        Player Initiative
        <input
          type="number"
          id="editPlayerInitiativeInput"
          className="form-control"
          defaultValue={initiative}
          placeholder="Enter Player Initiative"
          ref={playerInitiativeRef}
          required
          min={1}
          aria-labelledby="editPlayerInitiativeInputLabel"
        />
      </label>

      <div className="form-group d-flex flex-row w-100">
        <button className="btn btn-sm btn-light ms-auto" type="submit">
          Create
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
