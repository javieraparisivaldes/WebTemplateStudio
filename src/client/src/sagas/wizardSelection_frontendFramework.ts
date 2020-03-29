import {put, call, takeEvery} from "redux-saga/effects";
import { WIZARD_SELECTION_TYPEKEYS } from "../actions/wizardSelectionActions/typeKeys";

export default function* callActionSetFrontEndFramework() {
    yield takeEvery(
      WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK,
      watchNewFrontEndFramework
    );
  }

function watchNewFrontEndFramework() {
    console.log(111111111111111111111)
}