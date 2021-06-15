require('dotenv').config();
const express = require('express');
const app = express();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.static('.'));
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

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
  res.json(products.data);
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.post('/create-checkout-session', async (req, res) => {
  const domain = process.env.DOMAIN;
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
    mode: 'payment',
  })
  res.json({ id: session.id });
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})