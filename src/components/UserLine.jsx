import { useState } from "react";
import { Button } from "./Button";
import { RoleModal } from "./RoleModal";
import { RoleModel } from "../Models/UserModel";

export const UserLine = ({ data, i }) => {

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
          <div className="gap-[5px] lg:gap-[0px] w-full h-max flex flex-row items-center justify-between border-b-2 border-['#E9E9E9'] py-[5px]">
            <div className="w-auto lg:pl-[20px] lg:pr-[20px] pl-[5px] pr-[5px] text-center">
                <p className="text-[#727272]">
                    {i + 1}
                </p>
            </div>
            <div className="lg:w-1/4 w-auto">
                <p className="text-[#727272] text-[8px] lg:text-[16px]">
                    {data.email}
                </p>
            </div>
            <div className="w-1/4">
                <p className="text-[#727272]">
                    {data.role.length > 0 ? getRole(data.role) : 'нет роли'}
                </p>
            </div>
            <div className="lg:w-1/4 w-auto pr-[5px]">
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