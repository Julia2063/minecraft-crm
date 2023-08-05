import { Input } from "./Input"
import { InputFile } from "./InputFile"

export const OrderInformation = ({ order }) => {
    return (
        <>
            <h1>{`Договор #${order.id}`}</h1>

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Название</span>
                    <div className="w-auto lg:w-3/4 h-[36px]"
                >
                    {order.title}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pt-[20px] pb-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Референс</span>
                    {order.ref.length > 0 && (
                        <div className="w-auto lg:w-3/4 h-[36px]">
                            <a href={order.ref} target="_blank">ссылка</a>
                        </div>
                    )}
                   
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px] ">Figma</span>
                    {order.figma.text.length > 0 && (
                         <div className="w-auto lg:w-3/4 h-[36px]">
                        <a href={order.figma.text} target="_blank">ссылка</a>
                    </div>
                    )}
                   
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Дата сдачи</span>
                    <div className="w-auto lg:w-3/4 h-[36px]"
                >
                    {order.end.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span className="font-bold lg:text-[20px] text-[16px]">Research</span>
                    <div className="w-full lg:w-3/4 lg:h-[36px] h-max"
                >
                    {order.research.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex flex-col">
              <span className="font-bold lg:text-[20px] text-[16px] mb-[10px]">Контент</span>

              <div className="flex justify-between items-baseline gap-[10px] lg:gap-[0px]">
                <span className="font-bold text-[14px]">Link</span>
                {order.content.text.length > 0 && (
                    <div className="w-auto lg:w-3/4 h-[36px]">
                        <a href={order.content.text} target="_blank">ссылка</a>
                    </div>
                )}
               
              </div>
              
              <InputFile
                disabled
                title='Контент'
                name='content'
                array={order.content.files}
              />
                </label>
            </div>

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Приоритет</span>
                    <div className="w-auto lg:w-3/4 h-[36px]"
                >
                    {order.priority}
                    </div>
                </label>
            </div>
        </>
        
    )
}