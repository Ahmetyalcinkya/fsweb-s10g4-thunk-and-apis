import { toast } from "react-toastify";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

import { Toast } from "react-toastify/dist/components";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const oldFav = state.favs.find((item) => item.id == action.payload.id);
      if (oldFav) {
        toast.warn("This joke has already been added to your favorites.");
        return state;
      } else {
        toast.success("The joke added to favorites.");
        const addFavState = {
          ...state,
          favs: [...state.favs, action.payload],
        };
        writeFavsToLocalStorage(addFavState);
        return addFavState;
      }

    case FAV_REMOVE:
      const removedFavState = {
        ...state,
        favs: state.favs.filter((item) => item.id !== action.payload),
      };
      writeFavsToLocalStorage(removedFavState);
      toast.success("The joke successfully removed from your favorite list.");
      return removedFavState;

    case FETCH_SUCCESS:
      toast.info("New joke is loading.");
      return {
        ...state,
        current: action.payload,
        error: null,
        loading: false,
      };

    case FETCH_LOADING:
      return {
        ...state,
        current: null,
        error: null,
        loading: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        current: null,
        error: action.payload,
        loading: false,
      };
    case GET_FAVS_FROM_LS:
      const favFromLS = readFavsFromLocalStorage();
      // return {
      //   ...state,
      //   favs: favFromLS ? favFromLS : [],
      // };
      toast.success("Wohoooo!!!");
      return {
        ...state,
        favs: favFromLS ?? [],
      };
    default:
      return state;
  }
}
