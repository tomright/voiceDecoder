import { defineStore } from "pinia";

export const useMesStore = defineStore("mes", {
  state() {
    return {
      messageItems: [
        {
          text: "Вернулись в Минск в прошлый понедельник рано утром. Встретил Минск нас ледяным ветром, снегом и....отсутствием жилья, но несмотря на все это, мы в буквальном смысле слова готовы были целовать землю минскую, потому-что за всю эту поездку мы поняли совершенно точно и определенно — лучше Беларуси может быть только Беларусь и это я говорю, как человек, который пожить успел в Европе, причем не на правах эмигранта, и по России покататься и по миру в целом...",
        },
        {
          text: "Test2",
        },
        {
          text: "Test3",
        },
        {
          text: "Test4",
        },
      ],
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
      this.messageItems.push(el);
    },
  },
});
