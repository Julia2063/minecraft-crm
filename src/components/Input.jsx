
import cn from 'classnames';


export const Input = ({ 
    title, 
    name, 
    tag,  
    handleChange, 
    disabled, 
    labelStyle, 
    inputStyle,
    isAddWork,
    ...props
}) => {
  return (
    <label className={tag === 'textarea' ? 'flex flex-col gap-[5px]' : labelStyle}>
      <span className={cn("font-bold ", {'text-[14px]': tag === 'textarea', 'lg:text-[20px] text-[16px]': tag !== 'textarea' && !isAddWork})} >
        {tag === 'textarea' ? 'Описание': title}
      </span>
      {tag === 'input' ? (
        <input
            name={name}
            onChange={handleChange}
            className={inputStyle}
            disabled={disabled}
            {...props}
        />
      ) : (
        <textarea 
            name={name}
            onChange={handleChange}
            className={cn("h-[72px] rounded border-[#E9E9E9] border pl-3 resize-none  disabled:opacity-50", {'lg:w-3/4 w-full': isAddWork, 'w-full': !isAddWork})} 
            disabled={disabled}
            {...props}
        />

      )}
      
    </label>
  )
}

