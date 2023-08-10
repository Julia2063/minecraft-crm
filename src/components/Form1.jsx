import { useContext, useState } from "react"
import { Approve } from "./Approve"
import { Button } from "./Button"
import { Comments } from "./Comments"
import { Input } from "./Input"
import { InputFile } from "./InputFile"
import { AppContext } from "../context/AppContext"
import AccessModel from '../Models/AccessModel.json';

import { StageChangeModal } from "./StageChangeModal"

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
          <span className="font-bold lg:text-[20px] text-[16px]">Концепт</span>
          <Approve
            formData={order}
            setFormData={setOrder}
            name={'concept'}
            getApprove={getApprove}
            disabled={AccessModel.concept.change__role.every(el => !userRole.includes(el))}
            usersArrayGetApprove={users.filter(el => AccessModel.concept.message__form__role.some(e => e === el.role)).map(el => el.telegramId)} 
            usersArrayApprove={users.filter(el => AccessModel.concept.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
          />
        </div>
        <Input
          disabled={(order.concept.approve === 'yes' || order.concept.approve === 'wait') || AccessModel.concept.change__role.every(el => !userRole.includes(el))}
          name="concept"
          type='text'
          tag='textarea'
          value={order.concept.text}
          handleChange={handleChange}
          placeholder="Введите описание концепта"
          labelStyle="flex justify-between items-center"
          inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 " />
        <InputFile
          disabled={(order.concept.approve === 'yes' || order.concept.approve === 'wait') || AccessModel.concept.change__role.every(el => !userRole.includes(el))}
          title='Концепт'
          name='concept'
          handleChange={(e) => handleChangePhotos(e, 'concept')}
          array={order.concept.files}
          handleDeletePhoto={handleDeletePhoto} />
        <Comments
          className='self-end'
          title='Концепту'
          comments={order.concept.comments}
          onChange={(e) => setNewComment({ ...newComment, concept: e.target.value })}
          handleAddNewComment={() => handleAddNewComment('concept')}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={5} />
      </div>
      <div className="border-b border-[#333232] pb-[20px] relative flex flex-col gap-[20px]">
        <div className="flex justify-between">
          <span className="font-bold lg:text-[20px] text-[16px]">Функционал</span>
          <Approve
            formData={order}
            setFormData={setOrder}
            name={'functional'}
            getApprove={getApprove}
            disabled={AccessModel.functional.change__role.every(el => !userRole.includes(el))}
            usersArrayGetApprove={users.filter(el => AccessModel.functional.message__form__role.some(e => e === el.role)).map(el => el.telegramId)}
            usersArrayApprove={users.filter(el => AccessModel.functional.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
          />

        </div>


        <Input
          disabled={(order.functional.approve === 'yes' || order.functional.approve === 'wait') || AccessModel.functional.change__role.every(el => !userRole.includes(el))}
          title="Функционал"
          name="functional"
          type='text'
          tag='textarea'
          value={order.functional.text}
          handleChange={handleChange}
          placeholder="Введите описание функционала"
          labelStyle="flex justify-between items-center"
          inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />
        <Comments
          className='self-end'
          title='функционалу'
          comments={order.functional.comments}
          onChange={(e) => setNewComment({ ...newComment, functional: e.target.value })}
          handleAddNewComment={() => handleAddNewComment('functional')}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={6} />
      </div>

      <div className="flex flex-col gap-[10px] relative">
        <div className="flex justify-between">
          <span className="font-bold lg:text-[20px] text-[16px]">Research</span>
          <Approve
            formData={order}
            setFormData={setOrder}
            name={'research'}
            getApprove={getApprove}
            disabled={AccessModel.research.change__role.every(el => !userRole.includes(el))}
            usersArrayGetApprove={users.filter(el => AccessModel.research.message__form__role.some(e => e === el.role)).map(el => el.telegramId)}
            usersArrayApprove={users.filter(el => AccessModel.research.message__view__role.some(e => e === el.role)).map(el => el.telegramId)}
          />
        </div>
        <Input
          disabled={(order.research.approve === 'yes' || order.research.approve === 'wait') || AccessModel.research.change__role.every(el => !userRole.includes(el))}
          title="Research"
          name="research"
          type='text'
          tag='textarea'
          value={order.research.text}
          handleChange={(e) => setOrder({ ...order, research: { ...order.research, text: e.target.value } })}
          placeholder="Введите задание для Research"
          labelStyle="flex justify-between items-center"
          inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50" />

        <Comments
          className='self-end'
          title='Research'
          comments={order.research.comments}
          onChange={(e) => setNewComment({ ...newComment, research: e.target.value })}
          handleAddNewComment={() => handleAddNewComment('research')}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={7} />
      </div>
      <div className="flex justify-between">
        {order.stage.value < 3 && (
          <Button
            type="button"
            label='Перейти далее'
            className="bg-[#7364f7] hover:bg-[#4531f5]" 
            callback={() => handleChangeStageWithCondition(() => setIsWarningModal(true), '3', (order.concept.approve === 'yes' && order.functional.approve === 'yes' && order.research.approve === 'yes'))}
         />
        )}
        
        <Button
          type="submit"
          label='Сохранить изменения'
        />
      </div>

      </form>

      <StageChangeModal 
        isWarningModal={isWarningModal}
        setIsWarningModal={setIsWarningModal}
        stage='3'
        handleChangeStage={handleChangeStage}
      />

    </>
  )
}