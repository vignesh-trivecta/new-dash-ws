import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Dropdown } from "flowbite-react";
import Image from "next/image";
import logo from "@/../../public/logo1.png";
import {
  setAdminLoginStatus,
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
  const [time, setTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState(true);

  // Function to update the time
  const updateTime = () => {
    setTime(new Date());
  };

  // Format the time based on the selected format
  const formatTime = () => {
    const options = {
      hour12: !timeZone,
      hour: 'numeric',
      minute: 'numeric',
    };
    return time.toLocaleTimeString(undefined, options);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Navbar fluid className="border-b-2">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* WealthSpring logo */}
          <div className="flex items-center">
            <Navbar.Brand>
              <Image
                alt="wealth-spring"
                src={logo}
                className="mr-3 h-10 w-32 sm:h-10 sm:w-40"
              />
            </Navbar.Brand>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <div>
                Date: {new Date().toUTCString().slice(0, 16)}
              </div>
              <div>
                Time: {formatTime()}
              </div>
            </div>
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
            {/* User profile dropdown */}
            <Dropdown
              inline
              arrowIcon={false}
              className="z-20"
              label={
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
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
                  <div className="space-x-2">
                    <input
                      type="radio"
                      name="timeFormat"
                      id="12hr"
                      defaultValue={12}
                      defaultChecked={timeZone === false}
                      onChange={() => {
                        setTimeZone(!timeZone);
                        dispatch(setTimeFormat(12));
                      }}
                    />
                    <label htmlFor="12hr">12 Hr</label>
                    <input
                      type="radio"
                      name="timeFormat"
                      id="24hr"
                      defaultValue={24}
                      defaultChecked={timeZone === true}
                      onChange={() => {
                      setTimeZone(!timeZone);
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
