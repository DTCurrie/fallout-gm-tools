import { sentenceCase } from "sentence-case";

import { useScavengingLocationCalculatorStateContext } from "./ScavengingLocationCalculatorStateProvider";

export default function ScavengingLocationCalculatorItemsForm() {
  const { location, items, setItems, reductions, setReductions, setState } =
    useScavengingLocationCalculatorStateContext();

  const setMin = (key, value) => {
    const adjustedItems = items[key];
    const reduction = value < adjustedItems.min;

    adjustedItems.min = parseInt(value);
    setReductions(reduction ? reductions - 1 : reductions + 1);
    setItems({
      ...items,
      [key]: adjustedItems,
    });
  };

  const setMax = (key, value) => {
    const adjustedItems = items[key];
    const reduction = value < adjustedItems.max;

    adjustedItems.max = parseInt(value);
    setReductions(reduction ? reductions - 1 : reductions + 1);
    setItems({
      ...items,
      [key]: adjustedItems,
    });
  };

  if (!location) {
    return null;
  }

  return (
    <>
      <h2>Items</h2>
      <p>
        Reduce the items available when scavenging based on the locations
        statistics. Minimums will be reduced to a minimums of zero before
        maximums are reduced. Once there are no more items to reduce, you can
        proceed to calculating the location level.
      </p>

      <p>
        <strong>ITEMS TO REDUCE: {reductions}</strong>
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
          {Object.keys(items || []).map((key) => {
            const { min, max, potentialMax } = items[key];

            return (
              <tr key={key}>
                <td>{sentenceCase(key)}</td>
                <td>
                  <label
                    htmlFor={`${key}MinRange`}
                    className="form-label text-center"
                  >
                    <span className="visually-hidden">{key} minimum: </span>
                    {min}
                    <input
                      id={`${key}MinRange`}
                      type="range"
                      className="form-range"
                      disabled={reductions === 0 && min === max}
                      min="0"
                      max={max}
                      value={min}
                      onChange={(e) => setMin(key, e.target.value)}
                    />
                  </label>
                </td>
                <td>
                  <label
                    htmlFor={`${key}MaxRange`}
                    className="form-label text-center"
                  >
                    <span className="visually-hidden">{key} maximum: </span>
                    {max}
                    <input
                      id={`${key}MaxRange`}
                      type="range"
                      className="form-range"
                      disabled={
                        (reductions === 0 && max === potentialMax) || min > 0
                      }
                      min="0"
                      max={potentialMax}
                      value={max}
                      onChange={(e) => setMax(key, e.target.value)}
                    />
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={reductions > 0}
        onClick={() => setState("level")}
      >
        Calculate Level
      </button>
    </>
  );
}
