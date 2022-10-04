import { IUser } from "types";
import { initialState } from "./Store.reducer";
import { StoreState } from "./store.types";

export type LoginRequest = {
  type: "loginRequest";
};

export type LoginSuccess = {
  type: "loginSuccess";
  payload: IUser;
};

export type LoginError = {
  type: "loginError";
  payload: string;
};

export type LogoutSuccess = {
  type: "logoutSuccess";
};

export type getSessionRequest = {
  type: "getSessionRequest";
};

export type getSessionError = {
  type: "getSessionError";
  payload: string;
};

export type getSessionSuccess = {
  type: "getSessionSuccess";
  payload: {
    user?: IUser;
    authenticated: boolean;
  };
};

export type AuthSliceActions =
  | getSessionSuccess
  | getSessionError
  | getSessionRequest
  | LoginRequest
  | LoginError
  | LoginSuccess
  | LogoutSuccess;

export const authSliceReducer = (
  state: StoreState,
  action: AuthSliceActions
): StoreState | undefined => {
  switch (action.type) {
    case "loginRequest":
    case "getSessionRequest": {
      return {
        ...state,
        user: {
          ...state.user,
          status: "loading",
          isLoggedIn: false,
        },
      };
    }

    case "loginSuccess": {
      return {
        ...state,
        user: {
          status: "success",
          data: action.payload,
          isLoggedIn: true,
        },
      };
    }

    case "getSessionSuccess": {
      return {
        ...state,
        user: {
          data: action.payload.user,
          isLoggedIn: action.payload.authenticated,
          status: "success",
        },
      };
    }
    case "getSessionError": {
      return {
        ...state,
        user: {
          data: undefined,
          isLoggedIn: false,
          status: "error",
          error: action.payload,
        },
      };
    }

    case "loginError": {
      return {
        ...state,
        user: {
          ...state.user,
          status: "error",
          error: action.payload,
          isLoggedIn: false,
        },
      };
    }

    case "logoutSuccess": {
      return {
        ...initialState,
        user: {
          ...initialState.user,
          status: "success",
        },
      };
    }
    default: {
      return undefined;
    }
  }
};
