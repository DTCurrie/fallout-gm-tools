import { useEffect, useState } from "react";

import { useScavengingLocationCalculatorStateContext } from "./ScavengingLocationCalculatorStateProvider";

export default function ScavengingLocationCalculatorNavigation() {
  const {
    location,
    items,
    level,
    state: currentState,
    setState,
    reset,
  } = useScavengingLocationCalculatorStateContext();

  const ResetButton = ({ className }) => (
    <button
      type="button"
      className={`btn btn-link text-danger ${className}`}
      onClick={() => reset()}
    >
      RESET
    </button>
  );

  const DropdownItem = ({ state, disabled }) => {
    const active = state === currentState;

    const props = {
      className: "dropdown-item",
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        if (active || disabled) return;
        setState(state);
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
      <li>
        <a {...props}>{state.toUpperCase()}</a>
      </li>
    );
  };

  const Tab = ({ state, disabled }) => {
    const active = state === currentState;

    const props = {
      className: "nav-link d-none d-lg-block",
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        if (active || disabled) return;
        setState(state);
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

  const [itemsDisabled, setItemsDisabled] = useState(location === null);

  useEffect(() => {
    setItemsDisabled(location === null);
  }, [location]);

  const [levelDisabled, setLevelDisabled] = useState(
    itemsDisabled || items > 0
  );

  useEffect(() => {
    setLevelDisabled(itemsDisabled || items > 0);
  }, [items, itemsDisabled]);

  const [resultsDisabled, setResultsDisabled] = useState(
    itemsDisabled || levelDisabled || level === null
  );

  useEffect(() => {
    setResultsDisabled(itemsDisabled || levelDisabled || level === null);
  }, [itemsDisabled, level, levelDisabled]);

  return (
    <ul className="nav nav-tabs w-100 me--3 flex-xs-column flex-sm-column flex-md-column flex-lg-row">
      <li className="nav-item dropdown d-lg-none">
        <a
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-expanded="false"
        >
          STEPS
        </a>
        <ul className="dropdown-menu">
          <DropdownItem state="location" />
          <DropdownItem state="items" disabled={itemsDisabled} />
          <DropdownItem state="level" disabled={levelDisabled} />
          <DropdownItem state="results" disabled={resultsDisabled} />

          <li>
            <ResetButton className="dropdown-item" />
          </li>
        </ul>
      </li>

      <Tab state="location" />
      <Tab state="items" disabled={itemsDisabled} />
      <Tab state="level" disabled={levelDisabled} />
      <Tab state="results" disabled={resultsDisabled} />

      <li className="nav-item ms-auto">
        <ResetButton className="nav-link d-none d-lg-block"></ResetButton>
      </li>
    </ul>
  );
}
