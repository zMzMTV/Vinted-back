const express = require("express");
const stripe = require("stripe")(
  "sk_test_51HoUxZLK2GtskZhI0rQVHmA2Ph3CIqire6HOgbSsCRmnQaStufEpLG1q6Sg9KPfmaATEZDTJ4Kxuy99ZrLs8gJUa002l3Q8Uvf"
);
const router = express.Router();

router.post("/payment", async (req, res) => {
  const stripeToken = req.fields.stripeToken;

  // Transaction creation
  const reponse = await stripe.charges.create({
    amount: req.fields.product_price * 100,
    currency: "eur",
    description: req.fields.description,

    // Send token
    source: stripeToken,
  });

  res.json(response);
});

module.exports = router;
