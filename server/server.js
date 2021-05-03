// 1. setup dotenv, and set up env file
require('dotenv').config();
// 2. setup Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const express = require('express')
const app = express()
// 3. setup middleware to handle incoming request objects as JSON https://stackoverflow.com/a/51844327
// don't need since we are not passing in json request for POST calls
// app.use(express.json())
const port = 4242

app.get('/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  })
})
app.get('/get-checkout-session', async (req, res) => {
  const { id: sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(
    sessionId, {
    expand: ['payment_intent'],
  }
  )
  res.json(session);
})

app.get('/get-products', async (req, res) => {
  const products = await stripe.products.list({
    limit: 3,
  })
  res.json(products);
})

app.post('/create-checkout-session', async (req, res) => {
  // const {line_items} = req.body;
  const domain = process.env.DOMAIN;
  // install the stripe vscode extension
  const adjustableQuantitySetting = {
    enabled: true,
    minimum: 0,
    maximum: 5
  }

  const priceList = [process.env.PRICE1, process.env.PRICE2, process.env.PRICE3];

  // https://stripe.com/docs/payments/checkout/custom-success-page
  const session = await stripe.checkout.sessions.create({
    success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/cancel`,
    payment_method_types: ['card'],
    line_items: priceList.map(priceId => ({ price: priceId, quantity: 1, adjustable_quantity: adjustableQuantitySetting })),
    // [
    //   { price: process.env.PRICE1, quantity: 1, adjustable_quantity: adjustable_quantity_setting },
    //   { price: process.env.PRICE2, quantity: 1, adjustable_quantity: adjustable_quantity_setting },
    //   { price: process.env.PRICE3, quantity: 1, adjustable_quantity: adjustable_quantity_setting },
    // ],
    mode: 'payment',
  })
  res.json({ id: session.id });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})