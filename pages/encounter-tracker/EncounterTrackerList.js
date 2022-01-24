import { useEffect, useState } from "react";

import StatBlock from "../../components/StatBlock";

import EncounterTrackerInjuries from "./EncounterTrackerInjuries";
import { useEncounterTrackerStateContext } from "./EncounterTrackerStateProvider";

function useIndexedActors() {
  const { actors } = useEncounterTrackerStateContext();
  const [indexedActors, setIndexedActors] = useState([]);

  useEffect(() => {
    const actorsMap = actors.reduce((map, actor) => {
      if (map[actor.name]) {
        map[actor.name].push(actor);
      } else {
        map[actor.name] = [actor];
      }

      return map;
    }, {});

    setIndexedActors(
      Object.keys(actorsMap).flatMap((key) => {
        const toIndex = [...actorsMap[key]];

        if (toIndex.length > 1) {
          return toIndex.map((actor, index) => ({
            ...actor,
            displayName: `${actor.name} #${index + 1}`,
          }));
        }

        return toIndex;
      })
    );
  }, [actors]);

  return indexedActors;
}

export function EncounterTrackerList() {
  const {
    editActor,
    removeActor,
    resetActors,
    currentInitiative,
    setCurrentInitiative,
  } = useEncounterTrackerStateContext();

  const actors = useIndexedActors();

  useEffect(() => {
    if (!currentInitiative && actors.length) {
      setCurrentInitiative(actors[0].id);
    }
  }, [actors, currentInitiative, setCurrentInitiative]);

  return (
    <div className="encounters-tracker-list">
      <div className="d-flex flex-row mb-3">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();

            const currentIndex = actors.findIndex(
              ({ id }) => id === currentInitiative
            );

            const nextIndex = currentIndex - 1;

            setCurrentInitiative(
              actors[nextIndex === -1 ? actors.length - 1 : nextIndex].id
            );
          }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={(e) => {
            e.preventDefault();

            const currentIndex = actors.findIndex(
              ({ id }) => id === currentInitiative
            );

            const nextIndex = currentIndex + 1;

            setCurrentInitiative(
              actors[nextIndex === actors.length ? 0 : nextIndex].id
            );
          }}
        >
          Next
        </button>
        <button
          className="btn btn-danger ms-auto"
          onClick={(e) => {
            e.preventDefault();
            resetActors();
          }}
        >
          Reset
        </button>
      </div>
      <ol className="list-group list-group-numbered">
        {actors
          ?.sort((a, b) => b.initiative - a.initiative)
          .map(({ id, name, initiative, ...props }) => (
            <li
              key={id}
              className={`actor list-group-item${
                currentInitiative === id ? " active" : ""
              }`}
            >
              <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                <div className="mb-2 mb-lg-0">
                  <span className="ms-lg-2">
                    <span className="fw-bold ms-2">
                      {props.displayName || name}
                    </span>
                  </span>
                  <span className="badge bg-primary rounded-pill ms-2 me-auto">
                    {initiative}
                  </span>

                  <div className="w-100 ms-lg-2 mt-2 mx-auto">
                    <label
                      id={`${id}Note`}
                      className="form-label"
                      htmlFor={`${id}Note`}
                    >
                      <span className="visually-hidden">Note</span>
                      <input
                        type="text"
                        id={`${id}_Note`}
                        className="form-control form-control-sm"
                        placeholder="Note"
                        defaultValue={props.note}
                        onChange={(e) => {
                          e.preventDefault();
                          editActor(id, {
                            ...props,
                            name,
                            initiative,
                            note: e.target.value,
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>
                {props.hp !== undefined && (
                  <div className="mx-auto px-2 actor-health-range">
                    <label htmlFor={`${id}Hp`} className="form-label">
                      Hit Points: {props.hp}/{props.maxHp}
                      <input
                        id={`${id}_Hp`}
                        type="range"
                        className="form-range"
                        min="0"
                        max={props.maxHp}
                        value={props.hp}
                        onChange={(e) => {
                          e.preventDefault();
                          editActor(id, {
                            ...props,
                            name,
                            initiative,
                            hp: parseInt(e.target.value),
                          });
                        }}
                      />
                    </label>
                  </div>
                )}
                {props.injuries !== undefined && (
                  <EncounterTrackerInjuries id={id} injuries={props.injuries} />
                )}
                <div className="mx-auto mt-3 mt-lg-0">
                  {props.special && (
                    <button
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${id}_Stats`}
                      aria-expanded="false"
                      aria-controls={`${id}_Stats`}
                    >
                      stats
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={(e) => {
                      e.preventDefault();
                      removeActor(id);
                    }}
                  >
                    remove
                  </button>
                </div>
              </div>

              {props.special && (
                <div className="collapse" id={`${id}_Stats`}>
                  <StatBlock
                    key={`${id}_StatBlock`}
                    {...{ id, name, initiative, ...props }}
                  />
                </div>
              )}
            </li>
          ))}
      </ol>
    </div>
  );
}

/* 
      Encounter Table
        - Character name
          - If repeated add a numbering system starting at #1
        - Initiative
        [
          - Health
          - Injuries
          - Conditions
          - Stat Block
            - Stats in editable fields
            - Attacks that can roll to provided Discord channel
            - Abilities tht can roll to provided Discord channel
            - Save Stat Block
            - Export Stat Block
        ]
      */
