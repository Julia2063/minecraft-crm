import { Input } from "./Input";
import { Comments } from "./Comments";
import { updateFieldInDocumentInCollection } from "../helpers/firebaseControl";
import { Button } from "./Button";

export const Form0 = ({
  order, 
  handleChange, 
  setOrder, 
  newComment, 
  setNewComment,
  handleSubmit,
}) => {
    

    return (
        <form className="pt-6 flex flex-col gap-[20px]" onSubmit={handleSubmit}>
            <div className="border-b border-[#333232] pb-[20px]">
              <Input
                title="Название"
                name="title"
                type='text'
                tag='input'
                value={order.title} 
                handleChange={handleChange}
                required
                placeholder="Введите название"
                labelStyle="flex justify-between lg:flex-row flex-col  lg:items-center"
                inputStyle=" w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />
            </div>

            <div className="border-b border-[#333232] pb-[20px]">
              <Input 
                title="Реф link"
                name="ref"
                type='text'
                tag='input'
                value={order.ref} 
                handleChange={handleChange}
                required
                placeholder="Введите адрес ссылки на реф"
                labelStyle="flex justify-between  lg:flex-row flex-col  lg:items-center"
                inputStyle="w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />
            </div>

            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px]">
              <span className="font-bold lg:text-[20px] text-[18]">Техническое задание</span>
              <Input 
                name="tz"
                type='text'
                tag='textarea'
                value={order.tz.text} 
                required
                handleChange={(e) => setOrder({...order, tz: {...order.tz, text: e.target.value }})}
                placeholder="Введите текст Технического Задания"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  
              <Comments
                className='self-end' 
                title='ТЗ'
                comments={[]}
                onChange={(e) => setNewComment({...newComment, tz: e.target.value})}
                isNew
              />
            </div>

            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px]">
            <span className="font-bold lg:text-[20px] text-[18]">Research</span>
              <Input 
                name="research"
                type='text'
                tag='textarea'
                value={order.research.text} 
                required
                handleChange={(e) => setOrder({...order, research: {...order.research, text: e.target.value }})}
                placeholder="Введите задание для Research"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  
              <Comments
                className='self-end' 
                title='Research'
                comments={[]}
                onChange={(e) => setNewComment({...newComment, research: e.target.value})}
                isNew
              />
            </div>

            <div className="border-b border-[#333232] pb-[20px]">
            <span className="font-bold lg:text-[20px] text-[18]">Подписка</span>
              <Input 
                name="subscribe"
                type='text'
                tag='textarea'
                value={order.subscribe} 
                handleChange={handleChange}
                required
                placeholder="Введите подписку"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
              />
            </div>

            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] mt-2">
              <Input 
                title="Желаемые сроки (в неделях)"
                name="desiredDates"
                type='number'
                tag='input'
                required
                value={order.desiredDates} 
                handleChange={handleChange}
                labelStyle="flex-col w-2/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                min={0}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-[20px] mt-2">
              <Input 
                title="Желаемая цена"
                name="desiredPrice"
                type='number'
                required
                tag='input'
                value={order.desiredPrice} 
                handleChange={handleChange}
                labelStyle="flex-col lg:w-1/3 w-full"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                min={0}
                step="0.01"
              />
              <label className="flex-col lg:w-1/3 w-full">
                <span  className="font-bold lg:text-[20px] text-[18]">Приоритет</span>
                <div>
                  <select
                    name="priority"
                    type="date"
                    value={order.priority}
                    onChange={handleChange}
                    className="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                  >
                  <option value="ASAP">ASAP (до 2 недель)</option>
                  <option value="Hight">Hight (до месяца)</option>
                  <option value="Med">Med (до 2 месяцев)</option>
                  <option value="Low">Low (до 3 месяцев)</option>
                  </select>
                </div>
              </label>
            </div>
            <Button
              type="submit" 
              label='Создать заказ' 
              className='self-end'
            /> 
        </form>
    )
};