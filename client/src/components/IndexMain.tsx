import { Link } from "react-router-dom";
import bgImage from "../assets/pexels-mikhail-nilov-6893329.jpg";

const IndexMain = () => {
  return (
    <div
      id="top"
      className="h-[90vh] flex flex-col justify-around items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* dummy */}
      <div className="h-24 lg:h-32"></div>
      {/* section 1 */}
      <div className="flex-1 text-white text-5xl lg:text-7xl font-bold italic flex flex-wrap justify-center items-center gap-3 text-center text-shadow-lg">
        <h1 className="py-4 px-2">Get your tasks done,</h1>
        <br />
        <h1 className="py-4 px-2">just start from here!</h1>
      </div>
      <div className="flex-2 text-black text-3xl font-semibold text-shadow-sm text-shadow-white flex flex-col justify-center items-center text-center">
        <p>Sign up to start your task management.</p>
        <p className="text-xl mt-3">
          Already got an account?
          <br />
          <span>Sign in </span>
          <span className="text-teal-600">
            <Link to="/login">here</Link>
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default IndexMain;
