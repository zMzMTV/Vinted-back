const express = require("express");
const stripe = require("stripe")(
  "sk_test_51HoUxZLK2GtskZhI0rQVHmA2Ph3CIqire6HOgbSsCRmnQaStufEpLG1q6Sg9KPfmaATEZDTJ4Kxuy99ZrLs8gJUa002l3Q8Uvf"
);
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
