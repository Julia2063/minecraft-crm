import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";
import { db, storage } from "../firebase";
import {format} from 'date-fns';
import { ref, deleteObject } from 'firebase/storage';
import { UserModel } from "../Models/UserModel";
import { toast } from "react-toastify";


export const auth = getAuth();
export const providerGoogle = new GoogleAuthProvider();

export const logOut = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(this._handleError(error));
      });
  });
};

export function  getCollection (collection)    {
  return new  Promise( function (resolve, reject) {
      db.collection(collection).get().then(res => {
          const data = [];
          res.forEach(doc => {
              data.push({
                  idPost: doc.id,
                  ...doc.data()
              })
          });
          resolve(data)
      }).catch(err => {
          reject(err);
      });
  });
};

export function removeDocumentFromCollection(collection, docId) {
  return new Promise(function (resolve, reject) {
    try {
     
      db.collection(collection).doc(docId).delete()
        .then(r => {
          resolve(r);
        }).catch(e => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};


export function updateDocumentInCollection(collection, document, idDocumnent) {
    return new Promise(function (resolve, reject) {
      try {
        db.collection(collection).doc(idDocumnent).update(document).then(r => {
          resolve({result: r});
        }).catch(e => {
          reject(e);
        });
      } catch (e) {
        reject(e);
      }
    });
  };

export function setDocumentToCollection(collection, document) {
    return new Promise(function (resolve, reject) {
      try {
        db.collection(collection).add(document)
          .then(r => {
            updateDocumentInCollection(collection, {...document, idPost: r.id}, r.id)
              .then(res => console.log('success')).catch(e => console.log(e));
            resolve({result: r});
          }).catch(e => {
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  };

  export function getCollectionWhereKeyValue(collection, key, value) {
    return new Promise(function (resolve, reject) {
      db.collection(collection).where(key, '==', value).get().then(res => {
        const data = [];
        res.forEach(doc => {
          data.push({
            ...doc.data(),
            idPost: doc.id,
          });
        });
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  };

  export async function updateFieldInDocumentInCollection (collection, docId, fieldName, newValue) {

    let result;
  
    try {
      const docRef = db.collection(collection).doc(docId);
      result = await docRef.update({[fieldName]: newValue});
    } catch (error) {
      console.log(error.message);
    }
  
    return result;
  };


export function createNewUser(uid, email) {

    return new Promise(function (resolve, reject) {
    
      const user_to_firebase_start = {
        ...UserModel,
        uid,
        dateCreating: format(new Date(), 'yyyy-MM-dd HH:mm'),
        email: email,
      };
      setDocumentToCollection('users', user_to_firebase_start).then(r => {
        console.log('employee saved in DB');
        resolve(r);
      }).catch(e => {
        reject(e);
      });
    });
  };

  export function createNewOrder(uid, email, info, newComment) {
    const id = Math.floor(Date.now() * Math.random()).toString().slice(0, 5);

      return new Promise(function (resolve, reject) {
    
      const order_to_firebase_start = {
        ...info,
        uid,
        tz: {...info.tz, comments: newComment.tz.length > 0 ? [{
          text: newComment.tz,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [email, uid],
        }] : []},
        research: {...info.research, comments: newComment.research.length > 0 ? [{
          text: newComment.research,
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          user: [email, uid],
        }] : []},
        stage: '1',
        dateCreating: format(new Date(), 'yyyy-MM-dd HH:mm'),
        id,
      };
      setDocumentToCollection('orders', order_to_firebase_start).then(r => {
        console.log('order saved in DB');
        resolve(r);
      }).catch(e => {
        reject(e);
      });
    });
  };

  export async function uploadFilesToStoragesFolderWitwName (files, order, name) {
    console.log(files);
    const imagesUrl = [];
    const promisesUploadImages = [];
   
   

      for (let i = 0; i < files.length; i++) {
        const uploadTask = new Promise(function (resolve, reject) {
          storage.ref(`${order.id}/${name}/${files[i].name}`).put(files[i]).then(res => {
            storage.ref(`${order.id}/${name}`).child(files[i].name).getDownloadURL().then(url => {
              imagesUrl.push(url);
              resolve(res);
            }).catch(e => {
              console.log(e);
            });
          }).catch(e => {
            reject(e);
          });
        });
        promisesUploadImages.push(uploadTask);
      }
    
    
    
    return  Promise.all(promisesUploadImages).then(res => {
      console.log(imagesUrl);
      return imagesUrl;
    });
  };

  export async function uploadFilesToStoragesFolder (files, order) {

    const filesArray = Object.entries(files);
    const imagesUrl = {};
    filesArray.forEach(el => imagesUrl[el[0]] = []);
    const promisesUploadImages = [];
   
   
    filesArray.forEach(el => {
      for (let i = 0; i < el[1].length; i++) {
        const uploadTask = new Promise(function (resolve, reject) {
          storage.ref(`${order.id}/${el[0]}/${el[1][i].name}`).put(el[1][i]).then(res => {
            storage.ref(`${order.id}/${el[0]}`).child(el[1][i].name).getDownloadURL().then(url => {
              imagesUrl[el[0]].push(url);
              resolve(res);
            }).catch(e => {
              console.log(e);
            });
          }).catch(e => {
            reject(e);
          });
        });
        promisesUploadImages.push(uploadTask);
      }
    })
    
    return  Promise.all(promisesUploadImages).then(res => {
      return imagesUrl;
    });
  };

  export function deleteImageFromStorage (image) {
    return new Promise(function (resolve, reject) {
      deleteObject(ref(storage, image)).then((r) => {
        resolve(r);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  export function deleteObjectFromeStorage (order, name) {
  
    const imagesRef = storage.ref().child(`${order.id}/${name}`);

    console.log(imagesRef);
  
    return new Promise (function (resolve, reject) {
      imagesRef.listAll().then(function (result) {
        console.log(result._delegate.items);
        result._delegate.items.forEach(function (file) {
          deleteObject(ref(storage, file));
        });
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  };

  export const handleDelete = async (el) => {
    try {
      if (el.concept.files.length > 0 ) {
        await deleteObjectFromeStorage(el, 'concept');
      };
      if (el.content.files.length > 0 ) {
        await deleteObjectFromeStorage(el, 'content');
      };
      if (el.contract.files.length > 0 ) {
        await deleteObjectFromeStorage(el, 'contract');
      };
      await removeDocumentFromCollection(`orders`, el.idPost);
      toast.success("Order was deleted from BD");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  
  



