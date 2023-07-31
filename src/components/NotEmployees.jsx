import { FiLogOut } from "react-icons/fi"
import { logOut } from "../helpers/firebaseControl"
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const NotEmployees = () => {

  const { setUser, setUserRole} = useContext(AppContext);

  const handleLogOut = () => {
    logOut();
    setUser(null);
    setUserRole('');
  };

    return (
        <div className="flex flex-col h-full w-full justify-center items-center">
            Ви не є співробітником
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