// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {
//   const [inputFields, setInputFields] = useState({
//     username: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState("");

//   const validateValues = (inputValues) => {
//     let errors = {}; // Corrected errors initialization

//     if (inputValues.username.trim() === "") {
//       errors.username = "Username is required";
//     }
//     if (inputValues.password.trim() === "") {
//       errors.password = "Password is required";
//     }
//     if (inputValues.confirmpassword.trim() === "") {
//       errors.confirmpassword = "Confirm password is required";
//     } else if (inputValues.password !== inputValues.confirmpassword) {
//       errors.confirmpassword = "Passwords do not match";
//     }

//     return errors;
//   };
//   const handleChange = (e) => {
//     setInputFields({ ...inputFields, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const validate = validateValues(inputFields);

//     if (Object.keys(validate).length !== 0) {
//       setErrors(validate);
//       return;
//     } else {
//       setErrors({});
//     }

//     try {
//       const response = await fetch("http://localhost:5000/users");
//       const users = await response.json();

//       const existingUser = users.find(
//         (user) => user.username === inputFields.username
//       );

//       if (existingUser) {
//         alert("Username is already taken");
//         return;
//       }

//       const newUser = {
//         username: inputFields.username,
//         password: inputFields.password,
//       };

//       const res = await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       });

//       if (res.ok) {
//         alert("new user created");
//         localStorage.setItem("username", inputFields.username);
//         navigate("/chatbox");
//       } else {
//         alert("unable to create user");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setErrors({ general: "An error occurred. Please try again." });
//     }
//   };
//   return (
//     <>
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <img
//             alt="Your Company"
//             src="https://cdn.brandfetch.io/idKJ12s-EY/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
//             className="mx-auto h-10 w-auto"
//           />
//           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
//             Sign in to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form
//             action=""
//             onSubmit={handleSubmit}
//             method="POST"
//             className="space-y-6"
//           >
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm/6 font-medium text-white"
//               >
//                 Username
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="username"
//                   name="username"
//                   value={inputFields.username}
//                   type="text"
//                   required
//                   autoComplete="username"
//                   onChange={handleChange}
//                   className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm/6 font-medium text-white"
//                 >
//                   Password
//                 </label>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   value={inputFields.password}
//                   type="password"
//                   required
//                   autoComplete="current-password"
//                   onChange={handleChange}
//                   className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm/6 font-medium text-white"
//                 >
//                   Confirm Password
//                 </label>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="confirmpassword"
//                   name="confirmpassword"
//                   value={inputFields.confirmpassword}
//                   type="password"
//                   required
//                   autoComplete="current-password"
//                   onChange={handleChange}
//                   className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign in
//               </button>
//             </div>
//             {errors.general && <p className="text-red-600">{errors.general}</p>}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateValues = (inputValues) => {
    let errors = {};

    if (inputValues.username.trim() === "") {
      errors.username = "Username is required";
    }
    if (inputValues.password.trim() === "") {
      errors.password = "Password is required";
    }
    if (inputValues.confirmpassword.trim() === "") {
      errors.confirmpassword = "Confirm password is required";
    } else if (inputValues.password !== inputValues.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }

    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
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

      const existingUser = users.find(
        (user) => user.username === inputFields.username
      );

      if (existingUser) {
        setErrors({ username: "Username is already taken" });
        return;
      }

      const newUser = {
        username: inputFields.username,
        password: inputFields.password,
      };

      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        alert("New user created");
        localStorage.setItem("username", inputFields.username);
        navigate("/chatbox");
      } else {
        alert("Unable to create user");
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
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
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
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
              {errors.username && (
                <p className="text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={inputFields.password}
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  value={inputFields.confirmpassword}
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
              {errors.confirmpassword && (
                <p className="text-red-600">{errors.confirmpassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>

            {/* General Error Message */}
            {errors.general && <p className="text-red-600">{errors.general}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
