import { deleteRecord } from '@/app/api/basket/route';
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';

const DeleteRecord = ({ recId, handleFetch, setHandleFetch }) => {

    const basketName = useSelector((state) => state.basket.basketName);
    const adminId = useSelector((state) => state.user.username);

    const handleDelete = async() => {
        const response = await deleteRecord(recId, basketName, adminId );
        console.log(response);
        setHandleFetch(!handleFetch);
    }
  return (
    <div>
        <Link href="#" onClick={handleDelete}>
            <svg className="w-4 h-4 text-gray-500 hover:text-red-500 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
            </svg>
        </Link>
    </div>
  )
}

export default DeleteRecord