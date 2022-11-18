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
    gl.uniform3f(shaderProgram.ambientColorUniform, 0.1, 0.1, 0.1);

    // set directional light
    vec3.normalize(directionalMatrix, [1, 0, 0.8]);
    gl.uniform3fv(
        shaderProgram.lightingDirectionUniform,
        directionalMatrix
    );
    gl.uniform3f(shaderProgram.directionalColorUniform, 1.0, 1.0, 1.0);

    /*************************
     * START DRAWING SUN
     *************************/
    // reset the model view matrix
    mat4.identity(mvMatrix);
    // set the position of the sphere
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(sunBuffers.rotation),
        [0, 0, 1]
    );


    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, sunBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        sunBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, sunBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        sunBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, sunBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        sunBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sunBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    // set uniform variable in vertex shader
    setMatrixUniforms();
    // draw the triangles
    gl.drawArrays(gl.TRIANGLES, 0, sunBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING SUN
     *************************/
    /*************************
     * START DRAWING MERCURY
     *************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        mercuryBuffers.orbitRadius * Math.cos(degToRad(mercuryBuffers.orbit)),
        0,
        mercuryBuffers.orbitRadius * Math.sin(degToRad(mercuryBuffers.orbit))
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(mercuryBuffers.rotation),
        [0, 0, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, mercuryBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        mercuryBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, mercuryBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        mercuryBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, mercuryBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        mercuryBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, mercuryBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, mercuryBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING MERCURY
     *************************/
    /*************************
     * START DRAWING VENUS
     *************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        0,
        venusBuffers.orbitRadius * Math.cos(degToRad(venusBuffers.orbit)),
        venusBuffers.orbitRadius * Math.sin(degToRad(venusBuffers.orbit))
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(venusBuffers.rotation),
        [0, 1, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, venusBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        venusBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, venusBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        venusBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, venusBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        venusBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, venusBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, venusBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING VENUS
     *************************/
    /*************************
     * START DRAWING EARTH
     *************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        earthBuffers.orbitRadius * Math.sin(degToRad(earthBuffers.orbit)),
        0,
        earthBuffers.orbitRadius * Math.cos(degToRad(earthBuffers.orbit))
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(earthBuffers.rotation),
        [0, 0, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, earthBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        earthBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, earthBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        earthBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, earthBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        earthBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, earthBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, earthBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING EARTH
     *************************/
    /*************************
     * START DRAWING MARS
     *************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        0,
        marsBuffers.orbitRadius * Math.sin(degToRad(marsBuffers.orbit)),
        marsBuffers.orbitRadius * Math.cos(degToRad(marsBuffers.orbit))
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(marsBuffers.rotation),
        [0, 0, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, marsBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        marsBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, marsBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        marsBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, marsBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        marsBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, marsBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, marsBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING MARS
     *************************/
    /*************************
     * START DRAWING JUPITER
     *************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        jupiterBuffers.orbitRadius * Math.cos(degToRad(jupiterBuffers.orbit)),
        jupiterBuffers.orbitRadius * Math.sin(degToRad(jupiterBuffers.orbit)),
        0
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(jupiterBuffers.rotation),
        [0, 0, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, jupiterBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        jupiterBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, jupiterBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        jupiterBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, jupiterBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        jupiterBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, jupiterBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, jupiterBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING JUPITER
     *************************/
    /*************************
     * START DRAWING SATURN
     **************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        saturnBuffers.orbitRadius * Math.cos(degToRad(saturnBuffers.orbit)),
        0,
        saturnBuffers.orbitRadius * Math.sin(degToRad(saturnBuffers.orbit))
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(saturnBuffers.rotation),
        [0, 0, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, saturnBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        saturnBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, saturnBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        saturnBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, saturnBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        saturnBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, saturnBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, saturnBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING SATURN
     *************************/
    /*************************
     * START DRAWING URANUS
     *************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        0,
        uranusBuffers.orbitRadius * Math.sin(degToRad(uranusBuffers.orbit)),
        uranusBuffers.orbitRadius * Math.cos(degToRad(uranusBuffers.orbit)),
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(uranusBuffers.rotation),
        [0, 0, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, uranusBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        uranusBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, uranusBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        uranusBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, uranusBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        uranusBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uranusBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, uranusBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /*************************
     * END DRAWING URANUS
     *************************/
    /*************************
     * START DRAWING NEPTUNE
     *************************/
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -7.0]);
    mat4.translate(mvMatrix, mvMatrix, [
        neptuneBuffers.orbitRadius * Math.sin(degToRad(neptuneBuffers.orbit)),
        0,
        neptuneBuffers.orbitRadius * Math.cos(degToRad(neptuneBuffers.orbit))
    ]);
    mat4.rotate(mvMatrix, mvMatrix, 90, [1, 0, 0]);
    mat4.rotate(
        mvMatrix,
        mvMatrix,
        degToRad(neptuneBuffers.rotation),
        [0, 0, 1]
    );

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, neptuneBuffers.positionBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        neptuneBuffers.positionBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, neptuneBuffers.normBuffer);
    gl.vertexAttribPointer(
        shaderProgram.vertexNormalAttribute,
        neptuneBuffers.normBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    // texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, neptuneBuffers.textureCoordBuffer);
    gl.vertexAttribPointer(
        shaderProgram.textureCoordAttribute,
        neptuneBuffers.textureCoordBuffer.itemSize,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, neptuneBuffers.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, neptuneBuffers.positionBuffer.numItems);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

let lastTime = 0;
function animate() {
    const timeNow = new Date().getTime();
    if (lastTime != 0) {
        const elapsed = timeNow - lastTime;
        // update the rotation to the current time
        calculateRotation(elapsed, sunBuffers);
        calculateRotation(elapsed, mercuryBuffers);
        calculateRotation(elapsed, venusBuffers);
        calculateRotation(elapsed, earthBuffers);
        calculateRotation(elapsed, marsBuffers);
        calculateRotation(elapsed, jupiterBuffers);
        calculateRotation(elapsed, saturnBuffers);
        calculateRotation(elapsed, uranusBuffers);
        calculateRotation(elapsed, neptuneBuffers);

        calculateOrbit(elapsed, mercuryBuffers);
        calculateOrbit(elapsed, venusBuffers);
        calculateOrbit(elapsed, earthBuffers);
        calculateOrbit(elapsed, marsBuffers);
        calculateOrbit(elapsed, jupiterBuffers);
        calculateOrbit(elapsed, saturnBuffers);
        calculateOrbit(elapsed, uranusBuffers);
        calculateOrbit(elapsed, neptuneBuffers);
    }
    lastTime = timeNow;
}

// Handles the moment by moment re-rendering
function tick() {
    requestAnimFrame(tick); // infinite recursive call
    resize(canvas); // resize the canvas to the window size
    animate(); // animate the sphere
    drawScene(); // draw the scene
}