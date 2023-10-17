import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Dropdown } from "flowbite-react";
import Image from "next/image";
import logo from "@/../../public/logo1.png";
import {
  setAdminLoginStatus,
  setLoggedIn,
  setTimeFormat,
} from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import ExampleSidebar from "./sidebar";
import { setAdminLogin } from "@/store/reportSlice";

const DashNavbar = function () {
  // redux
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const timeFormat = useSelector((state) => state.user.timeFormat);

  const router = useRouter();

  // local state variables
  const [showSidebar, setShowSidebar] = useState(false);
  const [time, setTime] = useState(timeFormat);

  useEffect(() => {
    // Create an interval and store its ID
    const intervalId = setInterval(() => {
      let newTime = new Date();
      console.log('triggered', newTime);
      setTime(newTime);
    }, 60000);
    // Return a cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  },[])

  return (
    <Navbar fluid className="border-b-2">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* WealthSpring logo */}
          <div className="flex items-center">
            <Navbar.Brand href="#">
              <Image
                alt="wealth-spring"
                src={logo}
                className="mr-3 h-10 w-32 sm:h-10 sm:w-40"
              />
            </Navbar.Brand>
          </div>

          <div className="flex items-center gap-3">
            <div className=" md:hidden hover:cursor-pointer">
              {/* Hamburger menu and user profile */}
              <div
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}
              >
                <GiHamburgerMenu />
              </div>
              {showSidebar && (
                <div className="absolute right-10 z-30 border border-gray-300 rounded-md">
                  {" "}
                  <ExampleSidebar />{" "}
                </div>
              )}
            </div>
            <div>
              <div>Date: {new Date().toUTCString().slice(0, 16)}</div>
              <div>
                Time:
                {time === 12
                  ? ` ${
                      new Date().getHours() > 12
                        ? (new Date().getHours() - 12 < 10 ? "0" : "") +
                          (new Date().getHours() - 12)
                        : new Date().getHours()
                    } : ${
                      new Date().getMinutes() < 10
                        ? `0${new Date().getMinutes()}`
                        : new Date().getMinutes()
                    } ${new Date().getHours() >= 12 ? "PM" : "AM"}`
                  : ` ${new Date().getHours()} : ${
                      new Date().getMinutes() < 10
                        ? `0${new Date().getMinutes()}`
                        : new Date().getMinutes()
                    }`}
              </div>
            </div>
            {/* User profile dropdown */}
            <Dropdown
              inline
              arrowIcon={false}
              label={
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white hidden md:block"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              }
            >
              <Dropdown.Header className="">
                <span className="block text-md font-bold text-center">
                  {username.toString().toUpperCase()}
                </span>
                <span className="block text-center text-sm font-medium">
                  {email}
                </span>
                <div className="flex flex-col space-y-1 mt-4">
                  <span className="underline">Time Format: </span>
                  <div className="space-x-1">
                    <input
                      type="radio"
                      name="timeFormat"
                      id="12hr"
                      value={12}
                      defaultChecked={time === 12}
                      onChange={() => {
                        setTime(12);
                        dispatch(setTimeFormat(12));
                      }}
                    />
                    <label htmlFor="12hr">12 Hr</label>
                    <input
                      type="radio"
                      name="timeFormat"
                      id="24hr"
                      value={24}
                      defaultChecked={time === 24}
                      onChange={() => {
                        setTime(24);
                        dispatch(setTimeFormat(24));
                      }}
                    />
                    <label htmlFor="24hr">24 Hr</label>
                  </div>
                </div>
              </Dropdown.Header>
              <Dropdown.Item className=" flex justify-center hover:bg-white">
                <button
                  className="rounded-md border border-gray-300 p-2 hover:bg-red-500 hover:text-white"
                  onClick={() => {
                    router.push("/");
                    dispatch(setLoggedIn(false));
                    dispatch(setAdminLoginStatus(false));
                    dispatch(setAdminLogin(false));
                  }}
                >
                  Sign out
                </button>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default DashNavbar;
