import cn from 'classnames';
import { BsPlusLg } from 'react-icons/bs';
import { GrDocumentPdf } from 'react-icons/gr';


export const InputFile = ({
    title,
    name,
    disabled, 
    handleChange, 
    array, 
    handleDeletePhoto,
    file,
    ...props
  }) => {

    return (
        <label className="flex justify-between items-center ">
            <span className="font-bold">
              {title}
            </span>
              
             <div className="flex w-3/4 gap-[10px] items-center">
                
                <label className="relative cursor-pointer">
                  {!disabled && (
                    <button  
                      className={cn("flex justify-center items-center border border-gray-700 h-[40px] w-[40px] rounded-full bg-white ", {'opacity-25': disabled})}
                      type="button"
                    >
                      <BsPlusLg />
                    </button>
                  )}
                    
                    <input
                      type="file"
                      className="absolute h-[40px] w-[40px] top-[0px] opacity-0"
                      onChange={handleChange}
                    />
                  </label>
              
                  <div className="h-[300px] w-full rounded border-[#E9E9E9] border mt-2 disabled:opacity-50 flex gap-[5px] p-[5px] items-center">
                       {file ? (

                        <div className='w-full flex items-center justify-center'>
                        {array.length > 0 && 
                        <a href={array[0]} target='_blanc'className='border-2 border-[#000] h-[40px] w-[40px] rounded flex items-center justify-center'>
                          <GrDocumentPdf/>
                        </a>
                          
                        }
                        
                        </div>
                          
                       ) : (
                        <>
                           {array.map((el, i) => {
                          return (
                            <div className="h-full w-1/3 relative" key={`${el}${i}`}>
                              <img
                                src={array[i]} 
                                alt="img"
                                className="h-full w-full rounded object-cover"
                              />
                              {!disabled && (
                                <button  
                                  type="button"
                                  className="absolute top-[10px] right-[10px] h-[30px] w-[30px] rounded-full bg-white text-black flex items-center justify-center" 
                                  onClick={() => handleDeletePhoto(i, name)}
                                >
                                -
                                </button>
                              )}
                             
                            </div>
                          );
                        })}
                        </>
                       
                       )
                       }
                        
                  </div>
                </div>   
        </label>
    )
}