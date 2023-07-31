const String = ({ el, update }) => {
   
    return (
        <label>
            {el.label}
                <input 
                  type={el.type}
                  value={el.value}
                  onChange={(e) => update(el, e.target.value)}
                />

        </label>
    )
}

export default String;