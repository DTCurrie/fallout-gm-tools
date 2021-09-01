import Head from "next/head";
import { useEffect, useState } from "react";
import { sentenceCase } from "change-case";

const storageKeys = Object.freeze({
  state: "state",
  scale: "sc-location-scale",
  category: "sc-location-category",
  degree: "sc-location-degree",
  location: "sc-calculated-location",
  items: "sc-adjusted-items",
  reductions: "sc-items-to-reduce",
  pcLevel: "sc-pc-levels",
  problem: "sc-has-problem",
  level: "sc-location-level",
  itemsMarkdown: "sc-items-markdown",
});

function getInitialState(location, reductions, level) {
  const storedState = localStorage.getItem(storageKeys.state);

  if (storedState) return storedState;

  if (!!location && reductions > 0) {
    return "items";
  }

  if (!!location && reductions === 0 && level === null) {
    return "level";
  }

  if (!!location && reductions === 0 && level !== null) {
    return "results";
  }

  return "location";
}

const locationScaleModifiers = Object.freeze({
  tiny: 1,
  small: 2,
  average: 3,
  Large: 4,
});

const locationCategoryItemMaximums = Object.freeze({
  residential: {
    clothing: 1,
    food: 1,
    beverages: 1,
    junk: 2,
    other: 1,
  },
  commercial: {
    food: 1,
    beverages: 1,
    junk: 2,
    other: 2,
  },
  industry: {
    clothing: 1,
    armor: 1,
    beverages: 1,
    junk: 2,
    other: 1,
  },
  medical: {
    clothing: 1,
    chems: 2,
    junk: 2,
    other: 1,
  },
  agriculture: {
    food: 3,
    beverages: 1,
    junk: 1,
    other: 1,
  },
  military: {
    ammunition: 1,
    armor: 1,
    clothing: 1,
    weapons: 1,
    other: 2,
  },
});

const degreeOfSearchValues = Object.freeze({
  untouched: { difficulty: 0, itemMinimumReduction: 2 },
  partlySearched: { difficulty: 1, itemMinimumReduction: 3 },
  mostlySearched: { difficulty: 2, itemMinimumReduction: 4 },
  heavilySearched: { difficulty: 3, itemMinimumReduction: 5 },
});

const getOtherItemCategory = (num) => {
  switch (num) {
    case 1:
    case 2:
    case 3:
      return "ammunition";
    case 4:
    case 5:
      return "armor";
    case 6:
    case 7:
    case 8:
      return "clothing";
    case 9:
    case 10:
    case 11:
      return "food";
    case 12:
    case 13:
    case 14:
      return "beverages";
    case 15:
    case 16:
      return "chems";
    case 17:
    case 18:
      return "weapons";
    case 19:
    case 20:
      return "oddities";
    default:
      return "other";
  }
};

const calculateLocation = (locationScale, locationCategory, degreeOfSearch) => {
  const diceRoller = new rpgDiceRoller.DiceRoller();
  const scaleModifier = locationScaleModifiers[locationScale];
  const locationItemMaximums = locationCategoryItemMaximums[locationCategory];

  const locationItems = Object.keys(locationItemMaximums).reduce((acc, cur) => {
    const value = locationItemMaximums[cur] * scaleModifier;

    acc[cur] = {
      min: value,
      max: value,
    };

    return acc;
  }, {});

  let others = locationItems["other"]?.max || 0;

  if (others > 0) {
    do {
      const { total } = diceRoller.roll("1d20");
      const category = getOtherItemCategory(total);

      if (category !== "other") {
        if (!locationItems[category]) {
          locationItems[category] = { min: 0, max: 0 };
        }

        locationItems[category].min++;
        locationItems[category].max++;
      }

      others--;
    } while (others > 0);

    delete locationItems["other"];
  }

  const degreeOfSearchValue = { ...degreeOfSearchValues[degreeOfSearch] };
  degreeOfSearchValue.itemMinimumReduction *= scaleModifier;

  return {
    locationScale,
    locationCategory,
    locationItems,
    degreeOfSearch,
    degreeOfSearchValue,
  };
};

