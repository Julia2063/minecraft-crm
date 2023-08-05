import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { TableHeader } from '../components/TableHeader';
import { Button } from '../components/Button';
import { useContext, useEffect, useState } from 'react';
import { OrderModal } from '../components/OrderModal';
import { AppContext } from '../context/AppContext';
import { db } from '../firebase';
import { OrderLine } from '../components/OrderLine';

import { Kanban } from '../bigComponents/Kanban';
import { AiOutlineSearch } from 'react-icons/ai';

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
  const [filterActive, setFilterActive] = useState('all');
  const [filterStage, setFilterStage] = useState('all');

  const [query, setQuery] = useState('');

  const [visibleOrders, setVisibleOrders] = useState([]);
  

  const { user, userRole, orders, setOrders} = useContext(AppContext);
  
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
     
      setOrders(snapshot.docs.map(doc => ({...doc.data(), idPost: doc.id} )).sort((a, b) => new Date(b.dateCreating) - new Date(a.dateCreating)));
    });
  }, [user]);

  useEffect(() => {
    
    const filteredOrders = orders.filter(el => filterStage === 'all' ? el : el.stage === filterStage).filter(el => {
      switch(true){
        case filterActive === 'active':
          return el.active;

        case filterActive === 'unActive':
          return !el.active ;

        default:
          return el;
      }
    });

    if(query.length > 0) {
      
      setVisibleOrders(filteredOrders.filter(el => (el.title.includes(query) || el.figma.text.includes(query) || el.tz.text.includes(query))));
    } else {
      setVisibleOrders(filteredOrders);
    };
    
    
  }, [orders, filterActive, filterStage, query]);

    
  const closeModal = () => {
    setIsModal(false);
  };

    return (
        <div className='p-[15px] lg:p-[40px] md:p-[60px] w-full flex flex-col gap-[40px] '>
          <div className='flex lg:flex-row flex-col lg:justify-between  gap-[10px] lg:gap-[0px]'>
            <div className='flex gap-[10px] w-full lg:flex-row flex-col'>
             
              <label className="flex-col flex lg:w-1/5 w-full">
                <span  className="font-bold lg:text-[14px] text-[12]">Активные/Законченные</span>
                <div >
                  <select
                    name="priority"
                    type="date"
                    value={filterActive}
                    onChange={(e) => setFilterActive(e.target.value)}
                    className="w-full h-[36px] rounded-[3px] border-[#E9E9E9] border pl-3 mt-2"
                  >
                  <option value="all">Все</option>
                  <option value="active">В работе</option>
                  <option value="unActive">Архив</option>
                  
                  </select>
                </div>
              </label>

              <label className="flex-col flex lg:w-1/5 w-full">
                <span  className="font-bold lg:text-[14px] text-[12]">Этап</span>
                <div >
                  <select
                    name="priority"
                    type="date"
                    value={filterStage}
                    onChange={(e) => setFilterStage(e.target.value)}
                    className="w-full h-[36px] rounded-[3px] border-[#E9E9E9] border pl-3 mt-2"
                  >
                  <option value="all">Все</option>
                  <option value="1">Этап 1</option>
                  <option value="2">Этап 2</option>
                  <option value="3">Этап 3</option>
                  <option value="4">Этап 4</option>
                  </select>
                </div>
              </label>

              <label className='flex flex-col'>
                <span  className="font-bold lg:text-[14px] text-[12]">Поиск</span>
                <div className="relative flex items-center">
              
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Искать..."
                    className="mt-2 w-full h-[36px] py-[5.5px] pl-2 pr-2 text-gray-700 focus:outline-none focus:shadow-outline border border-['#FFFFFF'] rounded-l-[3px] text-sm"
                  />
                  <div className="relative mt-2 inset-y-0 h-[36px] right-0 flex items-center justify-center p-2 text-gray-500 pointer-events-none bg-[#FAFAFA] border border-['#E9E9E9'] rounded-r-[3px] right-[1px]">
                    <AiOutlineSearch color="#727272" fontSize={14} />
                  </div>
        
                </div>
                
              </label>

              
            </div>
             
            {userRole.includes('admin') && 
           <Button 
              type="button" 
              label='Добавить' 
              className='self-end'
              callback={() => setIsModal(true)}
            />
          }
          </div>
          
          
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
                      {visibleOrders.map((el, i) => (
                        
                      <OrderLine i={i} data={el} key={el.id}/>
                    
                      ))}
                  </div>
                </div>
              </TabPanel>
                
              <TabPanel>
              <div className='pt-[40px]'>
                <div className='py-[20px] shadow-md h-max rounded-lg border-[1px]'>
                  <Kanban orders={visibleOrders} />
                </div>
                
              </div>
              </TabPanel>
            </Tabs>

            <OrderModal
              isOpen={isModal}
              closeModal={closeModal}
            />
        </div>
    )
};

export default OrderListPage;