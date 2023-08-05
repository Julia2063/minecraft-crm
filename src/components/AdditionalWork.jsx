import {  useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { Input } from "./Input";

export const AdditionalWork = ({ order, newAddWork,
    setNewAddWork, disabled}) => {
    const [isAdd, setIsAdd] = useState(false);

    const handleAddWork = () => {
        setIsAdd(!isAdd);
    };

    

    const handleChange = (e, name) => {
        setNewAddWork({
            ...newAddWork,
            [name]: e.target.value,
        })
    };

    return (
        <div className="flex flex-col gap-[20px] pt-[10px]">
            <span className="font-bold lg:text-[20px] text-[16px]">Дополнительные работы</span>
            <div className='flex flex-col gap-[40px] w-full'>
            
  
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
              <div className="w-full flex flex-col gap-[10px] border-b border-[#333232] pb-[20px] px-[0px] lg:px-[60px]">
                <Input 
                    title="Название"
                    tag='input'
                    name="title"
                    value={newAddWork.title} 
                    handleChange={(e) => handleChange(e, 'title')}
                    labelStyle="flex justify-between lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                    disabled={disabled}
                    isAddWork
                />
                <Input 
                    title="TЗ"
                    name="tz"
                    value={newAddWork.tz} 
                    handleChange={(e) => handleChange(e, 'tz')}
                    labelStyle="flex justify-between lg:items-center gap-[5px] lg:gap-[40px] w-full lg:flex-row flex-col"
                    
                    disabled={disabled}
                    isAddWork
                />
               <Input 
                    title="Чел/Часы"
                    tag='input'
                    type='number'
                    name="hh"
                    value={newAddWork.hh} 
                    handleChange={(e) => handleChange(e, 'hh')}
                    labelStyle="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 disabled:opacity-50"
                    disabled={disabled}
                    isAddWork
                />
                <Input 
                    title="Цена"
                    tag='input'
                    type='number'
                    name="price"
                    value={newAddWork.price} 
                    handleChange={(e) => handleChange(e, 'price')}
                    labelStyle="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 disabled:opacity-50"
                    disabled={disabled}
                    isAddWork
                />
                <Input 
                    title="Сроки"
                    tag='input'
                    type='date'
                    name="end"
                    value={newAddWork.end} 
                    handleChange={(e) => handleChange(e, 'end')}
                    labelStyle="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 disabled:opacity-50"
                    disabled={disabled}
                    isAddWork
                />
                </div>
            )}

           
        </div> 
        {order.additionalWork.length > 0 && order.additionalWork.map(el => {
                return (
                    <div className=" px-[0px] lg:px-[60px] w-full flex flex-col gap-[10px] border-b border-[#333232] pb-[20px]">
                <Input 
                    disabled
                    title="Название"
                    tag='input'
                    name="title"
                    defaultValue={el.title} 
                    handleChange={(e) => handleChange(e, 'title')}
                    labelStyle="flex justify-between lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                    isAddWork
                />
                <Input 
                    title="TЗ"
                    name="tz"
                    defaultValue={el.tz} 
                    handleChange={(e) => handleChange(e, 'tz')}
                    labelStyle="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    
                    disabled
                    isAddWork

                />
               <Input 
                    title="Чел/Часы"
                    tag='input'
                    type='number'
                    name="hh"
                    defaultValue={el.hh}  
                    handleChange={(e) => handleChange(e, 'hh')}
                    labelStyle="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 disabled:opacity-50"
                    disabled
                    isAddWork
                />
                <Input 
                    title="Цена"
                    tag='input'
                    type='number'
                    name="price"
                    defaultValue={el.price} 
                    handleChange={(e) => handleChange(e, 'price')}
                    labelStyle="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 disabled:opacity-50"
                    disabled
                    isAddWork
                />
                <Input 
                    title="Сроки"
                    tag='input'
                    type='date'
                    name="end"
                    defaultValue={el.end} 
                    handleChange={(e) => handleChange(e, 'end')}
                    labelStyle="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col"
                    inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 disabled:opacity-50"
                    disabled
                    isAddWork
                />
                </div>
                )
            })}
        </div>
       

        
    )
}
