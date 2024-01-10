import React from 'react';
import { deleteRecordMainAPI } from '@/app/api/mainBasket/route';
import { deleteRecord } from '@/app/api/tempBasket/route';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { DeleteModal } from '@/components/page/deleteModal';

const DeleteRecord = ({ recId, mainBasketName, basketName, handleFetch, setHandleFetch }) => {

    let pathname = usePathname();

    const adminId = useSelector((state) => state.user.username);

    const handleDelete = async() => {
        if((pathname == `/admin/baskets/view/${mainBasketName}/update`) && (mainBasketName.includes("%20"))){
            const response = await deleteRecordMainAPI(recId, basketName, adminId );
            setHandleFetch(!handleFetch);           
        }
        else if(pathname == `/admin/baskets/view/${mainBasketName}/update`){
            const response = await deleteRecordMainAPI(recId, basketName, adminId );
            setHandleFetch(!handleFetch);           
        }
        else{
            const response = await deleteRecord(recId, basketName, adminId );
            setHandleFetch(!handleFetch);
        }
    }

  return (
    <div>
        <DeleteModal 
            type={"svg"}
            deleteFunction={handleDelete}
        />
    </div>
  )
}

export default DeleteRecord
