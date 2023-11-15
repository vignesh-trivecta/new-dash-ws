'use client';

import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState, Fragment, useRef } from "react";
import {
  HiChartPie,
  HiShoppingBag,
  HiPencilAlt,
  HiUserGroup,
} from "react-icons/hi";
import { SlBasket } from "react-icons/sl";
import { LiaSitemapSolid, LiaCalendarCheckSolid } from "react-icons/lia";
import { CgFileDocument } from "react-icons/cg";
import { AiFillSetting, AiOutlineFolderView, AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/navigation";
import { setBasketAmount, setBasketName } from "@/store/basketSlice";
import { usePathname, useSearchParams } from 'next/navigation';
import { setBasketState } from "@/store/eventSlice";
import { BsChatRightTextFill } from "react-icons/bs";
import { TbMessage2 } from "react-icons/tb";

const ExampleSidebar = function () {

  const router = useRouter();
  const dispatch = useDispatch();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // redux variable
  const basketState = useSelector((state) => state.event.basketState);
  
  // // local state variables
  // const [currentPage, setCurrentPage] = useState("");
  const [isLinkDisabled, setIsLinkDisabled] = useState(basketState);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const cancelButtonRef = useRef(null);

  const pageNavigator = () => {
    switch(tab) {
      case 1:
        router.push('/admin/dashboard');
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      case 2:
        router.push('/admin/customers');
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      case 3:
        router.push('/admin/baskets/create');
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      case 4:
        router.push('/admin/baskets/view');
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      case 5:
        router.push('/admin/baskets/customerMapping');
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      case 6:
        router.push('/admin/baskets/basketMapping');
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      case 7:
        router.push('/admin/baskets/reports');
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      case 8:
        dispatch(setBasketState(false));
        setIsLinkDisabled(false);
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        break;
      default:
        return null
    }
    setOpen(false);
  }

  // useEffect(() => {
  //   setCurrentPage(pathname);
  // }, [currentPage]);

  useEffect(() => {
    setIsLinkDisabled(basketState);
  }, [basketState]);
  

  return (
    <>
      <>
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Unsaved Basket!
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="text-sm text-gray-500">
                            <p>Are you sure you want to leave this page?</p> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex justify-center space-x-4 sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 ring-1 ring-inset ring-gray-300 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        pageNavigator();
                        
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-700 shadow-sm  sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      </>
      
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className="border-r-2 h-[calc(100vh-100px)] overflow-y-auto" >
        <div className="flex flex-col justify-between">
          <div>
            <Sidebar.Items>
              <Sidebar.ItemGroup className="">
                <Sidebar.Item
                  icon={HiChartPie}
                  className={
                    "/admin/dashboard" === pathname ? "bg-gray-200 dark:bg-gray-700" : ""
                  }
                >
                  {isLinkDisabled 
                    ? ( <button onClick={() => {setOpen(true); setTab(1);}}>Dashboard</button> ) 
                    : ( <Link href="/admin/dashboard">Dashboard</Link> )
                  }
                </Sidebar.Item>
                <Sidebar.Item
                  icon={HiUserGroup}
                  className={
                    "/admin/customers" === pathname
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }
                >
                  {isLinkDisabled 
                    ? ( <button onClick={() => {setOpen(true); setTab(2);}}>Customers</button> ) 
                    : ( <Link href="/admin/customers">Customers</Link> )
                  }
                </Sidebar.Item>
                <Sidebar.Collapse
                  icon={HiShoppingBag}
                  label="Baskets"
                >
                      <Sidebar.Item 
                          icon={HiPencilAlt}
                          className={
                            "/admin/baskets/create" === pathname
                              ? "bg-gray-200 dark:bg-gray-700 "
                              : ""
                          }
                      >
                        <Link href="/admin/baskets/create">
                            Create                        
                        </Link>
                      </Sidebar.Item>
                      <Sidebar.Item 
                          icon={AiOutlineFolderView}
                          className={
                            ("/admin/baskets/view" === pathname
                            || pathname.startsWith("/admin/baskets/view")
                            )
                              ? "bg-gray-200 dark:bg-gray-700"
                              : ""
                          }
                      >
                        {isLinkDisabled 
                          ? ( <button onClick={() => {setOpen(true); setTab(4);}}>View</button> ) 
                          : ( <Link href="/admin/baskets/view">View</Link> )
                        }
                      </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse
                  icon={LiaSitemapSolid}
                  label="Map"
                >
                      <Sidebar.Item 
                          icon={AiOutlineUserAdd}
                          className={
                            "/admin/baskets/customerMapping" === pathname
                              ? "bg-gray-200 dark:bg-gray-700"
                              : ""
                          }
                      >
                        {isLinkDisabled 
                          ? ( <button onClick={() => {setOpen(true); setTab(5);}}>Customers</button> ) 
                          : ( <Link href="/admin/baskets/customerMapping">Customers</Link> )
                        }
                      </Sidebar.Item>
                      <Sidebar.Item 
                          icon={SlBasket}
                          className={
                            "/admin/baskets/basketMapping" === pathname
                              ? "bg-gray-200 dark:bg-gray-700"
                              : ""
                          }
                      >
                        {isLinkDisabled 
                          ? ( <button onClick={() => {setOpen(true); setTab(6);}}>Baskets</button> ) 
                          : ( <Link href="/admin/baskets/basketMapping">Baskets</Link> )
                        }
                      </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item
                  icon={CgFileDocument}
                  className={
                    ("/admin/reports" === pathname 
                    || "/admin/reports/holding" === pathname
                    || "/admin/reports/orderbook" === pathname
                    || "/admin/reports/tradebook" === pathname
                    || "/admin/reports/margin" === pathname
                    || "/admin/reports/ledger" === pathname
                    
                    )
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }
                >
                  {isLinkDisabled 
                    ? ( <button onClick={() => {setOpen(true); setTab(7);}}>Reports</button> ) 
                    : ( <Link href="/admin/reports">Reports</Link> )
                  }
                </Sidebar.Item> 
                <Sidebar.Item
                  icon={TbMessage2}
                  className={
                    "/admin/communication" === pathname ? "bg-gray-200 dark:bg-gray-700" : ""
                  }
                >
                  {isLinkDisabled 
                    ? ( <button onClick={() => {setOpen(true); setTab(8);}}>Communication</button> ) 
                    : ( <Link href="/admin/communication">Communication</Link> )
                  }
                </Sidebar.Item>
                <Sidebar.Item
                  icon={LiaCalendarCheckSolid}
                  className={
                    "/admin/bod-eod" === pathname ? "bg-gray-200 dark:bg-gray-700" : ""
                  }
                >
                  {isLinkDisabled 
                    ? ( <button onClick={() => {setOpen(true); setTab(9);}}>BOD/ EOD Ops</button> ) 
                    : ( <Link href="/admin/bod-eod">BOD/ EOD Ops</Link> )
                  }
                </Sidebar.Item>
                {/* <Sidebar.Item
                  icon={AiFillSetting}
                  className={
                    "/admin/settings" === pathname ? "bg-gray-200 dark:bg-gray-700" : ""
                  }
                >
                  {isLinkDisabled 
                    ? ( <button onClick={() => {setOpen(true); setTab(10);}}>Settings</button> ) 
                    : ( <Link href="/admin/settings">Settings</Link> )
                  }
                </Sidebar.Item> */}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default ExampleSidebar;
