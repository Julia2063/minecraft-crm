export const UserTableHeader = () => {
    return (
        <div className=" w-full h-12 flex flex-row items-center justify-between border-b-2 border-['#E9E9E9'] pb-[5px]">
            <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[5px] pr-[5px] text-center">
                <p className="font-bold text-[#727272]">#</p>
            </div>
            <div className="lg:w-1/4 w-auto">
            <p className="font-bold text-[#727272] text-center">Пользователь</p>
            </div>
            <div className="w-1/4">
            <p className=" font-bold text-[#727272] text-center">Роль</p>
            </div>
            <div className="lg:w-1/4 w-auto">
            <p className=" font-bold text-[transparent] text-center">мук</p>
            </div>
      </div>
    )
}

