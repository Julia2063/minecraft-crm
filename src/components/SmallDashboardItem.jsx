export const SmallDashboardItem = ({ title, number }) => {
    return (
        <div className="h-[100px] w-full rounded-lg border-[#E9E9E9] border p-3 shadow-md flex flex-col justify-center items-center"
        >
            <h6 className='text-center'>{title}</h6>
            <div className="text-[20px] font-bold">{number}</div>
        </div>
    )
}