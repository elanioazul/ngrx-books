import { createReducer, on } from "@ngrx/store";
import { Appstate } from "./appstate";
import { setApiSatus } from "./app.action";

export const initialState: Appstate = {
  apiStatus: '',
  apiResponseMessage: ''
}
export const appReducer = createReducer(
  initialState,
  on(setApiSatus, (state, {apiStatus}) => {
    return apiStatus
  })
)
