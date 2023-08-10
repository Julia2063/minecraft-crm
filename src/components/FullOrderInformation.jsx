import { MdDone } from "react-icons/md";
import { InputFile } from "./InputFile";
import { RxCross1 } from "react-icons/rx";
import { AdditionalWork } from "./AdditionalWork";
import AccessModel from '../Models/AccessModel.json';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import cn from 'classnames';

export const FullOrderInformation = ({ order }) => {
    const {userRole} = useContext(AppContext);
    return (
        <div className='flex w-full flex-col justify-center p-[20px] shadow-md h-max rounded-lg border-[1px]'>
            <h1>{`Договор #${order.id}`}</h1>

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px]">
                    <span 
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.title.length > 1,
                            'text-red-500': order.title.length < 1
                        })} 
                    >
                        Название
                    </span>
                    <div className="w-auto lg:w-3/4 h-[36px]"
                >
                    {order.title}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pt-[20px] pb-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px]">
                    <span className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.ref.length > 1,
                            'text-red-500': order.ref.length < 1
                        })} 
                    >
                        Референс
                    </span>
                    {order.ref.length > 0 && (
                        <div className="w-auto lg:w-3/4 h-[36px]">
                            <a href={order.ref} target="_blank">ссылка</a>
                        </div>
                    )}
                
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px]">
                    <span className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.figma.text.length > 1,
                            'text-red-500': order.figma.text.length < 1
                        })} 
                    >
                        Figma
                    </span>
                    {order.figma.text.length > 0 && (
                        <div className="w-auto lg:w-3/4 h-[36px]">
                        <a href={order.figma.text} target="_blank">ссылка</a>
                    </div>
                    )}
                
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline gap-[10px]">
                    <span  
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.end.text.length > 1,
                            'text-red-500': order.end.text.length < 1
                        })} 
                    >
                        Дата сдачи
                    </span>
                    <div className="w-auto lg:w-3/4 h-[36px]"
                >
                    {order.end.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col ">
                    <span className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.research.length > 1,
                            'text-red-500': order.research.length < 1
                        })}
                    >
                        Research
                    </span>
                    <div className="w-full lg:w-3/4 h-max">
                    {order.research.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex flex-col">
            <span 
                className={cn("font-bold lg:text-[20px] text-[16px] mb-[10px]", {
                    'text-black': order.content.files.length > 1,
                    'text-red-500': order.content.files.length < 1
                })}
            >
                Контент
            </span>

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

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline gap-[10px] lg:gap-[0px]">
                    <span 
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.videos.filter(el => el.length > 0).length > 1,
                            'text-red-500': order.videos.filter(el => el.length > 0).length < 1
                    })}
                >
                    Видео
                </span>
                    <div>
                        {order.videos.filter(el => el.length > 0).map(el => {
                        return (
                            <div className="w-auto lg:w-3/4 h-[36px]" key={el}>
                                <a href={el} target="_blank">ссылка</a>
                            </div>
                        )
                    })}
                    </div>
                    
                    
                </label>
            </div>

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex flex-col">
              <span  
                className={cn("font-bold lg:text-[20px] text-[16px] mb-[10px]", {
                    'text-black': order.concept.files.length > 1,
                    'text-red-500': order.concept.files.length < 1
                })}
              >
                Концепт
              </span>
              <div className="flex lg:justify-between lg:h-max lg:flex-row flex-col">
                <span className="font-bold text-[14px]">Описание</span>
                <div className="w-full lg:w-3/4 h-max">
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
              <span  
                className={cn("font-bold lg:text-[20px] text-[16px] mb-[10px]", {
                    'text-black': order.contract.files.length > 1,
                    'text-red-500': order.contract.files.length < 1
                })}
              >
                Контракт
              </span>
              
              <InputFile
                disabled
                name='contract'
                array={order.contract.files}
              />
                </label>
            </div>
            )}
            

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span className={cn("font-bold lg:text-[20px] text-[16px]", {
                        'text-black': order.functional.text.length > 1,
                        'text-red-500': order.functional.text.length < 1
                        })}
                    >
                        Функционал
                    </span>
                    <div className="w-full lg:w-3/4 h-max"
                >
                    {order.functional.text}
                    </div>
                </label>
            </div>

            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span 
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.tz.text.length > 1,
                            'text-red-500': order.tz.text.length < 1
                        })}
                    >
                        Техническое задание
                    </span>
                    <div className="w-full lg:w-3/4 h-max"
                >
                    {order.tz.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span 
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.plan.text.length > 1,
                            'text-red-500': order.plan.text.length < 1
                        })}
                    >
                        План работ
                    </span>
                    <div className="w-full lg:w-3/4 h-max"
                >
                    {order.plan.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline lg:flex-row flex-col">
                    <span 
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.subscribe.length > 1,
                            'text-red-500': order.subscribe.length < 1
                        })}
                    >
                        Подписка
                    </span>
                    <div className="w-full lg:w-3/4 lg:h-[36px] h-max"
                >
                    {order.subscribe}
                    </div>
                </label>
            </div>

            {AccessModel.contract.show__role.some(el => userRole.includes(el)) && (

                <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between lg:items-baseline gap-[10px] lg:gap-[0px]">
                    <span 
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.price.text.length > 1,
                            'text-red-500': order.price.text.length < 1
                        })}
                    >
                        Цена
                    </span>
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
                    <span 
                        className={cn("font-bold lg:text-[20px] text-[16px]", {
                            'text-black': order.hh.length > 1,
                            'text-red-500': order.hh.length < 1
                        })}
                    >
                        Чел/часы
                    </span>
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
                        <div 
                            className='h-[16px] bg-[#375fd5] rounded'
                            style={{width: +order.execution}} />
                        </div>
                    </div>
                </label>
            </div>
           
        </div>
    )
}