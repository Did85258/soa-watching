import { useNavigate } from "react-router-dom";
import ButtonSide from "./ButtonSide";
import UserMenu from "./UserMenu";
import Swal from "sweetalert2";
import { useEffect } from "react";

const linkHome = "";
const linkHome2 = "";
const linkHome3 = "";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        navigate("/login");
        window.location.reload();
      }
    });
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gray-800 border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <ButtonSide />
              <a href={linkHome} className="flex ms-2 lg:me-24">
                <span className="self-center text-xl font-semibold lg:text-2xl whitespace-nowrap text-white">
                  Wash
                </span>
              </a>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="#"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="w-44 z-50 hidden my-4 text-base list-none  divide-y rounded shadow bg-gray-700 divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-white" role="none">
                      User : {localStorage.getItem("userName")}
                    </p>
                    <p
                      className="text-sm font-medium  truncate text-gray-300"
                      role="none"
                    ></p>
                  </div>
                  <ul className="py-1" role="none">
                    <UserMenu
                      urlMenu={linkHome2}
                      path="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
                      text="Setting"
                    />
                    <div
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-3 transition duration-75 text-gray-400  group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                        />
                      </svg>
                      Logout
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;