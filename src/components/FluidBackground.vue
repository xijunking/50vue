<template>
  <div ref="container" class="fluid-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';

const container = ref<HTMLElement | null>(null);
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let material: THREE.ShaderMaterial;
let mesh: THREE.Mesh;
let animationId: number;

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 3D Noise 
  // by Ian McEwan, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0.0 + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    // 归一化坐标，修复长宽比拉伸
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    float time = uTime * 0.1; // 减慢时间流动速度
    
    // 基础噪声层
    float n1 = snoise(vec3(uv * 1.5, time));
    
    // 细节噪声层，产生湍流感
    float n2 = snoise(vec3(uv * 3.0 + n1 * 2.0, time * 1.5));
    
    // 第三层噪声，用于高光细节
    float n3 = snoise(vec3(uv * 5.0 - n2 * 1.0, time * 2.0));

    // 颜色定义 (深色系高级感)
    vec3 bgCol = vec3(0.02, 0.05, 0.1);      // 极深蓝黑背景
    vec3 col1 = vec3(0.1, 0.15, 0.3);        // 深靛蓝
    vec3 col2 = vec3(0.2, 0.1, 0.3);         // 深紫
    vec3 highlight = vec3(0.3, 0.3, 0.5);    // 柔和高光

    // 混合颜色
    vec3 finalColor = mix(bgCol, col1, smoothstep(-0.5, 0.5, n1));
    finalColor = mix(finalColor, col2, smoothstep(-0.5, 0.5, n2));
    
    // 添加高光细节，增加流体质感
    float highlightMix = smoothstep(0.3, 0.8, n3);
    finalColor = mix(finalColor, highlight, highlightMix * 0.3);

    // 添加一些暗角效果 (Vignette)
    float dist = distance(vUv, vec2(0.5));
    finalColor *= smoothstep(1.2, 0.2, dist);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const initThree = () => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();

  // Camera (Orthographic for 2D plane)
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Material
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) }
    }
  });

  // Mesh
  const geometry = new THREE.PlaneGeometry(2, 2);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  animate();
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  if (material) {
    material.uniforms.uTime.value += 0.01;
  }
  
  renderer.render(scene, camera);
};

const handleResize = () => {
  if (!container.value || !renderer || !material) return;
  
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  
  renderer.setSize(width, height);
  material.uniforms.uResolution.value.set(width, height);
};

onMounted(() => {
  initThree();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationId);
  if (renderer) {
    renderer.dispose();
  }
  if (material) {
    material.dispose();
  }
});
</script>

<style scoped>
.fluid-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 放置在内容之下 */
  pointer-events: none; /* 不阻挡交互 */
  background: #0f172a; /* 兜底背景色 */
}
</style>