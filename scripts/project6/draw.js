// Main function to draw everything on the viewport
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var normalMatrix = mat3.create();
var directionalMatrix = vec3.create();

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // allocate a perspective matrix in pMatrix
  mat4.perspective(
    pMatrix,
    45,
    gl.viewportWidth / gl.viewportHeight,
    0.1,
    100.0
  );

  gl.useProgram(pointLightProgram);

  /********************************
   * START DRAWING RED SPHERE
   ********************************/
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -20.0]);
  mat4.multiply(mvMatrix, mvMatrix, mouseRotMatrix);
  mat4.translate(mvMatrix, mvMatrix, [
    radius * Math.sin(degToRad(degrees)),
    redSphereBuffer.y,
    radius * Math.cos(degToRad(degrees)),
  ]);

  // positions
  gl.bindBuffer(gl.ARRAY_BUFFER, redSphereBuffer.positionBuffer);
  gl.vertexAttribPointer(
    pointLightProgram.vertexPositionAttribute,
    redSphereBuffer.positionBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  // colors
  gl.bindBuffer(gl.ARRAY_BUFFER, redSphereBuffer.colorBuffer);
  gl.vertexAttribPointer(
    pointLightProgram.vertexColorAttribute,
    redSphereBuffer.colorBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  setMatrixUniforms(1);
  gl.drawArrays(gl.TRIANGLES, 0, redSphereBuffer.positionBuffer.numItems);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  /********************************
   * END DRAWING RED SPHERE
   ********************************/
  /********************************
   * START DRAWING BLUE SPHERE
   ********************************/
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -20.0]);
  mat4.multiply(mvMatrix, mvMatrix, mouseRotMatrix);
  mat4.translate(mvMatrix, mvMatrix, [
    radius * Math.sin(degToRad(degrees)),
    blueSphereBuffer.y,
    radius * Math.cos(degToRad(degrees)),
  ]);

  // positions
  gl.bindBuffer(gl.ARRAY_BUFFER, blueSphereBuffer.positionBuffer);
  gl.vertexAttribPointer(
    pointLightProgram.vertexPositionAttribute,
    blueSphereBuffer.positionBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  // colors
  gl.bindBuffer(gl.ARRAY_BUFFER, blueSphereBuffer.colorBuffer);
  gl.vertexAttribPointer(
    pointLightProgram.vertexColorAttribute,
    blueSphereBuffer.colorBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  setMatrixUniforms(1);
  gl.drawArrays(gl.TRIANGLES, 0, blueSphereBuffer.positionBuffer.numItems);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  /********************************
   * END DRAWING BLUE SPHERE
   ********************************/

  gl.useProgram(shaderProgram);
  // set ambient light
  gl.uniform3fv(shaderProgram.ambientColorUniform, [0.35, 0.35, 0.35]);

  // set directional light
  vec3.normalize(directionalMatrix, [
    document.getElementById("directionalDirectionX").value,
    document.getElementById("directionalDirectionY").value,
    document.getElementById("directionalDirectionZ").value,
  ]);
  gl.uniform3fv(shaderProgram.lightingDirectionUniform, directionalMatrix);
  gl.uniform3fv(shaderProgram.directionalColorUniform, [0.0, 1.0, 0.0]);

  // set point light
  gl.uniform3fv(shaderProgram.redLightDirectionUniform, [
    radius * Math.sin(degToRad(degrees)),
    redSphereBuffer.y,
    radius * Math.cos(degToRad(degrees)),
  ]);

  gl.uniform3fv(shaderProgram.blueLightDirectionUniform, [
    radius * Math.sin(degToRad(degrees)),
    blueSphereBuffer.y,
    radius * Math.cos(degToRad(degrees)),
  ]);

  /*************************
   * START DRAWING BUNNY
   *************************/
  const drawBunny = document.getElementById("drawBunny").checked;
  if (bunneyBuffer.loaded && drawBunny) {
    // reset the model view matrix
    mat4.identity(mvMatrix);
    // set the position of the sphere
    mat4.translate(mvMatrix, mvMatrix, [-6.0, 0.0, -20.0]);
    mat4.multiply(mvMatrix, mvMatrix, mouseRotMatrix);

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, bunneyBuffer.positionBuffer);
    gl.vertexAttribPointer(
      shaderProgram.vertexPositionAttribute,
      bunneyBuffer.positionBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, bunneyBuffer.normalBuffer);
    gl.vertexAttribPointer(
      shaderProgram.vertexNormalAttribute,
      bunneyBuffer.normalBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    // texture
    gl.bindBuffer(gl.ARRAY_BUFFER, bunneyBuffer.textureCoordBuffer);
    gl.vertexAttribPointer(
      shaderProgram.textureCoordAttribute,
      bunneyBuffer.textureCoordBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, bunneyBuffer.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    // set uniform variable in vertex shader
    setMatrixUniforms(2);
    // draw triangles
    gl.drawArrays(gl.TRIANGLES, 0, bunneyBuffer.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
  /*************************
   * END DRAWING BUNNY
   *************************/
  /*************************
   * START DRAWING BUDDHA
   *************************/
  const drawBuddha = document.getElementById("drawBuddha").checked;
  if (buddhaBuffer.loaded && drawBuddha) {
    // reset the model view matrix
    mat4.identity(mvMatrix);
    // set the position of the sphere
    mat4.translate(mvMatrix, mvMatrix, [6.0, 0.0, -20.0]);
    mat4.multiply(mvMatrix, mvMatrix, mouseRotMatrix);

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, buddhaBuffer.positionBuffer);
    gl.vertexAttribPointer(
      shaderProgram.vertexPositionAttribute,
      buddhaBuffer.positionBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, buddhaBuffer.normalBuffer);
    gl.vertexAttribPointer(
      shaderProgram.vertexNormalAttribute,
      buddhaBuffer.normalBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    // texture
    gl.bindBuffer(gl.ARRAY_BUFFER, buddhaBuffer.textureCoordBuffer);
    gl.vertexAttribPointer(
      shaderProgram.textureCoordAttribute,
      buddhaBuffer.textureCoordBuffer.itemSize,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, buddhaBuffer.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    // set uniform variable in vertex shader
    setMatrixUniforms(2);
    // draw triangles
    gl.drawArrays(gl.TRIANGLES, 0, buddhaBuffer.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
  /*************************
   * END DRAWING BUDDHA
   *************************/
}

let lastTime = 0,
  degrees = 0;
const rotSpeed = 30,
  radius = 10.0;
function animate() {
  const timeNow = new Date().getTime();
  if (lastTime != 0) {
    const elapsed = timeNow - lastTime;
    let newDegrees = (rotSpeed * elapsed) / 1000.0 + degrees;
    if (newDegrees > 360) newDegrees -= 360;
    degrees = newDegrees;
  }
  lastTime = timeNow;
}

// Handles the moment by moment re-rendering
function tick() {
  requestAnimFrame(tick); // infinite recursive call
  resize(canvas); // resize the canvas to the window size
  initPLY(); // load models
  animate();
  drawScene(); // draw the scene
}
