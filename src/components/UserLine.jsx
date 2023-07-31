import { useState } from "react";
import { Button } from "./Button";
import { RoleModal } from "./RoleModal";
import { RoleModel } from "../Models/UserModel";

export const UserLine = ({ data, openModal, i }) => {

    const [isRoleModal, setIsRoleModal] = useState(false);
    const getRole = () => {
      const role = RoleModel.find(el => el.key === data.role );
      return role.name;
    };

    const openRoleModal = () => {
        setIsRoleModal(true);
      };     
        
      const closeRoleModal = () => {
        setIsRoleModal(false);
      };
  
    return (
        <>
          <div className=" w-full h-12 flex flex-row items-center justify-between border-b-2 border-['#E9E9E9'] py-[5px]">
            <div className="w-auto pl-[20px] pr-[20px] text-center">
                <p className="text-[#727272]">
                    {i + 1}
                </p>
            </div>
            <div className="w-1/4">
                <p className="text-[#727272]">
                    {data.email}
                </p>
            </div>
            <div className="w-1/4">
                <p className="text-[#727272]">
                    {data.role.length > 0 ? getRole(data.role) : 'нет роли'}
                </p>
            </div>
            <div className="w-1/4">
                <Button
                    type="button"
                    label="Назначить роль"
                    callback={openRoleModal}
                />
            </div>
        </div>
        
        <RoleModal
            isOpen={isRoleModal}
            closeModal={closeRoleModal} 
            email={data.email}
            userRole={data.role}
            id={data.idPost}
        />
    </>
    );
  };