export const TableHeader = () => {
    return (
      <div className=" w-full h-12 flex flex-row items-center justify-between border-b-2 border-['#E9E9E9'] pb-[5px]">
        <div className="w-auto pl-[20px] pr-[20px]">
          <p className=" font-bold text-[#727272] ">#</p>
        </div>
        <div className="w-1/4">
          <p className="font-bold text-[#727272] text-center">id</p>
        </div>
        <div className="w-1/4">
          <p className="font-bold text-[#727272] text-center">Название</p>
        </div>
        <div className="w-1/4">
          <p className=" font-bold text-[#727272] text-center">Реф link</p>
        </div>
        <div className="w-1/4">
          <p className=" font-bold text-[#727272] text-center">Коцепт</p>
        </div>
        <div className="w-1/4">
          <p className=" font-bold text-[#727272] text-center">Приоритет</p>
        </div>
        <div className="w-auto pl-[20px] pr-[20px]">
          <span className=" font-bold text-[transparent]">btb</span>
        </div>
       
        
      </div>
    );
  };