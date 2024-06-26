import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { TAB_PROPERTIES } from "src/utils/chrome";

const FiltersContext = createContext<TAB_PROPERTIES[]>([]);
const FiltersDispatchContext = createContext<Dispatch<ActionType>>(() => {});

type ActionType = {
  filters: TAB_PROPERTIES[];
  type: "update" | "reset";
};
function filtersReducer(_filters: TAB_PROPERTIES[], action: ActionType): TAB_PROPERTIES[] {
  switch (action.type) {
    case "update": {
      return action.filters;
    }
    case "reset": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function FiltersProvider({ children }: PropsWithChildren) {
  const [filters, dispatch] = useReducer(filtersReducer, []);

  return (
    <FiltersContext.Provider value={filters}>
      <FiltersDispatchContext.Provider value={dispatch}>{children}</FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  return useContext(FiltersContext);
}

export function useFiltersDispatch() {
  return useContext(FiltersDispatchContext);
}
