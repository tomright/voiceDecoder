<template>
  <div class="container">
    <h3>
      Нажми на иконку микрофона и начни говорить, ниже, придет расшифровка.
    </h3>
    <el-button
      type="success"
      class="recordButton"
      @mousedown="startRecord"
      @mouseup="stopRecord"
    >
      <el-icon :size="200">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"
          ></path>
        </svg>
      </el-icon>
    </el-button>

    <div class="textContainer">
      <DecoderText
        v-for="(item, index) in messageStore.messageItems.reverse()"
        :key="index"
        :item="item"
      ></DecoderText>
    </div>
  </div>
</template>

<script>
import DecoderText from "./decoderText.vue";
import { useMesStore } from "../store/message";

export default {
  components: { DecoderText },
  data() {
    return {
      record: "",
      recordToPlay: undefined,
      audioChunks: [],
      oggFile: undefined,
      messageStore: useMesStore(),
    };
  },
  methods: {
    startRecord() {
      this.audioChunks = [];
      this.record = "";
      this.recordToPlay = "";
      this.oggFile = undefined;
      console.log("Start record");
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.record = new MediaRecorder(stream);
        this.record.start();
        const self = this;
        setTimeout(() => {
          if (self.recordToPlay) {
            return;
          } else {
            self.stopRecord();
          }
        }, 7000);
        this.record.ondataavailable = function (event) {
          self.audioChunks.push(event.data);
        };
      });
    },
    stopRecord() {
      console.log("Stop record");
      const self = this;
      self.record.stop();
      this.record.addEventListener("stop", () => {
        const audioBlob = new Blob(self.audioChunks, {
          type: "audio/ogg; codecs=opus",
        });
        self.recordToPlay = URL.createObjectURL(audioBlob);
        let fileSend = new File([audioBlob], "test.ogg");
        let fileData = new FormData();
        fileData.append("ogg", fileSend);

        let { isSuccsess, result } = this.messageStore.send(fileData);
        this.messageStore.appendElement({
          text: "test text",
          audio: this.recordToPlay,
          isPlayed: true,
        });
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
