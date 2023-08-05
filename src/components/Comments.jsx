import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineMinus} from 'react-icons/ai';

import cn from 'classnames';
import { Button } from './Button';
import { useState } from 'react';

export const Comments = ({ 
    title, 
    comments, 
    className, 
    onChange, 
    handleAddNewComment, 
    activeIndex,
    setActiveIndex,
    index, isNew
}) => {

    const [isTextarea, setIsTextarea] = useState(false);

    return (
        <div className={cn(className, 'flex flex-col items-end w-full gap-[10px] text-[10px] lg:text-[16px]' )}>
            
            <div className='flex flex-col gap-[5px] w-full '>
                <span className='font-bold text-[14px]'>{`Комментарии к ${title}:`}</span>
                    <div className='flex gap-[20px]'>
                        <button 
                            className="w-max items-center border border-gray-700 px-[10px] h-[28px] rounded bg-white" 
                            type='button'
                            onClick={() => isNew 
                                ? setIsTextarea(!isTextarea)
                                : setActiveIndex(activeIndex === 0 ? index : 0)}
                        >
                        {isNew ? (
                             isTextarea ? <AiOutlineMinus /> : <BsPlusLg /> 
                        ) : (
                            activeIndex === index ? <AiOutlineMinus /> : <BsPlusLg />  
                        )}
                    
                        </button>
                        {(isNew ? isTextarea : activeIndex === index) && (
                            <div className='w-full flex flex-col gap-[10px]'>
                                <textarea 
                                    className="w-full h-[72px] rounded border-[#E9E9E9] border pl-3 pt-2 resize-none"
                                    onChange={onChange}
                                />
                                {handleAddNewComment && 
                                    <Button 
                                        type="button" 
                                        label='Отправить комментарий' 
                                        className="self-end"
                                        callback={() => {
                                            handleAddNewComment();
                                            setActiveIndex(0);
                                        }}
                                    />   
                                }
                            </div>
                        
                        )}
                    </div>
                
                {comments.length > 0 && comments.sort((a, b) => new Date(a.date) - new Date(b.date)).map((comment, i) => {
                    return (
                        <div className='flex flex-col gap-[10px] text-[#767676] text-[9px] lg:text-[14px]' key={i}>
                            <div className='flex gap-[20px]'>
                                <span className='italic'> 
                                    {comment.date}
                                </span>
                                <span className='italic font-bold'> 
                                    {comment.user[0]}:
                                </span>
                            </div>
                            <span className='pl-[20px]'>
                                {comment.text}
                            </span>
                            
                        <hr className='w-1/2 self-center'/>
                       </div>
                    )
                })}
                
            
            </div>
        </div>
    )
};