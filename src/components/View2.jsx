import { useContext } from "react";
import { Approve } from "./Approve";
import { Comments } from "./Comments";
import { Input } from "./Input";
import { InputFile } from "./InputFile";
import { PaymentStages } from "./PaymentStages";
import { AppContext } from "../context/AppContext";

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
        <>
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
            
                <label className="flex justify-between items-center">
                    <span className="font-bold">Figma link</span>
                    <div className="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                >
                    {order.figma.text.length > 0 && (
                        <a href={order.figma.text} target="_blank">ссылка</a>
                    )}
                    
                    </div>
                </label>
                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'figma'}
                    disabled={!userRole.includes('designer') && !userRole.includes('admin')}
                    usersArrayApprove={users.filter(el => el.role === 'executor_designer').map(el => el.telegramId)}
                />
            </div>
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
                <Input
                    disabled
                    title="ТЗ"
                    name="tz"
                    type='text'
                    tag='textarea'
                    value={order.tz.text}
                    placeholder="Введите текст Технического Задания"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />

                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'tz'}
                    disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                    usersArrayApprove={users.filter(el => el.role === 'executor_tex').map(el => el.telegramId)}
                    
                />
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
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
                <Input
                    disabled
                    title="План работ"
                    name="plan"
                    type='text'
                    tag='textarea'
                    value={order.plan.text}
                    placeholder="Опишите план работ"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />

                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'plan'}
                    disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                    usersArrayApprove={users.filter(el => el.role === 'executor_teh').map(el => el.telegramId)}
                    />
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
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
            <label className="flex justify-between items-center">
                    <span className="font-bold">Контент link</span>
                    <div className="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                >
                    {order.content.text.length > 0 && (
                        <a href={order.content.text} target="_blank">ссылка</a>
                    )}
                    
                    </div>
                </label>
                <InputFile
                    disabled
                    title='Контент'
                    name='content'
                    array={order.content.files}
                />


                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'content'}
                    disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                    usersArrayApprove={users.filter(el => el.role === 'executor_teh').map(el => el.telegramId)}
                    /> 
            

                <Comments
                    className='self-end'
                    title='Концепту'
                    comments={order.content.comments}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    currentOrder
                    handleAddNewComment={() => handleAddNewComment('content')}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={17}
                    
                    />
            </div>
            <div className="flex flex-row gap-[20px] border-b border-[#E9E9E9] pb-[20px]">
                {userRole.includes('financier') && (
                <label className="relative w-1/2">
                    <Input
                        disabled
                        title="Итоговая цена"
                        name="price"
                        type='number'
                        tag='input'
                        value={order.price}
                        labelStyle="flex-col w-full"
                        inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                        min={0}
                        step="0.01" />
                    <Approve
                        formData={order}
                        setFormData={setOrder}
                        name={'price'}
                        disabled={!userRole.includes('financier') && !userRole.includes('admin')}
                        usersArrayApprove={users.filter(el => el.role === 'executor_financier').map(el => el.telegramId)}
                        down />
                </label>

                )}
                

                <label className="relative w-1/2">
                    <Input
                        disabled
                        title="Дата сдачи"
                        name="end"
                        type='date'
                        tag='input'
                        value={order.end.text}
                        labelStyle="flex-col w-full"
                        inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />
                    <Approve
                        formData={order}
                        setFormData={setOrder}
                        name={'end'}
                        disabled={!userRole.includes('financier') && !userRole.includes('admin')}
                        usersArrayApprove={users.filter(el => el.role === 'executor_financier').map(el => el.telegramId)} 
                        down />
                </label>
            </div>
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
                <InputFile
                    disabled
                    title='Договор'
                    name='contract'
                    array={order.contract.files}
                    file
                />
                <Approve 
                formData={order}
                setFormData={setOrder}
                name='contract'
                disabled={!userRole.includes('financier') && !userRole.includes('admin')}
                usersArrayApprove={users.filter(el => el.role === 'executor_financier').map(el => el.telegramId)} 
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
            <div className="border-b border-[#E9E9E9] pb-[20px]">
                <PaymentStages
                    disabled
                    title='Стадии предоплат'
                    order={order}
                    setOrder={setOrder} />
            </div><div>
                <Input
                    disabled
                    title="Чел/Часы"
                    name="hh"
                    type='number'
                    tag='input'
                    value={order.hh}
                    labelStyle="flex-col w-1/3"
                    inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                    min={0} />
            </div>
        </>
    )
}