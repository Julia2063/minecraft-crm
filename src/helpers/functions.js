/*** ================================================================================
 *          Telegram send message
 * ================================================================================*/
// const TG__IDS = ['714268390', '392401586', '1047672061'];
export const sendMessageTelegram = (message, TG__IDS) => {
    TG__IDS.forEach((id) => {
      sendSingleMessageTelegram(id, message);
    });
  };

  export const sendSingleMessageTelegram = (chatId, message) => {
    fetch(
      `https://api.telegram.org/bot6692818507:AAEBWathvFQclNhBoehlTBZrjdnAwgQZ0s4/sendMessage?chat_id=${chatId}&text=${message}`)
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {console.log(error)});
  };
  