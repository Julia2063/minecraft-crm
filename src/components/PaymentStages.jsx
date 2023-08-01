import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";

export const PaymentStages = ({ title, order, setOrder, disabled, ...props }) => {

    const [last, setLast] = useState(0);

    const [stages, setStages] = useState(0);
    
    const handleChange = (e, i) => {
        
        const newStages = {};

        Object.keys(order.paymentStages).slice(0, -1).forEach(el => {
            newStages[el] = +el === i + 1 ? {...order.paymentStages[el], value: e.target.value} :  {...order.paymentStages[el]}
        } );

        setOrder({
            ...order, 
            paymentStages: {
                ...newStages,
                [last]: {...order.paymentStages[last], 
                    value:`${100 - Object.values(newStages).map(el => +el.value).reduce((a, b) => a + b, 0)}`,
                }
            }
        });
        console.log(newStages);
    };

    useEffect(() => {
        const lastMember = Object.keys(order.paymentStages)[Object.keys(order.paymentStages).length - 1];
        setLast(lastMember);
        setStages(order.paymentStages);
      }, [stages, order.paymentStages]);

    return (
        <div className='flex lg:gap-[40px] items-center lg:flex-row flex-col gap-[10px]'>
 
            <span className="font-bold">{title}</span>

            <button 
              className="w-max items-center border border-gray-700 px-[10px] py-[5px] rounded bg-white" 
              type='button'
              onClick={() => {
                order.paymentStages[Object.keys(order.paymentStages).length + 1] = {
                success: false,
                value: '0'}
              setStages(stages + 1)
              }} 
            >
               <BsPlusLg /> 
                
            </button>

            {Object.entries(order.paymentStages).slice(0, -1).map((el, i) => {
                return (
                     <label className="flex gap-[5px] items-center">
                <input
                    className="w-[50px] h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                    type="number"
                    value={el[1].value}
                    onChange={(e) => handleChange(e, i)}
                    disabled={disabled}
                    max={99}
                    min={0}
                      {...props}
                />
                    <span>%</span>          
             </label>
                )
            })}
            
           

              {/* Object.values(order.paymentStages).slice(1).map */}
                    <label className="flex  gap-[5px] items-center">
                        <div
                            className="w-[50px] h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 flex items-center"
                        >
                            {order.paymentStages[last]?.value}
                        </div>
                        <span>%</span>
                    </label>

                {Object.keys(order.paymentStages).length > 1 && (
                    <button 
                        className="w-max items-center border border-gray-700 px-[10px] py-[5px] rounded bg-white" 
                        type='button'
                        onClick={() => {
                            delete order.paymentStages[`${Object.keys(order.paymentStages).length}`];
                            setStages(stages + 1);
                            setOrder({
                                ...order, 
                                paymentStages: {
                                    ...order.paymentStages,
                                    [`${last - 1}`]: {...order.paymentStages[`${last - 1}`], 
                                        value:`${100 - Object.values(order.paymentStages).slice(0, -1).map(el => +el.value).reduce((a, b) => a + b, 0)}`,
                                    }
                                }
                            });
                        }} 
                    >
                        <AiOutlineMinus /> 
                
                    </button>
                )}
                
        </div>
    )
}
