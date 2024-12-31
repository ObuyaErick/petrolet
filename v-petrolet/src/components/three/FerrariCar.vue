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
// import Stats from "three/addons/libs/stats.module.js";

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer;
let gridHelper: GridHelper;
let controls: OrbitControls;
// let stats: Stats;

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
    //

    camera = new PerspectiveCamera(40, offsetWidth / offsetHeight, 0.1, 100);
    camera.position.set(4.25, 1.4, -4.5);

    controls = new OrbitControls(camera, container);
    controls.maxDistance = 9;
    controls.maxPolarAngle = MathUtils.degToRad(90);
    controls.target.set(0, 0.5, 0);
    controls.update();

    scene = new Scene();
    scene.background = new Color(0xf9fafb);
    scene.environment = new RGBELoader().load(
      "/textures/equirectangular/venice_sunset_1k.hdr"
    );
    scene.environment.mapping = EquirectangularReflectionMapping;
    scene.fog = new Fog(0xf9fafb, 10, 15);

    gridHelper = new GridHelper(20, 40, 0x333333, 0x333333);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Materials
    const bodyMaterial = new MeshPhysicalMaterial({
      color: 0xffffff, // 0xeab308,
      metalness: 1.0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    const detailsMaterial = new MeshStandardMaterial({
      color: 0xf9fafb,
      metalness: 1.0,
      roughness: 0.5,
    });

    const glassMaterial = new MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0,
      transmission: 1.0,
    });

    // Car
    const shadow = new TextureLoader().load("/models/gltf/ferrari_ao.png");

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load("/models/gltf/ferrari.glb", function (gltf) {
      const carModel = gltf.scene.children[0];

      (carModel.getObjectByName("body") as Mesh).material = bodyMaterial;

      (carModel.getObjectByName("rim_fl") as Mesh).material = detailsMaterial;
      (carModel.getObjectByName("rim_fr") as Mesh).material = detailsMaterial;
      (carModel.getObjectByName("rim_rr") as Mesh).material = detailsMaterial;
      (carModel.getObjectByName("rim_rl") as Mesh).material = detailsMaterial;

      (carModel.getObjectByName("glass") as Mesh).material = glassMaterial;

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
  if (canvasContainer.value && canvasContainer.value.parentElement) {
    const { offsetWidth, offsetHeight } = canvasContainer.value.parentElement;

    camera.aspect = offsetWidth / offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(offsetWidth, offsetHeight);
  }
}

function animate() {
  controls.update();
  const time = -performance.now() / 1000;

  for (let i = 0; i < wheels.length; i++) {
    const wheel = wheels[i];
    if (wheel) {
      wheel.rotation.x = time * Math.PI * 2;
    }
  }

  gridHelper.position.z = -time % 1;

  renderer.render(scene, camera);
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="" ref="canvasContainer"></div>
</template>
