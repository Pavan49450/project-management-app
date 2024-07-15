import React, { useState } from "react";
import PaypalUI from "../../components/AdminDashboard/CheckoutComponents/PaypalUI";
import RechargeOptions from "../../components/AdminDashboard/CheckoutComponents/RechargeOptions";
import MainContainer from "./MainContainer";

// Renders errors or successful transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

const rechargeOptions = [
  {
    name: "Basic Work Iteration Pack",
    iterations: 480,
    benefit1: "Access to Basic Reporting",
    benefit2: "Task Prioritization",
    benefit3: "",
    price: 10,
  },
  {
    name: "Standard Work Iteration Pack",
    iterations: 960,
    benefit1: "Enhanced Reporting",
    benefit2: "Collaboration Tools",
    benefit3: "Task Automation",
    price: 20,
  },
  {
    name: "Premium Work Iteration Pack",
    iterations: 2000,
    benefit1: "Comprehensive Reporting",
    benefit2: "Advanced Collaboration",
    benefit3: "Custom Workflows & Priority Support",
    price: 50,
  },
];

function CheckoutPage() {
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [showPaypalUI, setShowPaypalUI] = useState(false);
  const [message, setMessage] = useState("");

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowPaypalUI(false); // Hide PayPal UI if a different option is selected
  };

  return (
    <MainContainer>
      <div className="m-auto max-w-2xl mt-16">
        {!showPaypalUI ? (
          <>
            <RechargeOptions
              options={rechargeOptions}
              selectOption={handleOptionSelect}
              selectedOption={selectedOption}
            />
            <div className="text-center mt-8">
              <button
                className={`py-2 px-8 rounded transition-colors duration-300 ${
                  selectedOption !== null
                    ? "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
                onClick={() => selectedOption !== null && setShowPaypalUI(true)}
                disabled={selectedOption === null}
              >
                {`Checkout ${
                  selectedOption !== null
                    ? `with $${rechargeOptions[selectedOption].price}`
                    : ""
                }`}
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="my-8 text-2xl font-semibold text-center">
              Please select your payment method
            </h1>
            <PaypalUI
              setMessage={setMessage}
              initialOptions={initialOptions}
              selectedOption={rechargeOptions[selectedOption]}
              price={rechargeOptions[selectedOption].price}
            />
          </div>
        )}
        <Message content={message} />
      </div>
    </MainContainer>
  );
}

export default CheckoutPage;
