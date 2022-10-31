import { defineStore } from "pinia";
import axios from "axios";

export const useMesStore = defineStore("mes", {
  state() {
    return {
      messageItems: [],
    };
  },
  getters: {},
  actions: {
    async send(audio) {
      let response;
      // Закаментировано, так как тестовый сервер больше не работает.
      //Но мне необходимо сделать рефакторинг

      // const config = {
      //   headers: {
      //     Authorization:
      //       "Token ",
      //   },
      // };
      // try {
      //   response = await axios.post(
      //     "http://demo.telminov.ru:8091/stt/",
      //     audio,
      //     config
      //   );
      // } catch (error) {
      //   response = error.response;
      // }

      let isSuccsess = true;
      response = {
        status: 200,
        data: { result: "Тестовое сообщение" },
      };
      let result;

      if (response.status < 400) {
        isSuccsess = true;
        result = response.data.result;
      } else if (response.status === 400) {
        isSuccsess = false;
        result = response.data.ogg || response.data.error_code;
      } else {
        isSuccsess = false;
        result = "Ошибка сервера";
      }

      return { isSuccsess, result };
    },
    delete(index) {
      this.messageItems.splice(this.messageItems.indexOf(index), 1);
    },
    appendElement(el) {
      el.id = this.generateID();
      this.messageItems.unshift(el);
    },
    generateID() {
      return this.messageItems.length;
    },
  },
});
