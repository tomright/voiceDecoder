<template>
  <div v-if="browserCheck" class="container">
    <h3>
      Нажми на иконку микрофона и начни говорить, ниже, придет
      расшифровка.
    </h3>
    <el-button
      type="success"
      class="recordButton"
      @mousedown="startRecord"
      :disabled="buttonDisabled"
      @mouseup="stopRecord">
      <el-icon :size="200">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"></path>
        </svg>
      </el-icon>
    </el-button>
    <h2 class="statusText">{{ statusRercord }}</h2>

    <div class="textContainer">
      <DecoderText
        v-for="item in messageStore.messageItems"
        :key="item.id"
        :item="item"></DecoderText>
    </div>
  </div>
  <div v-if="!browserCheck" class="container">
    <h1>
      К сожалению ваш браузер не поддерживает запсь ogg файлов через
      микрофон, рекомендуем воспользоваться браузером FireFox.
    </h1>
    <img src="../assets/img/sorry.jpg" alt="Sorry image" />
  </div>
</template>

<script>
import DecoderText from "./decoderText.vue";
import { useMesStore } from "../store/message";
import { ElMessage } from "element-plus";

export default {
  components: { DecoderText },
  data() {
    return {
      record: "",
      recordToPlay: undefined,
      audioChunks: [],
      messageStore: useMesStore(),
      timer: undefined,
      browserCheck: undefined,
      track: undefined,
      statusRercord: "Готов к записи данных.",
      buttonDisabled: false,
    };
  },
  mounted() {
    this.browserCheck = MediaRecorder.isTypeSupported("audio/ogg");
  },
  methods: {
    startRecord() {
      this.statusRercord =
        "Идет запись, можете говорить в микрофон! :) ";
      this.audioChunks = [];
      this.record = "";
      this.recordToPlay = "";
      this.oggFile = undefined;
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.record = new MediaRecorder(stream);
          this.record.start();
          const self = this;
          this.record.ondataavailable = function (event) {
            self.audioChunks.push(event.data);
            self.track = stream.getTracks();
            self.track[0].stop();
          };
        })
        .catch(function (error) {
          if (error.name === "PermissionDeniedError") {
            ElMessage({
              message:
                "Разрешения на использование камеры и микрофона не были предоставлены. " +
                "Вам нужно разрешить странице доступ к вашим устройствам," +
                " чтобы демо-версия работала.",
              type: "error",
              showClose: true,
              duration: 3000,
            });
          } else if (error.name === "NotAllowedError") {
            ElMessage({
              message: `Произошла ошибка. Возможно вы не разрешили сайту использовать микрофон. Обновите страницу и нажмите разрешить`,
              type: "error",
              showClose: true,
              duration: 10000,
            });
          } else {
            ElMessage({
              message: `getUserMedia error: ${error.name}, ${error}`,
              type: "error",
              showClose: true,
              duration: 10000,
            });
          }
        });
      // const self = this;
      this.timer = setTimeout(() => {
        if (!this.recordToPlay) {
          console.log("Forsed stop");
          this.stopRecord();
        } else {
          clearTimeout(this.timer);
        }
      }, 7000);
    },
    stopRecord() {
      this.buttonDisabled = true;
      this.statusRercord =
        "Отправка данных на сервер для распознования!";
      clearTimeout(this.timer);
      this.record.stop();
      const self = this;
      this.record.addEventListener("stop", () => {
        const audioBlob = new Blob(self.audioChunks, {
          type: "audio/ogg; codecs=opus",
        });
        self.recordToPlay = URL.createObjectURL(audioBlob);
        const prepareData = this.prepareDataToSend(audioBlob);
        this.sendData(prepareData);
      });
    },
    prepareDataToSend(blob) {
      let fileSend = new File([blob], "test.ogg");
      let fileData = new FormData();
      fileData.append("ogg", fileSend);
      return fileData;
    },
    async sendData(fileData) {
      const { isSuccsess, result } = await this.messageStore.send(
        fileData
      );
      this.buttonDisabled = false;
      this.statusRercord = "Готов к записи!";
      if (isSuccsess) {
        this.addDataToPinia(result);
      }
    },
    addDataToPinia(textResponse) {
      let notext = false;
      if (!textResponse) {
        textResponse =
          "Нет данных для распознования, возможно вы говорили не четко или \n слишком тихо... ";
        notext = true;
      }
      this.messageStore.appendElement({
        id: undefined,
        text: textResponse,
        audio: this.recordToPlay,
        notext: notext,
      });
    },
  },
};
</script>

<style scoped>
.recordButton {
  border-radius: 200px;
  height: 100%;
  width: 100%;
  max-height: 300px;
  max-width: 300px;
  align-self: center;
  margin-bottom: 50px;
  box-shadow: var(--el-box-shadow-dark);
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.audioControls {
  color: blueviolet;
  align-self: center;
  width: 100%;
}
.textContainer {
  align-self: center;
  width: 100%;
  height: 100%;
  /* border: 2px solid green; */
  border-radius: 10px;
  box-shadow: var(--el-box-shadow-dark);
  overflow: auto;
  word-break: break-all;
}
</style>
