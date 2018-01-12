var myClass = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera,
        box;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);


        scene.add(light);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.z = 100;
        scene.add(camera);
    }

})();