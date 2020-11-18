const express = require("express");
const stripe = require("stripe")(
  "sk_test_51HoUxZLK2GtskZhI0rQVHmA2Ph3CIqire6HOgbSsCRmnQaStufEpLG1q6Sg9KPfmaATEZDTJ4Kxuy99ZrLs8gJUa002l3Q8Uvf"
);
const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    // Transaction creation
    const stripeToken = req.fields.stripeToken;

    console.log(req.fields);

    const response = await stripe.charges.create({
      amount: Number(req.fields.amount) * 100,
      currency: "eur",
      description: req.fields.title,
      // Send token
      source: stripeToken,
    });

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
