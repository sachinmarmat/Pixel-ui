import React, { useState } from "react";
import { FiCheck, FiStar, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function PremiumPlans() {

  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"

  const plans = [
    {
      id: "basic",
      name: "Free Plan",
      priceMonthly: 0,
      priceYearly: 0,
      description: "Post & manage 5 jobs, basic candidate search",
      features: [
        "5 active job posts",
        "Basic candidate search",
        "Email support",
      ],
      dispoint: [
        "20 active job posts",
        "Advanced candidate search",
      ],
      badge: "Popular",
      button: "Get Started"

    },
    {
      id: "pro",
      name: "Premium Plan",
      priceMonthly: 29,
      priceYearly: 290,
      description: "Boosted listings, advanced search & analytics",
      features: [
        "20 active job posts",
        "Advanced candidate search",
        "Featured listings",
        "Priority support",
      ],
      dispoint: [
      ],
      badge: "Best value",
      button: "Upgrade Now"

    },
    {
      id: "enterprise",
      name: "Bussiness Plan",
      priceMonthly: 99,
      priceYearly: 499,
      description: "Unlimited posts, dedicated account manager",
      features: [
        "Unlimited job posts",
        "Dedicated account manager",
        "Custom integrations",
        "SLA & onboarding",
      ],
      dispoint: [

      ],
      badge: "For teams",
      button: "Upgrade Now"
    },
  ];


  function formatPrice(plan) {
    return billing === "monthly"
      ? `$${plan.priceMonthly}/mo`
      : `$${plan.priceYearly}/yr`;
  }

  return (

    <div className="bg-gradient-to-l from-[#F6BB97] to-[#68B1FF] min-h-screen">
      <div className="px-20">
        <div className="text-center mb-11 ">
          <h2 className="text-3xl md:text-5xl text-[#F1511B] font-extrabold pt-7">Choose your plan</h2>
          <p className="mt-2 text-xl text-slate-200 pt-1">Upgrade to unlock premium features and get more job opportunities. </p>


          <div className="inline-flex items-center mt-6 rounded-full bg-slate-100 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-full transition-colors text-sm font-medium ${billing === "monthly" ? "bg-white shadow" : "text-slate-600"
                }`}
            >
              Monthly
            </button>
            <div className="px-2 text-xs text-slate-500">/</div>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-4 py-2 rounded-full transition-colors text-sm font-medium ${billing === "yearly" ? "bg-white shadow" : "text-slate-600"
                }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
          {plans.map((plan, idx) => (
            <motion.article
              key={plan.id}
              whileHover={{ translateY: -6 }}
              className={`relative rounded-2xl border p-5 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col`}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                  <FiStar /> {plan.badge}
                </span>
              </div>

              <div className="mt-6"> 
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>


                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold">{formatPrice(plan)}</span>
                  <span className="text-xs text-slate-400">Billed {billing === "monthly" ? "monthly" : "annually"}</span>
                </div>


                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5">
                        <FiCheck className="text-slate-700" />

                      </span>
                      <span className="text-slate-700">{f}</span>
                    </li>
                  ))}
                  {plan.dispoint.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">

                      <FiX className="text-slate-700" />
                      <span className="text-slate-700">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>


              <div className="mt-auto pt-6">
                <button
                  onClick={() => handleBuy(plan)}
                  className="w-full rounded-lg border border-blue-600  text-blue-600 py-3 font-semibold hover:bg-indigo-200 transition-colors cursor-pointer"
                >
                  {plan.button}
                </button>


                {/* <button
                onClick={() => alert(`See features of ${plan.name}`)}
                className="w-full mt-3 rounded-lg border py-2 text-sm font-medium text-slate-700"
              >
                View details
              </button> */}
              </div>
            </motion.article>
          ))}
        </div>
      </div >
    </div>
  )
}
