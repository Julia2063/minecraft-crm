import { useContext, useEffect, useState } from 'react';
import { Form0 } from './Form0';
import {Accordion} from 'react-bootstrap';
import {OrderModel} from "../Models/OrderModel"
import { createNewOrder, deleteImageFromStorage, updateDocumentInCollection, updateFieldInDocumentInCollection, uploadFilesToStoragesFolder, uploadFilesToStoragesFolderWitwName } from '../helpers/firebaseControl';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { View0 } from './View0';
import { format } from 'date-fns';
import { Form1 } from './Form1';
import { View1 } from './View1';
import { Form2 } from './Form2';
import { View2 } from './View2';
import { OrderInformation } from './OrderInformation';
import { Form3 } from './Form3';
import { View3 } from './View3';
import { sendMessageTelegram } from '../helpers/functions';

const Order = ({
  newOrder, // Bool is new or not
  viewOrder, // Bool edit or view
  orderModel, // if edit -> state of order
  edit, // Bool do edit or not
  currentOrder
}) => {

    const [order, setOrder] = useState(OrderModel);

    const { user, users,  userRole } = useContext(AppContext);

    const [activeKey, setActiveKey] = useState('0');

    const [newComment, setNewComment] = useState({
      tz: '',
      research: '',
      concept: '',
      functional: '',
      plan: '',
      content: '',
      contract: '',
    });

    const [files, setFiles] = useState({
      concept: [],
      content: [],
      contract:[]
    });

    const [isTextarea, setIsTextArea] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      if(currentOrder) {
        setOrder(currentOrder);
        setActiveKey(currentOrder.stage)
      }
      
    }, [currentOrder]);

    useEffect(() => {
      if(order.concept.approve === 'yes' && order.functional.approve === 'yes' && order.research.approve === 'yes') {
          updateFieldInDocumentInCollection('orders', order.idPost, 'stage', '2');
          setOrder({...order, stage: '2'});
      }

  }, [order.concept.approve, order.functional.approve, order.research.approve]);
  
  useEffect(() => {
    if(order.figma.approve === 'yes' && order.tz.approve === 'yes' && order.plan.approve === 'yes' && order.content.approve === 'yes' && order.price.approve === 'yes' && order.end.approve === 'yes' && order.contract.approve === 'yes') {
        updateFieldInDocumentInCollection('orders', order.idPost, 'stage', '3');
        setOrder({...order, stage: '3'});
    }

}, [order.figma.approve, order.tz.approve, order.plan.approve, order.content.approve, order.price.approve, order.end.approve, order.contract.approve]);


    const handleSelect = (eventKey) => {
      if (eventKey <= order.stage) {
          setActiveKey(eventKey);
      }
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setOrder((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const handleChangeWithApprove = (event) => {
    const { name, value } = event.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: {...order[name], text: value},
    }));
  };

  const handleAddNewComment = async (name) => {
    try {
      if(newComment[name].length > 0) {
        await updateFieldInDocumentInCollection(
            'orders', order.idPost, name, {...order[name], comments: [...order[name].comments, 
              {
                text: newComment[name],
                date: format(new Date(), 'yyyy-MM-dd HH:mm'),
                user: [user.nickName, user.uid],
              }
              ]}
        );
        toast.success('Комментарий успешно добавлен!');
      } else {
        return;
      }
       
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!')
    }
  };

  const getApprove = async (name) => {
    try { 
      if(files[name].length > 0) {
      const deletedImages = currentOrder[name].files.filter(e => !order[name].files.includes(e));
      deletedImages.forEach(el => deleteImageFromStorage(el));
      
        uploadFilesToStoragesFolderWitwName(files[name], currentOrder, name).then(res => {
          console.log(res);
          updateDocumentInCollection('orders', {
            ...order,
            [name]: {
              ...order[name], 
              approve: 'wait', 
              files: [...currentOrder[name].files.filter(el => order[name].files.includes(el)), ...res],
              comments: newComment[name].length >  0 ?  [...order[name].comments, 
            {
              text: newComment[name],
              date: format(new Date(), 'yyyy-MM-dd HH:mm'),
              user: [user.nickName, user.uid],
            }
            ] : order[name].comments,
          
        }}, currentOrder.idPost);
        });
      } else {
         await updateDocumentInCollection(
            'orders', {...order, [name]: {
              ...order[name],
              approve: 'wait', 
              comments: newComment[name].length >  0 ?  [...order[name].comments, 
              {
                text: newComment[name],
                date: format(new Date(), 'yyyy-MM-dd HH:mm'),
                user: [user.nickName, user.uid],
              }
              ] : order[name].comments}}, order.idPost, 
        );
      }
      setFiles({
        concept: [],
        content: [],
        contract:[]
      });
      setNewComment({
          tz: '',
          research: '',
          concept: '',
          functional: '',
          plan: '',
          content: '',
          contract: '',
      });
      setIsTextArea(false);
      toast.success('Запрос на согласованиe отправлен');
       
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!')
    }
  };

    const handleChangePhotos = (e, name) => {
      if (e.target.files[0]) {
        setFiles({...files, [name]: [...files[name], e.target.files[0]]});
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setOrder({...order, [name]: {...order[name], files: [...order[name].files, reader.result]}}) ;
        };
      
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const handleDeletePhoto = (ind, name) => {
      const newImages = order[name].files.filter((e, i) => i !== ind);
      setOrder({...order, [name]: {...order[name], files: newImages}});
      const newFiles = files[name].filter((e, i) => i !== ind);
      setFiles({...files, [name]: newFiles});
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
      await createNewOrder(user.uid, user.nickName, order, newComment);
      const usersArray = users.filter(el => el.role.includes('executor')).map(el => el.telegramId);
      console.log(usersArray);
      sendMessageTelegram('Новый заказ сохранен в базу данных', usersArray);
      toast.success("Order saved in BD");
      navigate('/orderList');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
};

const handleSubmitChange = async (e) => {
  e.preventDefault();
  try {
    const filesArray = Object.entries(files).filter(el => el[1].length > 0);

    const keysWithImages = Object.entries(order).filter(el => Object.keys(files).includes(el[0]));
    const deletedImages = {};

    keysWithImages.forEach(el => (
      deletedImages[el[0]] = currentOrder[el[0]].files.filter(e => !order[el[0]].files.includes(e))
    ));


    if (Object.values(deletedImages).some(el => el.length > 0)) {
      Object.values(deletedImages).flat().forEach(el => deleteImageFromStorage(el));
    };

    if(filesArray.length > 0) {
      uploadFilesToStoragesFolder(files, currentOrder).then(res => {
        updateDocumentInCollection('orders', {
          ...order,
          tz:  newComment.tz.length > 0 ? {...order.tz, comments: [...order.tz.comments, {
            text: newComment.tz,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.nickName, user.uid],
          }]
            } : order.tz,
        research: newComment.research.length > 0 ? {...order.research, comments: [...order.research.comments, {
          text: newComment.research,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        } : order.research,
        plan: newComment.plan.length > 0 ? {...order.plan, comments: [...order.plan.comments, {
          text: newComment.plan,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        } : order.plan,
        functional : newComment.functional.length > 0 ? {...order.functional, comments: [...order.functional.comments, {
          text: newComment.functional,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        } : order.functional,
        concept:  {
          ...order.concept,
          files: res.concept ? [...currentOrder.concept.files.filter(el => order.concept.files.includes(el)), ...res.concept] : files.concept.files,
          comments: newComment.concept.length > 0 ? [...order.concept.comments, {
            text: newComment.concept,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.nickName, user.uid],
            }]
          : order.concept.comments,
        },
        contract:  {
          ...order.contract,
          files: res.contract ? [...currentOrder.contract.files.filter(el => order.contract.files.includes(el)), ...res.contract] : files.contract.files,
        },
        content:  {
          ...order.content,
          files: res.content ? [...currentOrder.content.files.filter(el => order.content.files.includes(el)), ...res.content] : files.content.files,
          comments: newComment.content.length > 0 ? [...order.content.comments, {
            text: newComment.content,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.nickName, user.uid],
            }]
          : order.content.comments,
        },
      }, currentOrder.idPost);
      });
    } else {
      await updateDocumentInCollection('orders', {
        ...order,
        tz:  newComment.tz.length > 0 ? {...order.tz, comments: [...order.tz.comments, {
          text: newComment.tz,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
        }]
          } : order.tz,
      research: newComment.research.length > 0 ? {...order.research, comments: [...order.research.comments, {
        text: newComment.research,
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
        user: [user.nickName, user.uid],
        }]
      } : order.research,
      functional : newComment.functional.length > 0 ? {...order.functional, comments: [...order.functional.comments, {
        text: newComment.functional,
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
        user: [user.nickName, user.uid],
        }]
      } : order.functional,
      plan: newComment.plan.length > 0 ? {...order.plan, comments: [...order.plan.comments, {
        text: newComment.plan,
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
        user: [user.nickName, user.uid],
        }]
      } : order.plan,
      concept:  {
        ...order.concept,
        files: [...currentOrder.concept.files.filter(el => order.concept.files.includes(el))],
        comments: newComment.concept.length > 0 ? [...order.concept.comments, {
          text: newComment.concept,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        : order.concept,
      },
      content:  {
        ...order.content,
        files: [...currentOrder.content.files.filter(el => order.content.files.includes(el))],
        comments: newComment.content.length > 0 ? [...order.content.comments, {
          text: newComment.content,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [user.nickName, user.uid],
          }]
        : order.content,
      },
    }, currentOrder.idPost);
    }
  toast.success("Order was updated successfully");
  navigate('/orderList');
  } catch (error) {
  console.log(error);
  toast.error("Something went wrong...");
  }
};

console.log(order);

    return (
        <>
            <Accordion 
              activeKey={activeKey} 
              onSelect={handleSelect} 
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Stage #1</Accordion.Header>
                <Accordion.Body>
                  {currentOrder ? (
                    <View0 
                      order={order} 
                      newComment={newComment}
                      setNewComment={setNewComment}
                      handleAddNewComment={handleAddNewComment}
                      isTextarea={isTextarea}
                      setIsTextArea={setIsTextArea}
                    />
                  ): (
                    <Form0 
                      order={order}
                      handleChange={handleChange}
                      setOrder={setOrder}
                      newComment={newComment}
                      setNewComment={setNewComment}
                      handleSubmit={handleSubmit}
                      isTextarea={isTextarea}
                      setIsTextArea={setIsTextArea}
                     /*  model={""} 
                      update={console.log("")} 
                      newOrder={newOrder} 
                      role={role}  */
                    />
                  )}
                </Accordion.Body>
              </Accordion.Item><Accordion.Item eventKey="1" >
                <Accordion.Header>Stage #2</Accordion.Header>
                <Accordion.Body>
                  {userRole.includes('executor') ? (
                    <Form1 
                      order={order}
                      setOrder={setOrder}
                      handleChangePhotos={handleChangePhotos}
                      handleDeletePhoto={handleDeletePhoto}
                      setNewComment={setNewComment}
                      handleChange={handleChangeWithApprove}
                      newComment={newComment}
                      handleSubmit={handleSubmitChange}
                      getApprove={getApprove}
                      isTextarea={isTextarea}
                      setIsTextArea={setIsTextArea}
                  />
                  ) : (
                    <View1
                      order={order}
                      setOrder={setOrder}
                      newComment={newComment}
                      setNewComment={setNewComment}
                      handleAddNewComment={handleAddNewComment}
                      isTextarea={isTextarea}
                      setIsTextArea={setIsTextArea}
                    />
                  )}
                  
                </Accordion.Body>
              </Accordion.Item><Accordion.Item eventKey="2">
                <Accordion.Header>Stage #3</Accordion.Header>
                <Accordion.Body>
                {userRole.includes('executor') ? (
                  <Form2
                    order={order}
                    setOrder={setOrder}
                    handleChangewithApprove={handleChangeWithApprove}
                    handleChange={handleChange}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleChangePhotos={handleChangePhotos}
                    handleDeletePhoto={handleDeletePhoto}
                    handleSubmit={handleSubmitChange}
                    getApprove={getApprove}
                    isTextarea={isTextarea}
                    setIsTextArea={setIsTextArea}
                  />
                ) : (
                  <View2 
                    order={order}
                    setOrder={setOrder}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleAddNewComment={handleAddNewComment}
                    isTextarea={isTextarea}
                    setIsTextArea={setIsTextArea}
                  />
                )}
                 

                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Stage #4</Accordion.Header>
                <Accordion.Body>
                  <div className='p-6'>
                    <OrderInformation 
                      order={order}
                    />
                    {userRole.includes('executor') ? (
                      <Form3 
                        order={order}
                        setOrder={setOrder}
                        handleChange={handleChange}
                        handleSubmit={handleSubmitChange}
                      />
                    ) : (
                      <View3 order={order}/>
                    )}
                    
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
        </>
    )
}

export default Order;