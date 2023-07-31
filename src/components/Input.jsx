
export const Input = ({ 
    title, 
    name, 
    tag,  
    handleChange, 
    disabled, 
    labelStyle, 
    inputStyle,
    ...props
}) => {
  return (
    <label className={labelStyle}>
      <span className="font-bold">{title}</span>
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
            className="w-3/4 h-[72px] rounded border-[#E9E9E9] border pl-3 mt-2 resize-none  disabled:opacity-50"
            disabled={disabled}
            {...props}
        />

      )}
      
    </label>
  )
}

