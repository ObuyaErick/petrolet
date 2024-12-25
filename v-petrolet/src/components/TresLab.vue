<template>
  <div class="p">
    <div class="">
      <TresCanvas
        ref="canvasRef"
        window-size
        shadows
        antialias
        preset="realistic"
        clear-color="#82DBC5"
      >
        <TresHemisphereLight color="#fff" :intensity="0.1" />

        <!-- <TresAmbientLight color="#fff" :intensity="0.1" /> -->
        <TresDirectionalLight
          color="#fff"
          cast-shadow
          :position="[0, 8, 0]"
          :intensity="1"
        >
        </TresDirectionalLight>

        <TresPerspectiveCamera
          :position="[5, 7.5, 7.5]"
          :look-at="[0, 0, 0]"
        ></TresPerspectiveCamera>
        <OrbitControls />
        <TresMesh
          cast-shadow
          :position="[-2, 2, 0]"
          :rotation="[0, Math.PI, 0]"
        >
          <TresConeGeometry :args="[1, 1.5, 3]" />
          <TresMeshToonMaterial color="#616161" />
        </TresMesh>
        <Suspense>
          <PetroletBox></PetroletBox>
        </Suspense>
        <TresMesh cast-shadow :position="[2, -2, 0]">
          <TresSphereGeometry />
          <TresMeshToonMaterial color="#FBB03B" />
        </TresMesh>
        <TresMesh
          receive-shadow
          :position="[0, -3, 0]"
          :rotation="[-Math.PI / 2, 0, 0]"
        >
          <TresPlaneGeometry :args="[10, 10, 10, 10]" />
          <TresMeshStandardMaterial color="#f7f7f7" />
        </TresMesh>
      </TresCanvas>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";

const canvasRef = shallowRef();

onMounted(() => {
  console.log(canvasRef.value);
});
</script>
