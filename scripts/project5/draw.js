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

    // set ambient light
    gl.uniform1i(shaderProgram.useLightingUniform, true);
    gl.uniform3f(shaderProgram.ambientColorUniform, 0.0, 0.0, 0.0);

    // set directional light
    vec3.normalize(directionalMatrix, [1, 0, 0.8]);
    gl.uniform3fv(
        shaderProgram.lightingDirectionUniform,
        directionalMatrix
    );
    gl.uniform3f(shaderProgram.directionalColorUniform, 1.0, 1.0, 1.0);

    /*************************
     * START DRAWING SPHERE
     *************************/
    // reset the model view matrix
    mat4.identity(mvMatrix);
    // set the position of the sphere
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -10.0]);
    mat4.multiply(mvMatrix, mvMatrix, mouseRotMatrix);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        sphereBuffer.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        sphereBuffer.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        sphereBuffer.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sphereBuffer.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    // set uniform variable in vertex shader
    setMatrixUniforms();
    // draw the triangles
    gl.drawArrays(gl.TRIANGLES, 0, sphereBuffer.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING SPHERE
     *************************/
}

// Handles the moment by moment re-rendering
function tick() {
    requestAnimFrame(tick); // infinite recursive call
    resize(canvas); // resize the canvas to the window size
    drawScene(); // draw the scene
}
