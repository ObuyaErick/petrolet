<template>
  <TresMesh
    ref="boxRef"
    cast-shadow
    :position="[0, 0, 0]"
  >
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
    <TresMeshToonMaterial v-bind="kaliTexture" />
  </TresMesh>
</template>
<script setup lang="ts">
import { useTexture, useRenderLoop, type Intersection } from "@tresjs/core";

const kaliTexture = await useTexture({
  map: "/cars/mikebirdy.jpg",
});

const boxRef = shallowRef();
const { onLoop } = useRenderLoop();

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01;
  }
});
</script>
