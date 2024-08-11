<script setup>
import { ref } from 'vue';
const { translate } = useTransformer()

const inputText = ref('');
const outputText = ref('');
const showToast = ref(false);
const errToast = ref(false);

const transformText = () => {
  // outputText.value = inputText.value.toUpperCase();
  if (inputText.value.trim() !== "") {
    try {
      outputText.value = translate(inputText.value)
    } catch (error) {
      errToast.value = true; // 显示提示信息
      setTimeout(() => {
        errToast.value = false; // 在一段时间后隐藏提示信息
      }, 2000);
    }
  }
};
watch(inputText, () => {
  translate
});
const copyOutputText = async (event) => {
  event.preventDefault(); // 阻止默认的右键菜单出现
  try {
    await navigator.clipboard.writeText(outputText.value);
    console.log('Text copied to clipboard');
    showToast.value = true; // 显示提示信息
    setTimeout(() => {
      showToast.value = false; // 在一段时间后隐藏提示信息
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>

<template>
  <div class="container">
    <textarea id="inputText" v-model="inputText" placeholder="输入需要转换的文本..."></textarea>
    <button @click="transformText">转换为<p>Json Schema</p></button>
    <textarea id="outputText" :value="outputText" placeholder="转换结果将会显示在这里..." readonly
      @contextmenu.prevent="copyOutputText"></textarea>
    <!-- 提示信息 -->
    <div v-if="showToast" class="toast">
      转换结果已复制！
    </div>
    <!-- 错误信息 -->
    <div v-if="errToast" class="toast err">
      请输入有效的DDL语句！
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

textarea {
  width: 45%;
  height: 62%;
  margin: 0 2.5%;
  resize: none;
}

button {
  width: 10%;
  padding: 10px;
  font-size: 1.2em;
}

.toast {
  position: absolute;
  bottom: 6%;
  right: 6%;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  opacity: 0.9;
  transition: opacity 0.5s ease;
}
.err {
  background-color: #f35151;
}

/* 可选：当提示信息消失时的动画效果 */
.toast.fade-out {
  opacity: 0;
}
</style>