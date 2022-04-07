var axios = require("axios");
const db = require("../models");
const config = require('../config/paypal.config');

const Pricing = db.Pricing;
var access_token = "";
async function myFunction2() {
  await axios
    .post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      {},
      {
        auth: {
          username:
            config.PAYPAL_CLIENTID,
          password:
          config.PAYPAL_SECRET,
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

exports.createPackage = async (req, res) => {
  await myFunction2();
  const plansData = {
    product_id: "PROD-7BD39280HL037172V",
    name: req.body.title,
    description: req.body.title,
    billing_cycles: [
      {
        frequency: {
          interval_unit: "MONTH",
          interval_count: req.body.month,
        },
        tenure_type: "REGULAR",
        sequence: 1,
        total_cycles: 12,
        pricing_scheme: {
          fixed_price: {
            value: req.body.price,
            currency_code: "AUD",
          },
        },
      },
    ],
    payment_preferences: {
      service_type: "PREPAID",
      auto_bill_outstanding: true,
      setup_fee: {
        value: 0,
        currency_code: "AUD",
      },
      setup_fee_failure_action: "CONTINUE",
      payment_failure_threshold: 1,
    },
    quantity_supported: true,
    taxes: {
      percentage: "0",
      inclusive: false,
    },
  };
  await axios
    .post(
      "https://api.sandbox.paypal.com/v1/billing/plans",
      JSON.stringify(plansData),
      {
        headers: {
          accept: "application/json",
          "accept-language": "en_US",
          "content-type": "application/json; charset=utf8",
          Authorization: "Bearer " + access_token,
        },
      }
    )
    .then((response) => {
      const pricing = new Pricing({
        title: req.body.title,
        isactive: req.body.isactive,
        description: req.body.description,
        price: req.body.price,
        month: req.body.month,
        plan_id: response.data.id,
        plan_type:req.body.plan_type
      });
      pricing
        .save()
        .then((data) => {
          res.send({
            success: true,
            message: "Package added successfully",
            data: data,
          });
        })
        .catch((err) => {
          console.log("error" + err);
          res.status(500).send({
            success: false,
            message: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error,
      });
    });
};

exports.updatePackage = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Pricing can not be empty",
    });
  } else {
    let existingPackage = await Pricing.findOne({ _id: req.params.id });

    await myFunction2();
    let updatePlanArray = [
      {
        op: "replace",
        path: "/description",
        value: req.body.title,
      },
      {
        op: "replace",
        path: "/name",
        value: req.body.title,
      },
    ];

    await axios
      .patch(
        "https://api-m.sandbox.paypal.com/v1/billing/plans/" +
          existingPackage.plan_id +
          "",
        JSON.stringify(updatePlanArray),
        {
          headers: {
            accept: "application/json",
            "accept-language": "en_US",
            "content-type": "application/json; charset=utf8",
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then((response) => {
        if (existingPackage.price != req.body.price) {
          let pricingScheme = {
            pricing_schemes: [
              {
                billing_cycle_sequence: 1,
                pricing_scheme: {
                  fixed_price: {
                    value: req.body.price,
                    currency_code: "AUD",
                  },
                },
              },
            ],
          };
          axios
            .post(
              "https://api-m.sandbox.paypal.com/v1/billing/plans/" +
                existingPackage.plan_id +
                "/update-pricing-schemes",
              JSON.stringify(pricingScheme),
              {
                headers: {
                  accept: "application/json",
                  "accept-language": "en_US",
                  "content-type": "application/json; charset=utf8",
                  Authorization: "Bearer " + access_token,
                },
              }
            )
            .then((response) => {
              console.log("amount updated");
            })
            .catch((error) => {
              res.status(500).send({
                success: false,
                message: error,
              });
            });
        }

        Pricing.findOneAndUpdate(
          { plan_id: existingPackage.plan_id },
          {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            month: req.body.month,
          }
        )
          .then((data) => {
            res.status(200).send({
              message: "Package Detail Updated",
              data: data,
            });
          })
          .catch((error) => {
            res.status(500).send({
              success: false,
              message: error,
            });
          });
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: error,
        });
      });
  }
};

exports.getAllPackage = async (req, res) => {
  try {
    const pricing = await Pricing.find({ isactive: true });
    if (!pricing) {
      res.status(500).send({
        message: "There are no Pricings",
      });
    } else {
      res.status(200).send({
        data: pricing,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getSinglePackage = async (req, res) => {
  try {
    await Pricing.findOne({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            success: false,
            message: "Pricing not found",
          });
        } else {
          res.status(200).send({
            success: true,
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deletePackage = async (req, res) => {
  try {
    //Delete Pricing
    await Pricing.findByIdAndRemove(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            success: false,
            message: "Pricing not found",
          });
        } else {
          res.status(200).send({
            success: true,
            message: "Pricing deleted successfully.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: `Something is wrong with pricing!`,
    });
    return;
  }
};

exports.activatePlan = async (req, res) => {
  await myFunction2();
  await axios
    .post(
      "https://api-m.sandbox.paypal.com/v1/billing/plans/" +
        req.body.plan_id +
        "/activate",
      {},
      {
        headers: {
          accept: "application/json",
          "accept-language": "en_US",
          "content-type": "application/json; charset=utf8",
          Authorization: "Bearer " + access_token,
        },
      }
    )
    .then((response) => {
      Pricing.findOneAndUpdate(
        { plan_id: req.body.plan_id },
        {
          isactive: true,
        }
      )
        .then((data) => {
          res.status(200).send({
            message: "Plan is Activated",
            data: data,
          });
        })
        .catch((ex) => {
          res.status(500).send({
            message: "Plan is Deactivated",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error,
      });
    });
};

exports.deactivatePlan = async (req, res) => {
  await myFunction2();
  await axios
    .post(
      "https://api-m.sandbox.paypal.com/v1/billing/plans/" +
        req.body.plan_id +
        "/deactivate ",
      {},
      {
        headers: {
          accept: "application/json",
          "accept-language": "en_US",
          "content-type": "application/json; charset=utf8",
          Authorization: "Bearer " + access_token,
        },
      }
    )
    .then((response) => {
      Pricing.findOneAndUpdate(
        { plan_id: req.body.plan_id },
        {
          isactive: false,
        }
      )
        .then((data) => {
          res.status(200).send({
            message: "Plan is Activated",
            data: data,
          });
        })
        .catch((ex) => {
          res.status(500).send({
            message: "Plan is Deactivated",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error,
      });
    });
};