const calculateLocationLevel = (pcLevel, hasProblem) => {
  const diceRoller = new rpgDiceRoller.DiceRoller();
  const { rolls } = diceRoller.roll(`${pcLevel}d6`);

  return rolls[0].rolls.reduce((acc, { value }) => {
    switch (value) {
      case 1:
        return acc + 1;
      case 2:
        return acc + 2;
      case 5:
      case 6:
        return acc + (hasProblem ? 2 : 1);
      case 3:
      case 4:
      default:
        return acc;
    }
  }, 0);
};

const trimTableText = (text) => text.trim().replace("\t", "");

export default function Home() {
  const [currentState, setCurrentState] = useState(null);

  const [calculatedLocation, setCalculatedLocation] = useState(null);
  const [adjustedItems, setAdjustedItems] = useState(null);
  const [itemsToReduce, setItemsToReduce] = useState(Number.MAX_SAFE_INTEGER);
  const [calculatedLevel, setCalculatedLevel] = useState(null);
  const [itemsMarkdown, setItemsMarkdown] = useState("");

  useEffect(() => {
    const storedCalculatedLocation = localStorage.getItem(storageKeys.location);
    const storedAdjustedItems = localStorage.getItem(storageKeys.items);

    const storedItemsItemsToReduce = localStorage.getItem(
      storageKeys.reductions
    );
    const storedLevel = localStorage.getItem(storageKeys.level);
    const storedItemsMarkdown = localStorage.getItem(storageKeys.itemsMarkdown);

    const location =
      storedCalculatedLocation !== null
        ? JSON.parse(storedCalculatedLocation)
        : null;

    const items =
      storedAdjustedItems !== null ? JSON.parse(storedAdjustedItems) : null;

    const reductions =
      storedItemsItemsToReduce !== null
        ? parseInt(storedItemsItemsToReduce)
        : Number.MAX_SAFE_INTEGER;

    const level = storedLevel !== null ? parseInt(storedLevel) : null;

    setCalculatedLocation(location);
    setAdjustedItems(items);
    setItemsToReduce(reductions);
    setCalculatedLevel(level);
    setItemsMarkdown(storedItemsMarkdown);

    setCurrentState(getInitialState(location, reductions));
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKeys.state, currentState);

    if (currentState === "results") {
      setTimeout(() => {
        hljs.highlightAll();
      }, 0);
    }
  }, [currentState]);

  useEffect(
    () =>
      localStorage.setItem(
        storageKeys.location,
        JSON.stringify(calculatedLocation)
      ),
    [calculatedLocation]
  );

  useEffect(() => {
    if (adjustedItems) {
      const headers = ["Category", "Minimum", "Maximum"];

      const longestCategory = Object.keys(adjustedItems).sort(
        (a, b) => b.length - a.length
      )[0].length;

      const categoryLength =
        longestCategory > headers[0].length
          ? longestCategory
          : headers[0].length;

      const rowText = Object.keys(adjustedItems).reduce((acc, cur) => {
        const { min, max } = adjustedItems[cur];
        const text = sentenceCase(trimTableText(cur));
        const minLength = `${min}`.length;
        const maxLength = `${max}`.length;

        if (cur.length > categoryLength) {
          categoryLength = cur.length;
        }

        const category = `${sentenceCase(trimTableText(cur))}${[
          ...Array(categoryLength - text.length),
        ]
          .map(() => " ")
          .join("")}`;

        const minimum = `${min}${[...Array(headers[1].length - minLength)]
          .map(() => " ")
          .join("")}`;

        const maximum = `${max}${[...Array(headers[2].length - maxLength)]
          .map(() => " ")
          .join("")}`;

        return (acc += `| ${category} | ${minimum} | ${maximum} |\n`);
      }, "");

      const headerText = headers.reduce((acc, cur, i) => {
        const text = trimTableText(cur);
        acc += ` ${text}${
          i === 0
            ? [...Array(categoryLength - text.length)].map(() => " ").join("")
            : ""
        } |`;
        return acc;
      }, "|");

      const divider = `| ${[...Array(categoryLength)]
        .map(() => "-")
        .join("")} | ${[...Array(headers[1].length)]
        .map(() => "-")
        .join("")} | ${[...Array(headers[2].length)]
        .map(() => "-")
        .join("")} |`;

      const markdown = `${headerText}\n${divider}\n${rowText}`;

      setItemsMarkdown(markdown);
      localStorage.setItem(storageKeys.itemsMarkdown, markdown);
    }

    localStorage.setItem(storageKeys.items, JSON.stringify(adjustedItems));
  }, [adjustedItems]);

  useEffect(
    () => localStorage.setItem(storageKeys.reductions, itemsToReduce),
    [itemsToReduce]
  );

  useEffect(
    () => localStorage.setItem(storageKeys.level, calculatedLevel),
    [calculatedLevel]
  );

  const Tab = ({ state, disabled }) => {
    const active = currentState === state;

    const props = {
      className: "nav-link",
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        if (active || disabled) return;
        setCurrentState(state);
      },
    };

    if (active) {
      props.className += " active";
      props["aria-current"] = "page";
    }

    if (disabled) {
      props.className += " disabled";
      props.disabled = true;
      props.tabIndex = -1;
      props["aria-disabled"] = true;
    }

    return (
      <li className="nav-item">
        <a {...props}>{state.toUpperCase()}</a>
      </li>
    );
  };

  const reset = () => {
    Object.keys(storageKeys).forEach((key) =>
      localStorage.removeItem(storageKeys[key])
    );
    setCurrentState("location");
  };

  const getCalculatedLocation = () => {
    const locationScale = document.querySelector("#locationScale");
    const locationCategory = document.querySelector("#locationCategory");
    const degreeOfSearch = document.querySelector("#degreeOfSearch");

    const results = calculateLocation(
      locationScale.value,
      locationCategory.value,
      degreeOfSearch.value
    );

    localStorage.setItem(storageKeys.location, JSON.stringify(results));
    setCalculatedLocation(results);
    setAdjustedItems(results.locationItems);
    setItemsToReduce(results.degreeOfSearchValue.itemMinimumReduction);
    setCurrentState("items");
  };

  const reduceItem = (key) => {
    const items = adjustedItems[key];
    if (items.min === 0 && items.max > 0) {
      items.max--;
      setItemsToReduce(itemsToReduce - 1);
      setAdjustedItems({
        ...adjustedItems,
        [key]: items,
      });
      return;
    }

    if (items.min > 0) {
      items.min--;
      setItemsToReduce(itemsToReduce - 1);
      setAdjustedItems({
        ...adjustedItems,
        [key]: items,
      });
    }
  };

  const increaseItem = (key) => {
    const { max } = calculatedLocation.locationItems[key];
    const items = adjustedItems[key];

    if (items.max < max) {
      items.max++;
      setItemsToReduce(itemsToReduce + 1);
      setAdjustedItems({
        ...adjustedItems,
        [key]: items,
      });

      return;
    }

    if (items.min < max) {
      items.min++;
      setItemsToReduce(itemsToReduce + 1);
      setAdjustedItems({
        ...adjustedItems,
        [key]: items,
      });
    }
  };

  const getCalculatedLocationLevel = () => {
    const pcLevel = document.querySelector("#pcLevel");
    const problem = document.querySelector("#problem");
    const result = calculateLocationLevel(pcLevel.value, problem.value);

    localStorage.setItem(storageKeys.level, result);
    setCalculatedLevel(result);
    setCurrentState("results");
  };

  return (
    <>
      <Head>
        <title>Scavenging Location Calculator</title>
        <meta name="description" content="Fallout RPG Scavenging Calculator" />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
          rel="stylesheet"
        />
      </Head>

      <h1>Scavenging Calculator</h1>

      <p className="lead">
        Use this calculator to determine item minimums and maximums and location
        levels.
      </p>

      <div className="d-flex flex-xs-column flex-sm-column flex-md-column flex-lg-row justify-content-space-between my-3">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>

      <ul className="nav nav-tabs">
        <Tab state="location" />
        <Tab state="items" disabled={calculatedLocation === null} />
        <Tab
          state="level"
          disabled={calculatedLocation === null || itemsToReduce > 0}
        />
        <Tab
          state="results"
          disabled={
            calculatedLocation === null ||
            itemsToReduce > 0 ||
            calculatedLevel === null
          }
        />
      </ul>

      <div className="mt-3">
        {currentState === "location" && (
          <>
            <h2>Location</h2>
            <p>
              Decide what type of location you want to create. This will
              determine how many of which items can be found when scavenging.
              Once you have calculated the location&apos;s attributes you can
              proceed to setting the item minimum and maximums.
            </p>
            <form
              className="d-flex flex-column"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                id="locationScaleLabel"
                htmlFor="locationScale"
                className="form-label"
              >
                Location Scale
                <select
                  id="locationScale"
                  className="form-select"
                  defaultValue={
                    localStorage.getItem(storageKeys.scale) || undefined
                  }
                  onChange={(e) =>
                    localStorage.setItem(storageKeys.scale, e.target.value)
                  }
                  aria-label="Location Scale"
                  aria-labelledby="locationScaleLabel"
                >
                  <option value="tiny">Tiny (6 Items)</option>
                  <option value="small">Small (12 Items)</option>
                  <option value="average">Average (18 Items)</option>
                  <option value="Large">Large (24 Items)</option>
                </select>
              </label>
              <label
                id="locationCategoryLabel"
                htmlFor="locationCategory"
                className="form-label"
              >
                Location Category
                <select
                  id="locationCategory"
                  className="form-select"
                  defaultValue={
                    localStorage.getItem(storageKeys.category) || undefined
                  }
                  onChange={(e) =>
                    localStorage.setItem(storageKeys.category, e.target.value)
                  }
                  aria-label="Location Category"
                  aria-labelledby="locationCategoryLabel"
                  required
                >
                  <option value="residential">
                    Residential (homes and gardens)
                  </option>
                  <option value="commercial">
                    Commercial (shops, restaurants, etc...)
                  </option>
                  <option value="industry">Industry (factories, garage)</option>
                  <option value="medical">
                    Medical (hospitals, clinics, ambulances)
                  </option>
                  <option value="agriculture">Agriculture</option>
                  <option value="military">Military</option>
                </select>
              </label>
              <label
                id="degreeOfSearchLabel"
                htmlFor="degreeOfSearch"
                className="form-label"
                required
              >
                Degree of Search
                <select
                  id="degreeOfSearch"
                  className="form-select"
                  defaultValue={
                    localStorage.getItem(storageKeys.degree) || undefined
                  }
                  onChange={(e) =>
                    localStorage.setItem(storageKeys.degree, e.target.value)
                  }
                  aria-label="Degree of Search"
                  aria-labelledby="degreeOfSearchLabel"
                >
                  <option value="untouched">Untouched</option>
                  <option value="partlySearched">Partly Searched</option>
                  <option value="mostlySearched">Mostly Searched</option>
                  <option value="heavily Searched">Heavily Searched</option>
                </select>
              </label>

              <button
                type="submit"
                className="btn btn-primary mt-3"
                aria-label="Calculate Location"
                onClick={getCalculatedLocation}
              >
                Calculate Location
              </button>
            </form>
          </>
        )}

        {currentState === "items" && (
          <>
            <h2>Items</h2>
            <p>
              Reduce the items available when scavenging based on the locations
              statistics. Minimums will be reduced to a minimums of zero before
              maximums are reduced. Once there are no more items to reduce, you
              can proceed to calculating the location level.
            </p>

            <p>
              <strong>ITEMS TO REDUCE: {itemsToReduce}</strong>
            </p>

            <table className="table table-borderless table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Minimum</th>
                  <th scope="col">Maximum</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(adjustedItems).map((key) => {
                  const { min, max } = adjustedItems[key];

                  const canIncrease =
                    itemsToReduce <
                    calculatedLocation.degreeOfSearchValue.itemMinimumReduction;

                  const potentialMax =
                    calculatedLocation.locationItems[key].max;

                  return (
                    <tr key={key}>
                      <td>{sentenceCase(key)}</td>
                      <td>
                        <button
                          type="button"
                          aria-label="Reduce Minimum"
                          className="btn btn-sm btn-outline-danger"
                          disabled={!(itemsToReduce > 0 && min > 0)}
                          onClick={() => reduceItem(key)}
                        >
                          -
                        </button>
                        <span className="px-2">{min}</span>
                        <button
                          type="button"
                          aria-label="Increase Minimum"
                          className="btn btn-sm btn-outline-success"
                          disabled={
                            !(canIncrease && min < max && min < potentialMax)
                          }
                          onClick={() => increaseItem(key)}
                        >
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          aria-label="Reduce Maximum"
                          className="btn btn-sm btn-outline-danger"
                          disabled={
                            !(itemsToReduce > 0 && min === 0 && max > 0)
                          }
                          onClick={() => reduceItem(key)}
                        >
                          -
                        </button>
                        <span className="px-2">{max}</span>
                        <button
                          type="button"
                          aria-label="Increase Minimum"
                          className="btn btn-sm btn-outline-success"
                          disabled={!(canIncrease && max < potentialMax)}
                          onClick={() => increaseItem(key)}
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={itemsToReduce > 0}
              onClick={() => setCurrentState("level")}
            >
              Calculate Level
            </button>
          </>
        )}

        {currentState === "level" && (
          <>
            <h2>Level</h2>
            <p>
              Enter the number equal to your player characters&apos; level and
              then indicate whether the location has any problems, like an
              obstacle, a hazard, or inhabitants. Any problems will increase the
              location level by one for every effect rolled. The selected degree
              of search will also affect the amount of dice rolled.
            </p>
            <form
              className="d-flex flex-column"
              onSubmit={(e) => e.preventDefault()}
            >
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
                  defaultValue={
                    localStorage.getItem(storageKeys.pcLevel) || undefined
                  }
                  onChange={(e) =>
                    localStorage.setItem(storageKeys.pcLevel, e.target.value)
                  }
                  aria-label="Player Characters' Level"
                  aria-labelledby="pcLevelLabel"
                />
              </label>

              <label
                id="problemLabel"
                className="form-check-label"
                htmlFor="problem"
              >
                <input
                  id="problem"
                  type="checkbox"
                  className="form-check-input me-2"
                  defaultValue={
                    localStorage.getItem(storageKeys.problem) || undefined
                  }
                  onChange={(e) =>
                    localStorage.setItem(storageKeys.problem, e.target.value)
                  }
                  aria-labelledby="problemLabel"
                />
                This location contains a problem (obstacle, a hazard, or
                inhabitants)
              </label>

              <button
                id="calculateLevel"
                type="submit"
                className="btn btn-primary mt-3"
                aria-label="Calculate Location Level"
                onClick={getCalculatedLocationLevel}
              >
                Calculate Location Level
              </button>
            </form>
          </>
        )}

        {currentState === "results" && (
          <>
            <h2>Results</h2>
            <p>Here is the summary for your scavenging location.</p>
            <h3>Location</h3>
            <ul className="list-group list-group-horizontal-lg my-3 text-center">
              <li className="list-group-item d-flex flex-column w-100">
                <h4 className="mb-1">Location Scale</h4>
                <p className="mb-1">
                  {sentenceCase(calculatedLocation.locationScale)}
                </p>
              </li>
              <li className="list-group-item d-flex flex-column w-100">
                <h4 className="mb-1">Location Category</h4>
                <p className="mb-1">
                  {sentenceCase(calculatedLocation.locationCategory)}
                </p>
              </li>
              <li className="list-group-item d-flex flex-column w-100">
                <h4 className="mb-1">Degree of Search</h4>
                <p className="mb-0">
                  {sentenceCase(calculatedLocation.degreeOfSearch)}
                </p>
                <small className="text-muted">
                  (difficulty{" "}
                  {calculatedLocation.degreeOfSearchValue.difficulty})
                </small>
              </li>
              <li className="list-group-item d-flex flex-column w-100">
                <h4 className="mb-1">Location Level</h4>
                <p className="mb-1">{calculatedLevel}</p>
              </li>
            </ul>
            <h3>Items</h3>
            <div className="row">
              <div className="col">
                <table
                  id="resultsItems"
                  className="table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col">Minimum</th>
                      <th scope="col">Maximum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(adjustedItems).map((key) => {
                      const { min, max } = adjustedItems[key];

                      return (
                        <tr key={key}>
                          <td>{sentenceCase(key)}</td>
                          <td>{min}</td>
                          <td>{max}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                <pre className="d-flex align-items-center justify-content-center">
                  <code className="language-markdown">{itemsMarkdown}</code>
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
