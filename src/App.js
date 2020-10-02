import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions'

// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import CheckoutPage from './pages/checkout/checkout.component';



import './App.css';


class App extends React.Component {

unsbscribeFromAuth =null;

componentDidMount(){
 const {checkUserSession} = this.props;
 checkUserSession();

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
}

componentWillUnmount(){
  this.unsbscribeFromAuth();
}
render(){
   return (
<div>
<Header />
<Switch>
    <Route exact path='/' component= {HomePage} />
    <Route  path='/shop' component= {ShopPage} />
    <Route exact path='/checkout' component= {CheckoutPage} />
    <Route exact path='/Signin' 
        render ={()=> this.props.currentUser? (<Redirect to='/'/>) : (<SignInUpPage/> )} />
</Switch>

</div>
  );
}
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray : selectCollectionsForPreview
})
const mapDispatchToProps = dispatch =>({
  checkUserSession : () => dispatch(checkUserSession())
})
export default connect (mapStateToProps,mapDispatchToProps)(App);
