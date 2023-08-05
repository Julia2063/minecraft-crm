import Modal from "react-modal";
import { Form0 } from './Form0';
import { useContext, useState } from "react";
import { createNewOrder } from "../helpers/firebaseControl";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

import { sendMessageTelegram } from "../helpers/functions";
import { useNavigate } from "react-router-dom";
import { OrderModel } from "../Models/OrderModel";
import { IoMdClose } from "react-icons/io";

export const OrderModal = ({ isOpen, closeModal }) => {
const [order, setOrder] = useState(OrderModel);

const navigate = useNavigate();

const { user, users } = useContext(AppContext);

const handleChange = (event) => {
  const { name, value } = event.target;
  setOrder((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const [newComment, setNewComment] = useState({
  tz: '',
  research: '',
});

const handleSubmit = async (e) => {
  e.preventDefault();
    try {
    await createNewOrder(user.uid, user.nickName, order, newComment);
    const usersArray = users.filter(el => el.role.includes('executor')).map(el => el.telegramId);
    console.log(usersArray);
    sendMessageTelegram('Новый заказ сохранен в базу данных', usersArray);
    toast.success("Order saved in BD");
    navigate('/orderList');
    setOrder(OrderModel);
    closeModal();
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong...");
  }
};

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FAFAFA] w-4/5 h-3/4 rounded-lg shadow-md p-8 overflow-y-scroll"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            autoFocus={false}
            ariaHideApp={false}
        >
          <p className=" text-2xl">
            Добавить заказ
          </p>

        <Form0 
          order={order}
          setOrder={setOrder}
          handleChange={handleChange}
          newComment={newComment}
          setNewComment={setNewComment}
          handleSubmit={handleSubmit}

        />

        <button
          type="button"
          className="fixed top-[10px] right-[10px] h-[30px] w-[30px] w-max items-center px-[10px] rounded bg-white text-black flex items-center justify-center z-50"
          onClick={closeModal}
        >
            <IoMdClose />
        </button>
          
        </Modal>
    )
}