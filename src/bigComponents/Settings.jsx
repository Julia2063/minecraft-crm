import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { UserTableHeader } from "../components/UsersTableHeader";
import { UserLine } from "../components/UserLine";

import { SettingsForm } from "../components/SettingsForm";

export const Settings = () => {
    const { user, users, userRole} = useContext(AppContext);

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
        </div>
    )
}