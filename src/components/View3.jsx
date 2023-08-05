import { MdDone } from 'react-icons/md';
import {RxCross1 } from 'react-icons/rx';
import { Button } from './Button';
import { updateFieldInDocumentInCollection } from '../helpers/firebaseControl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdditionalWork } from './AdditionalWork';

export const View3 = ({ order }) => {
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
        <div className='flex flex-col'>
          <div className="border-b border-[#333232] pb-[20px]  pt-[20px] flex flex-col gap-[10px]">
          <label className="flex justify-between lg:items-center lg:flex-row flex-col">
                <span className="font-bold lg:text-[20px] text-[16px]">Видео</span>
                    <div className="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                >
                    {order.videos.length > 0 && 
                        <a href={order.videos} target="_blank">ссылка</a>
                    }
                    
                    </div>
                </label>
           </div>
           <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex gap-[10px]">
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
            </div>
           <div className="pb-[20px] pt-[20px] flex gap-[10px] border-b border-[#333232] pb-[20px] ">
                <label className="flex flex-col gap-[10px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Процент выполнения</span>
                    <div>
                        <div className='h-[16px] w-[100px] bg-[#9db3f3] rounded'>
                            <div className={`h-[16px] bg-[#375fd5] rounded w-[${(order.execution)}px]`} />
                        </div>
                    </div>
                </label>
            </div>
            <div className="pb-[20px]  pt-[20px] flex flex-col gap-[10px]">
              <AdditionalWork
                order={order}
                disabled
              />
            </div>
            
            <Button
                type="submit"
                label='Принять'
                className='self-end' 
                callback={handleDesactive}
            />
            </div> 
    )
}