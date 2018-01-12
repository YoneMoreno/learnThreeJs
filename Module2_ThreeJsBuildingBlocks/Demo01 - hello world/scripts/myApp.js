var myClass = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera,
        box;


    function initScene() {
        setRenderer();
        scene.add(light);
        setCamera();
        setBox();
        render();
    }


    function setUpSceneWhenWIndowLoads() {
        window.onload = initScene;
    }

    setUpSceneWhenWIndowLoads();


    function setRenderer() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
    }

    function setCamera() {
        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.z = 100;
        scene.add(camera);
    }

    function setBox() {
        box = new THREE.Mesh(
            new THREE.BoxGeometry(20, 20, 20),
            new THREE.MeshBasicMaterial({color: 0xFF0000})
        );

        box.name = "box";

        scene.add(box);
    }

    function render() {
        box.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        scene: scene
    };
})();
