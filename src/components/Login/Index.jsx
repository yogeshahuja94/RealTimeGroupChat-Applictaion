import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const validateValues = (inputValues) => {
    if (inputValues.username === "") {
      errors.username = "Username is incorrect";
    }
    if (inputValues.password === "") {
      errors.password = "Password is incorrect";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validate = validateValues(inputFields);

    if (Object.keys(validate).length !== 0) {
      setErrors(validate);
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();

      const user = users.find(
        (user) =>
          user.username === inputFields.username &&
          user.password === inputFields.password
      );

      if (user) {
        localStorage.setItem("username", user.username);
        console.log(user.username);
        alert("Login Successfully");
        navigate("/chatbox");
      } else {
        alert("Username and Password incorrect");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://cdn.brandfetch.io/idKJ12s-EY/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action=""
            onSubmit={handleSubmit}
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  value={inputFields.username}
                  type="text"
                  required
                  autoComplete="username"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-500 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={inputFields.password}
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
              {errors.general && (
                <p className="text-red-600">{errors.general}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <p className="text-center text-blue-500 mt-4">
                Don&apos;t Have An Account?{" "}
                <span onClick={handleClick} className="text-blue-500">
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
