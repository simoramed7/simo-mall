import React from 'react';
import SHOPE_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview';

class ShopPage extends React.Component {
constructor(props){
super(props);

this.state ={

    collections:SHOPE_DATA
}
}

render(){
    const {collections} = this.state;
 return (
    <div>
    {collections.map(({id,...otherCollectionsProps}) =>
      <CollectionPreview key={id} {...otherCollectionsProps} />  
        )}
    </div>
 )
}
}
export default ShopPage;