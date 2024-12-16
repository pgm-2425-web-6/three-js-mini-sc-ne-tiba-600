const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000 
);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;  
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);


const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
light.castShadow = true; 
light.shadow.bias = 0.01; 
scene.add(light);

const lightMovement = new THREE.Vector3(10, 10, 10);


const geometryCylinder = new THREE.CylinderGeometry(5, 5, 0.5, 64);
const materialCylinder = new THREE.MeshStandardMaterial({
    color: 0x00ffcc,
    metalness: 0.5,
    roughness: 0.2,
});
const disc = new THREE.Mesh(geometryCylinder, materialCylinder);
disc.position.y = -3;
disc.castShadow = true; 
scene.add(disc);


const geometryBox = new THREE.BoxGeometry(5, 5, 5);
const materialBox = new THREE.MeshStandardMaterial({
    color: 0x00ccff,
});
const box = new THREE.Mesh(geometryBox, materialBox);
box.position.x = -10;
box.castShadow = true;
scene.add(box);


const geometrySphere = new THREE.SphereGeometry(3, 32, 32);
const materialSphere = new THREE.MeshStandardMaterial({
    color: 0xff5733,
});
const sphere = new THREE.Mesh(geometrySphere, materialSphere);
sphere.position.x = 10;
sphere.castShadow = true;
scene.add(sphere);


camera.position.z = 20;

const controls = new THREE.OrbitControls(camera, renderer.domElement);

let time = 0;

function moveLight() {
    time += 0.01;
    lightMovement.x = 10 * Math.sin(time);
    lightMovement.z = 10 * Math.cos(time);
    light.position.set(lightMovement.x, lightMovement.y, lightMovement.z);
}

function animate() {
    requestAnimationFrame(animate);

    moveLight();  
    disc.rotation.x += 0.01;
    disc.rotation.y += 0.01;
    box.rotation.y += 0.01;
    sphere.rotation.x += 0.01;

    controls.update();  

    renderer.render(scene, camera);
}

animate();


renderer.domElement.addEventListener("click", (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(disc); 

    if (intersects.length > 0) {
        alert("Disc booting...");
    }
});


window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
