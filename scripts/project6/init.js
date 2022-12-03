///////////////////////////////////////////
///// Initialize buffers and textures /////
///////////////////////////////////////////
var blueSphereBuffer = {
  positionBuffer: null, // vertex position buffer
  colorBuffer: null, // color buffer
};

var redSphereBuffer = {
  positionBuffer: null, //vertex position buffer
  colorBuffer: null, // color buffer
};

var bunneyBuffer = {
  positionBuffer: null,
  normalBuffer: null,
  textureCoordBuffer: null,
  texture: null,
  attemptLoad: false,
  loaded: false,
};

var buddhaBuffer = {
  positionBuffer: null,
  normalBuffer: null,
  textureCoordBuffer: null,
  texture: null,
  attemptLoad: false,
  loaded: false,
};

// We will generate the geometry with this function
function initBuffers() {
  /*************************
   * START RED SPHERE BUFFER
   *************************/
  // Create a buffer for the sun's vertices.
  let radius = 1.0,
    slices = 25,
    stacks = 12;
  // positions
  let { vertices } = createSphere(radius, slices, stacks);
  redSphereBuffer.positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, redSphereBuffer.positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  // item size is always 3 (3d vector describing position)
  redSphereBuffer.positionBuffer.itemSize = 3;
  // numItems is the number of vertices in the triangle (6 * (slices) * stacks)
  redSphereBuffer.positionBuffer.numItems = 6 * slices * stacks;
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // colors
  let colors = createColorArray(vertices.length, "r");
  redSphereBuffer.colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, redSphereBuffer.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  redSphereBuffer.colorBuffer.itemSize = 4;
  redSphereBuffer.colorBuffer.numItems = 6 * slices * stacks;
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  /*************************
   * END RED SPHERE BUFFER
   *************************/
  /***************************
   * START BLUE SPHERE BUFFER
   ***************************/
  // positions
  blueSphereBuffer.positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, blueSphereBuffer.positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  blueSphereBuffer.positionBuffer.itemSize = 3;
  blueSphereBuffer.positionBuffer.numItems = 6 * slices * stacks;
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // colors
  colors = createColorArray(vertices.length, "b");
  blueSphereBuffer.colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, blueSphereBuffer.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  blueSphereBuffer.colorBuffer.itemSize = 4;
  blueSphereBuffer.colorBuffer.numItems = 6 * slices * stacks;
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  /***************************
   * END BLUE SPHERE BUFFER
   ***************************/
}

function initPLY() {
  if (!bunneyBuffer.loaded) {
    // bunney not loaded
    if (bunneyBuffer.attemptLoad) {
      // bunney data is loading
      if (modelData.length != 0) {
        // if bunney is loaded, copy the data
        bunneyBuffer.positionBuffer = fileVertexPosBuffer;
        bunneyBuffer.normalBuffer = fileVertexNrmBuffer;
        bunneyBuffer.textureCoordBuffer = fileVertexTexBuffer;

        bunneyBuffer.loaded = true;
        // reset modelData
        modelData = [];

        // now loads buddha
        LoadPLY("../../assets/happy_vrip.ply");
        buddhaBuffer.attemptLoad = true;
      }
    } else {
      // bunney data is not loading, trying to load
      LoadPLY("../../assets/bun_zipper.ply");
      bunneyBuffer.attemptLoad = true;
    }
  } else if (!buddhaBuffer.loaded) {
    // bunney loaded, now loads buddha
    if (buddhaBuffer.attemptLoad) {
      // buddha data is loading
      if (modelData.length != 0) {
        // buddha is loaded, copy the data
        buddhaBuffer.positionBuffer = fileVertexPosBuffer;
        buddhaBuffer.normalBuffer = fileVertexNrmBuffer;
        buddhaBuffer.textureCoordBuffer = fileVertexTexBuffer;

        buddhaBuffer.loaded = true;
      }
    }
  }
}

function initTexture() {
  bunneyBuffer.texture = gl.createTexture();
  bunneyBuffer.texture.image = new Image();
  bunneyBuffer.texture.image.onload = function () {
    handleLoadedTexture(bunneyBuffer.texture);
  };
  bunneyBuffer.texture.image.src = "../assets/uranus.gif";

  buddhaBuffer.texture = gl.createTexture();
  buddhaBuffer.texture.image = new Image();
  buddhaBuffer.texture.image.onload = function () {
    handleLoadedTexture(buddhaBuffer.texture);
  };
  buddhaBuffer.texture.image.src = "../assets/uranus.gif";
}

// Initialize shader programs
var shaderProgram, pointLightProgram;
function initShaders() {
  pointLightProgram = createProgram("shader-vs", "shader-fs", 1);
  shaderProgram = createProgram("perfrag-shader-vs", "perfrag-shader-fs", 2);
}
