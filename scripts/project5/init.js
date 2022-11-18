///////////////////////////////////////////
///// Initialize buffers and textures /////
///////////////////////////////////////////
var sphereBuffer = {
  positionBuffer: null, // vertex position buffer
  textureCoordBuffer: null, // vertex texture coordinate buffer
  normalBuffer: null, // vertex normal buffer
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
  let { vertices, normals, textureCoords } = createSphere(
    radius,
    slices,
    stacks
  );
  // positions
  sphereBuffer.positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
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

  // normals
  sphereBuffer.normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  sphereBuffer.normalBuffer.itemSize = 3;
  sphereBuffer.normalBuffer.numItems = 6 * slices * stacks;
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
