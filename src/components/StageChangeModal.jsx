import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import { Button } from "./Button";

export const StageChangeModal = ({ isWarningModal, setIsWarningModal, stage, handleChangeStage}) => {
    return (
        <Modal
            isOpen={isWarningModal}
            onRequestClose={() => setIsWarningModal(false)}
            shouldCloseOnOverlayClick={true}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FAFAFA] w-screen lg:w-max h-max rounded-lg shadow-md p-5 z-50 flex flex-col gap-[40px] items-center"
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
        <div className='font-bold lg:text-[20px] text-[14px] flex flex-col gap-[10px] items-center'>
            <p>
              Для оновления данных необходимо сохранить изменения.
            </p>
            <p>
              Для перехода далее необходимо получить одобрение всех пунктов. Все равно перейти?
            </p>
          </div>

          <div className="flex gap-[20px]">
            <Button
            type="button"
            label='ДA'
            callback={() => {
              handleChangeStage(stage);
              setIsWarningModal(false);
            }} 
          />
          <Button
            type="button"
            label='НЕТ'
            callback={() => setIsWarningModal(false)} 
          />
          </div>
    </Modal>
    )
}