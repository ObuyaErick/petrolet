<template>
  <div></div>
</template>
<script setup lang="ts">
import useAPI from "@/composables/useAPI";
import axios from "axios";

const handleRequest = useAPI();
const hanldeTest = async () => {
  return handleRequest({
    func: axios.post,
    args: [
      "http://127.0.0.1:5001/wonderwedding-aa6c3/us-central1/weddingTransactionHistory",
    ],
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log("Error");
    });
};

onMounted(() => {
  hanldeTest();
});
</script>
