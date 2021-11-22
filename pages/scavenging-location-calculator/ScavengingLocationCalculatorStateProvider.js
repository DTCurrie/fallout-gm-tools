import { createContext, useContext } from "react";
import useObjectStorage from "../../behaviors/use-object-storage";
import useStorage from "../../behaviors/use-storage";

const storageKeys = Object.freeze({
  state: "scavenging-location-calculator--state",
  scale: "scavenging-location-calculator--location-scale",
  category: "scavenging-location-calculator--location-category",
  degree: "scavenging-location-calculator--location-degree",
  location: "scavenging-location-calculator--calculated-location",
  items: "scavenging-location-calculator--adjusted-items",
  reductions: "scavenging-location-calculator--items-to-reduce",
  pcLevel: "scavenging-location-calculator--pc-levels",
  problem: "scavenging-location-calculator--has-problem",
  level: "scavenging-location-calculator--location-level",
  markdown: "scavenging-location-calculator--items-markdown",
});

function getInitialState(location, items, level) {
  if (!!location && items > 0) {
    return "items";
  }

  if (!!location && items === 0 && level === null) {
    return "level";
  }

  if (!!location && items === 0 && level !== null) {
    return "results";
  }

  return "location";
}

export const ScavengingLocationCalculatorStateContext = createContext({});

export const useScavengingLocationCalculatorStateContext = () =>
  useContext(ScavengingLocationCalculatorStateContext);

export default function ScavengingLocationCalculatorStateProvider({
  children,
}) {
  const [scale, setScale] = useStorage(storageKeys.scale);
  const [category, setCategory] = useStorage(storageKeys.category);
  const [degree, setDegree] = useStorage(storageKeys.degree);
  const [location, setLocation] = useObjectStorage(storageKeys.location);
  const [items, setItems] = useObjectStorage(storageKeys.items);
  const [reductions, setReductions] = useObjectStorage(storageKeys.reductions);
  const [pcLevel, setPcLevel] = useObjectStorage(storageKeys.pcLevel);
  const [problem, setProblem] = useObjectStorage(storageKeys.problem);
  const [level, setLevel] = useObjectStorage(storageKeys.level);
  const [markdown, setMarkdown] = useObjectStorage(storageKeys.markdown);

  const [state, setState] = useStorage(
    storageKeys.state,
    getInitialState(location, items, level)
  );

  const reset = () => {
    Object.keys(storageKeys).forEach((key) =>
      localStorage.removeItem(storageKeys[key])
    );

    setState("location");
  };

  return (
    <ScavengingLocationCalculatorStateContext.Provider
      value={{
        // scale
        scale,
        setScale,

        // category
        category,
        setCategory,

        // degree
        degree,
        setDegree,

        // location
        location,
        setLocation,

        // items
        items,
        setItems,

        // reductions
        reductions,
        setReductions,
        pcLevel,
        setPcLevel,
        problem,
        setProblem,
        level,
        setLevel,
        markdown,
        setMarkdown,
        state,
        setState,
        reset,
      }}
    >
      {children}
    </ScavengingLocationCalculatorStateContext.Provider>
  );
}
