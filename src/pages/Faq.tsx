import { Link } from "react-router";

function FAQ() {
  const faqs = [
    {
      q: "How secure is my wallet?",
      a: "We use industry-standard encryption, two-factor authentication, and continuous monitoring to ensure your funds and personal data are safe at all times.",
    },
    {
      q: "Can I access it globally?",
      a: "Yes! Our platform is accessible from most countries worldwide. You can manage your finances on both web and mobile apps, anytime, anywhere.",
    },
    {
      q: "Are there any fees?",
      a: "Basic usage is completely free. Premium plans have subscription fees listed on the Pricing page, which unlock additional features like unlimited transactions and dedicated support.",
    },
    {
      q: "How do I upgrade my plan?",
      a: "You can upgrade your plan directly from your account dashboard. Simply choose the plan you want and follow the payment instructions. Your new features will be activated immediately.",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Yes, you can cancel your subscription anytime from your account settings. After cancellation, you will retain access to premium features until the end of your billing period.",
    },
    {
      q: "What should I do if I forget my password?",
      a: "Click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password securely.",
    },
    {
      q: "Is customer support available?",
      a: "Absolutely! Our support team is available via email and chat to assist you with any questions or issues. Premium plans receive priority support for faster response times.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">Frequently Asked Questions</h1>
      <div className="flex flex-col gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer dark:border hover:scale-105"
          >
            <h3 className="font-bold text-xl mb-2">{faq.q}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          Didn't find your answer? Reach out to our support team and we’ll be happy to assist you!
        </p>
        <Link
          to="/contact"
          className="px-6 py-3 bg-primary dark:text-white rounded-full hover:scale-105 transition-all duration-300"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

export default FAQ;
