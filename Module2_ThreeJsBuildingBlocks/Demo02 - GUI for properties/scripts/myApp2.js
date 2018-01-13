var demo = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        light = new THREE.AmbientLight(0xffffff),
        light2 = new THREE.PointLight(0xffffff),
        camera,
        renderer = new THREE.WebGLRenderer(),
        mainCube,
        spinningCube,
        childCube,
        plane,
        ground;


    function initScene() {
        setRendererIntoWebPage();
        scene.add(light);
        setCamera();
        setGround();
        setMainCube();
        setChildCube();
        setSpinningCube();
        assignColorsToCube(mainCube);
        setCubeAxisVisualReference();
        setSceneAxisVisualReference();
        setupGui();
        requestAnimationFrame(render);
    };


    loadSceneOnWIndowLoad();

    return {
        scene: scene
    }

    function setRendererIntoWebPage() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
    }

    function setCamera() {
        const fov = 35;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 1;
        const far = 1000;


        camera = new THREE.PerspectiveCamera(
            fov,
            aspect,
            near,
            far
        );

        camera.position.z = 100;
        scene.add(camera);
    }

    function setGround() {
        const groundTexturePath = 'content/grasslight-big.jpg';

        var texture = THREE.ImageUtils.loadTexture(groundTexturePath);
        var planeMaterial = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide});

        const planeWidth = 200;
        const planeHeight = 200;

        plane = new THREE.Mesh(new THREE.PlaneGeometry(planeWidth, planeHeight), planeMaterial);

        const convertRadiansToDegrees = (Math.PI / 180);

        plane.rotation.x = 90 * convertRadiansToDegrees;
        plane.position.y = -10;
        plane.name = "plane";
        scene.add(plane);
    }

    function setMainCube() {
        const width = 20;
        const height = 20;
        const depth = 20;
        const applyDifferentColorsToEachFace = THREE.VertexColors;

        mainCube = new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth),
            new THREE.MeshBasicMaterial({
                vertexColors: applyDifferentColorsToEachFace
            }));

        mainCube.name = "mainCube";
    }

    function setChildCube() {
        const width = 10;
        const height = 10;
        const depth = 10;
        const green = {color: 0x00FF00};
        const offsetChildCubeFromParentToBeAbleToSeeIt = 30;

        childCube = new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth),
            new THREE.MeshBasicMaterial(green));

        childCube.name = "childCube";

        childCube.position.y = offsetChildCubeFromParentToBeAbleToSeeIt;
        mainCube.add(childCube);
    }

    function setSpinningCube() {
        const width = 2;
        const height = 2;
        const depth = 2;
        const red = {color: 0xFF0000};

        spinningCube = new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth),
            new THREE.MeshBasicMaterial(red));

        spinningCube.name = "spinningCube";
        spinningCube.position.x = -50;
        spinningCube.position.Y = 20;
        spinningCube.add(light2);
        scene.add(spinningCube);
    }

    function assignColorsToCube(cube) {
        const red = "rgb(255,0,0)";
        const green = "rgb(0,255,0)";
        const blue = "rgb(0,0,255)";
        const yellow = "rgb(255,255,0)";
        const cyan = "rgb(0,255,255)";
        const magenta = "rgb(255,0,255)";

        var colors = [
            new THREE.Color(red),
            new THREE.Color(green),
            new THREE.Color(blue),
            new THREE.Color(yellow),
            new THREE.Color(cyan),
            new THREE.Color(magenta)
        ];


        for (var i = 0; i < 12; i += 2) {

            const currentFaceToApplyColorTo = i / 2;
            const firstHalfOfTheCubeFace = i;
            const secondHalfOfTheCubeFace = i + 1;

            var color = colors[currentFaceToApplyColorTo];
            cube.geometry.faces[firstHalfOfTheCubeFace].color = color;
            cube.geometry.faces[secondHalfOfTheCubeFace].color = color;
        }
    }

    function setCubeAxisVisualReference() {
        var cubeAxesHelper = new THREE.AxisHelper(50);
        mainCube.add(cubeAxesHelper);
        scene.add(mainCube);
    }

    function setSceneAxisVisualReference() {
        var axesHelper = new THREE.AxisHelper(300);
        scene.add(axesHelper);
    }

    function setupGui() {
        var itemsToControl = new function () {
            variablesToControllInTheGui.call(this, camera, mainCube);
        };
        var gui = new dat.GUI();
        setCameraVariablesEventsControlledByGui(gui, itemsToControl);
        setCubeVariablesEventsControlledByGui(gui, itemsToControl);
    }

    function render() {
        moveOrbitingCube(spinningCube);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    function loadSceneOnWIndowLoad() {
        window.onload = initScene;
    }


    function setCameraVariablesEventsControlledByGui(gui, itemsToControl) {
        var cameraXPos = gui.add(itemsToControl, 'cameraXPos', -200, 200);
        var cameraYPos = gui.add(itemsToControl, 'cameraYPos', -200, 200);
        var cameraZPos = gui.add(itemsToControl, 'cameraZPos', -400, 400);
        var cameraXRotation = gui.add(itemsToControl, 'cameraXRotation', 0, 360);
        var cameraYRotation = gui.add(itemsToControl, 'cameraYRotation', 0, 360);
        var cameraZRotation = gui.add(itemsToControl, 'cameraZRotation', 0, 360);

        cameraXPos.onChange(function (value) {
            move(camera, 'x', value)
        });
        cameraYPos.onChange(function (value) {
            move(camera, 'y', value)
        });
        cameraZPos.onChange(function (value) {
            move(camera, 'z', value)
        });
        cameraXRotation.onChange(function (value) {
            rotate(camera, 'x', value)
        });
        cameraYRotation.onChange(function (value) {
            rotate(camera, 'y', value)
        });
        cameraZRotation.onChange(function (value) {
            rotate(camera, 'z', value)
        });
    }

    function setCubeVariablesEventsControlledByGui(gui, itemsToControl) {
        var cubeXPos = gui.add(itemsToControl, 'cubeXPos', -200, 200);
        var cubeYPos = gui.add(itemsToControl, 'cubeYPos', -200, 200);
        var cubeZPos = gui.add(itemsToControl, 'cubeZPos', -200, 200);
        var cubeXRotation = gui.add(itemsToControl, 'cubeXRotation', 0, 360);
        var cubeYRotation = gui.add(itemsToControl, 'cubeYRotation', 0, 360);
        var cubeZRotation = gui.add(itemsToControl, 'cubeZRotation', 0, 360);
        var cubeXScale = gui.add(itemsToControl, 'cubeXScale', 1, 10);
        var cubeYScale = gui.add(itemsToControl, 'cubeYScale', 1, 10);
        var cubeZScale = gui.add(itemsToControl, 'cubeZScale', 1, 10);

        cubeXPos.onChange(function (value) {
            move(mainCube, 'x', value)
        });
        cubeYPos.onChange(function (value) {
            move(mainCube, 'y', value)
        });
        cubeZPos.onChange(function (value) {
            move(mainCube, 'z', value)
        });
        cubeXRotation.onChange(function (value) {
            rotate(mainCube, 'x', value)
        });
        cubeYRotation.onChange(function (value) {
            rotate(mainCube, 'y', value)
        });
        cubeZRotation.onChange(function (value) {
            rotate(mainCube, 'z', value)
        });
        cubeXScale.onChange(function (value) {
            scale(mainCube, 'x', value)
        });
        cubeYScale.onChange(function (value) {
            scale(mainCube, 'y', value)
        });
        cubeZScale.onChange(function (value) {
            scale(mainCube, 'z', value)
        });
    }

    function variablesToControllInTheGui(camera, cube) {
        this.cameraXPos = camera.position.x,
            this.cameraYPos = camera.position.y,
            this.cameraZPos = camera.position.z;
        this.cameraXRotation = camera.rotation.x;
        this.cameraYRotation = camera.rotation.y;
        this.cameraZRotation = camera.rotation.z;

        this.cubeXPos = cube.position.x,
            this.cubeYPos = cube.position.y,
            this.cubeZPos = cube.position.z,
            this.cubeXRotation = cube.rotation.x;
        this.cubeYRotation = cube.rotation.y;
        this.cubeZRotation = cube.rotation.z;

        this.cubeXScale = cube.scale.x;
        this.cubeYScale = cube.scale.y;
        this.cubeZScale = cube.scale.z;
    }

    function rotate(object, axis, value) {
        object.rotation[axis] = value * (Math.PI / 180);
    }

    function move(item, axis, value) {
        item.position[axis] = value;
    }

    function scale(item, axis, value) {
        item.scale[axis] = value;
    }

    function moveOrbitingCube(object) {

        var theta = 0.05; //amount to rotate by
        var x = object.position.x;
        var z = object.position.z;

        object.position.x = x * Math.cos(theta) + z * Math.sin(theta);
        object.position.z = z * Math.cos(theta) - x * Math.sin(theta);
    }
})();
