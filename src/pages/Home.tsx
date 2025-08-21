import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-10">
      <h1 className="text-center text-white font-semibold text-[40px] md:text-[50px] lg:text-[90px] xl:text-[128px] leading-[1.1] py-6 lg:py-3">
        <span className="block text-primary">Pay Smarter</span>
        <span className="flex items-center justify-center gap-4 bg-gradient-to-b from-primary dark:to-white to-gray-400 text-transparent bg-clip-text">Live Better</span>
      </h1>
      <div className="w-full text-center flex items-center justify-center">
        <p className="text-center text-lg text-gray-400 w-full md:w-[60%]">Send, receive, and manage money instantly — all from one secure digital wallet</p>
      </div>
      <div className="flex items-center justify-center  gap-5 mt-5">
        <Link to="/register">
          <Button className="text-sm md:text-lg py-6 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">Try Free</Button>
        </Link>
        <Link to="/about">
          <Button className="text-sm md:text-lg py-6 cursor-pointer hover:scale-105 border hover:border-primary bg-transparent hover:bg-transparent dark:text-white transition-all duration-300 ease-in-out">
            Learn More
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-center cursor-pointer">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl 
                       bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/10 
                       shadow-md animate-pulse"
                >
                  <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              ))
          : data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-2xl 
                     bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/10 
                     shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-primary drop-shadow-lg">{item.value}</h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-400 mt-2">{item.label}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

const data = [
  {
    value: "28+ million",
    label: "Users",
  },
  {
    value: "5+ million",
    label: "Transactions",
  },
  {
    value: "20+",
    label: "Countries",
  },
];

export default Home;
