const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_PUBLIC);
const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    // Transaction creation
    const stripeToken = req.fields.stripeToken;

    const response = await stripe.charges.create({
      amount: 2000,
      currency: "eur",
      description: "test",
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
