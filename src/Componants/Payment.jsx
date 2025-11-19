import React, { useState } from "react";
import { FiCheck, FiStar, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PremiumPlans() {
  const [duration, setDuration] = useState("month");

  const navigate = useNavigate();

  // ✅ Get token & role
  const token = localStorage.getItem("accessToken") 
  const role = localStorage.getItem("role") || "user"; // fallback to user if missing

  const toggleDuration = () =>
    setDuration((prev) => (prev === "month" ? "year" : "month"));

  const plans = [
    {
      id: "basic",
      name: "Free Plan",
      description: "Get started with limited features",
      features: ["Basic job access", "Build 1 resume"],
      dispoint: ["Advanced templates", "Unlimited resumes", "Premium tools"],
      button: "Use Free",
      color: "gray",
    },
    {
      id: "pro",
      name: "Pro Plan",
      description: "Full resume access + job tools",
      features: [
        "Build unlimited resumes",
        "Advanced templates",
        "Job analytics",
      ],
      amount: { month: "₹399", year: "₹3999" },
      button: "Upgrade to Pro",
      color: "blue",
    },
    {
      id: "gold",
      name: "Gold Plan",
      description: "All Pro features + priority support",
      features: [
        "Everything in Pro",
        "Priority support",
        "Exclusive job resources",
      ],
      amount: { month: "₹899", year: "₹6999" },
      button: "Upgrade to Gold",
      color: "amber",
    },
  ];

  // ✅ Buy Plan
  const handleBuy = async (planId) => {
    if (!token) {
      toast.error("Please log in first to purchase a plan!");
      return;
    }

    if (planId === "basic") {
      toast.info("Free plan is already active!");
      return;
    }

    try {
      // ✅ 1. Create order from backend
      const { data } = await axios.post(
        "http://localhost:8080/api/premium/createprime",
        { plan: planId, duration, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data?.order || !data?.key)
        throw new Error("Failed to create Razorpay order.");

      // ✅ 2. Razorpay options
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Resume Builder Premium",
        description: `${planId.toUpperCase()} (${duration}) Subscription`,
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // ✅ 3. Verify payment
            const verifyRes = await axios.post(
              "http://localhost:8080/api/premium/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: planId,
                duration,
                role,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success(verifyRes.data.msg || "Payment successful!"),
              navigate("/")
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "Sachin Marmat",
          email: "sb6583425@gmail.com",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  const colorClasses = {
    gray: "bg-gray-100 text-gray-800 border-gray-600 hover:bg-gray-50",
    blue: "bg-blue-100 text-blue-800 border-blue-600 hover:bg-blue-50",
    amber: "bg-amber-100 text-amber-800 border-amber-600 hover:bg-amber-50",
  };


  return (
    <div className="bg-gradient-to-l from-[#F6BB97] to-[#68B1FF] min-h-screen py-10">
      <div className="px-6 md:px-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl text-[#F1511B] font-extrabold pt-7">
            Choose Your Plan
          </h2>
          <p className="mt-2 text-lg text-slate-100 pt-1">
            Upgrade to unlock all premium features and tools.
          </p>
        </div>

        {/* Duration Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 bg-white rounded-full shadow-sm px-3 py-1">
            <span
              className={`text-sm font-medium ${duration === "month" ? "text-blue-600" : "text-gray-500"
                }`}
            >
              Monthly
            </span>
            <button
              onClick={toggleDuration}
              className="relative w-10 h-5 bg-gray-300 rounded-full flex items-center transition-all"
            >
              <span
                className={`absolute w-4 h-4 bg-blue-600 rounded-full transition-transform ${duration === "month" ? "translate-x-1" : "translate-x-5"
                  }`}
              ></span>
            </button>
            <span
              className={`text-sm font-medium ${duration === "year" ? "text-blue-600" : "text-gray-500"
                }`}
            >
              Yearly
            </span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
          {plans.map((plan) => (
            <motion.article
              key={plan.id}
              whileHover={{ translateY: -6 }}
              className="relative rounded-2xl border border-gray-200 p-6 bg-white shadow-md hover:shadow-lg transition-all flex flex-col"
            >
              <div className="absolute -top-3 left-6">
                <span
                  className={`inline-flex items-center gap-2 ${colorClasses[plan.color]} text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  <FiStar /> {plan.name}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {plan.description}
                </p>

                {plan.amount && (
                  <p className="mt-3 text-2xl font-bold text-blue-600">
                    {plan.amount[duration]}{" "}
                    <span className="text-sm text-gray-500 font-medium">
                      / {duration}
                    </span>
                  </p>
                )}

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <FiCheck className="text-green-600 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.dispoint?.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <FiX className="text-red-500 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={() => handleBuy(plan.id)}
                  className={`w-full rounded-lg border py-2 text-sm font-semibold transition-colors cursor-pointer ${colorClasses[plan.color]}`}
                >
                  {plan.button}{" "}
                  {plan.id !== "basic" &&
                    `(${duration === "month" ? "Monthly" : "Yearly"})`}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
