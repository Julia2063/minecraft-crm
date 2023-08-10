export const TableHeader = () => {
    return (
      <div className="w-full h-12 flex flex-row items-center justify-between border-b-2 border-['#E9E9E9'] pb-[5px] text-[10px] lg:text-[16px]">
        <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[8px] pr-[8px]">
          <p className=" font-bold text-[#727272] ">#</p>
        </div>
        <div className="w-1/6">
          <p className="font-bold text-[#727272] text-center">id</p>
        </div>
        <div className="w-1/6">
          <p className="font-bold text-[#727272] text-center">Название</p>
        </div>
        <div className="w-1/6">
          <p className=" font-bold text-[#727272] text-center">Реф link</p>
        </div>
        <div className="w-1/6">
          <p className=" font-bold text-[#727272] text-center">Коцепт</p>
        </div>
        <div className="w-1/6">
          <p className=" font-bold text-[#727272] text-center">Приоритет</p>
        </div>
        <div className="w-1/6">
          <p className=" font-bold text-[#727272] text-center">Этап</p>
        </div>
        <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[5px] pr-[5px]">
          <span className=" font-bold text-[transparent]">btb</span>
        </div>
       
        
      </div>
    );
  };