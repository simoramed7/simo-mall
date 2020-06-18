import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';


class App extends React.Component {
  constructor(){
super();
this.state = {
  currentUser:''
}
}
unsbscribeFromAuth =null;

componentDidMount(){
this.unsbscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{ 
  if(userAuth){
    const userRef = await createUserProfileDocument(userAuth);

    userRef.onSnapshot(snapShot =>{
      this.setState({
        currentUser: {
          id: snapShot.id,
          ...snapShot.data()
        }
      });
    });
    
  }
  else this.setState({currentUser: userAuth});
 
  } )
}

componentWillUnmount(){
  this.unsbscribeFromAuth();
}
render(){
   return (
<div>
<Header currentUser={this.state.currentUser} />
<Switch>
    <Route exact path='/' component= {HomePage} />
    <Route exact path='/shop' component= {ShopPage} />
    <Route exact path='/Signin' component= {SignInUpPage} />
</Switch>

</div>
  );
}
}

export default App;
