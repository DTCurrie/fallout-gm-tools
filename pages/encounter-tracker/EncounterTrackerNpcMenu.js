import { useRef } from "react";

import { useEncounterTrackerStateContext } from "./EncounterTrackerStateProvider";
import { statBlocks } from "./stat-blocks/stat-blocks";

function useStatBlockMap() {
  const statBlockMap = useRef(
    Object.keys(statBlocks).reduce((map, key) => {
      const block = statBlocks[key];

      if (map[block.category]) {
        map[block.category].push({ key, block });
      } else {
        map[block.category] = [{ key, block }];
      }

      return map;
    }, {})
  );

  return statBlockMap.current;
}

function useCategories() {
  const categories = useRef(
    Array.from(
      new Set(Object.values(statBlocks).map(({ category }) => category))
    )
  );

  return categories.current;
}

export default function EncounterTrackerNpcMenu() {
  const { addActor, currentCategory, setCurrentCategory } =
    useEncounterTrackerStateContext();

  const statBlockMap = useStatBlockMap();
  const categories = useCategories();

  return (
    <div className="encounter-tracker-menu__section npcs-menu p-2 w-100">
      <h2 className="">NPCs</h2>

      <div className="encounter-tracker-menu__actions players-actions d-grid gap-2">
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle w-100"
            type="button"
            id="playersDropdownToggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {currentCategory ? currentCategory : "Select NPC Category"}
          </button>
          <ul
            className="dropdown-menu w-100"
            aria-labelledby="playersDropdownToggle"
          >
            {categories.map((category) => (
              <li key={category} className="d-flex flex-row py-1 px-3">
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentCategory(category);
                  }}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle w-100"
            type="button"
            id="playersDropdownToggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Add NPC to Encounter
          </button>
          <ul
            className="dropdown-menu w-100"
            aria-labelledby="playersDropdownToggle"
          >
            {statBlockMap[currentCategory]?.map(
              ({ block: { name, initiative, ...props } }) => (
                <li key={name} className="d-flex flex-row py-1 px-3">
                  <button
                    className="btn btn-light w-100 me-3"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addActor({ name, initiative, ...props });
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
                      }}
                    >
                      copy
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
