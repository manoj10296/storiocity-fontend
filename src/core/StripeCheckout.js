import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { cartEmpty } from "./helper/CartHelper"

export default function StripeCheckout({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { user, token } = isAuthenticated();

  const makePayment = (token) => {
    const body = { token, products };
    return fetch(`${API}payment/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        cartEmpty();
      })
      .catch((err) => console.log(err));
  };

  const public_key = process.env.PUB_KEY;

  const showPaymentButtons = () => {
    return user ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51HE6MhGBtrCAqmjhKvgnb9PHeBB7xr5IKWVjof9BtB1zwaiqDNIn6rsZiTrxZViZMZL16yOPtXh0uEn9BXF5qu4Y00RWI5c8gl"
        token={makePayment}
        amount={getFinalPrice() * 100}
        shippingAddress
        billingAddress
        name="Buy T-Shirts"
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Login First</button>
      </Link>
    );
  };

  //function to calculate the final price and show it in checkout
  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return <div>{showPaymentButtons()}</div>;
}
