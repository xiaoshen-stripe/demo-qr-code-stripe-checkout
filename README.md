# Stripe Developer Office Hours - Checkout with QR code

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=I27HwkL1_Vs)

[Deployed demo app](https://qr-code-checkout.stripedemos.com/)
## Requirements
* Node + Express backend 
* React frontend
* [Create a Stripe account](https://dashboard.stripe.com/register)
* [API keys for your account](https://stripe.com/docs/keys)
* [Accept payments with Stripe Checkout](https://stripe.com/docs/payments/accept-a-payment?integration=checkout)
## How to run Server
This project uses [Express web framework for Node.js](https://expressjs.com/) as its server. Here's how to run it after cloning.


1. Create and populate a `.env` file. There's a sample .env file in `server/`. Paste in the API keys for your account and 3 price IDs. 

2. Install dependencies, and start up the backend server.

```
cd server/
npm install
npm start
```

## How to run Client
This project uses [React](https://reactjs.org/) as its client. Here's how to run it after cloning.

1. [Customize the look and feel of Checkout in the Stripe Dashboard] by going to Brand Settings(https://stripe.com/docs/payments/checkout/customization#branding).

2. [Create 3 products and prices using the Stripe Dashboard](https://support.stripe.com/questions/how-to-create-products-and-prices).

3. Install dependencies, and start up the React client.

```
cd client/
npm install
npm start
```

5. Go in your browser `http://localhost:3000` to see the demo

![A gif of contactless payment using QR code](./qr-code-checkout.gif)

### Note
If you would like to try this out end-to-end using your own phone, you would need to either 1) deploy this app (e.g. using Heroku) so it has an publically accessible url, and update this info in the .env file. Or 2) use tools such as [ngrok](https://ngrok.com/).
## More resources
* [Node.js Express Starter](https://www.youtube.com/watch?v=7Ul1vfmsDck)
* [Getting started with React Stripe.js](https://youtu.be/5y5WwF9s-ZI)
* [Official Accept a payment guide](https://stripe.com/docs/payments/accept-a-payment)
