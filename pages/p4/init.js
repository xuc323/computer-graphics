///////////////////////////////////////////
///// Initialize buffers and textures /////
///////////////////////////////////////////
var sunBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 5, // rotation speed
    rotation: 0, // rotation angle
};
var mercuryBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 19, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 20, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 0.9, // orbit radius
};
var venusBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 13, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 30, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 1.3, // orbit radius
};
var earthBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 20, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 35, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 1.8, // orbit radius
};
var marsBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 30, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 40, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 2.4, // orbit radius
};
var jupiterBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 15, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 45, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 3.25, // orbit radius
};
var saturnBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 12, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 50, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 4.1, // orbit radius
};
var uranusBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 19, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 55, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 4.8, // orbit radius
};
var neptuneBuffers = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
    rotationSpeed: 22, // rotation speed
    rotation: 0, // rotation angle
    orbitSpeed: 60, // orbit speed
    orbit: 0, // orbit angle
    orbitRadius: 5.4, // orbit radius
};


// We will generate the geometry with this function
function initBuffers() {
    /*************************
     * START SUN BUFFER
     *************************/
    // Create a buffer for the sun's vertices.
    let radius = 0.65,
        slices = 25,
        stacks = 12;
    let { vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    );
    // positions
    sunBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sunBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    // item size is always 3 (3d vector describing position)
    sunBuffers.positionBuffer.itemSize = 3;
    // numItems is the number of vertices in the triangle (2 * (slices + 1) * stacks)
    sunBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    sunBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sunBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    sunBuffers.textureCoordBuffer.itemSize = 2;
    sunBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    sunBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sunBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    sunBuffers.normBuffer.itemSize = 3;
    sunBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END SUN BUFFER
     *************************/
    /*************************
     * START MERCURY BUFFER
     *************************/
    radius = 0.08;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    mercuryBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mercuryBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    mercuryBuffers.positionBuffer.itemSize = 3;
    mercuryBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    mercuryBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mercuryBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    mercuryBuffers.textureCoordBuffer.itemSize = 2;
    mercuryBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    mercuryBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mercuryBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    mercuryBuffers.normBuffer.itemSize = 3;
    mercuryBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END MERCURY BUFFER
     *************************/
    /*************************
     * START VENUS BUFFER
     *************************/
    radius = 0.15;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    venusBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, venusBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    venusBuffers.positionBuffer.itemSize = 3;
    venusBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    venusBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, venusBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    venusBuffers.textureCoordBuffer.itemSize = 2;
    venusBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    venusBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, venusBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    venusBuffers.normBuffer.itemSize = 3;
    venusBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END VENUS BUFFER
     *************************/
    /*************************
     * START EARTH BUFFER
     *************************/
    radius = 0.18;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    earthBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, earthBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    earthBuffers.positionBuffer.itemSize = 3;
    earthBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    earthBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, earthBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    earthBuffers.textureCoordBuffer.itemSize = 2;
    earthBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    earthBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, earthBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    earthBuffers.normBuffer.itemSize = 3;
    earthBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END EARTH BUFFER
     *************************/
    /*************************
     * START MARS BUFFER
     ************************/
    radius = 0.2;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    marsBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, marsBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    marsBuffers.positionBuffer.itemSize = 3;
    marsBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    marsBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, marsBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    marsBuffers.textureCoordBuffer.itemSize = 2;
    marsBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    marsBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, marsBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    marsBuffers.normBuffer.itemSize = 3;
    marsBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END MARS BUFFER
     *************************/
    /*************************
     * START JUPITER BUFFER
     *************************/
    radius = 0.26;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    jupiterBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jupiterBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    jupiterBuffers.positionBuffer.itemSize = 3;
    jupiterBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    jupiterBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jupiterBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    jupiterBuffers.textureCoordBuffer.itemSize = 2;
    jupiterBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    jupiterBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jupiterBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    jupiterBuffers.normBuffer.itemSize = 3;
    jupiterBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END JUPITER BUFFER
     *************************/
    /*************************
     * START SATURN BUFFER
     *************************/
    radius = 0.28;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    saturnBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, saturnBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    saturnBuffers.positionBuffer.itemSize = 3;
    saturnBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    saturnBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, saturnBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    saturnBuffers.textureCoordBuffer.itemSize = 2;
    saturnBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    saturnBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, saturnBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    saturnBuffers.normBuffer.itemSize = 3;
    saturnBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END SATURN BUFFER
     *************************/
    /*************************
     * START URANUS BUFFER
     *************************/
    radius = 0.22;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    uranusBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uranusBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    uranusBuffers.positionBuffer.itemSize = 3;
    uranusBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    uranusBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uranusBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    uranusBuffers.textureCoordBuffer.itemSize = 2;
    uranusBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    uranusBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uranusBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    uranusBuffers.normBuffer.itemSize = 3;
    uranusBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END URANUS BUFFER
     *************************/
    /*************************
     * START NEPTUNE BUFFER
     *************************/
    radius = 0.21;
    slices = 25;
    stacks = 12;
    ({ vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    ));
    // positions
    neptuneBuffers.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, neptuneBuffers.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    neptuneBuffers.positionBuffer.itemSize = 3;
    neptuneBuffers.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    neptuneBuffers.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, neptuneBuffers.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    neptuneBuffers.textureCoordBuffer.itemSize = 2;
    neptuneBuffers.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    neptuneBuffers.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, neptuneBuffers.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    neptuneBuffers.normBuffer.itemSize = 3;
    neptuneBuffers.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END NEPTUNE BUFFER
     *************************/
}


