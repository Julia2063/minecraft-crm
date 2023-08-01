import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineMinus} from 'react-icons/ai';

import cn from 'classnames';
import { useState } from 'react';
import { Button } from './Button';

export const Comments = ({ 
    title, 
    comments, 
    className, 
    onChange, 
    handleAddNewComment, 
    currentOrder,
    activeIndex,
    setActiveIndex,
    index
}) => {

    return (
        <div className={cn(className, 'flex flex-col items-end w-full gap-[10px] text-[10px] lg:text-[16px]' )}>
            <div className='flex flex-col gap-[5px] lg:w-2/3 w-full '>
                <span className='font-bold'>{`Комментарии к ${title}:`}</span>
                {comments.length > 0 && comments.sort((a, b) => new Date(a.date) - new Date(b.date)).map((comment, i) => {
                    return (
                        <div className='flex flex-col text-[#767676] text-[9px] lg:text-[14px]' key={i}>
                            <span > 
                                {comment.text}
                            </span>
                            <div className='flex gap-[5px] self-end'>
                                <span className='italic'> 
                                {comment.date}
                            </span>
                            <span className='italic font-bold'> 
                                {comment.user[0]}
                            </span>
                         </div>
                        <hr className='w-1/4 self-center'/>
                       </div>
                    )
                })}
                
            <button 
              className="w-max items-center border border-gray-700 px-[10px] py-[5px] rounded bg-white self-end" 
              type='button'
              onClick={() => setActiveIndex(activeIndex === 0 ? index : 0)}
            >
                {activeIndex === index ? <AiOutlineMinus /> : <BsPlusLg /> }
                
            </button>
            </div>
            
            {activeIndex === index && (
                <textarea 
                  className="w-2/3 h-[72px] rounded border-[#E9E9E9] border pl-3 pt-2 resize-none"
                  onChange={onChange}
                />
            )}
            
            {currentOrder && 
                <Button 
                    type="button" 
                    label='Отправить комментарий' 
                    className='self-end'
                    callback={() => {
                        handleAddNewComment();
                        setActiveIndex(0);
                    }}
                />
            }
           
        </div>
    )
};