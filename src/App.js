import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Entry from "./pages/Entry";
import { NotEmployees } from "./components/NotEmployees";
import HamburgerMenu from "./bigComponents/HamburgerMenu"
import OrderListPage from "./pages/OrderListPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import { OrderCard } from "./bigComponents/OrderCard";


function App() {
  const { user, userRole } = useContext(AppContext);
  return (
    <>
      {!user ? (
          <Entry />
        ) : (
          <>
            <HamburgerMenu/>
            <Routes>  
              {userRole.length > 0 && 
                <>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="orderList"  >
                    <Route index element={<OrderListPage />}/>
                    <Route path=":slug" element={<OrderCard />}/>
                  </Route>
                  <Route path="settings" element={<SettingsPage />} />
                </>
              }
              
              <Route path="notEmployees" element={<NotEmployees />} />
            </Routes>  
          </>
        )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
