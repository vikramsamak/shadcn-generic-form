import { createContext, useReducer, useEffect } from "react";
import { z } from "zod";

// Define the types
interface PlaygroundState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formFields: any[]; // Will be defined more strictly later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: z.ZodObject<any>;
  layoutSettings: {
    layout: "flex" | "grid";
    columns?: number;
    gap?: number;
  };
}

type PlaygroundAction =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: "ADD_FIELD"; payload: any }
  | { type: "REMOVE_FIELD"; payload: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: "UPDATE_FIELD"; payload: any }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: "UPDATE_SCHEMA"; payload: z.ZodObject<any> }
  | { type: "UPDATE_LAYOUT"; payload: PlaygroundState["layoutSettings"] };

// Initial state
const initialState: PlaygroundState = {
  formFields: [],
  validationSchema: z.object({}),
  layoutSettings: {
    layout: "flex",
    columns: 2,
    gap: 4,
  },
};

// Reducer function
function playgroundReducer(
  state: PlaygroundState,
  action: PlaygroundAction
): PlaygroundState {
  switch (action.type) {
    case "ADD_FIELD":
      return { ...state, formFields: [...state.formFields, action.payload] };
    case "REMOVE_FIELD":
      return {
        ...state,
        formFields: state.formFields.filter((f) => f.name !== action.payload),
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        formFields: state.formFields.map((f) =>
          f.name === action.payload.name ? action.payload : f
        ),
      };
    case "UPDATE_SCHEMA":
      return { ...state, validationSchema: action.payload };
    case "UPDATE_LAYOUT":
      return { ...state, layoutSettings: action.payload };
    default:
      return state;
  }
}

// Context
// eslint-disable-next-line react-refresh/only-export-components
export const PlaygroundContext = createContext<
  | { state: PlaygroundState; dispatch: React.Dispatch<PlaygroundAction> }
  | undefined
>(undefined);

// Provider component
export function PlaygroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    playgroundReducer,
    initialState,
    (init) => {
      const storedState = localStorage.getItem("playgroundState");
      return storedState ? JSON.parse(storedState) : init;
    }
  );

  useEffect(() => {
    localStorage.setItem("playgroundState", JSON.stringify(state));
  }, [state]);

  return (
    <PlaygroundContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaygroundContext.Provider>
  );
}
