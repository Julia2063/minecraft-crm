import { BsPlusLg } from 'react-icons/bs';
import { GrDocumentPdf } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import cn from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import { SwiperModal } from './SwiperModal';


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

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
        <label className="flex flex-col gap-[5px] lg:gap-[0px]">
        <span className='font-bold text-[14px]'>Файлы/Фото/Скрины</span>
        <div className={cn("flex w-full  items-center", { 'gap-[0px]': disabled, 'gap-[20px]': !disabled })}>

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
            className="h-[150px] w-full rounded border-[#E9E9E9] border mt-2 disabled:opacity-50 flex gap-[5px] p-[5px] items-center overflow-hidden  mb-[5px]"
          >
            {file ? (

              <div className='w-full flex items-center justify-center'>
                {array.length > 0 &&

                  array.map((el, i) => {
                    return (
                      <div className='relative' key={el}>
                        <a href={el} target='_blanc' className='border-2 border-[#000] h-[40px] w-[40px] rounded flex items-center justify-center'>
                          <GrDocumentPdf />

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
                    );
                  })}
              </div>
            ) : (
              <Swiper
                spaceBetween={5}
                slidesPerView={8}
                className='w-full h-full z-0'
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
                  return (
                    <SwiperSlide 
                      className="h-full w-[150px] relative shrink-0" 
                      key={`${el}${i}`}
                      onClick={() => {
                        setIsOpen(true);
                        setCurrentIndex(i)
                      }}

                    >
                      <img
                        src={array[i]}
                        alt="img"
                        className="h-full w-full rounded object-cover" />
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
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </label>
      <SwiperModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentIndex={currentIndex}
        array={array}
      />
      </>
    )
}