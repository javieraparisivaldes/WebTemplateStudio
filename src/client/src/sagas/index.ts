import {all} from "redux-saga/effects";
import callActionSetFrontEndFramework from "./wizardSelection_frontendFramework";

function* rootSaga(){
    yield all([callActionSetFrontEndFramework()])
} 

export default rootSaga;