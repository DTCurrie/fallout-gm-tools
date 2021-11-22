import { useEffect, useState } from "react";
import useMount from "../../behaviors/use-mount";
import useStorage from "../../behaviors/use-storage";
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
            name: `${actor.name} #${index + 1}`,
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
                    <span className="fw-bold ms-2">{name}</span>
                  </span>
                  <span className="badge bg-primary rounded-pill ms-2 me-auto">
                    {initiative}
                  </span>

                  <div className="w-100 ms-lg-2 mt-2">
                    <label id className="form-label" htmlFor={`${id}Note`}>
                      <span className="visually-hidden">Note</span>
                      <input
                        type="text"
                        id={`${id}Note`}
                        className="form-control form-control-sm"
                        placeholder="Note"
                        defaultValue={props.note}
                        onChange={(e) => {
                          e.preventDefault();
                          editActor(id, {
                            name,
                            initiative,
                            ...props,
                            note: e.target.value,
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>
                {props.hp !== undefined && (
                  <div className="mx-lg-auto px-2 actor-health-range">
                    <label htmlFor={`${id}Hp`} className="form-label">
                      Hit Points: {props.hp}/{props.maxHp}
                      <input
                        id={`${id}hp`}
                        type="range"
                        className="form-range"
                        min="0"
                        max={props.maxHp}
                        value={props.hp}
                        onChange={(e) => {
                          e.preventDefault();
                          editActor(id, {
                            name,
                            initiative,
                            ...props,
                            hp: parseInt(e.target.value),
                          });
                        }}
                      />
                    </label>
                  </div>
                )}
                {props.injuries !== undefined && (
                  <div className="mx-lg-auto px-2">
                    <div className="mb-1">Injuries</div>
                    <div className="d-flex flex-column">
                      <div className="form-check form-switch me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`${id}HeadCheckbox`}
                        >
                          <small className="text-muted">Head</small>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${id}HeadCheckbox`}
                          />
                        </label>
                      </div>
                      <div className="form-check form-switch me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`${id}LeftArmCheckbox`}
                        >
                          <small className="text-muted">Left Arm</small>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${id}LeftArmCheckbox`}
                          />
                        </label>
                      </div>
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor={`${id}RightArmCheckbox`}
                        >
                          <small className="text-muted">Right Arm</small>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${id}RightArmCheckbox`}
                          />
                        </label>
                      </div>
                      <div className="form-check form-switch me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`${id}LeftLegCheckbox`}
                        >
                          <small className="text-muted">Left Leg</small>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${id}LeftLegCheckbox`}
                          />
                        </label>
                      </div>
                      <div className="form-check form-switch me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`${id}RightLegCheckbox`}
                        >
                          <small className="text-muted">Right Leg</small>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${id}RightLegCheckbox`}
                          />
                        </label>
                      </div>
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor={`${id}TorsoCheckbox`}
                        >
                          <small className="text-muted">Torso</small>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${id}TorsoCheckbox`}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                <div className="ms-auto">
                  {props.special && (
                    <button
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${id}Stats`}
                      aria-expanded="false"
                      aria-controls={`${id}Stats`}
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
              <div className="collapse" id={`${id}Stats`}>
                Coming soon
              </div>
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
