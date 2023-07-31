import { useState } from "react";
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import { auth, createNewUser, getCollectionWhereKeyValue, providerGoogle } from "../helpers/firebaseControl";
import { FcGoogle } from 'react-icons/fc';

import { sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function Entry() {
    const [func, setFunc] = useState('login');

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const { email, password } = formData;

      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      };

      const handleResetPassword = () => {
        if (email.length === 0) {
          toast.error("Введіть свій email");
          return;
        } else {
          sendPasswordResetEmail(auth, formData.email)
            .then(() => {
              toast.success('Лист для скидання паролю надіслано. Будьласка, перевірте свою поштову скриньку!');
            })
            .catch(() => {
              toast.error("Щось пішло не так...");
            });
        }
       
      };

      const  onSubmit = async (e) =>  {
        e.preventDefault();
        if (func === 'login') {
            try {
                await signInWithEmailAndPassword(
                auth,
                email,
                password
              );
            }
           
            catch (error) {
              console.log(error);
              toast.error("Bad user credentials");
            }

        } else {
            if(password.length < 6) {
                toast.error("Длинна пароля должна быть не менее 6 символов");
                return;
            };
            try {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                    const user = userCredential.user;
                    createNewUser (user.uid, email);
                    })
                 .catch((error) => {
                  console.log(error)
                  toast.error('Ошибка регистрации. Возможно такой емейл уже существует');
                 });
            } catch (error) {
                console.log(error);
            }
        }
      };


      const handleGoogle = async (e) => {
        e.preventDefault();
          try {
            const result = await signInWithPopup(auth, providerGoogle);
            getCollectionWhereKeyValue('users', 'uid', result.user.uid).then(
              res => {
                if(res.length === 0) {
                  createNewUser(result.user.uid, result.user.email);
                }
              }
            );
       
          } catch (err) {
            console.log(err)
          }
      };

    return (
        <section className="flex justify-center mt-[211px] ">
        <div className="w-[572px] h-[267px] bg-white rounded shadow-md">
          <div>
            <div className="mt-3 mb-3 ml-4">
              <span className="text-lg">{func === 'login' ? 'Вход' : 'Регистрация'}</span>
            </div>
          </div>
          <div className="ml-[19px] mr-[21px] mt-8">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <span>Логин</span>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  className="w-[426px] h-[36px] rounded border-[#E9E9E9] border pl-3"
                  placeholder="Логин"
                  required
                />
              </div>
              <div className="flex flex-row items-center justify-between pt-[18px]">
                <div>
                  <span>Пароль</span>
                </div>
                <div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    className="w-[426px] h-[36px] rounded border-[#E9E9E9] border pl-3"
                    placeholder="Пароль"
                    required
                  />
                </div>
              </div>
              <div className="pt-[17px] pl-[40px] flex justify-between mb-[20px]">
                {func === 'login' && 
                    <button 
                    className="font-bold"
                    type="button"
                    onClick={handleResetPassword}
                    >
                    Забыли пароль?
                    </button>
                }
                
                <button 
                  type="button"
                  onClick={() => setFunc(func === 'login' ? 'register' : 'login')}
                  className="text-[14px]"
                >
                  <span>{func === 'login' ? 'Еще не зарегистрированы?' : 'Уже есть акаунт?'}</span>
                  <span className="underline ml-[10px]">{func === 'login' ? 'Зарегистрироваться' : 'Войти'} </span>
                </button>
              </div>
              <div className="flex justify-between">
                <button 
                  className="px-[35px] shadow-md rounded h-[36px]" 
                  type="button"
                  onClick={handleGoogle}
                >
                  <FcGoogle />
                </button>
                <Button type="submit" label={func !== 'login' ? 'Зарегистрироваться' : 'Войти'} />
              </div>
            </form>
          </div>
        </div>
      </section>
    )
};

export default Entry;