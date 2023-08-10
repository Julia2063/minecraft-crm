import { GrClose } from 'react-icons/gr';

import { handleDelete, updateFieldInDocumentInCollection } from "../helpers/firebaseControl";

import { Link } from "react-router-dom";
import { SwiperModal } from './SwiperModal';
import { useState } from 'react';

import Modal from "react-modal";
import { IoMdClose } from 'react-icons/io';
import { Button } from './Button';
import { format } from 'date-fns';

export const OrderLine = ({ i, data }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isWarningModal, setIsWarningModal] = useState(false);

  const handleChangeStage = async () => {
    if(+data.stage.value < 2) {
      try {
        await updateFieldInDocumentInCollection('orders', data.idPost, 'stage', {value: '2', dateChanging: format(new Date(), 'yyyy-MM-dd HH:mm')} );
      } catch(error) {
        console.log(error)
      }
      
    } else {
      return;
    }
  };

    return (
      <>
      <div className=" border-b border-[#E9E9E9] py-[10px] flex items-center h-max text-[10px] lg:text-[16px]">
        <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[8px] pr-[8px]">
          <p className=" font-bold text-[#727272] ">{i + 1}</p>
        </div>
        <div className="w-1/6">
          <p className="font-bold text-[#727272] text-center">
            <Link onClick={handleChangeStage} to={`/orderList/${data.id}`}>{data.id}</Link>
          </p>
        </div>
        <div className="w-1/6">
          <p className="font-bold text-[#727272] text-center">
            {data.title}
          </p>
        </div>
        <div className="w-1/6">
          <p className=" font-bold text-[#727272] text-center">
            <a href={`${data.ref}`} target='_blank'>ссылка</a>
          </p>
        </div>
        <div className="w-1/6 flex items-center justify-center gap-[5px]">

          {data.concept.files.slice(0, 1).map((el, i) => {
            return (
              <button 
                className="h-[50px] w-[40px]" 
                key={i}
                onClick={() => {
                  setIsOpen(true);
                  setCurrentIndex(i);
                }}
              >
                <img src={el} alt="img" className="object-cover w-full h-full" />
              </button>
            );
          })}

        </div>
        <div className="w-1/6">
          <p className=" font-bold text-[#727272] text-center">
            {data.priority}
          </p>
        </div>
        <div className="w-1/6">
          <p className=" font-bold text-[#727272] text-center">
            {data.stage.value}
          </p>
        </div>
        <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[8px] pr-[8px]">
          <button 
            onClick={() => setIsWarningModal(true)}
            /* onClick={() => handleDelete(data)} */
          >
            <GrClose />
          </button>
        </div>


      </div>
      
      <SwiperModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentIndex={currentIndex}
          array={data.concept.files} 
        />
      <Modal
        isOpen={isWarningModal}
        onRequestClose={() => setIsWarningModal(false)}
        shouldCloseOnOverlayClick={true}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FAFAFA] w-max h-max rounded-lg shadow-md p-5 z-50 flex flex-col gap-[40px] items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        autoFocus={false}
        ariaHideApp={false}
      >
         <button
          type="button"
          className="absolute top-[10px] right-[10px] h-[30px] w-[30px] w-max items-center px-[10px] rounded bg-white text-black flex items-center justify-center z-50"
          onClick={() => setIsWarningModal(false)}
        >
            <IoMdClose />
        </button>
          <div className='font-bold lg:text-[20px] text-[14px]'>
            Вы действительно хотите удалить проект?
          </div>

          <div className='flex gap-[10px]'>
            <Button
            type="button" 
            label='ДA' 
            callback={() => {
              handleDelete(data);
                setIsWarningModal(false);
            }}
            />
            <Button
              type="button" 
              label='НЕТ' 
              callback={() => {
                setIsWarningModal(false);
            }}
            />
          </div>
          

      </Modal>
      </>
      
    );
 };