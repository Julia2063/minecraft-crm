import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { Input } from "./Input";

export const AdditionalWork = ({ order, setOrder, disabled}) => {
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        if(order.additionalWork.title.length > 0) {
            setIsAdd(true);
        }
    }, [order])

    const handleAddWork = () => {
        setIsAdd(!isAdd);
    };

    const handleChange = (e, name) => {
        setOrder({
            ...order,
            additionalWork: {
                ...order.additionalWork, 
                [name]: e.target.value,
            }
        })
    };

    return (
        <div className='flex lg:flex-row flex-col gap-[40px] items-center w-full'>
            <span className="font-bold">Дополнительные работы</span>
  
            {!disabled && (
                <button 
                    className="w-max items-center border border-gray-700 px-[10px] py-[5px] rounded bg-white" 
                    type='button'
                    onClick={handleAddWork}
                >
                 {isAdd ? <AiOutlineMinus /> : <BsPlusLg/> }
                
            </button>
            )}
            

            {isAdd && (
                <div className="w-full">
                <Input 
                    title="Название"
                    tag='input'
                    name="title"
                    value={order.additionalWork.title} 
                    handleChange={(e) => handleChange(e, 'title')}
                    labelStyle="flex justify-between items-center gap-[40px] w-full"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                    disabled={disabled}
                />
                <Input 
                    title="TЗ"
                    name="tz"
                    value={order.additionalWork.tz} 
                    handleChange={(e) => handleChange(e, 'tz')}
                    labelStyle="flex justify-between items-center gap-[40px] w-full"
                    inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                    disabled={disabled}
                />
               <Input 
                    title="Чел/Часы"
                    tag='input'
                    type='number'
                    name="hh"
                    value={order.additionalWork.hh} 
                    handleChange={(e) => handleChange(e, 'hh')}
                    labelStyle="flex justify-between items-center gap-[40px] w-full"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                    disabled={disabled}
                />
                <Input 
                    title="Цена"
                    tag='input'
                    type='number'
                    name="price"
                    value={order.additionalWork.price} 
                    handleChange={(e) => handleChange(e, 'price')}
                    labelStyle="flex justify-between items-center gap-[40px] w-full"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                    disabled={disabled}
                />
                <Input 
                    title="Сроки"
                    tag='input'
                    type='date'
                    name="end"
                    value={order.additionalWork.end} 
                    handleChange={(e) => handleChange(e, 'end')}
                    labelStyle="flex justify-between items-center gap-[40px] w-full"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                    disabled={disabled}
                />
                </div>
            )}
        </div>
    )
}
