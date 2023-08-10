import { useContext } from "react";
import { Approve } from "./Approve";
import { Comments } from "./Comments";
import { Input } from "./Input";
import { InputFile } from "./InputFile";
import { PaymentStages } from "./PaymentStages";
import { AppContext } from "../context/AppContext";
import AccessModel from '../Models/AccessModel.json';

export const View2 = ({
    order, 
    setOrder, 
    newComment, 
    setNewComment, 
    handleAddNewComment,  
    activeIndex,
    setActiveIndex
}) => {
    const {users, userRole} = useContext(AppContext);

    return (
        <div className="flex flex-col gap-[20px]">
            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
            
                <label className="flex flex-col justify-between">
                <div className="flex justify-between">
                    <span className="font-bold lg:text-[20px] text-[16px] opacity-0">Figma link</span>
                    <Approve
                        formData={order}
                        setFormData={setOrder}
                        name={'figma'}
                        disabled={AccessModel.figma.change__role.every(el => !userRole.includes(el))}
                        usersArrayApprove={users.filter(el => AccessModel.figma.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                    />
                </div>
                <div className="flex justify-between lg:flex-row flex-col">
                    <span className="font-bold lg:text-[20px] text-[16px]">Figma link</span>
                    <div className="lg:w-3/4 w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                >
                    {order.figma.text.length > 0 && (
                        <a href={order.figma.text} target="_blank">ссылка</a>
                    )}
                    
                    </div>

                </div>
                
                </label>
                
            </div>
            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
            <div className="flex justify-between">
              <span className="font-bold lg:text-[20px] text-[16px]">Тexническое задание</span>
              <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'tz'}
                    disabled={AccessModel.tz.change__role.every(el => !userRole.includes(el))}
                    usersArrayApprove={users.filter(el => AccessModel.tz.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                    
                />
            </div>
                <Input
                    disabled
                    title="ТЗ"
                    name="tz"
                    type='text'
                    tag='textarea'
                    defaultValue={order.tz.text}
                    placeholder="Введите текст Технического Задания"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />

                
                <Comments
                    className='self-end'
                    title='ТЗ'
                    comments={order.tz.comments}
                    onChange={(e) => setNewComment({ ...newComment, tz: e.target.value })} 
                    currentOrder
                    handleAddNewComment={() => handleAddNewComment('tz')}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={15}
                />
            </div>

            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
            <div className="flex justify-between">
              <span className="font-bold lg:text-[20px] text-[16px]">План работ</span>
              <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'plan'}
                    disabled={AccessModel.plan.change__role.every(el => !userRole.includes(el))}
                    usersArrayApprove={users.filter(el => AccessModel.plan.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                    />
            </div>
                <Input
                    disabled
                    title="План работ"
                    name="plan"
                    type='text'
                    tag='textarea'
                    defaultValue={order.plan.text}
                    placeholder="Опишите план работ"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />

               
                <Comments
                    className='self-end'
                    title='Плану работ'
                    comments={order.plan.comments}
                    onChange={(e) => setNewComment({ ...newComment, plan: e.target.value })}
                    currentOrder
                    handleAddNewComment={() => handleAddNewComment('plan')}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={16}
                />
            </div>

            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
            <label className="flex flex-col gap-[10px]">
            <div className="flex justify-between">
              <span className="font-bold lg:text-[20px] text-[16px]">Контент</span>
                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'content'}
                    disabled={AccessModel.content.change__role.every(el => !userRole.includes(el))}
                    usersArrayApprove={users.filter(el => AccessModel.content.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                /> 
            </div>
            <div className="flex lg:flex-row flex-col justify-between">
                 <span className="font-bold">link</span>
                <div className="lg:w-3/4 w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                >
                    {order.content.text.length > 0 && (
                        <a href={order.content.text} target="_blank">ссылка</a>
                    )}
                    
                    </div>
            </div>
               
                </label>
                <InputFile
                    disabled
                    title='Контент'
                    name='content'
                    array={order.content.files}
                />


                <Comments
                    className='self-end'
                    title='Контенту'
                    comments={order.content.comments}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    currentOrder
                    handleAddNewComment={() => handleAddNewComment('content')}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={17}
                    
                    />
            </div>
            <div className="flex lg:flex-row flex-col gap-[20px] border-b border-[#333232] pb-[20px]">
                {AccessModel.price.show__role.some(el => userRole.includes(el))  && (
                <label className="relative lg:w-1/2 w-full">
                    <div className="flex justify-between">
                        <span className="font-bold lg:text-[20px] text-[16px]">Итоговая цена</span>
                        <Approve
                            formData={order}
                            setFormData={setOrder}
                            name={'price'}
                            disabled={AccessModel.price.change__role.every(el => !userRole.includes(el))}
                            usersArrayApprove={users.filter(el => AccessModel.price.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                        />
                    </div>
                    <Input
                        disabled
                        name="price"
                        type='number'
                        tag='input'
                        defaultValue={order.price}
                        labelStyle="flex-col w-full"
                        inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                        min={0}
                        step="0.01" />
                    
                </label>

                )}
                

                <label className="relative lg:w-1/2 w-full">
                    <div className="flex justify-between">
                        <span className="font-bold lg:text-[20px] text-[16px]">Дата сдачи</span>
                        <Approve
                            formData={order}
                            setFormData={setOrder}
                            name={'end'}
                            disabled={AccessModel.end.change__role.every(el => !userRole.includes(el))}
                            usersArrayApprove={users.filter(el => AccessModel.end.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                        />
                    </div>
                    <Input
                        disabled
                        name="end"
                        type='date'
                        tag='input'
                        defaultValue={order.end.text}
                        labelStyle="flex-col w-full"
                        inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />
                    
                </label>
            </div>
            
            {AccessModel.contract.show__role.some(el => userRole.includes(el)) && (
            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
            <div className="flex justify-between">
              <span className="font-bold  lg:text-[20px] text-[16px]">Договор</span>
              <Approve 
                    formData={order}
                    setFormData={setOrder}
                    name='contract'
                    disabled={AccessModel.contract.change__role.every(el => !userRole.includes(el))}
                    usersArrayApprove={users.filter(el => AccessModel.contract.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
              />
            </div>
                <InputFile
                    disabled
                    title='Договор'
                    name='contract'
                    array={order.contract.files}
                />
                
               <Comments
                className='self-end' 
                title='Контракту'
                comments={order.contract.comments}
                onChange={(e) => setNewComment({...newComment, contract: e.target.value})}
                currentOrder
                handleAddNewComment={() => handleAddNewComment('contract')} 
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={18}
              />

            </div>
            )}

        {AccessModel.paymentStages.show__role.some(el => userRole.includes(el)) && (
             <div className="border-b border-[#333232] pb-[20px]">
                <PaymentStages
                    disabled
                    title='Стадии предоплат'
                    order={order}
                    setOrder={setOrder} />
            </div>
        )}
            
           
            <div>
                <Input
                    disabled
                    title="Чел/Часы"
                    name="hh"
                    type='number'
                    tag='input'
                    defaultValue={order.hh}
                    labelStyle="flex-col w-1/3"
                    inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                    min={0} 
                />
            </div>
        </div>
    )
}