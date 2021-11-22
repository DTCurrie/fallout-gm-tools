import useMount from "../../behaviors/use-mount";

import { useScavengingLocationCalculatorStateContext } from "./ScavengingLocationCalculatorStateProvider";

import useCalculatedLocation from "./use-calculated-location";

export default function ScavengingLocationCalculatorLocationForm() {
  const {
    scale,
    setScale,
    category,
    setCategory,
    degree,
    setDegree,
    setLocation,
    setItems,
    setReductions,
    setState,
  } = useScavengingLocationCalculatorStateContext();

  useMount(() => {
    if (!scale) {
      setScale("tiny");
    }
    if (!category) {
      setCategory("residential");
    }
    if (!degree) {
      setDegree("untouched");
    }
  });

  const calculateLocation = useCalculatedLocation(
    scale,
    category,
    degree,
    (results) => {
      setLocation(results);
      setItems(results.locationItems);
      setReductions(results.degreeOfSearchValue.itemMinimumReduction);
      setState("items");
    }
  );

  return (
    <>
      <h2>Location</h2>
      <p>
        Decide what type of location you want to create. This will determine how
        many of which items can be found when scavenging. Once you have
        calculated the location&apos;s attributes you can proceed to setting the
        item minimum and maximums.
      </p>
      <form className="d-flex flex-column" onSubmit={(e) => e.preventDefault()}>
        <label id="locationScaleLabel" htmlFor="scale" className="form-label">
          Location Scale
          <select
            id="scale"
            className="form-select"
            defaultValue={scale || undefined}
            onChange={(e) => setScale(e.target.value)}
            aria-label="Location Scale"
            aria-labelledby="locationScaleLabel"
          >
            <option value="tiny">Tiny (6 Items)</option>
            <option value="small">Small (12 Items)</option>
            <option value="average">Average (18 Items)</option>
            <option value="large">Large (24 Items)</option>
          </select>
        </label>
        <label
          id="locationCategoryLabel"
          htmlFor="category"
          className="form-label"
        >
          Location Category
          <select
            id="category"
            className="form-select"
            defaultValue={category || undefined}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Location Category"
            aria-labelledby="locationCategoryLabel"
            required
          >
            <option value="residential">Residential (homes and gardens)</option>
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
          htmlFor="degree"
          className="form-label"
          required
        >
          Degree of Search
          <select
            id="degree"
            className="form-select"
            defaultValue={degree || undefined}
            onChange={(e) => setDegree(e.target.value)}
            aria-label="Degree of Search"
            aria-labelledby="degreeOfSearchLabel"
          >
            <option value="untouched">Untouched</option>
            <option value="partlySearched">Partly Searched</option>
            <option value="mostlySearched">Mostly Searched</option>
            <option value="heavilySearched">Heavily Searched</option>
          </select>
        </label>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          aria-label="Calculate Location"
          onClick={calculateLocation}
        >
          Calculate Location
        </button>
      </form>
    </>
  );
}
