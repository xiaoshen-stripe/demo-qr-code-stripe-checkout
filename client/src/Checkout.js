// initialize Stripe 
// useEffect - >import
// fetch config
// Create stripe session 
// redirect the user to the session  

import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {

    useEffect(() => {
        const initiateCheckout = async () => {
            const { publishableKey } = await fetch('/config').then(res => res.json());
            const stripe = await loadStripe(publishableKey);

            const { id } = await fetch('/create-checkout-session', {
                method: 'POST'
            }).then(res => res.json());
            console.log("id is", id);
            const { error } = await stripe.redirectToCheckout({
                sessionId: id
            });

            if (error) {
                // do something!
            }
        }
        initiateCheckout();
    }, []);

    return (<p className="loading-msg">Loading...</p>);
}

export default Checkout;