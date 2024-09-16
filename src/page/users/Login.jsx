import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputLogin from "../../components/inputForm/InputLoing";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:8082"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/public/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);
        setError("");
        navigate("/home");
        Swal.fire({
          title: "Success!",
          text: "Login successful.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        
      } else {
        setError("No token received");
        Swal.fire({
          title: "Error!",
          text: "No token received.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to login");
      Swal.fire({
        title: "Error!",
        text: "Failed to login.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    
  };
    
  
    const handleRegisterClick = () => {
      navigate("/register"); // ไปที่ path /register
    };

  return (
    <section className="bg-gray-900 w-screen h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={Login}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <InputLogin
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <InputLogin
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm text-gray-300">
              ยังไม่มีบัญชี?{" "}
              <span
                onClick={handleRegisterClick}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Create account
              </span>
            </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
