import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";
import useObjectStorage from "../../behaviors/use-object-storage";
import useStorage from "../../behaviors/use-storage";

const storageKeys = Object.freeze({
  players: "encounter-tracker--players",
  actors: "encounter-tracker--actors",
  currentCategory: "encounter-tracker--current-category",
  currentInitiative: "encounter-tracker--current-initiative",
});

export const EncounterTrackerStateContext = createContext({});

export const useEncounterTrackerStateContext = () =>
  useContext(EncounterTrackerStateContext);

function usePlayers() {
  const [players, setPlayers] = useObjectStorage(storageKeys.players, []);

  const getPlayer = (id) => {
    const index = players.findIndex(({ id: playerId }) => playerId === id);
    return { index, ...players[index] };
  };

  const createPlayer = ({ name, initiative }) =>
    setPlayers([
      ...players,
      {
        id: nanoid(),
        name,
        initiative,
      },
    ]);

  const editPlayer = (id, { name, initiative }) => {
    const updatedPlayers = [...players];
    const { index } = getPlayer(id);

    updatedPlayers[index] = { id, name, initiative };
    setPlayers(updatedPlayers);
  };

  const removePlayer = (id) => {
    const updatedPlayers = [...players];
    const { index } = getPlayer(id);

    updatedPlayers.splice(index, 1);

    setPlayers(updatedPlayers);
  };

  const resetPlayers = () => setPlayers([]);

  return {
    players,
    getPlayer,
    createPlayer,
    editPlayer,
    removePlayer,
    resetPlayers,
  };
}

function useActors() {
  const [actors, setActors] = useObjectStorage(storageKeys.actors, []);

  const getActor = (id) => {
    const index = actors.findIndex(({ id: actorId }) => actorId === id);
    return { index, ...actors[index] };
  };

  const addActor = (actor) =>
    setActors([...actors, { id: nanoid(), ...actor }]);

  const editActor = (id, props) => {
    const updatedActors = [...actors];
    const { index, ...attrs } = getActor(id);

    updatedActors[index] = { ...attrs, ...props, id };
    setActors(updatedActors);
  };

  const removeActor = (id) => {
    const updatedActors = [...actors];
    const actorIndex = updatedActors.findIndex(
      ({ id: playerId }) => playerId === id
    );

    updatedActors.splice(actorIndex, 1);

    setActors(updatedActors);
  };

  const resetActors = () => setActors([]);

  return {
    actors,
    getActor,
    addActor,
    editActor,
    removeActor,
    resetActors,
  };
}

export default function EncounterTrackerStateProvider({ children }) {
  const playersState = usePlayers();
  const actorsState = useActors();

  const [currentCategory, setCurrentCategory] = useStorage(
    storageKeys.currentCategory
  );

  const [currentInitiative, setCurrentInitiative] = useStorage(
    storageKeys.currentInitiative,
    actorsState.actors[0]?.id
  );

  const editPlayer = (id, { name, initiative }) => {
    const { index } = actorsState.getActor(id);

    if (index) {
      editActor(index, { name, initiative });
    }

    editPlayer(id, { name, initiative });
  };

  const reset = () => {
    Object.keys(storageKeys).forEach((key) =>
      localStorage.removeItem(storageKeys[key])
    );
  };

  return (
    <EncounterTrackerStateContext.Provider
      value={{
        ...playersState,
        editPlayer,

        ...actorsState,

        currentCategory,
        setCurrentCategory,

        currentInitiative,
        setCurrentInitiative,

        reset,
      }}
    >
      {children}
    </EncounterTrackerStateContext.Provider>
  );
}
