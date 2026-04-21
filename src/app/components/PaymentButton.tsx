import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButton() {

  const payNow = async () => {
    try {

      const res = await axios.post(
        "https://www.thepridetime.com/api/payment/create-order",
        { amount: 500 }
      );

      const order = res.data.order;

      if (!order) {
        alert("Order creation failed");
        return;
      }


     const user = JSON.parse(localStorage.getItem("user") || "{}");
const userId = user.id;

      if (!userId) {
        alert("User not logged in. Please login again.");
        return;
      }


      const options = {
        key: "rzp_live_Se2cGxhX6qZJdY",
        amount: order.amount,
        currency: "INR",
        name: "The Pride Times",
        description: "Premium Subscription",
        order_id: order.id,

        handler: async function (response: any) {
          try {

            console.log("Payment Success Response:", response);

            const verifyRes = await axios.post(
              "https://www.thepridetime.com/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: userId,
                plan: "basic"
              }
            );

            console.log("Verify response:", verifyRes.data);

            if (verifyRes.data.success) {
              alert("Payment Successful!");
            } else {
              alert("Payment verification failed");
            }

          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#000000"
        }
      };
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