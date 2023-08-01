import { useState, useEffect, useContext } from 'react';

import cn from 'classnames';
import { updateFieldInDocumentInCollection } from '../helpers/firebaseControl';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { sendMessageTelegram } from '../helpers/functions';
import { OrderFieldsModel } from '../Models/OrderFieldsModel';

export const Approve = ({ formData, name, disabled, usersArrayGetApprove, getApprove, usersArrayApprove, down }) => {

    const { userRole } = useContext(AppContext);

    const getFieldName = () => {
        const field = OrderFieldsModel.find(el => el.key === name );
        return field.name;
    };

    const handleGetApproval = async () => {
        try {
            getApprove(name);
            const message = `${getFieldName()} заказа ${formData.id} отправлен на согласование`;
            sendMessageTelegram(message, usersArrayGetApprove);
        } catch(errror) {
            console.log(errror)
            toast.error('Something went wrong...')
        }
        
    };

    const handleReturnGetApproval = async (value) => {
        try {
            await updateFieldInDocumentInCollection('orders', formData.idPost, name, {...formData[name], approve: value});
            toast.success('Запрос согласования удален');
        } catch(errror) {
            console.log(errror)
            toast.error('Something went wrong...')
        }
        
    };

    const handleApprove = async(value) => {
        try {
            await updateFieldInDocumentInCollection('orders', formData.idPost, name, {...formData[name], approve: value });
            toast.success(value === 'yes' ? 'Согласовано' : "Отклонено");
            const message = `${getFieldName()} заказа ${formData.id} ${value === 'yes' ? 'согласован' : "отклонен"}`;
            sendMessageTelegram(message, usersArrayApprove);
        } catch(errror) {
            console.log(errror)
            toast.error('Something went wrong...')
        }
    };

    return (
        <label className={cn('absolute left-[80%] top-[-10px] ', {'top-[20px]' : down})}>
            {userRole.includes('executor') ? (
                <>
                {(formData[name].approve === '' || formData[name].approve === 'no') && 
                    <button 
                        disabled={disabled || formData[name].text?.length === 0 || formData[name].files?.length === 0}
                        type='button'
                        onClick={handleGetApproval}
                        className='border-2 border-red-500 text-red-500 rounded-[10px] flex items-center justify-center disabled:opacity-50'
                    >
                        get Approval?
                    </button>
                 }
                {formData[name].approve === 'wait' && (
                    <>
                      {userRole === 'executor_admin' ? (
                        <button 
                            type='button'
                            className='border-2 border-gray-500 text-gray-500 rounded-[10px] flex   items-center justify-center'
                            onClick={() => handleReturnGetApproval('')}
                        >
                            Waiting...
                        </button>
                      ) : (
                        <div className='border-2 border-gray-500 text-gray-500 rounded-[10px] flex items-center justify-center'>
                            Waiting...
                        </div>
                      )}
                        
                    </>
                    
                )}
                {formData[name].approve === 'yes' && (
                    <div className='border-2 border-green-500 text-green-500 rounded-[10px] flex items-center justify-center'>
                        APPROVE
                    </div>
                )}
                </>
                
            ) : (
                <>
                    {formData[name].approve === 'wait' && (
                        <div className='flex gap-[10px]'>
                            <button 
                                disabled={disabled}
                                type='button'
                                onClick={() => handleApprove('yes')}
                                className='border-2 border-green-500 text-green-500 rounded-[10px] flex items-center justify-center disabled:opacity-50'
                            >
                                Approve?
                            </button>
                            <button 
                                disabled={disabled}
                                type='button'
                                onClick={() => handleApprove('no')}
                                className='border-2 border-red-500 text-red-500 rounded-[10px] flex items-center justify-center disabled:opacity-50'
                            >
                                Reject?
                            </button>
                        </div>
                    )}
                    {formData[name].approve === 'yes' && (
                        <>
                        {userRole === 'customer_admin' ? (
                             <button
                                type='button'
                                className='border-2 border-green-500 text-green-500 rounded-[10px] flex items-center justify-center'
                                onClick={() => handleReturnGetApproval('wait')}
                             >
                                 APPROVE
                            </button>
                        ) : (
                            <div
                                className='border-2 border-green-500 text-green-500 rounded-[10px] flex items-center justify-center'
                                >
                                    APPROVE
                            </div>
                      
                             
                        )}
                        </> 
                    )}
                    {formData[name].approve === 'no' && (

                        <>
                             {userRole === 'customer_admin' ? (
                                    <button
                                        type='button'
                                        className='border-2 border-red-500 text-red-500 rounded-[10px] flex items-center justify-center'
                                        onClick={() => handleReturnGetApproval('wait')}
                                    >
                                        NON APPROVE
                                    </button>
                                ) : (
                                        <div
                                            className='border-2 border-red-500 text-red-500 rounded-[10px] flex items-center justify-center'
                                        >
                                            NOT APPROVE
                                        </div>
                                )}

                        
                        </>
                        
                    )}
                </>
                
            )}
            
            
           

           {/*  <input 
                type="checkbox" 
                checked={on}
                onChange={(e) => handleChange(e)}   
                disabled={realDesabled} 
            />
             <span></span> */}
        </label>  
    )
};