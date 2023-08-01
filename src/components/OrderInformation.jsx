export const OrderInformation = ({ order }) => {
    return (
        <>
            <h1>{`Договор #${order.id}`}</h1>

            <div className="border-b border-[#E9E9E9] pt-[20px] pb-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline">
                    <span className="font-bold">Референс</span>
                    <div className="w-3/4 h-[36px]"
                >
                    <a href={order.ref} target="_blank">ссылка</a>
                    </div>
                </label>
            </div>
            <div className="border-b border-[#E9E9E9] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline">
                    <span className="font-bold">Figma</span>
                    <div className="w-3/4 h-[36px]">
                        <a href={order.figma} target="_blank">ссылка</a>
                    </div>
                </label>
            </div>
            <div className="border-b border-[#E9E9E9] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline">
                    <span className="font-bold">Дата сдачи</span>
                    <div className="w-3/4 h-[36px]"
                >
                    {order.end.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#E9E9E9] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline">
                    <span className="font-bold">Research</span>
                    <div className="w-3/4 h-[36px]"
                >
                    {order.research.text}
                    </div>
                </label>
            </div>
            <div className="border-b border-[#E9E9E9] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline">
                    <span className="font-bold">Контент</span>
                    <div className="w-3/4 flex flex-col gap-[10px]">
                    <a href={order.content.text} target="_blank">ссылка</a>
                    <div className="lg:h-[300px] h-max flex gap-[5px] lg:flex-row flex-col">
                        {order.content.files.map((el, i) => {
                          return (
                            <div className="h-full lg:w-1/3 w-full " key={`${el}${i}`}>
                              <img
                                src={el} 
                                alt="img"
                                className="h-full w-full rounded object-cover"
                              />
                             
                            </div>
                          );
                        })}
                    </div>
                    
                    </div>
                </label>
            </div>

            <div className="border-b border-[#E9E9E9] pb-[20px] pt-[20px] flex flex-col gap-[10px]">
                <label className="flex justify-between items-baseline">
                    <span className="font-bold">Приоритет</span>
                    <div className="w-3/4 h-[36px]"
                >
                    {order.priority}
                    </div>
                </label>
            </div>
        </>
        
    )
}