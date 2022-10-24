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
      const config = {
        headers: {
          Authorization:
            "Token c3dd999bd9992918837b6a11cd0c2e02f340829d",
        },
      };
      try {
        response = await axios.post(
          "http://demo.telminov.ru:8091/stt/",
          audio,
          config
        );
      } catch (error) {
        response = error.response;
      }
      let isSuccsess;
      let result;
      if (response.status < 400) {
        isSuccsess = true;
        result = response.data.result;
      } else if (response.status === 400) {
        isSuccsess = false;
        result = response.result;
      } else {
        isSuccsess = false;
        result = "Ошибка сервера";
      }
      return { isSuccsess, result };
      console.log("Отправка данных на сервер");
      // TODO тут еще нужно будет сразу сделать загрузку в пинию данные
    },
    delete(index) {
      this.messageItems.splice(this.messageItems.indexOf(index), 1);
    },
    appendElement(el) {
      el.id = this.generateID();
      el.text = `${el.text} + ${el.id}`;
      this.messageItems.push(el);
      console.log(el.id);
    },
    generateID() {
      return this.messageItems.length;
    },
  },
});
