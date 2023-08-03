import Modal from "react-modal";
import { Button } from "./Button";
import { AiFillCaretDown } from 'react-icons/ai';
import { useEffect, useState } from "react";
import { updateFieldInDocumentInCollection } from "../helpers/firebaseControl";
import { toast } from "react-toastify";
import { RoleModel } from "../Models/UserModel";

export const RoleModal = ({ isOpen, closeModal, email, userRole, id }) => {
    const [role, setRole] = useState('');

    useEffect(() => {
        if(userRole.length > 0) {
            setRole(userRole);
        }
    }, []);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(userRole !== role) {
            try {updateFieldInDocumentInCollection('users', id, 'role', role );
            toast.success("Role was changed successfully");
            setRole('');
            closeModal();
        } catch (error) {
            toast.error("Something went wrong...");
        }}
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FAFAFA] w-[688px] h-max rounded-lg shadow-md p-8"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            autoFocus={false}
            ariaHideApp={false}
        >
            <form 
              className="flex flex-col gap-[40px]"
              onSubmit={(e) => handleSubmit(e)}
            >
                <div className="flex justify-between items-center">
                <div className="font-bold">{email}</div>
                <select
                    type="text"
                    name="role"
                    value={role}
                    onChange={handleChange}
                    className="w-2/5 h-[36px] rounded border-[#E9E9E9] border pl-2 pr-6 mt-2 text-gray-600 appearance-none z-10 relative bg-[transparent]"
            >
              <option value="" className="text-gray-400">
                Выберите роль
              </option>
              {RoleModel.map(el => {
                return (
                    <option value={el.key} key={el.key}>{el.name}</option>
                )
              })}
            </select>
            <span className="absolute right-[40px] bottom-[115px]">
              <AiFillCaretDown />
            </span>
            </div>
            
            <div className="flex flex-row justify-between">
                <button onClick={closeModal} type='button'>
                <span className="text-[#DC0000] text-sm">Закрыть</span>
                </button>
                <div className="flex justify-end">
                <Button type="submit" label={userRole.length > 0 ? 'Изменить' : 'Назначить'} />
                </div>
            </div>
          </form>
            
        </Modal>
    )
}