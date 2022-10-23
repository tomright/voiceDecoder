<template>
  <div class="textContainer">
    <div class="item">
      <p>
        TTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestest
      </p>
      <el-button type="warning" size="default">
        <el-icon>
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
  </div>
</template>

<script>
export default {
  name: "DecoderText",
};
</script>

<style scoped>
p {
  margin-right: 10px;
}
.item {
  display: flex;
  align-items: center;
  background-color: bisque;
  padding: 5px;
  margin: 10px;
}
.textContainer {
  align-self: center;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  border-radius: 10px;
  box-shadow: var(--el-box-shadow-dark);
  overflow: auto;
  word-break: break-all;
}
</style>
