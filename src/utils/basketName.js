// import { basketNameCheck } from '@/app/api/basket/route';
// import { setBasketName } from '@/store/basketSlice';
// import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as yup from 'yup';

// const BasketName = ({autoFocus}) => {
//   const dispatch = useDispatch();
//   const basketName = useSelector((state) => state.basket.basketName);

//   const [inputValue, setInputValue] = useState("");
//   const [status, setStatus] = useState(false);
//   const [inputError, setInputError] = useState(null);
//   const inputRef = useRef(null);

//   // yup for create basket modal entries validation
//   const alphanumericRegex = /^[a-zA-Z0-9]+$/;
//   const modalSchema = yup.object().shape({
//     basketName: yup.string().matches(alphanumericRegex, 'Only alphabets and numbers are allowed').required('Basket Name is required'),
//   })

//   useEffect(() => {
//     // Set the focus to the input element whenever basketName changes
//     inputRef.current.focus();
//   }, [basketName]);

//   const handleChange = async (e) => {
//     const inputValue = e.target.value;
//     setInputValue(inputValue);

//     try {
//       // Validate the input value against the modalSchema
//       await modalSchema.validate({ basketName: inputValue });

//       // Perform the async validation using basketNameCheck
//       let response = await basketNameCheck(inputValue);

//       if (response) {
//         setStatus(false);
//       } else {
//         setStatus(true);
//       }

//       // Dispatch the action to set the basketName only if validation is successful
//       dispatch(setBasketName(inputValue));

//       // Clear any previous input error
//       setInputError(null);
//     } catch (error) {
//       // Validation failed, set the input error message
//       setInputError(error.message);
//     }
//   };

//   return (
//     <div className=''>
//       <input
//         type='text'
//         className='sm:w-16 md:w-32 rounded-md border-gray-300'
//         value={basketName}
//         onChange={handleChange}
//         autoFocus={true}
//         ref={inputRef}
//       />
//       {inputError && <p className='text-xs text-red-700 mt-2'>{inputError}</p>}
//       {status && <p className='text-xs text-red-700 mt-2'>Basket name already exists!</p>}
//     </div>
//   );
// };

// export default BasketName;
