import { useEffect, useState } from 'react';
import { Input } from './Input';
import { UserModel } from '../Models/UserModel';
import { Button } from './Button';
import { updateDocumentInCollection } from '../helpers/firebaseControl';
import { toast } from 'react-toastify';

export const SettingsForm = ({ data }) => {
    const [user, setUser] = useState(UserModel);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        setUser(data)
    }, []);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isChange) {
            try {
                await updateDocumentInCollection('users', user, user.idPost);
                toast.success('Изменения сохранены');
                setIsChange(false);
            } catch(error) {
                console.log(error);
                toast.error('Something went wrong...');
            }
        }
    };

 return (
    <form className='w-full lg:w-2/3 flex flex-col gap-[10px] text-[10px] lg:text-[16px]' onSubmit={(e) => handleSubmit(e)}>
        <div className="border-b border-[#E9E9E9] pb-[20px] flex flex-col gap-[10px]">
        <Input
          title="Ник"
          name="nickName"
          type='text'
          tag='input'
          value={user.nickName} 
          onFocus={() => setIsChange(true)}
          handleChange={handleChange}
          placeholder="Введите ник"
          labelStyle="flex justify-between items-center"
          inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
        />

        {user.telegramId.length === 0 && (
            <div className='flex gap-[10px]'>
                <h6 className='text-[10px] lg:text-[16px]'>Для того, чтобы получать сообщения в Телеграм, зайдите по данной ссылке и создайте Telegram ID, а затем заполните следующее поле:</h6>
                <a href='https://t.me/getmyid_bot' target='_blanc'>@getmyid_bot</a>

            </div>
            
        )}

        <Input
          title="TelegramId"
          name="telegramId"
          type='text'
          tag='input'
          value={user.telegramId} 
          onFocus={() => setIsChange(true)}
          handleChange={handleChange}
          placeholder="Введите TelegramId"
          labelStyle="flex justify-between items-center"
          inputStyle="w-3/4 h-[36px] rounded border-[#E9E9E9] border pl-3 mt-2 disabled:opacity-50"
        />
      </div>

      <div className='flex gap-[10px]'>
        <h6>Подпишитесь на этот чат-бот</h6>
        <a href='https://t.me/NextLevelDevelopersBot' target='_blanc'>@NextLevelDevelopersBot</a>
      </div>

      {isChange && (
        <Button
            type="submit" 
            label='Сохранить изменения' 
            className='self-end'
      /> 
      )}
      
    </form>
      

    )
}