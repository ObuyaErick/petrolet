<script lang="ts" setup>
import { useGLTF } from "@tresjs/cientos";
import { DRACOLoader } from "three/examples/jsm/Addons.js";

const carModel = await useGLTF(
  "/models/gltf/ferrari.glb",
  { draco: true },
  (tresGLTFLoader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/jsm/libs/draco/gltf/");
    tresGLTFLoader.setDRACOLoader(dracoLoader);
  }
);
</script>

<template></template>
