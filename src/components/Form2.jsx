import { useContext } from "react"
import { Approve } from "./Approve"
import { Button } from "./Button"
import { Comments } from "./Comments"
import { Input } from "./Input"
import { InputFile } from "./InputFile"
import { PaymentStages } from "./PaymentStages"
import { AppContext } from "../context/AppContext"

export const Form2 = ({ 
    order,
    setOrder, 
    handleChangewithApprove,
    newComment, 
    setNewComment,  
    handleChangePhotos,
    handleDeletePhoto,
    handleChange,
    handleSubmit,
    getApprove,
    activeIndex,
    setActiveIndex
}) => {

  const { users, userRole } = useContext(AppContext);
    return (
        <form className="pt-6 flex flex-col gap-[20px]" onSubmit={handleSubmit}>
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
              <Input
                disabled={order.figma.approve === 'yes' || order.figma.approve === 'wait'}
                title="Figma link"
                name="figma"
                type='text'
                tag='input'
                value={order.figma.text} 
                handleChange={handleChangewithApprove}
                placeholder="Введите адрес ссылки на Figma"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  
              <Approve
                formData={order}
                setFormData={setOrder}
                name={'figma'}
                getApprove={getApprove}
                disabled={!userRole.includes('designer') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_designer').map(el => el.telegramId)}
              />
            </div>

           
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
              <Input 
                disabled={order.tz.approve === 'yes' || order.tz.approve === 'wait'}
                title="ТЗ"
                name="tz"
                type='text'
                tag='textarea'
                value={order.tz.text} 
                handleChange={(e) => setOrder({...order, tz: {...order.tz, text: e.target.value }})}
                placeholder="Введите текст Технического Задания"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  

                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'tz'}
                    getApprove={getApprove}
                    disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                    usersArrayGetApprove={users.filter(el => el.role === 'customer_teh').map(el => el.telegramId)}
                />    

              <Comments
                className='self-end' 
                title='ТЗ'
                comments={order.tz.comments}
                onChange={(e) => setNewComment({...newComment, tz: e.target.value})}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={11}
              />
            </div>

            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
              <Input
                disabled={order.plan.approve === 'yes' || order.plan.approve === 'wait'} 
                title="План работ"
                name="plan"
                type='text'
                tag='textarea'
                value={order.plan.text} 
                handleChange={(e) => setOrder({...order, plan: {...order.plan, text: e.target.value }})}
                placeholder="Опишите план работ"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  

                <Approve
                    formData={order}
                    setFormData={setOrder}
                    name={'plan'}
                    getApprove={getApprove}
                    disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                    usersArrayGetApprove={users.filter(el => el.role === 'customer_teh').map(el => el.telegramId)}
                />    
              <Comments
                className='self-end' 
                title='Плану работ'
                comments={order.plan.comments}
                onChange={(e) => setNewComment({...newComment, plan: e.target.value})}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={12}
              />
            </div>

            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
              <Input 
                disabled={order.content.approve === 'yes' || order.content.approve === 'wait'}
                name="content"
                type='text'
                tag='input'
                value={order.content.text} 
                handleChange={handleChangewithApprove}
                placeholder="Введите ссылку для контента"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />
              <InputFile
                disabled={order.content.approve === 'yes' || order.content.approve === 'wait'}
                title='Контент'
                name='content'
                handleChange={(e) => handleChangePhotos(e, 'content')}
                array={order.content.files}
                handleDeletePhoto={handleDeletePhoto}
              />
            
              
              <Approve 
                formData={order}
                setFormData={setOrder}
                name={'content'}
                getApprove={getApprove}
                disabled={!userRole.includes('teh') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_teh').map(el => el.telegramId)}
              />
              
              <Comments
                className='self-end' 
                title='Контенту'
                comments={order.content.comments}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={13}

              />
        </div>

        
          <div className="flex flex-row gap-[20px] border-b border-[#E9E9E9] pb-[20px]">
            {userRole.includes('financier') && (
          <label className="relative w-1/2">
            <Input 
                disabled={order.price.approve === 'yes' || order.price.approve === 'wait'}
                title="Итоговая цена"
                name="price"
                type='number'
                tag='input'
                value={order.price.text} 
                handleChange={handleChangewithApprove}
                labelStyle="flex-col w-full"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                min={0}
                step="0.01"
              />
              <Approve 
                formData={order}
                setFormData={setOrder}
                name={'price'}
                getApprove={getApprove}
                disabled={!userRole.includes('financier') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_financier').map(el => el.telegramId)}
                down
              />
          </label>
           )}

          <label className="relative w-1/2">
              <Input 
                disabled={order.end.approve === 'yes' || order.end.approve === 'wait'}
                title="Дата сдачи"
                name="end"
                type='date'
                tag='input'
                value={order.end.text} 
                handleChange={handleChangewithApprove}
                labelStyle="flex-col w-full"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
               />
               <Approve 
                formData={order}
                setFormData={setOrder}
                name={'end'}
                getApprove={getApprove}
                disabled={!userRole.includes('financier') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_financier').map(el => el.telegramId)}
                down
                
              />
          </label>
        </div>
       
        

            <div className="border-b border-[#E9E9E9] pb-[20px] relative">
            <InputFile
              disabled={order.contract.approve === 'yes' || order.contract.approve === 'wait'}
              title='Договор'
              name='contract'
              handleChange={(e) => handleChangePhotos(e, 'contract')}
              array={order.contract.files}
              handleDeletePhoto={handleDeletePhoto}
              file
            />
              <Approve 
                formData={order}
                setFormData={setOrder}
                name='contract'
                getApprove={getApprove}
                disabled={!userRole.includes('financier') && !userRole.includes('admin')}
                usersArrayGetApprove={users.filter(el => el.role === 'customer_financier').map(el => el.telegramId)}
              />
               <Comments
                className='self-end' 
                title='Контракту'
                comments={order.contract.comments}
                onChange={(e) => setNewComment({...newComment, contract: e.target.value})}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={14}
              />

            </div>
            <div className="border-b border-[#E9E9E9] pb-[20px]">
              <PaymentStages 
                title='Стадии предоплат'
                order={order}
                setOrder={setOrder}
              />
            </div>

            <div>
            <Input 
                title="Чел/Часы"
                name="hh"
                type='number'
                tag='input'
                value={order.hh} 
                handleChange={handleChange}
                labelStyle="flex-col w-1/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                min={0}
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