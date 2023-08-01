import { useContext } from "react"
import { Approve } from "./Approve"
import { Button } from "./Button"
import { Comments } from "./Comments"
import { Input } from "./Input"
import { InputFile } from "./InputFile"
import { AppContext } from "../context/AppContext"

export const Form1 = ({
    order,
    handleChange, 
    setOrder, 
    newComment, 
    setNewComment,
    handleSubmit,
    handleChangePhotos, 
    handleDeletePhoto,
    getApprove,
    activeIndex,
    setActiveIndex
}) => {

  const { users, userRole } = useContext(AppContext);

  console.log(!userRole.includes('designer') && !userRole.includes('admin'))

  return (
    <form className="pt-6 flex flex-col gap-[20px]" onSubmit={handleSubmit}>
         <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
              <Input 
                disabled={order.concept.approve === 'yes' || order.concept.approve === 'wait'}
                name="concept"
                type='text'
                tag='textarea'
                value={order.concept.text} 
                handleChange={handleChange}
                placeholder="Введите описание концепта"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 "
              />
              <InputFile
                disabled={order.concept.approve === 'yes' || order.concept.approve === 'wait'}
                title='Концепт'
                name='concept'
                handleChange={(e) => handleChangePhotos(e, 'concept')}
                array={order.concept.files}
                handleDeletePhoto={handleDeletePhoto}
              />
            
              
              <Approve 
                formData={order}
                setFormData={setOrder}
                name={'concept'}
                getApprove={getApprove}
                disabled={!userRole.includes('designer') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_designer').map(el => el.telegramId)}
              />
              <Comments
                className='self-end' 
                title='Концепту'
                comments={order.concept.comments}
                onChange={(e) => setNewComment({...newComment, concept: e.target.value})}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={5}
              />
        </div>
        <div className="border-b border-[#E9E9E9] pb-[20px] relative flex flex-col gap-[20px]">
            <Input
                disabled={order.functional.approve === 'yes' || order.functional.approve === 'wait'}
                title="Функционал"
                name="functional"
                type='text'
                tag='textarea'
                value={order.functional.text} 
                handleChange={handleChange}
                placeholder="Введите описание функционала"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
            />

            <Approve 
                formData={order}
                setFormData={setOrder}
                name={'functional'}
                getApprove={getApprove}
                disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_teh').map(el => el.telegramId)}
              />

            <Comments
                className='self-end' 
                title='функционалу'
                comments={order.functional.comments}
                onChange={(e) => setNewComment({...newComment, functional: e.target.value})}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={6}
              />
        </div>

        <div className="flex flex-col gap-[10px] relative">
              <Input 
                disabled={order.research.approve === 'yes' || order.research.approve === 'wait'}
                title="Research"
                name="research"
                type='text'
                tag='textarea'
                value={order.research.text} 
                handleChange={(e) => setOrder({...order, research: {...order.research, text: e.target.value }})}
                placeholder="Введите задание для Research"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  

              <Approve 
                formData={order}
                setFormData={setOrder}
                name={'research'}
                getApprove={getApprove}
                disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_teh').map(el => el.telegramId)}
              />

              <Comments
                className='self-end' 
                title='Research'
                comments={order.research.comments}
                onChange={(e) => setNewComment({...newComment, research: e.target.value})}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={7}
              />
        </div>
        <Button
              type="submit" 
              label='Сохранить изменения' 
              className='self-end'
            /> 
    </form>
  )
}