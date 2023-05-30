import { createAction, props } from "@ngrx/store";
import { Appstate } from "./appstate";

export const setApiSatus = createAction(
  "[API] success or failure",
  props<{apiStatus: Appstate}>()
)
