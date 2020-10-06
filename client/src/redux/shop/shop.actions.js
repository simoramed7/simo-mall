import shopActionType from './shop.types';
import {firestore, convertCollectionsSnapShotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type : shopActionType.FETCH_COLLECTIONS_START
});

export const fetchCollctionsSuccess = collectionsMap => ({
    type : shopActionType.FETCH_COLLECTIONS_SUCCESS,
    payload : collectionsMap
});

export const fetchCollctionsFailure = errorMessage => ({
    type : shopActionType.FETCH_COLLECTIONS_FAILURE,
    payload : errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch( fetchCollectionsStart() );

        collectionRef.get().then(snapshot => {
          const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
           dispatch( fetchCollctionsSuccess(collectionsMap) );
         }).catch(error => dispatch( fetchCollctionsFailure(error.message) ));
    }
};