// generate texture
function initTexture() {
    // sun texture
    sunBuffers.texture = gl.createTexture();
    sunBuffers.texture.image = new Image();
    sunBuffers.texture.image.onload = function () {
        handleLoadedTexture(sunBuffers.texture);
    };
    sunBuffers.texture.image.src = "../assets/sun.gif";

    // mercury texture
    mercuryBuffers.texture = gl.createTexture();
    mercuryBuffers.texture.image = new Image();
    mercuryBuffers.texture.image.onload = function () {
        handleLoadedTexture(mercuryBuffers.texture);
    };
    mercuryBuffers.texture.image.src = "../assets/mercury.gif";

    // venus texture
    venusBuffers.texture = gl.createTexture();
    venusBuffers.texture.image = new Image();
    venusBuffers.texture.image.onload = function () {
        handleLoadedTexture(venusBuffers.texture);
    };
    venusBuffers.texture.image.src = "../assets/venus.gif";

    // earth texture
    earthBuffers.texture = gl.createTexture();
    earthBuffers.texture.image = new Image();
    earthBuffers.texture.image.onload = function () {
        handleLoadedTexture(earthBuffers.texture);
    };
    earthBuffers.texture.image.src = "../assets/earth.gif";

    // mars texture
    marsBuffers.texture = gl.createTexture();
    marsBuffers.texture.image = new Image();
    marsBuffers.texture.image.onload = function () {
        handleLoadedTexture(marsBuffers.texture);
    };
    marsBuffers.texture.image.src = "../assets/mars.gif";

    // jupiter texture
    jupiterBuffers.texture = gl.createTexture();
    jupiterBuffers.texture.image = new Image();
    jupiterBuffers.texture.image.onload = function () {
        handleLoadedTexture(jupiterBuffers.texture);
    };
    jupiterBuffers.texture.image.src = "../assets/jupiter.gif";

    // saturn texture
    saturnBuffers.texture = gl.createTexture();
    saturnBuffers.texture.image = new Image();
    saturnBuffers.texture.image.onload = function () {
        handleLoadedTexture(saturnBuffers.texture);
    };
    saturnBuffers.texture.image.src = "../assets/saturn.gif";

    // uranus texture
    uranusBuffers.texture = gl.createTexture();
    uranusBuffers.texture.image = new Image();
    uranusBuffers.texture.image.onload = function () {
        handleLoadedTexture(uranusBuffers.texture);
    };
    uranusBuffers.texture.image.src = "../assets/uranus.gif";

    // neptune texture
    neptuneBuffers.texture = gl.createTexture();
    neptuneBuffers.texture.image = new Image();
    neptuneBuffers.texture.image.onload = function () {
        handleLoadedTexture(neptuneBuffers.texture);
    };
    neptuneBuffers.texture.image.src = "../assets/neptune.gif";
}


// reads the texture image and saves it to the variable provided
function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        texture.image
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}