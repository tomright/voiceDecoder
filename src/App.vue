<template>
  <el-container>
    <el-header>
      <h1>Приложение для расшифровки голосовых сообщений!</h1>
    </el-header>
    <el-main>
      <h3>
        Нажми на иконку микрофона и начни говорить, ниже, придет расшифровка.
      </h3>
      <!-- <button class="microButton"> -->
      <el-button
        type="success"
        style="
          border-radius: 200px;
          height: 100%;
          width: 100%;
          max-height: 300px;
          max-width: 300px;
          margin: auto;
        "
      >
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-029747aa=""
        >
          <path
            fill="currentColor"
            d="M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"
          ></path>
        </svg>
      </el-button>

      <!-- </button> -->
    </el-main>
  </el-container>
</template>

<script></script>

<style scoped>
.microButton {
  border-radius: 20px;
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 300px;
}
.el-header {
  text-align: center;
}
</style>
