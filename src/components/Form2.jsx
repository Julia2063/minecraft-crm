import { useContext, useState } from "react"
import { Approve } from "./Approve"
import { Button } from "./Button"
import { Comments } from "./Comments"
import { Input } from "./Input"
import { InputFile } from "./InputFile"
import { PaymentStages } from "./PaymentStages"
import { AppContext } from "../context/AppContext"
import AccessModel from '../Models/AccessModel.json';

import { StageChangeModal } from "./StageChangeModal"

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
    setActiveIndex,
    handleAddNewComment,
    handleChangeStageWithCondition,
    handleChangeStage
}) => {

  const { users, userRole } = useContext(AppContext);
  const [isWarningModal, setIsWarningModal] = useState(false);
    return (
        <>
        <form className="pt-6 flex flex-col gap-[20px]" onSubmit={handleSubmit}>
        <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
          <div className="flex justify-between">
            <span className="font-bold lg:text-[20px] text-[16px] opacity-0">Figma link</span>
            <Approve
              formData={order}
              setFormData={setOrder}
              name={'figma'}
              getApprove={getApprove}
              disabled={AccessModel.figma.change__role.every(el => !userRole.includes(el))}
              usersArrayGetApprove={users.filter(el => AccessModel.figma.message__form__role.some(e => e === el.role)).map(el => el.telegramId)} 
              usersArrayApprove={users.filter(el => AccessModel.figma.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
              />
          </div>


          <Input
            disabled={(order.figma.approve === 'yes' || order.figma.approve === 'wait') || AccessModel.figma.change__role.every(el => !userRole.includes(el))}
            title="Figma link"
            name="figma"
            type='text'
            tag='input'
            value={order.figma.text}
            handleChange={handleChangewithApprove}
            placeholder="Введите адрес ссылки на Figma"
            labelStyle="flex justify-between lg:items-center lg:flex-row flex-col"
            inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />
        </div>


        <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
          <div className="flex justify-between">
            <span className="font-bold lg:text-[20px] text-[16px]">Тexническое задание</span>
            <Approve
              formData={order}
              setFormData={setOrder}
              name={'tz'}
              getApprove={getApprove}
              disabled={AccessModel.tz.change__role.every(el => !userRole.includes(el))}
              usersArrayGetApprove={users.filter(el => AccessModel.tz.message__form__role.some(e => e === el.role)).map(el => el.telegramId)} 
              usersArrayApprove={users.filter(el => AccessModel.tz.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
            />
          </div>
          <Input
            disabled={(order.tz.approve === 'yes' || order.tz.approve === 'wait') || AccessModel.tz.change__role.every(el => !userRole.includes(el))}
            title="ТЗ"
            name="tz"
            type='text'
            tag='textarea'
            value={order.tz.text}
            handleChange={(e) => setOrder({ ...order, tz: { ...order.tz, text: e.target.value } })}
            placeholder="Введите текст Технического Задания"
            labelStyle="flex justify-between items-center"
            inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />



          <Comments
            className='self-end'
            title='ТЗ'
            comments={order.tz.comments}
            onChange={(e) => setNewComment({ ...newComment, tz: e.target.value })}
            handleAddNewComment={() => handleAddNewComment('tz')}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            index={11} />
        </div>

        <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
          <div className="flex justify-between">
            <span className="font-bold lg:text-[20px] text-[16px]">План работ</span>
            <Approve
              formData={order}
              setFormData={setOrder}
              name={'plan'}
              getApprove={getApprove}
              disabled={AccessModel.plan.change__role.every(el => !userRole.includes(el))}
              usersArrayGetApprove={users.filter(el => AccessModel.plan.message__form__role.some(e => e === el.role)).map(el => el.telegramId)} 
              usersArrayApprove={users.filter(el => AccessModel.plan.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
            />
          </div>
          <Input
            disabled={(order.plan.approve === 'yes' || order.plan.approve === 'wait') || AccessModel.plan.change__role.every(el => !userRole.includes(el))}
            title="План работ"
            name="plan"
            type='text'
            tag='textarea'
            value={order.plan.text}
            handleChange={(e) => setOrder({ ...order, plan: { ...order.plan, text: e.target.value } })}
            placeholder="Опишите план работ"
            labelStyle="flex justify-between items-center"
            inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />


          <Comments
            className='self-end'
            title='Плану работ'
            comments={order.plan.comments}
            onChange={(e) => setNewComment({ ...newComment, plan: e.target.value })}
            handleAddNewComment={() => handleAddNewComment('plan')}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            index={12} />
        </div>

        <div className="border-b  border-[#333232] pb-[20px] flex flex-col gap-[10px] relative">
          <div className="flex justify-between">
            <span className="font-bold lg:text-[20px] text-[16px]">Контент</span>
            <Approve
              formData={order}
              setFormData={setOrder}
              name={'content'}
              getApprove={getApprove}
              disabled={AccessModel.content.change__role.every(el => !userRole.includes(el))}
              usersArrayGetApprove={users.filter(el => AccessModel.content.message__form__role.some(e => e === el.role)).map(el => el.telegramId)} 
              usersArrayApprove={users.filter(el => AccessModel.content.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
              />
          </div>
          <Input
            disabled={(order.content.approve === 'yes' || order.content.approve === 'wait') || AccessModel.content.change__role.every(el => !userRole.includes(el))}
            name="content"
            title='link'
            type='text'
            tag='input'
            value={order.content.text}
            handleChange={handleChangewithApprove}
            placeholder="Введите ссылку для контента"
            labelStyle="flex justify-between lg:items-center lg:flex-row flex-col"
            inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />
          <InputFile
            disabled={(order.content.approve === 'yes' || order.content.approve === 'wait') || AccessModel.content.change__role.every(el => !userRole.includes(el))}
            title='Контент'
            name='content'
            handleChange={(e) => handleChangePhotos(e, 'content')}
            array={order.content.files}
            handleDeletePhoto={handleDeletePhoto} />

          <Comments
            className='self-end'
            title='Контенту'
            comments={order.content.comments}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            handleAddNewComment={() => handleAddNewComment('content')}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            index={13} />
        </div>


        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[20px] border-b border-[#333232] pb-[20px]">
          {AccessModel.price.show__role.some(el => userRole.includes(el)) && (
            <label className="relative lg:w-1/2 w-full">
              <div className="flex justify-between">
                <span className="font-bold lg:text-[20px] text-[16px]">Итоговая цена</span>
                <Approve
                  formData={order}
                  setFormData={setOrder}
                  name={'price'}
                  getApprove={getApprove}
                  disabled={AccessModel.price.change__role.every(el => !userRole.includes(el))}
                  usersArrayGetApprove={users.filter(el => AccessModel.price.message__form__role.some(e => e === el.role)).map(el => el.telegramId)} 
                  usersArrayApprove={users.filter(el => AccessModel.price.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
                />
              </div>
              <Input
                disabled={(order.price.approve === 'yes' || order.price.approve === 'wait') || AccessModel.price.change__role.every(el => !userRole.includes(el))}
                name="price"
                type='number'
                tag='input'
                value={order.price.text}
                handleChange={handleChangewithApprove}
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
                getApprove={getApprove}
                disabled={AccessModel.end.change__role.every(el => !userRole.includes(el))}
                usersArrayGetApprove={users.filter(el => AccessModel.end.message__form__role.some(e => e === el.role)).map(el => el.telegramId)} 
                usersArrayApprove={users.filter(el => AccessModel.end.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
              />
            </div>
            <Input
              disabled={(order.end.approve === 'yes' || order.end.approve === 'wait') || AccessModel.end.change__role.every(el => !userRole.includes(el))}
              name="end"
              type='date'
              tag='input'
              value={order.end.text}
              handleChange={handleChangewithApprove}
              labelStyle="flex-col w-full"
              inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />

          </label>
        </div>


        {AccessModel.contract.show__role.some(el => userRole.includes(el)) && (
            <>
            <div className="border-b border-[#333232] pb-[20px] relative">
              <div className="flex justify-between">
                <span className="font-bold lg:text-[20px] text-[16px]">Договор</span>
                <Approve
                  formData={order}
                  setFormData={setOrder}
                  name='contract'
                  getApprove={getApprove}
                  disabled={AccessModel.contract.change__role.every(el => !userRole.includes(el))}
                  usersArrayGetApprove={users.filter(el => AccessModel.contract.message__form__role.some(e => e === el.role)).map(el => el.telegramId)}
                  usersArrayApprove={users.filter(el => AccessModel.contract.message__view__role.some(e => e === el.role)).map(el => el.telegramId)} />
              </div>
              <InputFile
                disabled={(order.contract.approve === 'yes' || order.contract.approve === 'wait') || AccessModel.contract.change__role.every(el => !userRole.includes(el))}
                title='Договор'
                name='contract'
                handleChange={(e) => handleChangePhotos(e, 'contract')}
                array={order.contract.files}
                handleDeletePhoto={handleDeletePhoto}
                
                />

              <Comments
                className='self-end'
                title='Контракту'
                comments={order.contract.comments}
                onChange={(e) => setNewComment({ ...newComment, contract: e.target.value })}
                handleAddNewComment={() => handleAddNewComment('contract')}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                index={14} />

            </div>
            </>
        )}

       {AccessModel.paymentStages.show__role.some(el => userRole.includes(el)) && (
        <div className="border-b border-[#333232] pb-[20px]">
        <PaymentStages
          title='Стадии предоплат'
          order={order}
          setOrder={setOrder} />
      </div>
       )}
        

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
            min={0} />
        </div>

        <div className="flex justify-between">

          {order.stage.value < 4 && (
            <Button
              type="button"
              label='Перейти далее'
              className="bg-[#7364f7] hover:bg-[#4531f5]"
              callback={() => handleChangeStageWithCondition(
                () => setIsWarningModal(true), 
                '4',
                (order.figma.approve === 'yes' && order.tz.approve === 'yes' && order.plan.approve === 'yes' && order.content.approve === 'yes' && order.price.approve === 'yes' && order.end.approve === 'yes' && order.contract.approve === 'yes' && order.concept.approve === 'yes' && order.functional.approve === 'yes' && order.research.approve === 'yes')
                )} 
            />
          )}

          <Button
            type="submit"
            label='Сохранить изменения' />
        </div>


      </form>
      <StageChangeModal
        isWarningModal={isWarningModal}
        setIsWarningModal={setIsWarningModal}
        stage='4'
        handleChangeStage={handleChangeStage}
      />
      </>
    )
}