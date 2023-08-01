import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { db } from "../firebase";
import { UserTableHeader } from "../components/UsersTableHeader";
import { UserLine } from "../components/UserLine";
import { logOut } from "../helpers/firebaseControl";

import { FiLogOut } from 'react-icons/fi';
import { SettingsForm } from "../components/SettingsForm";

export const Settings = () => {
    const { user, users, userRole, setUser, setUserRole} = useContext(AppContext);

    const handleLogOut = () => {
        logOut();
        setUser(null);
        setUserRole('');
      };

    return (
        <div className='flex w-full flex-col items-center justify-center py-[20px] gap-[20px] p-[15px] lg:p-[40px] md:p-[60px]' >
          <SettingsForm data={user} />
        {userRole === 'executor_admin' && (
          <div className='flex w-full text-[10px] lg:text-[16px] lg:w-2/3 flex-col justify-center py-[20px] shadow-md h-max rounded-lg border-[1px]'>
            <UserTableHeader />
            {users?.map((el, i) => (
              <UserLine 
                data={el} 
                key={el.idPost} 
                i={i} 
              />
            ))}
          </div>
          
        )}

          <button 
            className='flex gap-[10px] items-center'
            onClick={handleLogOut}
          >
            <span>Выйти</span>  
            <FiLogOut />
          </button>
        </div>
    )
}