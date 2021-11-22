import { useState } from "react";

import EncounterTrackerCreatePlayer from "./EncounterTrackerCreatePlayer";
import EncounterTrackerEditPlayer from "./EncounterTrackerEditPlayer";
import { useEncounterTrackerStateContext } from "./EncounterTrackerStateProvider";

export default function EncounterTrackerPlayersMenu() {
  const { players, resetPlayers, addActor } = useEncounterTrackerStateContext();
  const [creatingPlayer, setCreatingPlayer] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  return (
    <div className="encounter-tracker-menu__section players-menu p-2 w-100">
      <h2 className="">Players</h2>

      {!creatingPlayer && !editingPlayer && (
        <div className="encounter-tracker-menu__actions players-actions d-grid gap-2">
          <div className="dropdown">
            <button
              id="playersDropdownToggle"
              className="btn btn-light dropdown-toggle w-100"
              disabled={!players || !players.length}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add Player to Encounter
            </button>
            <ul
              className="dropdown-menu w-100"
              aria-labelledby="playersDropdownToggle"
            >
              {players?.map(({ id, name, initiative }) => (
                <li key={id} className="d-flex flex-row py-1 px-3">
                  <button
                    className="btn btn-light w-100 me-3"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addActor({ id, name, initiative });
                    }}
                  >
                    {name} [{initiative}]
                  </button>

                  <div
                    className="btn-group"
                    role="group"
                    aria-label={`${name} Actions`}
                  >
                    <button
                      className="btn btn-sm btn-outline-primary py-0"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditingPlayer(id);
                      }}
                    >
                      edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger py-0"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  disabled={players && !players.length}
                  onClick={(e) => {
                    e.preventDefault();
                    resetPlayers();
                  }}
                >
                  Reset Players
                </a>
              </li>
            </ul>
          </div>

          <button
            className="btn btn-light"
            onClick={(e) => {
              e.preventDefault();
              setCreatingPlayer(true);
            }}
          >
            Create Player
          </button>
        </div>
      )}

      {creatingPlayer && (
        <EncounterTrackerCreatePlayer
          closeMenu={() => setCreatingPlayer(false)}
        />
      )}

      {editingPlayer && (
        <EncounterTrackerEditPlayer
          id={editingPlayer}
          closeMenu={() => setEditingPlayer(null)}
        />
      )}
    </div>
  );
}
