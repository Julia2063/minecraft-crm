export const MeddiumDashboardItem = ({ title, number }) => {
    return (
        <div className="h-[120px] w-full rounded-lg border-[#E9E9E9] border p-3 shadow-md flex flex-col justify-center items-center"
        >
            <h5 className='text-center'>{title}</h5>
            <div className="text-[25px] font-bold">{number}</div>
        </div>
    )
}