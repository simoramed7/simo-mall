import React, {useEffect,lazy,Suspense} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions'

// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import {GlobalStyle} from './global.style';

const HomePage = lazy( ()=> import('./pages/homepage/homepage.component') );
const ShopPage = lazy( ()=> import('./pages/shop/shop.component') );
const SignInUpPage = lazy( ()=> import('./pages/sign-in-up/sign-in-up.component') );
const CheckoutPage = lazy( ()=> import('./pages/checkout/checkout.component') );

const App = ({checkUserSession,currentUser}) => {
 useEffect(()=>{
  checkUserSession();
 }, [checkUserSession]);

//unsbscribeFromAuth =null;

//this.unsbscribeFromAuth = auth.onAuthStateChanged(async userAuth => { 
//  if(userAuth){
//    const userRef = await createUserProfileDocument(userAuth);

//    userRef.onSnapshot(snapShot =>{
//     setCurrentUser ({
//          id: snapShot.id,
//          ...snapShot.data()
//        })
      
//    });
    
//  }
//  else setCurrentUser( userAuth );
  // addCollectionAndDocuments('collections',collectionsArray.map( ({title,items}) => ({title,items}) ));
 
//  } )


//componentWillUnmount(){
//  this.unsbscribeFromAuth();
//}
   return (
<div>
<GlobalStyle />
<Header />
<Switch>
  <ErrorBoundary>
   <Suspense fallback={<Spinner />}>
     <Route exact path='/' component= {HomePage} />
    
    <Route  path='/shop' component= {ShopPage} />
    <Route exact path='/checkout' component= {CheckoutPage} />
    <Route exact path='/Signin' 
        render ={()=> currentUser? (<Redirect to='/'/>) : (<SignInUpPage/> )} />
    </Suspense>
    </ErrorBoundary>
</Switch>

</div>
  );

}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray : selectCollectionsForPreview
})
const mapDispatchToProps = dispatch =>({
  checkUserSession : () => dispatch(checkUserSession())
})
export default connect (mapStateToProps,mapDispatchToProps)(App);
