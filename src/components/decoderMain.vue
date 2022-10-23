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
    <audio class="audioControls" controls="controls">
      <source :src="recordToPlay" type="audio/ogg" />
      <source :src="recordToPlay" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <DecoderText></DecoderText>
  </div>
</template>

<script>
import DecoderText from "./decoderText.vue";

export default {
  components: { DecoderText },
  data() {
    return {
      record: "",
      recordToPlay: "/",
      audioChunks: [],
    };
  },
  methods: {
    startRecord() {
      console.log("Start record");
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.record = new MediaRecorder(stream);
        this.record.start();
        const self = this;
        this.record.ondataavailable = function (event) {
          self.audioChunks.push(event.data);
        };
      });
    },
    stopRecord() {
      console.log("Stop record");
      const self = this;
      this.record.stop();
      this.record.addEventListener("stop", () => {
        const audioBlob = new Blob(self.audioChunks, { type: "audio/ogg" });
        self.recordToPlay = URL.createObjectURL(audioBlob);
        console.log(self.recordToPlay);
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
</style>
