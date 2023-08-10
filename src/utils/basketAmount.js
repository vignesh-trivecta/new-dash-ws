// import { setBasketAmount } from '@/store/basketSlice';
// import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as yup from 'yup';

// const BasketAmount = () => {
//   const dispatch = useDispatch();
//   const basketAmount = useSelector((state) => state.basket.basketAmount);

//     // yup for create basket modal entries validation
//     const modalSchema = yup.object().shape({
//       basketAmount: yup.number().required("Investment Amount is required").typeError("Invalid number format").positive("Number must be positive")
//     })

//   const [inputValue, setInputValue] = useState("");
//   const [inputError, setInputError] = useState(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     // Set the focus to the input element whenever basketName changes
//     inputRef.current.focus();
//   }, [basketAmount]);

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     setInputValue(inputValue);
//     // Validate the input value against the modalSchema
//     modalSchema.validate({ basketAmount: inputValue })
//       .then(() => {
//         // Validation successful, clear any previous input error
//         setInputError(null);
//         // Dispatch the action to set the basketAmount only if validation is successful
//         dispatch(setBasketAmount(inputValue));
//       })
//       .catch((error) => {
//         // Validation failed, set the input error message
//         setInputError(error.message);
//       });
//   };

//   return (
//     <div className=''>
//       <input
//         type='text'
//         value={basketAmount}
//         className='rounded-md border-gray-300'
//         onChange={handleChange}
//         ref={inputRef}
//       />
//        {inputError && <span className="text-red-700 text-xs block mt-2">{inputError}</span>}
//     </div>
//   );
// };

// export default BasketAmount;
