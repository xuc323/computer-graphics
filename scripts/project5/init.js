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
