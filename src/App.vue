<template>
  <el-container>
    <el-header>
      <h1>Приложение для расшифровки голосовых сообщений!</h1>
    </el-header>
    <el-main>
      <DecoderMain></DecoderMain>
    </el-main>
  </el-container>
</template>

<script>
import DecoderMain from "./components/decoderMain.vue";
export default {
  components: { DecoderMain },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
