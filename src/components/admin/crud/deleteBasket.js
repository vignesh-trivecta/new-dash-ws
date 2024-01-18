import { deleteBasket } from '@/app/api/mainBasket/route';
import { DeleteModal } from '@/components/page/deleteModal';
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';

const DeleteBasket = ({ handleFetch, setHandleFetch, basketName, setMessage }) => {

    const adminId = useSelector((state) => state.user.username);

    const handleDelete = async() => {
        const { status, data } = await deleteBasket( basketName, adminId );

        if (status === 200) {
            setHandleFetch(!handleFetch);
        } else {
            setMessage(data.messages);
        }
    }
  return (
    <div>
        <DeleteModal 
            type={'svg'}
            deleteFunction={handleDelete}
        />
    </div>
  )
}

export default DeleteBasket;
