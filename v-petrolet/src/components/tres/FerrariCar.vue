<script lang="ts" setup>
import {
  ACESFilmicToneMapping,
  Color,
  EquirectangularReflectionMapping,
  Fog,
  GridHelper,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MultiplyBlending,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TextureLoader,
  WebGLRenderer,
  type Object3DEventMap,
} from "three";
import {
  DRACOLoader,
  GLTFLoader,
  OrbitControls,
  RGBELoader,
} from "three/examples/jsm/Addons.js";
import Stats from "three/addons/libs/stats.module.js";

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer;
let gridHelper: GridHelper;
let controls: OrbitControls;
let stats: Stats;

const wheels: (Object3D<Object3DEventMap> | undefined)[] = [];

const canvasContainer = useTemplateRef("canvasContainer");

function init() {
  if (canvasContainer.value) {
    const container = canvasContainer.value;
    const { offsetWidth, offsetHeight } = container;

    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(offsetWidth, offsetHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;

    Array.from(container.children).forEach((child) => child.remove());

    container.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize);

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    camera = new PerspectiveCamera(40, offsetWidth / offsetHeight, 0.1, 100);
    camera.position.set(4.25, 1.4, -4.5);

    controls = new OrbitControls(camera, container);
    controls.maxDistance = 9;
    controls.maxPolarAngle = MathUtils.degToRad(90);
    controls.target.set(0, 0.5, 0);
    controls.update();

    scene = new Scene();
    scene.background = new Color(0x333333);
    scene.environment = new RGBELoader().load(
      "/textures/equirectangular/venice_sunset_1k.hdr"
    );
    scene.environment.mapping = EquirectangularReflectionMapping;
    scene.fog = new Fog(0x333333, 10, 15);

    gridHelper = new GridHelper(20, 40, 0xffffff, 0xffffff);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Materials
    const bodyMaterial = new MeshPhysicalMaterial({
      color: 0x000000,
      metalness: 1.0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    const detailsMaterial = new MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.5,
    });

    const glassMaterial = new MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0,
      transmission: 1.0,
    });

    const bodyColorInput = document.getElementById(
      "body-color"
    ) as HTMLInputElement;
    bodyColorInput?.addEventListener("input", function () {
      bodyMaterial.color.set(this.value);
    });

    const detailsColorInput = document.getElementById(
      "details-color"
    ) as HTMLInputElement;
    detailsColorInput?.addEventListener("input", function () {
      detailsMaterial.color.set(this.value);
    });

    const glassColorInput = document.getElementById(
      "glass-color"
    ) as HTMLInputElement;
    glassColorInput?.addEventListener("input", function () {
      glassMaterial.color.set(this.value);
    });

    // Car
    const shadow = new TextureLoader().load("/models/gltf/ferrari_ao.png");

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load("/models/gltf/ferrari.glb", function (gltf) {
      const carModel = gltf.scene.children[0];

      carModel.getObjectByName("body").material = bodyMaterial;

      carModel.getObjectByName("rim_fl").material = detailsMaterial;
      carModel.getObjectByName("rim_fr").material = detailsMaterial;
      carModel.getObjectByName("rim_rr").material = detailsMaterial;
      carModel.getObjectByName("rim_rl").material = detailsMaterial;

      carModel.getObjectByName("glass").material = glassMaterial;

      wheels.push(
        carModel.getObjectByName("wheel_fl"),
        carModel.getObjectByName("wheel_fr"),
        carModel.getObjectByName("wheel_rl"),
        carModel.getObjectByName("wheel_rr")
      );

      //  Shadow
      const mesh = new Mesh(
        new PlaneGeometry(0.655 * 4, 1.3 * 4),
        new MeshBasicMaterial({
          map: shadow,
          blending: MultiplyBlending,
          toneMapped: false,
          transparent: true,
        })
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.renderOrder = 2;
      carModel.add(mesh);

      scene.add(carModel);
    });
  }
}

function onWindowResize() {
  if (canvasContainer.value) {
    const { offsetWidth, offsetHeight } = canvasContainer.value;
    camera.aspect = offsetWidth / offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

function animate() {
  controls.update();
  const time = -performance.now() / 1000;

  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = time * Math.PI * 2;
  }

  gridHelper.position.z = -time % 1;

  renderer.render(scene, camera);
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="flex-grow border m-4" ref="canvasContainer"></div>
    <div
      class="absolute bottom-4 w-max px-4 py-2 bg-white/10 backdrop-blur rounded-xl flex items-center gap-3"
    >
      <span class="flex items-center gap-2 text-white font-mono text-sm"
        ><input id="body-color" type="color" value="#ff0000" />Body</span
      >
      <span class="flex items-center gap-2 text-white font-mono text-sm"
        ><input id="details-color" type="color" value="#ffffff" />Details</span
      >
      <span class="flex items-center gap-2 text-white font-mono text-sm"
        ><input id="glass-color" type="color" value="#ffffff" />Glass</span
      >
    </div>
  </div>
</template>
