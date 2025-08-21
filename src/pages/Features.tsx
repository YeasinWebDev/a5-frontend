function Features() {
  const features = [
    {
      title: "Fast Payments",
      icon: "⚡",
      description:
        "Experience lightning-fast transactions that save you time and hassle. No delays, no waiting — just instant payments.",
      benefits: [
        "Send and receive money instantly",
        "No hidden fees or delays",
        "Seamless peer-to-peer transactions",
      ],
    },
    {
      title: "Secure Wallet",
      icon: "🔒",
      description:
        "Your security is our top priority. We use advanced encryption to protect your funds and personal data at all times.",
      benefits: [
        "Bank-grade encryption",
        "Two-factor authentication",
        "Continuous fraud monitoring",
      ],
    },
    {
      title: "Global Access",
      icon: "🌎",
      description:
        "Access your wallet anytime, anywhere. Our platform works worldwide, allowing you to manage your finances without borders.",
      benefits: [
        "Available in multiple countries",
        "Supports multiple currencies",
        "Works on mobile and web",
      ],
    },
    {
      title: "Analytics",
      icon: "📊",
      description:
        "Get deep insights into your spending habits, monitor trends, and make smarter financial decisions every day.",
      benefits: [
        "Track income and expenses",
        "Visual reports and charts",
        "Personalized spending insights",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto md:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
          Powerful Features
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Our platform is designed to make your financial life easier, safer, and faster. Explore the key features that make us stand out.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12  cursor-pointer">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-8 rounded-2xl bg-white/40 border dark:bg-black/40 backdrop-blur-md shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <div className="text-6xl mb-6 text-center">{feature.icon}</div>
            <h3 className="font-extrabold text-2xl mb-4 text-center">{feature.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{feature.description}</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              {feature.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
