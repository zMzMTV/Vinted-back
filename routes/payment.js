const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_PUBLIC);
const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    // Transaction creation
    const stripeToken = req.fields.stripeToken;

    const response = await stripe.charges.create({
      amount: req.fields.amount * 100,
      currency: "eur",
      description: req.fields.title,
      // Send token
      source: stripeToken,
    });
    console.log(response);

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
