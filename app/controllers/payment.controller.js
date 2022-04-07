const db = require("../models");
const PaymentSubscription = db.PaymentSubscription;
const Pricing = db.Pricing;
const axios = require("axios");
const config = require("../config/paypal.config");
const User = db.User;
var access_token = "";
async function myFunction2() {
  await axios
    .post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      {},
      {
        auth: {
          username: config.PAYPAL_CLIENTID,
          password: config.PAYPAL_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        params: {
          grant_type: "client_credentials",
        },
      }
    )
    .then((response) => {
      access_token = "";
      access_token = response.data.access_token;
      console.log(access_token);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

exports.createSubscription = async (req, res) => {
  try {
    if (!req.body.user_id) {
      return res.status(400).send({
        message: "User Id cannot be empty.",
      });
    }
    if (!req.body.package_id) {
      return res.status(400).send({
        message: "Please select valid package.",
      });
    } else {
      const package = await Pricing.findOne({ _id: req.body.package_id });

      if (package) {
        req.body.status = "Pending";
        if (req.body.subscription_id) {
          req.body.status = "Active";
        }
        const payment_subscription = new PaymentSubscription({
          payment_method: req.body.payment_method,
          package_id: req.body.package_id,
          user_id: req.body.user_id,
          order_id: req.order_id,
          plan_id: req.plan_id,
          status: req.body.status,
          subscription_id: req.body.subscription_id,
          amount:package.price,
          year:new Date().getFullYear(),
          data: JSON.stringify(req.body.data),
        });

        payment_subscription
          .save()
          .then((data) => {
            User.findByIdAndUpdate(req.body.user_id, {
              subscription_id: req.body.subscription_id,
            }).then((res) => {
              console.log("Update subscription id in User");
            });

            res.send({
              success: true,
              message: "Your Payment is " + req.body.status,
              data: data,
            });
          })
          .catch((err) => {
            console.log("error" + err);
            return res.status(500).send(err);
          });
      } else {
        return res.status(400).send({
          message:
            "Something is wrong with package. Please contact to admin support.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error,
    });
  }
};

exports.getAllPayments = async (req, res) => {
  await PaymentSubscription.find()
    .sort({ date: -1 })
    .populate("user_id")
    .populate("package_id")
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      return res.status(200).send({
        success: true,
        data: data,
      });
    });
};

exports.getSinglePaymentDetails = async (req, res) => {
  await myFunction2();

  const config = {
    method: "get",
    url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${req.params.id}`,
    headers: {
      accept: "application/json",
      "accept-language": "en_US",
      "content-type": "application/json; charset=utf8",
      Authorization: "Bearer " + access_token,
    },
  };

  await axios(config)
    .then((response) => {
      res.send({
        success: true,
        data: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.send({
        success: false,
        message: error,
      });
    });
};

exports.getAllPaymentDetails = async (req, res) => {
  await myFunction2();

  const config = {
    method: "get",
    url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${req.query.subscription_id}/transactions?start_time=${req.query.start_time}&end_time=${req.query.end_time}`,
    headers: {
      accept: "application/json",
      "accept-language": "en_US",
      "content-type": "application/json; charset=utf8",
      Authorization: "Bearer " + access_token,
    },
  };

  await axios(config)
    .then((response) => {
      res.send({
        success: true,
        data: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.send({
        success: false,
        message: error,
      });
    });
};

exports.cancelSubscription = async (req, res) => {
  console.log(req.body.subscription_id);
  if (!req.body.subscription_id) {
    res.status(400).send({
      success: false,
      message: "please enter subscription ID",
    });
  }
  await myFunction2();
  await axios
    .post(
      "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/" +
        req.body.subscription_id +
        "/cancel",
      {},
      {
        headers: {
          "content-type": "application/json; charset=utf8",
          Authorization: "Bearer " + access_token,
        },
      }
    )
    .then((response) => {
      User.findByIdAndUpdate(req.userId, {
        subscription_id: "",
      }).then((res) => {
        console.log("Update subscription id in User");
        PaymentSubscription.findOne({
          subscription_id: req.body.subscription_id,
        }).then((payment) => {
          PaymentSubscription.findByIdAndUpdate(payment._id, {
            status: "Cancelled",
          }).then((res) => {
            console.log("Your subscription is cancelled");
          });
        });
      });
      res.status(200).send({
        success: false,
        message: "Your subscription is cancelled",
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error,
      });
    });
};

exports.suspendSubscription = async (req, res) => {
  console.log(req.body.subscription_id);
  if (!req.params.id) {
    res.status(400).send({
      success: false,
      message: "please enter subscription ID",
    });
  }
  await myFunction2();
  var body = {
    reason: "Customer-requested pause",
  };
  await axios
    .post(
      "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/" +
        req.params.id +
        "/suspend",
      JSON.stringify(body),
      {
        headers: {
          "content-type": "application/json; charset=utf8",
          Authorization: "Bearer " + access_token,
        },
      }
    )
    .then((response) => {
      PaymentSubscription.findOne({ subscription_id: req.params.id }).then(
        (payment) => {
          PaymentSubscription.findByIdAndUpdate(payment._id, {
            status: "Suspend",
          }).then((res) => {
            console.log("Your subscription is suspend");
          });
        }
      );
      res.status(200).send({
        success: false,
        message: "Your subscription is suspend",
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error,
      });
    });
};

exports.activateSubscription = async (req, res) => {
  console.log(req.body.subscription_id);
  if (!req.params.id) {
    res.status(400).send({
      success: false,
      message: "please enter subscription ID",
    });
  }
  await myFunction2();
  var body = {
    reason: "Reactivating on customer request",
  };
  await axios
    .post(
      "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/" +
        req.params.id +
        "/activate",
      JSON.stringify(body),
      {
        headers: {
          "content-type": "application/json; charset=utf8",
          Authorization: "Bearer " + access_token,
        },
      }
    )
    .then((response) => {
      PaymentSubscription.findOne({ subscription_id: req.params.id }).then(
        (payment) => {
          PaymentSubscription.findByIdAndUpdate(payment._id, {
            status: "Activate",
          }).then((res) => {
            console.log("Your subscription has been activated");
          });
        }
      );
      res.status(200).send({
        success: false,
        message: "Your subscription has been activated",
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error,
      });
    });
};
