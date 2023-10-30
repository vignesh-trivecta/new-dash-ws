import { getRecords } from "@/app/api/tempBasket/route";
import { getSpecificBasket, submitBasket } from "@/app/api/basket/route";
import ValiditySelector from "@/utils/validitySelector";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasketAmount } from "@/store/basketSlice";
import { usePathname } from "next/navigation";

const SubmitBasket = ({
  saved,
  setSaved,
  transType,
  investmentAmount,
  actualValue,
  mainBasketName,
  basketCategory,
  setSaveMsg
}) => {
  // modal state variables
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  let basketActualValue = actualValue?.split(",").join("");
  console.log(actualValue, investmentAmount)

  const dispatch = useDispatch();
  const pathname = usePathname();

  // local state variables
  // const [popup, setPopup] = useState(false);
  const [modelBasket, setModelBasket] = useState(true);

  // redux state
  const adminName = useSelector((state) => state.user.username);
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const basketValidity = useSelector((state) => state.basket.basketValidity);

  // function to submit all the records
  const handleSubmit = async (e) => {
    e.preventDefault();
    let basketRequests;
    if (pathname == "/admin/baskets/create") {
      basketRequests = await getRecords(adminName, basketName);
    } else {
      basketRequests = await getSpecificBasket(mainBasketName);
    }
    const response = await submitBasket(
      adminName,
      basketName,
      modelBasket,
      basketValidity,
      transType,
      investmentAmount,
      basketActualValue,
      basketCategory,
      basketRequests,
    );
    console.log(response);
    setSaveMsg(response);
    setSaved(!saved);
    console.log("reset message")
    props.setOpenModal(undefined);
  };

  // function to handle check input
  const handleCheckboxChange = (event) => {
    setModelBasket(event.target.checked);
  };

  return (
    <div className="">
      <Button onClick={() => props.setOpenModal("pop-up")} className="ml-8">
        Save
      </Button>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col">
            {Number(basketActualValue) < Number(investmentAmount)
                ?
              (<div>
                <p className="text-red-500 mt-2 text-md text-center">
                  Basket Value is Lesser than Investment Amount! 
                </p>
                <p className="text-red-500 text-md text-center">
                  Do you want to save?
                </p>
              </div>)
              : <></>}
            <div className="flex items-center justify-center mt-4">
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Save this as Model Basket
              </label>
              <input
                id="default-checkbox"
                type="checkbox"
                checked={modelBasket}
                onChange={handleCheckboxChange}
                className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            {!modelBasket ? (
              <div className="flex items-center justify-center mt-2 z-30">
                <label className="mr-4">Basket Validity</label>
                <ValiditySelector />
              </div>
            ) : (
              <></>
            )}
            <div>
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Save
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>


    </div>
  );
};

export default SubmitBasket;