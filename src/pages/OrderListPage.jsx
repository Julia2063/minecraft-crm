import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { TableHeader } from '../components/TableHeader';
import { Button } from '../components/Button';
import { useContext, useEffect, useState } from 'react';
import { OrderModal } from '../components/OrderModal';
import { AppContext } from '../context/AppContext';
import { db } from '../firebase';
import { OrderLine } from '../components/OrderLine';

import AddOrder from '../Models/AddOrder.json';
import FormModels from '../Models/FormModels';
import { useNavigate } from 'react-router-dom';
import { Kanban } from '../bigComponents/Kanban';

function OrderListPage() {
  
  const tabsArray = [
    {
      id: 1,
      title: 'Table',
    },
    {
      id: 2,
      title: 'Kanban',
    },

  ];

  
  const [isModal, setIsModal] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const { user, userRole, setUser, setUserRole, orders, setOrders} = useContext(AppContext);
  

  const navigate = useNavigate();
  


  useEffect(() => {
    db.collection('orders').onSnapshot(snapshot => {
      /* let model = AddOrder;
      let snapshotResult = snapshot.docs.map(doc => ({...doc.data(), idPost: doc.id}));
      let snapshotKeys = [];

      snapshotResult.forEach(el => {
        snapshotKeys.push(Object.keys(el));
      })
    
      let result = model.inputs;
      console.log(snapshotResult, snapshotKeys, result);
      snapshotKeys.forEach(s => {
        model.inputs.forEach(el => {
          console.log(el[s]);
          console.log(result[result.(el.key)]);
        });
      }) */
     
      setOrders(snapshot.docs.map(doc => ({...doc.data(), idPost: doc.id} )));
    });
  }, [user]);

  const openModal = () => {
    setIsModal(true);
  };     
    
  const closeModal = () => {
    setIsModal(false);
  };

  const handleAddOrder = () => {
    setIsChanging(false);
    navigate('/orderList/newOrder')
  };

    return (
        <div className='p-[15px] lg:p-[40px] md:p-[60px] w-full flex flex-col gap-[40px] '>
          {userRole.includes('admin') && 
           <Button 
              type="button" 
              label='Добавить заказ' 
              className='self-end'
              callback={handleAddOrder}
            />
          }
          
            <Tabs>
              <TabList>
                {
                  tabsArray.map(idx => (
                    <Tab key={idx.id}>
                        <span className='font-bold'>{idx.title}</span>
                    </Tab>
                  ))
                }
              </TabList>
              <TabPanel>
                <div className='flex pt-[40px] '>
                  
                  <div className='flex w-full flex-col justify-center py-[20px] shadow-md h-max rounded-lg border-[1px]'>
                    <TableHeader />
                      {orders.filter(el => el.active).map((el, i) => (
                        
                      <OrderLine i={i} data={el} key={el.id}/>
                    
                      ))}
                  </div>
                </div>
              </TabPanel>
                
              <TabPanel>
              <div className='pt-[40px]'>
                <div className='py-[20px] shadow-md h-max rounded-lg border-[1px]'>
                  <Kanban orders={orders} />
                </div>
                
              </div>
              </TabPanel>
            </Tabs>

            <OrderModal
              isOpen={isModal}
              closeModal={closeModal}
              isChanging={isChanging}
              /* currentOrder={currentOrder} */
            />
        </div>
    )
};

export default OrderListPage;