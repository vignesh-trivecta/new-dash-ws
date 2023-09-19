import { Navbar, Dropdown, Avatar, Sidebar } from "flowbite-react";
import logo from "@/../../public/logo1.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setAdminLoginStatus, setLoggedIn } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import ExampleSidebar from "./sidebar";
import { useState } from "react";
import { setAdminLogin } from "@/store/reportSlice";

const DashNavbar = function () {

    const dispatch = useDispatch();
    const router = useRouter();
    const username = useSelector((state) => state.user.username);
    const email = useSelector((state) => state.user.email);

    // local state variables 
    const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Navbar fluid className="border-b-2">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">

          {/* WealthSpring logo */}
          <div className="flex items-center">
            <Navbar.Brand href="#">
              <Image alt="wealth-spring" src={logo} className="mr-3 h-10 w-32 sm:h-10 sm:w-40" />
            </Navbar.Brand>
          </div>

          {/* Hamburger menu and user profile */}
          <div className="flex items-center gap-3">
            <div className=" md:hidden hover:cursor-pointer">
              <div onClick={() => {setShowSidebar(!showSidebar)}}>
                <GiHamburgerMenu />
              </div>
              {showSidebar && <div className="absolute right-10 z-30 border border-gray-300 rounded-md"> <ExampleSidebar /> </div>}
            </div>
            <Dropdown
            inline
            arrowIcon={false}
            label={<svg className="w-6 h-6 text-gray-800 dark:text-white hidden md:block" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>}
            >
              <Dropdown.Header>
                <span className="block text-sm text-center">
                  {username}
                </span>
                <span className="block truncate text-sm font-medium">
                {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item className=" flex justify-center hover:bg-white">
                <button className="rounded-md border border-gray-300 p-2 hover:bg-red-500 hover:text-white" 
                onClick={() => { 
                    router.push('/');
                    dispatch(setLoggedIn(false));
                    dispatch(setAdminLoginStatus(false));
                    dispatch(setAdminLogin(false))
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
