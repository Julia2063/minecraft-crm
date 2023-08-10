import {  useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { Input } from "./Input";
import { Button } from "./Button";
import { toast } from "react-toastify";
import { updateFieldInDocumentInCollection } from "../helpers/firebaseControl";

export const AdditionalWork = ({ order, newAddWork,
    setNewAddWork, disabled, isAdd, setIsAdd, handleAddNewAddWork}) => {

    const handleAddWork = () => {
        setIsAdd(!isAdd);
    };

    

    const handleChange = (e, name) => {
        setNewAddWork({
            ...newAddWork,
            [name]: e.target.value,
        })
    };

    const handleDelete = async(index) => {
        const newArray = order.additionalWork.filter((el, i) => i !== index);
        try {
            await updateFieldInDocumentInCollection('orders', order.idPost, 'additionalWork', newArray);
            toast.success('Доп работы успешно удалены')
        } catch(error) {
            console.log(error);
            toast.error('Something went wrong...');
        }
    }

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

                <Button
                    type="button" 
                    label='Сохранить доп работы' 
                    className='self-end'
                    callback={handleAddNewAddWork}
                />
                </div>
            )}
        </div> 

        {order.additionalWork.length > 0 && order.additionalWork.sort((a, b) => new Date(b.dateCreating) - new Date(a.dateCreating)).map((el, i) => {
                return (
                <div className=" px-[0px] lg:px-[60px] w-full flex flex-col gap-[10px] border-b border-[#333232] pb-[20px]" key={el.dateCreating}>

                    {!disabled && (
                        <button 
                            className="w-max items-center border border-gray-700 px-[10px] py-[5px] rounded bg-white self-end" 
                            type='button'
                            onClick={() => {handleDelete(i)}}
                        >
                            <AiOutlineMinus /> 
                    
                        </button>
                    )}
                    
                    <label className="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col">
                        <span className="font-bold lg:text-[16px] text-[10px]">
                            Название
                        </span>
                        <div className="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 opacity-50 leading-[36px]">
                            {el.title}
                        </div>
                    </label>
                    
                    <label className="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col">
                        <span className="font-bold lg:text-[16px] text-[10px]">
                            TЗ
                        </span>
                        <div className="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 opacity-50 leading-[36px]">
                            {el.tz}
                        </div>
                    </label>
                    
                    <label className="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col">
                        <span className="font-bold lg:text-[16px] text-[10px]">
                            Чел/Часы
                        </span>
                        <div className="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 opacity-50 leading-[36px]">
                            {el.hh}
                        </div>
                    </label>

                    <label className="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col">
                        <span className="font-bold lg:text-[16px] text-[10px]">
                            Цена
                        </span>
                        <div className="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 opacity-50 leading-[36px]">
                            {el.price}
                        </div>
                    </label>

                    <label className="flex justify-between gap-[5px] lg:items-center lg:gap-[40px] w-full lg:flex-row flex-col">
                        <span className="font-bold lg:text-[16px] text-[10px]">
                            Дата создания
                        </span>
                        <div className="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 opacity-50 leading-[36px]">
                            {el.dateCreating}
                        </div>
                    </label>

                </div>
                )
            })}
        </div>
       

        
    )
}
