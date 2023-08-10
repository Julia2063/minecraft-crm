import cn from 'classnames';

export const BigDashboardItem = ({ common, title, number }) => {
    return (
        <div className={cn("h-[150px] rounded-lg border-[#E9E9E9] border p-3 shadow-md flex flex-col justify-center items-center", {'w-3/4': !common, 'w-full': common})}
        >
            {common ? (
                <h3 className='text-center'>{title}</h3>
            ) : (
                <h4 className='text-center'>{title}</h4>
            )}
            
            <div className="text-[28px] font-bold">{number}</div>
        </div>
    )
}