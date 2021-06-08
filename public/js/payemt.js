//   fetch('https://raz-pay.herokuapp.com/checkout', options).then(r => {

const paymentBtnHTML = document.querySelector("#paymentBtn");
let RAZ_ORDER_ID;
const createOrderId = (e) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(checkoutReqData),
  };

  fetch("http://localhost:5000/", options)
    .then((r) => {
      // console.log(r);
      console.log(r);
      return r.json();
    })
    .then((mainData) => {
      console.log(mainData);
      RAZ_ORDER_ID = mainData;
      alert(RAZ_ORDER_ID);
      // document.querySelector('#rzp-button1').disabled = false;
      // alert(RAZ_ORDER_ID);

      exePayment();
    });
  // .catch((error) => {
  //   console.log(error);
  // });
};

const exePayment = () => {
  options = {
    key: "rzp_test_XbcIyq0AEbgvAW",
    amount: "100",
    currency: "INR",
    name: "Yearly Pass",
    description: "HAPPY Tickiting",
    // image: "./../",
    order_id: RAZ_ORDER_ID,
    handler: function (response) {
      //   RES = response;
      // alert('razorpay_signature', response.razorpay_signature);
      orderComplete(response);
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
    },
    prefill: {
      name: "razName",
      email: "razEmail",
      contact: `91${"razPhone"}`,
    },
    notes: {
      address: "ABCD",
    },
    theme: {
      color: "#f00",
    },
  };

  // console.log(options);
  rzp1 = new Razorpay(options);
  rzp1.open();
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    // console.log(response);
    // console.log(response.error);
  });
};

const orderComplete = (data) => {
  console.log(data);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_signature: data.razorpay_signature,
    }),
  };

  fetch("http://localhost:5000/payment", options)
    .then((r) => {
      console.log(r);
      return r.json();
    })
    .then((mainData) => {
      console.log(mainData);
      if (mainData === "success") {
        // alert(true);
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            to: "7619190486",
            from: "Bhagat Singh",
            text: "Hello, your paymnet is due",
          }),
        };
        fetch("http://localhost:5000/message", options)
          .then((r) => {
            console.log(r);
            return r.json();
          })
          .then((mainData) => {
           alert(mainData);
          });
      } else {
        alert(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

paymentBtnHTML.addEventListener("click", createOrderId);
