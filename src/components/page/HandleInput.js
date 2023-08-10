import { setNewBasketName } from "@/store/addRecordSlice";
import { TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HandleInput({handleNewName}) {
    const [firstName, setFirstName] = useState('');

    const dispatch = useDispatch();
    const value = useSelector((state) => state.add.newBasketName);

    return (
        <>
          <TextInput
          type="text"
            value={value}
            onChange={e => {setFirstName(e.target.value); dispatch(setNewBasketName(e.target.value))}}
          />
        </>
       
    );
}