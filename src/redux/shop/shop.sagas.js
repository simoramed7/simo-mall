import {takeLatest,put, call} from 'redux-saga/effects';
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';
import {fetchCollctionsSuccess,fetchCollctionsFailure} from './shop.actions';

import shopActionType from './shop.types';

export function* fetchCollectionsAsync(){
    try{ 
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapShotToMap,snapshot);
    yield put(fetchCollctionsSuccess(collectionsMap))
} catch(error){
    yield put(fetchCollctionsFailure(error.message))
}
        // previous format while using thunk methode 
        //collectionRef.get().then(snapshot => {
         // const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
         //  dispatch( fetchCollctionsSuccess(collectionsMap) );
        // }).catch(error => dispatch( fetchCollctionsFailure(error.message) ));
}

export function* fetchCollectionsStart(){
    yield takeLatest(shopActionType.FETCH_COLLECTIONS_START,fetchCollectionsAsync)
}