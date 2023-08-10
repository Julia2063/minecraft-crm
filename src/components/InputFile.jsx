import { BsDownload, BsPlusLg } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import cn from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import { SwiperModal } from './SwiperModal';
import { FiFile } from 'react-icons/fi';
import { downloadFile } from '../helpers/firebaseControl';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';


export const InputFile = ({
    title,
    name,
    disabled, 
    handleChange, 
    array, 
    handleDeletePhoto,
    file,
    notLabel,
    handleDeleteFile,
    index,
    labels,
    ...props
  }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(labels);

    return (
        <>
        <label className="flex flex-col gap-[5px] lg:gap-[0px] mt-[10px]">
          {!notLabel && <span className='font-bold text-[14px]'>Файлы/Фото/Скрины</span>}
        
        <div className={cn("flex w-full flex-col", {/*  'gap-[0px]': disabled, 'gap-[20px]': !disabled */ })}>

          <label className="relative cursor-pointer">
            {!disabled && (
              <button
                className="w-max items-center border border-gray-700 px-[10px] h-[28px] rounded bg-white"
                type="button"
              >
                <BsPlusLg />
              </button>
            )}

            <input
              type="file"
              className="absolute h-[40px] w-[40px] top-[0px] left-[0px] opacity-0"
              onChange={handleChange}
              disabled={disabled} />
          </label>

          <div
            className={cn("w-full rounded border-[#E9E9E9] border mt-2 disabled:opacity-50 flex gap-[5px] p-[5px] items-center overflow-hidden mb-[5px]h-max min-h-[75px]", {
             /*  'h-[150px]': !file,
              '': file  */
            })} 
          >
      
              <Swiper
                spaceBetween={5}
                slidesPerView={8}
                className='w-full h-full z-0 py-[10px]'
                navigation
                modules={[Navigation]}
                breakpoints={{
                  1: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1000: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 6,
                  },
                  1350: {
                    slidesPerView: 8,
                  },
                }}
              >
                {array.map((el, i) => {
                  const isPicture = !file && ['.png', '.jpeg', '.svg', '.ico', '.gif', '.tiff', '.ai', '.psd', '/png', '/jpeg', '/svg', '/ico', '/gif', '/tiff', '/ai', '/psd'].some(e => el.includes(e));

                  return (
                    <SwiperSlide 
                      className="h-full w-full relative shrink-0 flex justify-center items-center" 
                      key={`${el}${i}`}
                      onClick={() => {
                        if(isPicture) {
                          setIsOpen(true);
                          setCurrentIndex(i)
                        } else {
                          return;
                        }
                      }}

                    > 
                    {file ? (
                      <>
                       {(typeof(el) !== 'string' || el.length > 0) && (
                        <div className='relative flex flex-col gap-[10px] items-center'>
                          <span className='text-center'>{labels[i]}</span>
                          <button
                            type='button'
                            onClick={() => {
                              if(typeof(el) !== 'string') {
                                return
                              } else {
                                downloadFile(el, `file${i}`)
                              }
                            }}
                            className='text-black border-2 border-[#000] h-[40px] w-[40px] rounded flex items-center justify-center flex-col no-underline'
                          > 
                            
                            <BsDownload size={20}/>
                          </button>
                          {!disabled && (
                            <button
                              type="button"
                              className="absolute border-1 border-black top-[0] right-[-25px] h-[20px] w-[20px] z-10 rounded-full bg-white text-black flex items-center justify-center"
                              onClick={() => handleDeleteFile(index, i)}
                            >
                              -
                            </button>

                          )}
                        </div>
                        
                       )}
                      </>
                     
                    ) : (
                      <>
                       {isPicture
                        ? (
                          <>
                            <img
                              src={array[i]}
                              alt="img"
                              className="h-[150px] w-full rounded object-cover" 
                            
                            />
                            {!disabled && (
                              <button
                                type="button"
                                className="absolute top-[10px] right-[10px] h-[30px] w-[30px] w-max items-center border border-gray-700 px-[10px] rounded bg-white text-black flex items-center justify-center"
                                onClick={(e) => {
                                  handleDeletePhoto(i, name);
                                  e.stopPropagation();
                                }}
                              >
                                <MdDeleteForever />
                              </button>
                            )}
                          </>
                        ) : (
                          <div className='relative' key={el}>
                            <a href={el} target='_blanc' className='text-black border-2 border-[#000] h-[40px] w-[40px] rounded flex items-center justify-center flex-col no-underline'>
                              <span>file</span>
                              <FiFile size={32}/>
                            </a>
  
                            {!disabled && (
                              <button
                                type="button"
                                className="absolute border-1 border-black top-[0] right-[-25px] h-[20px] w-[20px] z-10 rounded-full bg-white text-black flex items-center justify-center"
                                onClick={() => {
                                  handleDeletePhoto(i, name);
                                }}
                              >
                                -
                              </button>
  
                            )}
                        </div>
                        )}
                      </>
                    )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
          </div>
        </div>
      </label>
      {!file && (
        <SwiperModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentIndex={currentIndex}
        array={array.filter(el =>  ['.png', '.jpeg', '.svg', '.ico', '.gif', '.tiff', '.ai', '.psd', '/png', '/jpeg', '/svg', '/ico', '/gif', '/tiff', '/ai', '/psd'].some(e => el.includes(e)))}
      />
      )}
      
      </>
    )
}