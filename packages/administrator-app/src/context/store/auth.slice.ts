import { IAuthWithoutSensitiveData } from "types";
import { initialState } from "./Store.reducer";
import { StoreState } from "./store.types";

export type LoginRequest = {
  type: "loginRequest";
};

export type LoginSuccess = {
  type: "loginSuccess";
  payload: IAuthWithoutSensitiveData;
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
    auth?: IAuthWithoutSensitiveData;
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
        auth: {
          ...state.auth,
          status: "loading",
          isLoggedIn: false,
        },
      };
    }

    case "loginSuccess": {
      return {
        ...state,
        auth: {
          status: "success",
          data: action.payload,
          isLoggedIn: true,
        },
      };
    }

    case "getSessionSuccess": {
      return {
        ...state,
        auth: {
          data: action.payload.auth,
          isLoggedIn: action.payload.authenticated,
          status: "success",
        },
      };
    }
    case "getSessionError": {
      return {
        ...state,
        auth: {
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
        auth: {
          ...state.auth,
          status: "error",
          error: action.payload,
          isLoggedIn: false,
        },
      };
    }

    case "logoutSuccess": {
      return {
        ...initialState,
        auth: {
          ...initialState.auth,
          status: "success",
        },
      };
    }
    default: {
      return undefined;
    }
  }
};
