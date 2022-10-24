<template>
  <div class="item" :class="{ backgroundPlay: !switcherAudio }">
    <div class="buttonGroup">
      <el-button type="success" @click="playAudio">
        <el-icon :size="20">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
            ></path></svg
        ></el-icon>
      </el-button>
      <el-button type="danger" @click="pauseAudio">
        <el-icon :size="20">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
            ></path>
          </svg>
        </el-icon>
      </el-button>
    </div>
    <p>{{ item.text }}</p>
    <el-button
      class="delButton"
      type="warning"
      size="default"
      @click="deleteItem"
    >
      <el-icon :size="20">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-029747aa=""
        >
          <path
            fill="currentColor"
            d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
          ></path>
        </svg>
      </el-icon>
    </el-button>
  </div>
</template>

<script>
import { useMesStore } from "../store/message.js";
const audio = new Audio();

export default {
  name: "DecoderText",
  props: ["item"],
  data() {
    return {
      messageStore: useMesStore(),
      switcherAudio: true,
    };
  },
  methods: {
    deleteItem() {
      this.messageStore.delete(this.item);
    },
    playAudio() {
      this.switcherAudio = false;
      audio.src = this.item.audio;
      audio.play();
      let self = this; // этот хак нужен для того чтобы в анонимной функции вызывать this
      audio.onended = function () {
        self.switcherAudio = true;
      };
      audio.suspend = function () {
        self.switcherAudio = true;
      };
      setTimeout(() => {
        self.switcherAudio = true;
      }, 7000);
    },
    pauseAudio() {
      this.switcherAudio = true;
      audio.pause();
    },
  },
};
</script>

<style scoped>
p {
  margin: 10px;
  align-self: flex-start;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: bisque;
  padding: 5px;
  margin: 10px;
}
.buttonGroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.backgroundPlay {
  background-color: rgb(194, 241, 188);
}
.el-button {
  margin-bottom: 5px;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>
