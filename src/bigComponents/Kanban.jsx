import { Col, Row } from "react-bootstrap"
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { handleDelete, updateFieldInDocumentInCollection } from "../helpers/firebaseControl";
import Modal from "react-modal";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../components/Button";

export const Kanban = ({ orders }) => {
    const [isWarningModal, setIsWarningModal] = useState(false);

    const [deletingElement, setDeletingElement] = useState(null);

    const handleChangeStage = async(el) => {
        try {
            await updateFieldInDocumentInCollection('orders', el.idPost, 'stage', '2');
        } catch(error) {
            console.log(error)
        }
        
    };

    return (
        <>
         <div className=" px-[5px] lg:px-[20px]">
            <Row className="font-bold text-[#727272] border-b-2 border-['#E9E9E9'] text-[10px] lg:text-[16px]">
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #1</Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #2</Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pb-[10px]">Stage #3</Col>
                <Col className="text-center pb-[10px]">Stage #4</Col>
            </Row>
            <Row>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                    {orders.filter(el => (el.stage === '1')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block" key={el.id}>
                                <Link onClick={() => handleChangeStage(el)} to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button 
                                    className="hidden lg:block"  
                                    onClick={() => {
                                        setIsWarningModal(true);
                                        setDeletingElement(el)
                                    }}
                                >
                                <GrClose />
                            </button>
                            </div>
                        )
                    })}
                </Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                    {orders.filter(el => (el.stage === '2')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block"  key={el.id}>
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button 
                                    className="hidden lg:block" 
                                    onClick={() => {
                                        setIsWarningModal(true);
                                        setDeletingElement(el)
                                    }}
                                  >
                                    <GrClose />
                                  </button>
                            </div>
                        )
                    })}
                </Col>
                <Col className="border-r-2 border-['#E9E9E9'] text-center pt-[20px] flex flex-col gap-[20px]">
                {orders.filter(el => (el.stage === '3')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block" key={el.id}>
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button 
                                    className="hidden lg:block" 
                                    onClick={() => {
                                        setIsWarningModal(true);
                                        setDeletingElement(el)
                                    }}
                                  >
                                <GrClose />
                            </button> 
                            </div>
                        )
                    })}
                </Col>
                <Col className="text-center pt-[20px] flex flex-col gap-[20px] text-[10px] lg:text-[16px]">
                {orders.filter(el => (el.stage === '4')).map(el => {
                        return (
                            <div className="border border-[#E9E9E9] p-[10px] lg:p-[20px] lg:flex lg:gap-[40px] rounded lg:justify-center gap-[0px] block" key={el.id}>
                                <Link to={`/orderList/${el.id}`}>{el.id}</Link>
                                  <button
                                    className="hidden lg:block" 
                                    onClick={() => {
                                        setIsWarningModal(true);
                                        setDeletingElement(el)
                                    }}
                                  >
                                <GrClose />
                            </button>
                            </div>
                        )
                    })}
                </Col>
            </Row>
            
        </div>
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

          <Button
            type="button" 
            label='ДA' 
            callback={() => {
                handleDelete(deletingElement);
                setIsWarningModal(false);
            }}
          />

      </Modal>
        </>
       
    )
}