// Compile and return the shader program
function getShader(gl, id) {
  // Load the shader code by it's ID, as assigned in the script element (e.g. "shader-fs" or "shader-vs")
  const shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  let k = shaderScript.firstChild;
  let str = "";
  // While firstChild exists
  while (k) {
    // If the firstChild is a TEXT type document
    if (k.nodeType == 3) {
      // Append the text to str
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  let shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  // Now we have the type and the code, and we
  // provide it to openGL as such, then compile the shader code
  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  // If the compilation of the shader code fails, report the error
  // and return nothing, since the shader failed to compile
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  // If there were no errors in compilation, return the compiled shader
  return shader;
}

// helper function to create a sphere
function createSphere(radius, slices, stacks) {
  let vertices = [], // vertex positions
    normals = [], // vertex normals
    textureCoords = []; // texture coordinates

  for (let t = 0; t < stacks; t++) {
    const phi1 = (t / stacks) * Math.PI;
    const phi2 = ((t + 1) / stacks) * Math.PI;
    for (let p = 0; p < slices; p++) {
      const theta1 = (p / slices) * 2 * Math.PI;
      const theta2 = ((p + 1) / slices) * 2 * Math.PI;

      // first triangle
      // first vertex
      let xVal = radius * Math.cos(theta1) * Math.sin(phi1);
      let yVal = radius * Math.sin(theta1) * Math.sin(phi1);
      let zVal = radius * Math.cos(phi1);
      vertices = vertices.concat([xVal, yVal, zVal]);
      let normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
      normals = normals.concat([xVal / normal, yVal / normal, zVal / normal]);

      // second vertex
      xVal = radius * Math.cos(theta1) * Math.sin(phi2);
      yVal = radius * Math.sin(theta1) * Math.sin(phi2);
      zVal = radius * Math.cos(phi2);
      vertices = vertices.concat([xVal, yVal, zVal]);
      normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
      normals = normals.concat([xVal / normal, yVal / normal, zVal / normal]);

      // third vertex
      xVal = radius * Math.cos(theta2) * Math.sin(phi1);
      yVal = radius * Math.sin(theta2) * Math.sin(phi1);
      zVal = radius * Math.cos(phi1);
      vertices = vertices.concat([xVal, yVal, zVal]);
      normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
      normals = normals.concat([xVal / normal, yVal / normal, zVal / normal]);

      // second triangle
      // first vertex
      xVal = radius * Math.cos(theta2) * Math.sin(phi1);
      yVal = radius * Math.sin(theta2) * Math.sin(phi1);
      zVal = radius * Math.cos(phi1);
      vertices = vertices.concat([xVal, yVal, zVal]);
      normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
      normals = normals.concat([xVal / normal, yVal / normal, zVal / normal]);

      // second vertex
      xVal = radius * Math.cos(theta1) * Math.sin(phi2);
      yVal = radius * Math.sin(theta1) * Math.sin(phi2);
      zVal = radius * Math.cos(phi2);
      vertices = vertices.concat([xVal, yVal, zVal]);
      normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
      normals = normals.concat([xVal / normal, yVal / normal, zVal / normal]);

      // third vertex
      xVal = radius * Math.cos(theta2) * Math.sin(phi2);
      yVal = radius * Math.sin(theta2) * Math.sin(phi2);
      zVal = radius * Math.cos(phi2);
      vertices = vertices.concat([xVal, yVal, zVal]);
      normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
      normals = normals.concat([xVal / normal, yVal / normal, zVal / normal]);
    }
  }

  // texture coordinates
  for (t = 0; t < stacks; t++) {
    const phi1 = t / stacks;
    const phi2 = (t + 1) / stacks;
    for (p = 0; p < slices; p++) {
      const theta1 = 1 - p / slices;
      const theta2 = 1 - (p + 1) / slices;

      // first triangle
      textureCoords = textureCoords.concat([theta1, phi1]);
      textureCoords = textureCoords.concat([theta1, phi2]);
      textureCoords = textureCoords.concat([theta2, phi1]);
      // second triangle
      textureCoords = textureCoords.concat([theta2, phi1]);
      textureCoords = textureCoords.concat([theta1, phi2]);
      textureCoords = textureCoords.concat([theta2, phi2]);
    }
  }

  return { vertices, normals, textureCoords };
}

function createColorArray(arraySize, color) {
  let colors = [],
    c = [];

  if (color == "b") {
    c = [0.0, 0.0, 1.0, 1];
  } else if (color == "r") {
    c = [1.0, 0.0, 0.0, 1];
  } else {
    return;
  }

  for (let i = 0; i < arraySize; i++) {
    colors = colors.concat(c);
  }

  return colors;
}

function createProgram(vertexShaderID, fragmentShaderID, index) {
  const vertexShader = getShader(gl, vertexShaderID);
  const fragmentShader = getShader(gl, fragmentShaderID);

  // Create the shader program, then attach the vertex and fragment shaders
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  // position data
  program.vertexPositionAttribute = gl.getAttribLocation(
    program,
    "aVertexPosition"
  );
  gl.enableVertexAttribArray(program.vertexPositionAttribute);
  // shared for both shader programs
  program.pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
  program.mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");

  if (index === 2) {
    // lighting data
    program.vertexNormalAttribute = gl.getAttribLocation(
      program,
      "aVertexNormal"
    );
    gl.enableVertexAttribArray(program.vertexNormalAttribute);

    // texture data
    program.textureCoordAttribute = gl.getAttribLocation(
      program,
      "aTextureCoord"
    );
    gl.enableVertexAttribArray(program.textureCoordAttribute);

    // send uniform data to the shaders
    program.nMatrixUniform = gl.getUniformLocation(program, "uNMatrix");
    program.samplerUniform = gl.getUniformLocation(program, "uSampler");
    program.useSpecularUniform = gl.getUniformLocation(program, "uUseSpecular");
    program.ambientColorUniform = gl.getUniformLocation(
      program,
      "uAmbientColor"
    );
    program.lightingDirectionUniform = gl.getUniformLocation(
      program,
      "uLightingDirection"
    );
    program.directionalColorUniform = gl.getUniformLocation(
      program,
      "uDirectionalColor"
    );
  } else {
    // color data
    program.vertexColorAttribute = gl.getAttribLocation(
      program,
      "aVertexColor"
    );
    gl.enableVertexAttribArray(program.vertexColorAttribute);
  }

  return program;
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

// Hanldes resize of the canvas
function resize(canvas) {
  // browser width
  const dispWidth = window.innerWidth - 20;
  // browser height
  const dispHeight = window.innerHeight - 20;

  // check if the canvas is not the same size
  if (canvas.width != dispWidth || canvas.height != dispHeight) {
    canvas.width = dispWidth;
    canvas.height = dispHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  }
}

// Here we connect the uniform matrices
function setMatrixUniforms(index) {
  if (index == 1) {
    gl.uniformMatrix4fv(pointLightProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(pointLightProgram.mvMatrixUniform, false, mvMatrix);
  } else {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

    mat3.fromMat4(normalMatrix, mvMatrix);
    mat3.invert(normalMatrix, normalMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
  }
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

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var mouseRotMatrix = mat4.create();
mat4.identity(mouseRotMatrix);

function handleMouseDown(event) {
  mouseDown = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
}

function handleMouseUp(event) {
  mouseDown = false;
}

function handleMouseMove(event) {
  if (!mouseDown) {
    return;
  }
  var newX = event.clientX;
  var newY = event.clientY;

  var newRotationMatrix = mat4.create();
  mat4.identity(newRotationMatrix);

  var deltaX = newX - lastMouseX;
  mat4.rotate(
    newRotationMatrix,
    newRotationMatrix,
    degToRad(deltaX / 10),
    [0, 1, 0]
  );

  var deltaY = newY - lastMouseY;
  mat4.rotate(
    newRotationMatrix,
    newRotationMatrix,
    degToRad(deltaY / 10),
    [1, 0, 0]
  );

  mat4.multiply(mouseRotMatrix, newRotationMatrix, mouseRotMatrix);
  lastMouseX = newX;
  lastMouseY = newY;
}
