import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price *100;
    const publishableKey = 'pk_test_51H2VMDCdHrhAqwa8t8KhR2Pbzsat1T850ps6asPfWJYcvvpwuFDNXiau5pAV6nQWl8ggcVIeRE93GPsvcfMfU9kK00gSTuCs2w'
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
              amount: priceForStripe,
              token: token
            }
          })
            .then(response => {
              alert('succesful payment');
            })
            .catch(error => {
              console.log('Payment Error: ', error);
              alert(
                'There was an issue with your payment! Please make sure you use the provided debit card.'
              );
            });
        };

    return(
    <StripeCheckout 
    label ='Pay Now'
    name ='Simo Mall s.a.r.l'
    billingAddress
    shippingAddress
    image='http://svgshare.com/i/CUz.svg'
    description={`Your Total is ${price}`}
    amount = {priceForStripe}
    panelLabel = 'Pay Now'
    token = {onToken}
    stripeKey = {publishableKey}
    />
);
};

export default StripeCheckoutButton;