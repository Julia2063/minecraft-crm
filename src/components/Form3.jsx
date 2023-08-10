import { AiOutlineMinus } from "react-icons/ai";
import { AdditionalWork } from "./AdditionalWork";
import { Button } from "./Button";
import { Input } from "./Input"
import { BsPlusLg } from "react-icons/bs";

import cn from 'classnames';
import { useState } from "react";
import { StageChangeModal } from "./StageChangeModal";
import { BugsItemModel } from "../Models/OrderModel";

export const Form3 = ({
    order, 
    setOrder,
    handleChange, 
    handleSubmit, 
    newAddWork,
    setNewAddWork, 
    isAdd, 
    setIsAdd, 
    handleAddNewAddWork, 
    handleChangeStageWithCondition,
    handleChangeStage 
}) => {
    
    const [isWarningModal, setIsWarningModal] = useState(false);

    const handlePaymentStagesChange = (e, name) => {
        setOrder({...order, paymentStages: {
            ...order.paymentStages, [name]: {...order.paymentStages[name], success: e.target.checked}  
        }})
    };

    const handleChangeVideo = (e, index) => {
        const newVideos = [...order.videos];
        newVideos[index] = e.target.value;
        setOrder({
            ...order,
            videos: [...newVideos]
        })
    };


    const handleAddNewVideo = () => {
        setOrder({
            ...order,
            videos: [...order.videos, '']
        });
    };

    const handleDeleteNewVideo = () => {
        const catedArray = order.videos.slice(0, order.videos.length - 1)
        setOrder({
            ...order,
            videos: catedArray,
        });
    };

    return (
        <>
        <form className="pt-6 flex flex-col gap-[20px]" onSubmit={handleSubmit}>
            <div className="border-b border-[#333232] pb-[20px]  pt-[20px] flex flex-col gap-[10px]">
                {order.videos.map((el, i) => {
                    return (
                        <Input
                            key={i}
                            title={i === 0 ? "Видео" : ''}
                            name="videos"
                            type='text'
                            tag='input'
                            value={el}
                            handleChange={(e) => handleChangeVideo(e, i)}
                            placeholder="введите ссылку на видео"
                            labelStyle="flex justify-between lg:items-center lg:flex-row flex-col"
                            inputStyle=" w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />
                    );
                })}
                <div
                    className={cn("flex w-full lg:w-3/4 self-end", {
                        'justify-between': order.videos.length > 1,
                        'justify-end': order.videos.length === 1
                    })}
                >

                    {order.videos.length > 1 && (
                        <button
                            className="w-max items-center border border-gray-700 px-[10px] py-[5px] rounded bg-white "
                            type='button'
                            onClick={handleDeleteNewVideo}
                        >
                            <AiOutlineMinus />
                        </button>
                    )}
                    <button
                        className="w-max items-center border border-gray-700 px-[10px] py-[5px] rounded bg-white self-end"
                        type='button'
                        onClick={handleAddNewVideo}
                    >
                        <BsPlusLg />
                    </button>
                </div>

            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex gap-[10px]">
                <label className="flex flex-col gap-[10px]">
                    <span className="font-bold lg:text-[20px] text-[16px]">Статус оплаты</span>
                    {Object.entries(order.paymentStages).map((el, i) => {
                        return (
                            <label key={i}>
                                <input
                                    onChange={(e) => handlePaymentStagesChange(e, el[0])}
                                    className="mr-[10px]"
                                    type="checkbox"
                                    checked={el[1].success} />
                                <span>{`${el[1].value} %`}</span>
                            </label>
                        );

                    })}
                </label>
            </div>
            <div className="border-b border-[#333232] pb-[20px] pt-[20px] flex gap-[10px] items-center">
                <Input
                    title="Процент выполнения"
                    name="execution"
                    type='number'
                    tag='input'
                    value={order.execution}
                    handleChange={handleChange}

                    labelStyle="flex items-center gap-[40px]"
                    inputStyle="w-1/3 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2" />
                <span>%</span>
            </div>
            <div className="pb-[20px]  pt-[20px] flex flex-col gap-[10px]">
                <AdditionalWork
                    newAddWork={newAddWork}
                    setNewAddWork={setNewAddWork}
                    order={order}
                    isAdd={isAdd}
                    setIsAdd={setIsAdd}
                    handleAddNewAddWork={handleAddNewAddWork} />
            </div>
            <div className="flex justify-between">

                {order.stage.value < 5 && (
                    <Button
                        type="button"
                        label='Перейти далее'
                        className="bg-[#7364f7] hover:bg-[#4531f5]"
                        callback={() => handleChangeStageWithCondition(
                            () => setIsWarningModal(true),
                            '4',
                            (order.figma.approve === 'yes' && order.tz.approve === 'yes' && order.plan.approve === 'yes' && order.content.approve === 'yes' && order.price.approve === 'yes' && order.end.approve === 'yes' && order.contract.approve === 'yes' && order.concept.approve === 'yes' && order.functional.approve === 'yes' && order.research.approve === 'yes')
                        )} />
                )}

                <Button
                    type="submit"
                    label='Сохранить изменения' 
                />

                {/* <button
                    onClick={() => setOrder({
                        ...order,
                        bugs:[BugsItemModel]
                    })}
                >obnovit'</button> */}
            </div>

        </form>
        <StageChangeModal
            isWarningModal={isWarningModal}
            setIsWarningModal={setIsWarningModal}
            stage='5'
            handleChangeStage={handleChangeStage} 
        />
    </>
    )
}