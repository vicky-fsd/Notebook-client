import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import login from "../asset/loginGif.gif";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
   const host = "https://notebookserver-0zog.onrender.com";
   //const host = "http://localhost:5000";
    let url = `${host}/api/auth/login`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.authtoken);
        navigate("/", { replace: true });
      } else {
        setError(data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <section className="text-black px-2 body-font h-[calc(100vh-10rem)] sm:h-[calc(100vh-15rem)] w-full flex justify-center items-center">
      <div className="z-10 border border-black rounded-md p-4 sm:p-6">
        <div className="flex flex-col w-full mb-4">
          <h2 className="sm:text-3xl text-2xl text-center font-medium title-font text-gray-900">
            Login
          </h2>
          <p className="mx-auto text-center text-gray-600 leading-relaxed text-base">
            Login to your account to access your notes.
          </p>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <div className="relative">
              <label htmlFor="email" className="leading-7 text-md text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                className="w-full  bg-opacity-50 rounded border border-gray-300 focus:bg-gray-100 hover:border-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="relative">
              <label
                htmlFor="password"
                className="leading-7 text-md text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                className="w-full  bg-opacity-50 rounded border border-gray-300 focus:bg-gray-100 hover:border-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
          </div>

          <div className="w-full mb-2">
            Don't have an account?
            <Link to="/signup" className="text-indigo-500 ml-2 cursor-pointer">
              Sign Up
            </Link>
          </div>
          <div className="w-full mt-4">
            <button className="flex text-black mx-auto border border-black py-1 px-3 focus:outline-none hover:bg-black hover:text-white rounded-md text-lg font-semibold transition-colors duration-300">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
      <img src={login} alt="login" className="hidden lg:block" />
    </section>
  );
};

export default Login;
