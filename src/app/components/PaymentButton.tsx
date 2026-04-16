import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButton() {

  const payNow = async () => {
    try {

      // 1. CREATE ORDER (LIVE BACKEND)
      const res = await axios.post(
        "https://thepridetime.onrender.com/api/payment/create-order",
        {
          amount: 500 // ₹500
        }
      );

      const order = res.data.order;

      // 2. RAZORPAY OPTIONS
      const options = {
        key: "rzp_live_Se2cGxhX6qZJdY", // YOUR LIVE KEY ID
        amount: order.amount,
        currency: "INR",
        name: "The Pride Times",
        description: "Premium Subscription",
        order_id: order.id,

        handler: async function (response: any) {
          try {

            // 3. VERIFY PAYMENT
            const verifyRes = await axios.post(
              "https://thepridetime.onrender.com/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: localStorage.getItem("userId"), // make sure you store this
                plan: "basic"
              }
            );

            alert("Payment Successful!");
            console.log("Verified:", verifyRes.data);

          } catch (err) {
            console.error("Verification failed", err);
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#000000"
        }
      };

      // 4. OPEN RAZORPAY POPUP
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed to start");
    }
  };

  return (
    <button
      onClick={payNow}
      style={{
        padding: "10px 20px",
        background: "black",
        color: "white",
        borderRadius: "6px"
      }}
    >
      Pay Now
    </button>
  );
}