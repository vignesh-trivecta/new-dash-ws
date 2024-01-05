import { getRecords } from "@/app/api/tempBasket/route";
import { getSpecificBasket, submitBasket } from "@/app/api/basket/route";
import ValiditySelector from "@/utils/validitySelector";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasketAmount, setModelBasket } from "@/store/basketSlice";
import { usePathname } from "next/navigation";
import BasketType from "@/components/page/basketType";

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

  const dispatch = useDispatch();
  const pathname = usePathname();

  // local state variables
  // const [popup, setPopup] = useState(false);

  // redux state
  const adminName = useSelector((state) => state.user.username);
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const basketValidity = useSelector((state) => state.basket.basketValidity);
  const modelBasket = useSelector((state) => state.basket.modelBasket);
  
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
    setSaveMsg(response);
    setSaved(!saved);
    props.setOpenModal(undefined);
    dispatch(setModelBasket(true));
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
            <div className="z-40">
              <BasketType />
            </div>
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