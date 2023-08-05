import { MdDone } from "react-icons/md"
import { InputFile } from "./InputFile"
import { OrderInformation } from "./OrderInformation"
import { RxCross1 } from "react-icons/rx"
import { AdditionalWork } from "./AdditionalWork"
import AccessModel from '../Models/AccessModel.json';
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const FullOrderInformation = ({ order }) => {
    const {userRole} = useContext(AppContext);
    return (
        <div className='flex w-full flex-col justify-center p-[20px] shadow-md h-max rounded-lg border-[1px]'>
            <OrderInformation order={order} />

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Видео</span>
                    {order.videos.length > 0 && (
                        <div className="w-auto lg:w-3/4 h-[36px]">
                        <a href={order.videos} target="_blank">ссылка</a>
                    </div>
                    )}
                    
                </label>
            </div>

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex flex-col">
              <span className="font-bold lg:text-[20px] text-[16px] mb-[10px]">Концепт</span>
              <div className="flex justify-between h-max">
                <span className="font-bold text-[14px]">Описание</span>
                <div className="w-3/4 h-max">
                    <span >{order.concept.text}</span>
                </div>
              </div>
              
              <InputFile
                disabled
                title='Контент'
                name='content'
                array={order.concept.files}
              />
                </label>
            </div>

            {AccessModel.contract.show__role.some(el => userRole.includes(el)) && (
                <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex flex-col">
              <span className="font-bold lg:text-[20px] text-[16px] mb-[10px]">Контракт</span>
              
              <InputFile
                disabled
                name='contract'
                array={order.contract.files}
                file
              />
                </label>
            </div>
            )}
            

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span className="font-bold lg:text-[20px] text-[16px]">Функционал</span>
                    <div className="w-full lg:w-3/4 lg:h-[36px] h-max"
                >
                    {order.functional.text}
                    </div>
                </label>
            </div>

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span className="font-bold lg:text-[20px] text-[16px]">Техническое задание</span>
                    <div className="w-full lg:w-3/4 lg:h-[36px] h-max"
                >
                    {order.tz.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span className="font-bold lg:text-[20px] text-[16px]">План работ</span>
                    <div className="w-full lg:w-3/4 lg:h-[36px] h-max"
                >
                    {order.plan.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span className="font-bold lg:text-[20px] text-[16px]">Подписка</span>
                    <div className="w-full lg:w-3/4 lg:h-[36px] h-max"
                >
                    {order.subscribe}
                    </div>
                </label>
            </div>

            {AccessModel.contract.show__role.some(el => userRole.includes(el)) && (

                <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Цена</span>
                    <div className="w-auto lg:w-3/4 h-[36px]"
                >
                    {order.price.text}
                    </div>
                </label>
            </div>
            )}
            

            {AccessModel.contract.show__role.some(el => userRole.includes(el)) && (
                <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex gap-[10px]">
                <label className="flex justify-between w-full">
                    <span className="font-bold lg:text-[20px] text-[16px]">Статус оплаты</span>
                    <div className="w-auto lg:w-3/4">
                        {Object.entries(order.paymentStages).map((el, i) => {
                        return (
                            <label key={i} className="flex gap-[5px] items-center ">
                                <span>{`${el[1].value} %`}</span>
                                {el[1].success ? <MdDone color="green" /> : <RxCross1 color="red"/>}
                            </label>
                        )
                    })}
                    </div>
                    
                </label>
            </div>
            )}
           
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline gap-[10px] lg:gap-[0px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Чел/часы</span>
                    <div className="w-auto lg:w-3/4 h-[36px]"
                >
                    {order.hh}
                    </div>
                </label>
            </div>

           

            <AdditionalWork order={order} disabled/>

            <div className=" pb-[20px] pt-[20px] flex gap-[10px]">
                <label className="flex justify-between items-center w-full">
                    <span className="font-bold lg:text-[20px] text-[16px]">Процент выполнения</span>
                    <div className="w-auto lg:w-3/4">
                        <div className='h-[16px] w-[100px] bg-[#9db3f3] rounded'>
                            <div className={`h-[16px] bg-[#375fd5] rounded w-[${(order.execution)}px]`} />
                        </div>
                    </div>
                </label>
            </div>
           
        </div>
    )
}