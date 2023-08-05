import { AdditionalWork } from "./AdditionalWork";
import { Button } from "./Button";
import { Input } from "./Input"

export const Form3 = ({order, setOrder, handleChange, handleSubmit, newAddWork,
    setNewAddWork}) => {
    const handlePaymentStagesChange = (e, name) => {
        setOrder({...order, paymentStages: {
            ...order.paymentStages, [name]: {...order.paymentStages[name], success: e.target.checked}  
        }})
    };

    return (
        <form className="pt-6 flex flex-col gap-[20px]" onSubmit={handleSubmit}>
            <div className="border-b border-[#333232] pb-[20px]  pt-[20px] flex flex-col gap-[10px]">
              <Input
                title="Видео"
                name="videos"
                type='text'
                tag='input'
                value={order.videos} 
                handleChange={handleChange}
                placeholder="введите ссылку на видео"
                labelStyle="flex justify-between lg:items-center lg:flex-row flex-col"
                inputStyle=" w-full lg:w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
              />  
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
                                checked={el[1].success}

                            />
                            <span>{`${el[1].value} %` }</span>
                        </label>
                    )
                    
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
                    inputStyle="w-1/3 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                />  
                    <span>%</span>
            </div>
            <div className="pb-[20px]  pt-[20px] flex flex-col gap-[10px]">
              <AdditionalWork 
                newAddWork={newAddWork}
                setNewAddWork={setNewAddWork}
                order={order}
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