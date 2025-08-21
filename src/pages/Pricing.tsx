import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      description: "Perfect for individuals starting out with essential features.",
      features: ["Limited Transactions", "Standard Support", "Access to basic analytics", "Single user access"],
    },
    {
      name: "Pro",
      price: "$9.99/mo",
      description: "Ideal for growing users who need more flexibility and priority support.",
      features: ["Unlimited Transactions", "Priority Support", "Advanced analytics", "Multi-user access", "Customizable notifications"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$29.99/mo",
      description: "Designed for businesses needing full access and dedicated support.",
      features: ["All Features", "Dedicated Manager", "Team management tools", "Custom reporting", "API access", "24/7 premium support"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto md:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">Pricing Plans</h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Choose a plan that fits your needs. Whether you're just starting or managing a large team, we have you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-5 xl:gap-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-8 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer hover:scale-105 ${
              plan.popular ? "border-2 border-primary scale-105" : " dark:border-2"
            }`}
          >
            {plan.popular && <span className="inline-block bg-primary text-white px-3 py-1 rounded-full mb-4 text-sm font-semibold">Most Popular</span>}
            <h3 className="font-extrabold text-2xl mb-2">{plan.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{plan.description}</p>
            <p className="text-3xl font-extrabold text-primary mb-6">{plan.price}</p>
            <ul className="text-gray-700 dark:text-gray-400 mb-6 space-y-1 text-left">
              {plan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
            <button className="px-6 py-3 bg-primary cursor-pointer dark:text-white rounded-full hover:scale-105 transition-all duration-300">Choose Plan</button>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">Not sure which plan is right for you? Start with the Basic plan and upgrade anytime.</p>
        <Link to="/register">
          <button className="px-6 py-4 bg-primary cursor-pointer dark:text-white rounded-full hover:scale-105 transition-all duration-300"> Get Started Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Pricing;
