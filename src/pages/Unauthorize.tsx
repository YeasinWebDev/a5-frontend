import { Link } from "react-router-dom";

function Unauthorize() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-lg">You are unauthorize to access this page </h1>
      <Link to="/" className="mt-5 px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
        Go to Home
      </Link>
    </div>
  );
}

export default Unauthorize;
