import React from 'react';
import { deleteRecordMainAPI } from '@/app/api/mainBasket/route';
import { deleteRecord } from '@/app/api/tempBasket/route';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { DeleteModal } from '@/components/page/deleteModal';

const DeleteRecord = ({ recId, mainBasketName, basketName, handleFetch, setHandleFetch, setMessage }) => {

    let pathname = usePathname();

    const adminId = useSelector((state) => state.user.username);

    const handleDelete = async() => {
        if((pathname == `/admin/baskets/view/${mainBasketName}/update`) && (mainBasketName.includes("%20"))){
            const {status, data} = await deleteRecordMainAPI(recId, basketName, adminId );
            if (status === 200) {
                setHandleFetch(!handleFetch);  
                setMessage("");         
            } else {
                setMessage(data?.messages);
            }         
        }
        else if(pathname == `/admin/baskets/view/${mainBasketName}/update`){
            const {status, data} = await deleteRecordMainAPI(recId, basketName, adminId );
            if (status === 200) {
                setHandleFetch(!handleFetch);  
                setMessage("");         
            } else {
                setMessage(data?.messages);
            }           
        }
        else{
            const {status, data} = await deleteRecord(recId, basketName, adminId );
            if (status === 200) {
                setHandleFetch(!handleFetch);
            } else {
                setMessage(data?.messages);
            }
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
