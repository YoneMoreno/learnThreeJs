var myClass = (function () {

    "use strict";


    var scene = new THREE.Scene(),
        renderer = useModernBrowserWebGLOrOlderOnesCanvasSupport(),
        light,
        camera,
        box;


    function initScene() {
        setRenderer();
        setLight();
        setCamera();
        setBox();
        render();
    }


    setUpSceneWhenWIndowLoads();

    function setUpSceneWhenWIndowLoads() {
        window.onload = initScene;
    }


    function setRenderer() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
    }

    function setLight() {
        light = new THREE.AmbientLight(0xffffff);
        scene.add(light);
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

    function useModernBrowserWebGLOrOlderOnesCanvasSupport() {
        return window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    }

    return {
        scene: scene
    };
})();
