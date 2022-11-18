///////////////////////////////////////////
///// Initialize buffers and textures /////
///////////////////////////////////////////
var sphereBuffer = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normBuffer: null, // vertex normal buffer
    texture: null, // texture buffer
};

// We will generate the geometry with this function
function initBuffers() {
    /*************************
     * START SPHERE BUFFER
     *************************/
    // Create a buffer for the sun's vertices.
    let radius = 1.3,
        slices = 12,
        stacks = 6;
    let { vertices, normals, textureCoords } = createSphere(
        radius,
        slices,
        stacks
    );
    // positions
    sphereBuffer.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    // item size is always 3 (3d vector describing position)
    sphereBuffer.positionBuffer.itemSize = 3;
    // numItems is the number of vertices in the triangle (2 * (slices + 1) * stacks)
    sphereBuffer.positionBuffer.numItems = 6 * (slices + 1) * stacks;

    // texture coordinates
    sphereBuffer.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    sphereBuffer.textureCoordBuffer.itemSize = 2;
    sphereBuffer.textureCoordBuffer.numItems = 6 * (slices + 1) * stacks;

    // normals
    sphereBuffer.normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.normBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW
    );
    sphereBuffer.normBuffer.itemSize = 3;
    sphereBuffer.normBuffer.numItems = 6 * (slices + 1) * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*************************
     * END SPHERE BUFFER
     *************************/
}

// generate texture
function initTexture() {
    // sphere texture
    sphereBuffer.texture = gl.createTexture();
    sphereBuffer.texture.image = new Image();
    sphereBuffer.texture.image.onload = function () {
        handleLoadedTexture(sphereBuffer.texture);
    };
    sphereBuffer.texture.image.src = "../assets/neptune.gif";
}

// Initialize shader programs
var shaderProgram;
function initShaders() {
    const fragmentShader = getShader(gl, "shader-fs");
    const vertexShader = getShader(gl, "shader-vs");

    // Create the program, then attach and link
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Check for linker errors
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialize shaders");
    }

    // Attach shaderprogram to openGL context
    gl.useProgram(shaderProgram);

    // position data
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(
        shaderProgram,
        "aVertexPosition"
    );
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    // lighting data
    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(
        shaderProgram,
        "aVertexNormal"
    );
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    // texture data
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(
        shaderProgram,
        "aTextureCoord"
    );
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    // send uniform data to the shaders
    shaderProgram.pMatrixUniform = gl.getUniformLocation(
        shaderProgram,
        "uPMatrix"
    );
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(
        shaderProgram,
        "uMVMatrix"
    );
    shaderProgram.nMatrixUniform = gl.getUniformLocation(
        shaderProgram,
        "uNMatrix"
    );
    shaderProgram.samplerUniform = gl.getUniformLocation(
        shaderProgram,
        "uSampler"
    );
    shaderProgram.useLightingUniform = gl.getUniformLocation(
        shaderProgram,
        "uUseLighting"
    );
    shaderProgram.ambientColorUniform = gl.getUniformLocation(
        shaderProgram,
        "uAmbientColor"
    );
    shaderProgram.lightingDirectionUniform = gl.getUniformLocation(
        shaderProgram,
        "uLightingDirection"
    );
    shaderProgram.directionalColorUniform = gl.getUniformLocation(
        shaderProgram,
        "uDirectionalColor"
    );
}
