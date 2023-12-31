import { Comments } from "./Comments"
import { Input } from "./Input"

export const View0 = ({ 
    order, 
    newComment, 
    setNewComment, 
    handleAddNewComment,
    activeIndex,
    setActiveIndex
}) => {

    console.log(order.priority)
    return (
        <>
          <div className="border-b border-[#333232] pb-[20px]">
            <Input
                disabled
                title="Название"
                name="title"
                type='text'
                tag='input'
                defaultValue={order.title}
                placeholder="Введите название"
                labelStyle="flex lg:flex-row justify-between lg:items-center flex-col"
                inputStyle="lg:w-3/4 w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />
          </div>
          <div className="border-b border-[#333232] pb-[20px]">
            <label className="flex lg:flex-row flex-col justify-between lg:items-center">
                <span className="font-bold lg:text-[20px] text-[16px]">Реф link</span>
                <div className="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
            >
                {order.ref.length > 0 && 
                    <a href={order.ref} target="_blank">ссылка</a>
                }
                  
                </div>
            </label>
            
          </div>
            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px]">
                <span className="font-bold lg:text-[20px] text-[16px]">Техническое задание</span>
                <Input
                    disabled
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
                    index={3}
                />
            </div>
            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px]">
                <span className="font-bold lg:text-[20px] text-[16px]">Research</span>
                <Input
                    disabled
                    title="Research"
                    name="research"
                    type='text'
                    tag='textarea'
                    defaultValue={order.research.text}
                    placeholder="Введите задание для Research"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />
                <Comments
                    className='self-end'
                    title='Research'
                    comments={order.research.comments}
                    onChange={(e) => setNewComment({ ...newComment, research: e.target.value })}
                    currentOrder 
                    handleAddNewComment={() => handleAddNewComment('research')}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={4}
                />
            </div>

            <div className="border-b border-[#333232] pb-[20px]">
                <span className="font-bold lg:text-[20px] text-[16px]">Подписка</span>
                <Input 
                    title="Подписка"
                    name="subscribe"
                    type='text'
                    tag='textarea'
                    defaultValue={order.subscribe} 
                    placeholder="Введите подписку"
                    labelStyle="flex justify-between items-center"
                    inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                />
            </div>
            
            <div className="border-b border-[#333232] pb-[20px] flex flex-col gap-[10px] mt-2">
                <Input
                    disabled
                    title="Желаемые сроки (в неделях)"
                    name="desiredDates"
                    type='number'
                    tag='input'
                    defaultValue={order.desiredDates}
                    labelStyle="flex-col w-2/3"
                    inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                    min={0} 
                />
            </div>
            <div className="flex flex-col lg:flex-row gap-[20px] mt-2">
                <Input
                    disabled
                    title="Желаемая цена"
                    name="desiredPrice"
                    type='number'
                    tag='input'
                    defaultValue={order.desiredPrice}
                    labelStyle="flex-col lg:w-1/3 w2/3"
                    inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                    min={0}
                    step="0.01" 
                />
                <label className="flex-col lg:w-1/3 w2/3 ">
                    <span className="font-bold  lg:text-[20px] text-[16px]">Приоритет</span>
                    <div className="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 leading-[36px]">
                        {order.priority}
                        {/* <input
                            disabled
                            name="priority"
                            type="text"
                            value={order.priority}
                            
                        /> */}
                    </div>
                </label>
            </div>
        </>
    )
}