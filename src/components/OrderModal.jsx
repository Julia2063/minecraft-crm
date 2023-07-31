import Modal from "react-modal";
import { Button } from "./Button";
import { useContext, useEffect, useState } from "react";
import { createNewOrder, deleteImageFromStorage, updateDocumentInCollection, updateFieldInDocumentInCollection, uploadFilesToStoragesFolder } from "../helpers/firebaseControl";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { Comments } from "./Comments";
import { format } from "date-fns";
import { Approve } from "./Approve";
import { Input } from "./Input";
import { InputFile } from "./InputFile";

export const OrderModal = ({ isOpen, closeModal, isChanging, currentOrder }) => {

  const { user, userRole } = useContext(AppContext);

  const [newComment, setNewComment] = useState({
    tz: '',
    research: '',
    concept: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    ref: '',
    
    tz: {
      text: '',
      comments: [],
    },
    research: {
      text: '',
      comments: [],
    },
    figma: {
      text: '',
      approve: false,
    },
    concept: {
      images: [],
      approve: false,
      comments: [],
    },
    start: '',
    end: '',
    desiredDates: 0,
    desiredPrice: 0,
    price: 0,
    priority: 'ASAP',
    hh: 0
  });

  const [files, setFiles] = useState({
    concept: [],
  });

  useEffect(() => {
    if(currentOrder) {
      setFormData({
        title: currentOrder.title,
        ref: currentOrder.ref,
        tz: currentOrder.tz,
        research: currentOrder.research,
        figma: currentOrder.figma,
        concept: currentOrder.concept,
        start: currentOrder.start,
        end: currentOrder.end,
        desiredDates: currentOrder.desiredDates,
        desiredPrice: currentOrder.desiredPrice,
        price: currentOrder.price,
        priority: currentOrder.priority,
        hh:currentOrder.hh,
      })
    } else {
      setFormData(
        {
          title: '',
          ref: '',
         
          tz: {
            text: '',
            comments: [],
          },
          research: {
            text: '',
            comments: [],
          },
           figma: {
            text: '',
            approve: false,
          },
          concept: {
            images: [],
            approve: false,
            comments: [],
          },
          start: '',
          end: '',
          desiredDates: 0,
          desiredPrice: 0,
          price: 0,
          priority: 'ASAP',
          hh: 0
        }
      )
    }
    setNewComment({
      tz: '',
      research: '',
      concept: ''
    });
    setFiles({
      concept: [],
    });
  }, [currentOrder]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeWithApprove = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: {...formData[name], text: value},
    }));
  };

  const handleChangePhotos = (e, name) => {
    if (e.target.files[0]) {
      setFiles({...files, [name]: [...files[name], e.target.files[0]]});
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({...formData, [name]: {...formData[name], images: [...formData[name].images, reader.result]}}) ;
      };
    
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeletePhoto = (ind, name) => {
    const newImages = formData[name].images.filter((e, i) => i !== ind);
    setFormData({...formData, [name]: {...formData[name], images: newImages}});
    const newFiles = files[name].filter((e, i) => i !== ind);
    setFiles({...files, [name]: newFiles});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isChanging) {
      const oldData = Object.values({
        title: currentOrder.title,
        ref: currentOrder.ref,
        figmaText: currentOrder.figma.text,
        figmaApзrove: currentOrder.figma.approve,
        conceptCommentsLength: currentOrder.concept.comments.length,
        conceptImagesLength: currentOrder.concept.images.length,
        conceptApprove: currentOrder.concept.approve,
        tz: currentOrder.tz.text,
        start: currentOrder.start,
        end: currentOrder.end,
        research: currentOrder.research.text,
        desiredDates: currentOrder.desiredDates,
        desiredPrice: currentOrder.desiredPrice,
        price: currentOrder.price,
        priority: currentOrder.priority,
        hh: currentOrder.hh
      });

      const newData = Object.values({
        title: formData.title,
        ref: formData.ref,
        figmaText: formData.figma.text,
        figmaApзrove: formData.figma.approve,
        conceptCommentsLength: formData.concept.comments.length,
        conceptImagesLength: formData.concept.images.length,
        conceptApprove: formData.concept.approve,
        tz: formData.tz.text,
        start: formData.start,
        end: formData.end,
        research: formData.research.text,
        desiredDates: formData.desiredDates,
        desiredPrice: formData.desiredPrice,
        price: formData.price,
        priority: formData.priority,
        hh: formData.hh
      });

      if (
        oldData.some((el, i) => el !== newData[i]) 
        || Object.values(newComment).some(el => el.length > 0) 
        || Object.values(files).some(el => el.length > 0)
        ) {
        try {
          const filesArray = Object.entries(files).filter(el => el[1].length > 0);

          /* const restedImages = product.images.filter(el => newDataModal.images.includes(el)); */
 
          

          const keysWithImages = Object.entries(currentOrder).filter(el => Object.keys(files).includes(el[0]));
          const deletedImages = {};

          keysWithImages.forEach(el => (
            deletedImages[el[0]] = currentOrder[el[0]].images.filter(e => !formData[el[0]].images.includes(e))
          ));

          console.log(Object.values(deletedImages))
          
           /* currentOrder.images.filter(el => !newDataModal.images.includes(el)); */

          if (Object.values(deletedImages).some(el => el.length > 0)) {
            Object.values(deletedImages).flat().forEach(el => deleteImageFromStorage(el));
          };

          if(filesArray.length > 0) {
            uploadFilesToStoragesFolder(files, currentOrder).then(res => {
              updateDocumentInCollection('orders', {
                ...currentOrder,
                title: formData.title,
                ref: formData.ref,
                figma: formData.figma,
                tz:  newComment.tz.length > 0 ? {...formData.tz, comments: [...formData.tz.comments, {
                text: newComment.tz,
                date: format(new Date(), 'yyyy-MM-dd HH:mm'),
                user: [user.email, user.uid],
                }]
              } : formData.tz,
              research: newComment.research.length > 0 ? {...formData.research, comments: [...formData.research.comments, {
                text: newComment.research,
                date: format(new Date(), 'yyyy-MM-dd HH:mm'),
                user: [user.email, user.uid],
                }]
              } : formData.research,
              concept:  {
                images: res.concept ? [...currentOrder.concept.images.filter(el => formData.concept.images.includes(el)), ...res.concept] : formData.concept.images,
                approve: formData.concept.approve,
                comments: formData.concept.comments,
                },
              start: formData.start,
              end: formData.end,
              desiredDates: formData.desiredDates,
              desiredPrice: formData.desiredPrice,
              price: formData.price,
              priority: formData.priority,
              hh: formData.hh
            }, currentOrder.idPost);
            });
          } else {
            console.log('files.length === 0')
            await updateDocumentInCollection('orders', {
            ...currentOrder,
            title: formData.title,
            ref: formData.ref,
            figma: formData.figma,
            tz:  newComment.tz.length > 0 ? {...formData.tz, comments: [...formData.tz.comments, {
            text: newComment.tz,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.email, user.uid],
            }]
          } : formData.tz,
          research: newComment.research.length > 0 ? {...formData.research, comments: [...formData.research.comments, {
            text: newComment.research,
            date: format(new Date(), 'yyyy-MM-dd HH:mm'),
            user: [user.email, user.uid],
            }]
          } : formData.research,
          concept: formData.concept,
          start: formData.start,
          end: formData.end,
          desiredDates: formData.desiredDates,
          desiredPrice: formData.desiredPrice,
          price: formData.price,
          priority: formData.priority,
          hh: formData.hh
        }, currentOrder.idPost);
          }
        toast.success("Order was updated successfully");
        } catch (error) {
        console.log(error);
        toast.error("Something went wrong...");
        }
      }
    } else {
      try {
      await createNewOrder(user.uid, user.email, formData, newComment, files);
      toast.success("Order saved in BD");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };
 
  closeModal();
};

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            className="absolute left-1/2 transform -translate-x-1/2 bg-[#FAFAFA] w-3/5 h-full rounded-lg shadow-md p-8 overflow-y-scroll"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            autoFocus={false}
            ariaHideApp={false}
        >
          <p className=" text-2xl">
            {isChanging ? 'Редактировать заказ' : 'Добавить заказ'}
          </p>

          <form className="pt-6 flex flex-col gap-[20px]" onSubmit={(e) => handleSubmit(e)}>
            <div className="border-b border-[#E9E9E9] pb-[20px]">
              <Input 
                title="Название"
                name="title"
                type='text'
                tag='input'
                value={formData.title} 
                handleChange={handleChange}
                placeholder="Введите название"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />
            </div>

            <div className="border-b border-[#E9E9E9] pb-[20px]">
              <Input 
                title="Реф link"
                name="ref"
                type='text'
                tag='input'
                value={formData.ref} 
                handleChange={handleChange}
                placeholder="Введите адрес ссылки на реф"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />
            </div>
  
            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px]">
              <Input 
                title="ТЗ"
                name="tz"
                type='text'
                tag='textarea'
                value={formData.tz.text} 
                handleChange={(e) => setFormData({...formData, tz: {...formData.tz, text: e.target.value }})}
                placeholder="Введите текст Технического Задания"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  
              <Comments
                className='self-end' 
                title='ТЗ'
                comments={currentOrder ? currentOrder.tz.comments : []}
                onChange={(e) => setNewComment({...newComment, tz: e.target.value})}
              />
            </div>

            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px]">
              <Input 
                title="Research"
                name="research"
                type='text'
                tag='textarea'
                value={formData.research.text} 
                handleChange={(e) => setFormData({...formData, research: {...formData.research, text: e.target.value }})}
                placeholder="Введите задание для Research"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
              />  
              <Comments
                className='self-end' 
                title='Research'
                comments={currentOrder ? currentOrder.research.comments : []}
                onChange={(e) => setNewComment({...newComment, research: e.target.value})}
              />
            </div>

            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
              <Input 
                title="Figma link"
                name="figma"
                type='text'
                tag='input'
                value={formData.figma.text} 
                handleChange={(e) => handleChangeWithApprove(e, 'text')}
                placeholder="Введите адрес ссылки на Figma"
                labelStyle="flex justify-between items-center"
                inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                disabled={userRole === 'customer' || currentOrder?.figma.approve}
              />  
              <Approve 
                formData={formData}
                setFormData={setFormData}
                name={'figma'}
                disabled={currentOrder?.figma.approve || formData.figma.text.length === 0}
              />
            </div>

            <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px] relative">
              <InputFile
                title='Концепт'
                name='concept'
                disabled={userRole === 'customer' || currentOrder?.concept.approve}
                handleChange={(e) => handleChangePhotos(e, 'concept')}
                array={formData.concept.images}
                handleDeletePhoto={handleDeletePhoto}
              />
            
              
              <Approve 
                formData={formData}
                setFormData={setFormData}
                name={'concept'}
                disabled={currentOrder?.concept.approve || formData.concept.images.length === 0}
              />
              <Comments
                className='self-end' 
                title='Концепту'
                comments={currentOrder ? currentOrder.concept.comments : []}
                onChange={(e) => setNewComment({...newComment, concept: e.target.value})}
                disabled={formData.concept.images.length === 0}
              />
            </div>

            <div>
              <Input 
                title="Желаемые сроки (в неделях)"
                name="desiredDates"
                type='number'
                tag='input'
                value={formData.desiredDates} 
                handleChange={handleChange}
                labelStyle="flex-col w-2/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                min={0}
              />
            </div>

            <div className="flex flex-row gap-[20px]">
              <Input 
                title="Дата подписания контракта"
                name="start"
                type='date'
                tag='input'
                value={formData.start} 
                handleChange={handleChange}
                labelStyle="flex-col w-2/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                disabled={userRole === 'customer'}
              />
              <Input 
                title="Дата сдачи"
                name="end"
                type='date'
                tag='input'
                value={formData.end} 
                handleChange={handleChange}
                labelStyle="flex-col w-2/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                disabled={userRole === 'customer'}
                 min={formData.start}
              />
            </div>
         
          
            <div className="flex flex-row gap-[20px]">
              <Input 
                title="Желаемая цена"
                name="desiredPrice"
                type='number'
                tag='input'
                value={formData.desiredPrice} 
                handleChange={handleChange}
                labelStyle="flex-col w-1/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                min={0}
                step="0.01"
              />
              <label className="flex-col w-1/3">
                <span  className="font-bold">Приоритет</span>
                <div>
                  <select
                    name="priority"
                    type="date"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2"
                  >
                  <option value="ASAP">ASAP (до 2 недель)</option>
                  <option value="Hight">Hight (до месяца)</option>
                  <option value="Med">Med (до 2 месяцев)</option>
                  <option value="Low">Low (до 3 месяцев)</option>
                  </select>
                </div>
              </label>

              <Input 
                title="Чел/Часы"
                name="hh"
                type='number'
                tag='input'
                value={formData.hh} 
                handleChange={handleChange}
                labelStyle="flex-col w-1/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                min={0}
                disabled={userRole === 'customer'}
              />
            </div>

            <div>
              <Input 
                title="Итоговая цена"
                name="price"
                type='number'
                tag='input'
                value={formData.price} 
                handleChange={handleChange}
                labelStyle="flex-col w-1/3"
                inputStyle="w-full h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
                min={0}
                disabled={userRole === 'customer'}
                step="0.01"
              />
            </div>
  
            <div className="flex flex-row justify-between">
              <button onClick={closeModal} type='button'>
                <span className="text-[#DC0000] text-sm">Закрыть</span>
              </button>
              <div className="flex justify-end">
                <Button type="submit" label={isChanging ? 'Редактировать' : 'Добавить'} />
              </div>
            </div>
          </form>
          
        </Modal>
    )
}