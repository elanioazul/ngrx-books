import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./appstate";

export const AppSelector = createFeatureSelector<Appstate>('myappstate')
