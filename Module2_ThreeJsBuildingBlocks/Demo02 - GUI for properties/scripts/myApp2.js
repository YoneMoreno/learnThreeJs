var myClass = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        light = new THREE.AmbientLight(0xffffff),
        light2 = new THREE.AmbientLight(0xffffff),
        camera,
        renderer = new THREE.WebGLRenderer(),
        cube,
        cube2,
        cube3,
        plane,
        ground;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidht / window.innerHeight,
            1,
            1000
        );

        camera.position.z = 100;
        scene.add(camera);


    }
})();