import { useContext } from 'react';
import AccessModel from '../Models/AccessModel.json';
import { AppContext } from '../context/AppContext';
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { Button } from './Button';
import { updateFieldInDocumentInCollection } from '../helpers/firebaseControl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const View6 = ({ order }) => {
    const {userRole} = useContext(AppContext);

    const navigate = useNavigate();

    const handleDesactive = async() => {
        try {
            await updateFieldInDocumentInCollection('orders', order.idPost, 'active', false);
            toast.success('Заказ перемещен в архив');
            navigate('/orderList');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong...');
        }
    };

    return (
        <div className='flex flex-col gap-[20px]'>
            {AccessModel.paymentStages.show__role.some(el => userRole.includes(el)) && (
            <label className="flex flex-col gap-[10px]">
            <span className="font-bold lg:text-[20px] text-[16px]">Статус оплаты</span>
             {Object.entries(order.paymentStages).map((el, i) => {
                 return (
                     <label key={i} className="flex gap-[5px] items-center">
                         <span>{`${el[1].value} %`}</span>
                         {el[1].success ? <MdDone color="green" /> : <RxCross1 color="red"/>}
                     </label>
                 )
             })}
            </label>
        )}
         <Button
                type="submit"
                label='Принять'
                className='self-center disabled:opacity-25' 
                callback={handleDesactive}
                disabled={Object.values(order.paymentStages).some(el => !el.success)}
            />
        </div>
    )
}