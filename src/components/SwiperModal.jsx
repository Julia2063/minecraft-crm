import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

export const SwiperModal = ({ isOpen, setIsOpen, currentIndex, array }) => {
    return (
        <Modal 
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          shouldCloseOnOverlayClick={true}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FAFAFA] lg:w-2/3 w-full h-1/2 lg:h-4/5 rounded-lg shadow-md p-4 z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          autoFocus={false}
          ariaHideApp={false}
        >
        <button
          type="button"
          className="absolute top-[10px] right-[10px] h-[30px] w-[30px] w-max items-center px-[10px] rounded bg-white text-black flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
            <IoMdClose />
        </button>
          <Swiper
                spaceBetween={5}
                slidesPerView={1}
                className='w-full h-full'
                initialSlide={currentIndex}
                navigation
                modules={[Navigation]}
              >
                {array.map((el, i) => {
                  return (
                    <SwiperSlide
                      className="h-full w-[150px] relative shrink-0" 
                      key={`${el}${i}`}
                      onClick={() => setIsOpen(true)}
                    >
                      <img
                        src={array[i]}
                        alt="img"
                        className="h-full w-full rounded object-cover" />
                      {/* {!disabled && (
                        <button
                          type="button"
                          className="absolute top-[10px] right-[10px] h-[30px] w-[30px] w-max items-center border border-gray-700 px-[10px] rounded bg-white text-black flex items-center justify-center z-50"
                          onClick={(e) => {
                            handleDeletePhoto(i, name);
                            e.stopPropagation();
                          }}
                        >
                          <MdDeleteForever />
                        </button>
                      )} */}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
        </Modal>
    )
}