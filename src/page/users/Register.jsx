import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputLogin from "../../components/inputForm/InputRegister";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:8082"

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const Register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/public/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, 
                                tel: tel,
                                address: address ,
                                username: username  ,
                                password: password  }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.code === 200) {
        setError("");
        navigate("/login");
        Swal.fire({
          title: "Success!",
          text: "Register successful.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        
      } else {
        setError("Register fail");
        Swal.fire({
          title: "Error!",
          text: "Register fail.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to login");
      Swal.fire({
        title: "Error!",
        text: "Failed to Register.",
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
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTelChange = (event) => {
    setTel(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <section className="bg-gray-900 w-screen h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Signup your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={Register}>
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
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Name
                </label>
                <InputLogin
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div>
                <label
                  htmlFor="tel"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Telephone
                </label>
                <InputLogin
                  type="text"
                  name="telephone"
                  id="telephone"
                  placeholder="Number"
                  value={tel}
                  onChange={handleTelChange}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Address
                </label>
                <InputLogin
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
