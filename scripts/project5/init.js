///////////////////////////////////////////
///// Initialize buffers and textures /////
///////////////////////////////////////////
var sphereBuffer = {
    positionBuffer: null, // vertex position buffer
    textureCoordBuffer: null, // vertex texture coordinate buffer
    normPerVertexBuffer: null, // normal per vertex buffer
    normPerFragBuffer: null, // vertex normal buffer for per fragment lighting
    texture: null, // texture buffer
};

// We will generate the geometry with this function
function initBuffers() {
    /*************************
     * START SPHERE BUFFER
     *************************/
    // Create a buffer for the sun's vertices.
    let radius = 1.8,
        slices = 12,
        stacks = 6;
    let { vertices, perVertexNormals, perFragNormals, textureCoords } = createSphere(
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
    // numItems is the number of vertices in the triangle (6 * (slices) * stacks)
    sphereBuffer.positionBuffer.numItems = 6 * slices * stacks;

    // texture coordinates
    sphereBuffer.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.textureCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoords),
        gl.STATIC_DRAW
    );
    sphereBuffer.textureCoordBuffer.itemSize = 2;
    sphereBuffer.textureCoordBuffer.numItems = 6 * slices * stacks;

    // per vertex normals
    sphereBuffer.normPerVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.normPerVertexBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(perVertexNormals),
        gl.STATIC_DRAW
    );
    sphereBuffer.normPerVertexBuffer.itemSize = 3;
    sphereBuffer.normPerVertexBuffer.numItems = 6 * slices * stacks;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // per fragment normals
    sphereBuffer.normPerFragBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.normPerFragBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(perFragNormals),
        gl.STATIC_DRAW
    );
    sphereBuffer.normPerFragBuffer.itemSize = 3;
    sphereBuffer.normPerFragBuffer.numItems = 6 * slices * stacks;
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
    sphereBuffer.texture.image.src = "../assets/uranus.gif";
}

// Initialize shader programs
var currentProgram, perVertexProgram, perFragmentProgram;

function initShaders() {
    perVertexProgram = createProgram("shader-vs", "shader-fs");
    perFragmentProgram = createProgram("perfrag-shader-vs", "perfrag-shader-fs");
}
