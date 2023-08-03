import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Approve } from "./Approve"
import { Comments } from "./Comments"
import { Input } from "./Input"
import { InputFile } from "./InputFile"
import AccessModel from '../Models/AccessModel.json';

export const View1 = ({ 
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
        <Input 
                disabled
                name="concept"
                type='text'
                tag='textarea'
                defaultValue={order.concept.text} 
                placeholder="Введите описание концепта"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 "
              />
            <InputFile
                title='Концепт'
                name='concept'
                array={order.concept.files}
                disabled
            />


            <Approve
                formData={order}
                setFormData={setOrder}
                name={'concept'}
                disabled={AccessModel.concept.change__role.every(el => !userRole.includes(el))}
                usersArrayApprove={users.filter(el => AccessModel.concept.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
            />
            <Comments
                className='self-end'
                title='Концепту'
                comments={order.concept.comments}
                onChange={(e) => setNewComment({ ...newComment, concept: e.target.value })}
                currentOrder
                handleAddNewComment={() => handleAddNewComment('concept')}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={10}
            />
        </div>
        <div className="border-b border-[#E9E9E9] pb-[20px] relative flex flex-col gap-[20px]">
                <Input
                    title="Функционал"
                    name="functional"
                    type='text'
                    tag='textarea'
                    defaultValue={order.functional.text}
                    placeholder="Введите описание функционала"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                    disabled
                />

                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'functional'}
                    disabled={AccessModel.functional.change__role.every(el => !userRole.includes(el))}
                    usersArrayApprove={users.filter(el => AccessModel.functional.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                />

                <Comments
                    className='self-end'
                    title='функционалу'
                    comments={order.functional.comments}
                    onChange={(e) => setNewComment({ ...newComment, functional: e.target.value })}
                    currentOrder
                    handleAddNewComment={() => handleAddNewComment('functional')}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={8}
                 />
            </div>
            <div className="flex flex-col gap-[10px] relative">
                <Input
                    disabled
                    title="Research"
                    name="research"
                    type='text'
                    tag='textarea'
                    defaultValue={order.research.text}
                    handleChange={(e) => setOrder({ ...order, research: { ...order.research, text: e.target.value } })}
                    placeholder="Введите задание для Research"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />

                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'research'}
                    disabled={AccessModel.research.change__role.every(el => !userRole.includes(el))}
                    usersArrayApprove={users.filter(el => AccessModel.research.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                />

                <Comments
                    className='self-end'
                    title='Research'
                    comments={order.research.comments}
                    onChange={(e) => setNewComment({ ...newComment, research: e.target.value })}
                    currentOrder
                    handleAddNewComment={() => handleAddNewComment('research')}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={9}
                />
            </div>
        </>
    )
}