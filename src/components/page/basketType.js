import { setModelBasket } from "@/store/basketSlice";
import ValiditySelector from "@/utils/validitySelector";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BasketType = () => {

  const modelBasket = useSelector((state) => state.basket.modelBasket);
  const dispatch = useDispatch();

  // function to handle check input
  const handleCheckboxChange = (event) => {
    dispatch(setModelBasket(event.target.checked));
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Save this as model basket
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
        <div className="flex items-center justify-center mt-2">
          <label className="mr-4 text-sm">Basket Validity</label>
          <ValiditySelector />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BasketType;
