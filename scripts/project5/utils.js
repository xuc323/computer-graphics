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
        perVertexNormals = [], // vertex normals
        perFragNormals = [], // fragment normals
        textureCoords = []; // texture coordinates

    for (let t = 0; t < stacks; t++) {
        const phi1 = (t / stacks) * Math.PI;
        const phi2 = ((t + 1) / stacks) * Math.PI;
        for (let p = 0; p < slices; p++) {
            const theta1 = (p / slices) * 2 * Math.PI;
            const theta2 = ((p + 1) / slices) * 2 * Math.PI;

            // first triangle
            let xMean = 0,
                yMean = 0,
                zMean = 0;
            // first vertex
            let xVal = radius * Math.cos(theta1) * Math.sin(phi1);
            let yVal = radius * Math.sin(theta1) * Math.sin(phi1);
            let zVal = radius * Math.cos(phi1);
            vertices = vertices.concat([xVal, yVal, zVal]);
            // calculate normal for per-vertex lighting
            let normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            perVertexNormals = perVertexNormals.concat([xVal / normal, yVal / normal, zVal / normal]);
            xMean += xVal;
            yMean += yVal;
            zMean += zVal;

            // second vertex
            xVal = radius * Math.cos(theta1) * Math.sin(phi2);
            yVal = radius * Math.sin(theta1) * Math.sin(phi2);
            zVal = radius * Math.cos(phi2);
            vertices = vertices.concat([xVal, yVal, zVal]);
            // calculate normal for per-vertex lighting
            normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            perVertexNormals = perVertexNormals.concat([xVal / normal, yVal / normal, zVal / normal]);
            xMean += xVal;
            yMean += yVal;
            zMean += zVal;

            // third vertex
            xVal = radius * Math.cos(theta2) * Math.sin(phi1);
            yVal = radius * Math.sin(theta2) * Math.sin(phi1);
            zVal = radius * Math.cos(phi1);
            vertices = vertices.concat([xVal, yVal, zVal]);
            // calculate normal for per-vertex lighting
            normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            perVertexNormals = perVertexNormals.concat([xVal / normal, yVal / normal, zVal / normal]);
            xMean += xVal;
            yMean += yVal;
            zMean += zVal;

            // calculate normal for per-fragment lighting
            xMean /= 3;
            yMean /= 3;
            zMean /= 3;
            normal = Math.sqrt(xMean * xMean + yMean * yMean + zMean * zMean);
            perFragNormals = perFragNormals.concat([xMean / normal, yMean / normal, zMean / normal]);
            perFragNormals = perFragNormals.concat([xMean / normal, yMean / normal, zMean / normal]);
            perFragNormals = perFragNormals.concat([xMean / normal, yMean / normal, zMean / normal]);

            // second triangle
            xMean = 0;
            yMean = 0;
            zMean = 0;
            // first vertex
            xVal = radius * Math.cos(theta2) * Math.sin(phi1);
            yVal = radius * Math.sin(theta2) * Math.sin(phi1);
            zVal = radius * Math.cos(phi1);
            vertices = vertices.concat([xVal, yVal, zVal]);
            // calculate normal for per-vertex lighting
            normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            perVertexNormals = perVertexNormals.concat([xVal / normal, yVal / normal, zVal / normal]);
            xMean += xVal;
            yMean += yVal;
            zMean += zVal;

            // second vertex
            xVal = radius * Math.cos(theta1) * Math.sin(phi2);
            yVal = radius * Math.sin(theta1) * Math.sin(phi2);
            zVal = radius * Math.cos(phi2);
            vertices = vertices.concat([xVal, yVal, zVal]);
            // calculate normal for per-vertex lighting
            normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            perVertexNormals = perVertexNormals.concat([xVal / normal, yVal / normal, zVal / normal]);
            xMean += xVal;
            yMean += yVal;
            zMean += zVal;

            xVal = radius * Math.cos(theta2) * Math.sin(phi2);
            yVal = radius * Math.sin(theta2) * Math.sin(phi2);
            zVal = radius * Math.cos(phi2);
            vertices = vertices.concat([xVal, yVal, zVal]);
            // calculate normal for per-vertex lighting
            normal = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            perVertexNormals = perVertexNormals.concat([xVal / normal, yVal / normal, zVal / normal]);
            xMean += xVal;
            yMean += yVal;
            zMean += zVal;

            // calculate normal for per-fragment lighting
            xMean /= 3;
            yMean /= 3;
            zMean /= 3;
            normal = Math.sqrt(xMean * xMean + yMean * yMean + zMean * zMean);
            perFragNormals = perFragNormals.concat([xMean / normal, yMean / normal, zMean / normal]);
            perFragNormals = perFragNormals.concat([xMean / normal, yMean / normal, zMean / normal]);
            perFragNormals = perFragNormals.concat([xMean / normal, yMean / normal, zMean / normal]);
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

    return { vertices, perVertexNormals, perFragNormals, textureCoords };
}

function createProgram(vertexShaderID, fragmentShaderID) {
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
    program.pMatrixUniform = gl.getUniformLocation(
        program,
        "uPMatrix"
    );
    program.mvMatrixUniform = gl.getUniformLocation(
        program,
        "uMVMatrix"
    );
    program.nMatrixUniform = gl.getUniformLocation(
        program,
        "uNMatrix"
    );
    program.samplerUniform = gl.getUniformLocation(
        program,
        "uSampler"
    );
    program.useLightingUniform = gl.getUniformLocation(
        program,
        "uUseLighting"
    );
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
function setMatrixUniforms() {
    gl.uniformMatrix4fv(currentProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(currentProgram.mvMatrixUniform, false, mvMatrix);

    mat3.fromMat4(normalMatrix, mvMatrix);
    mat3.invert(normalMatrix, normalMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    gl.uniformMatrix3fv(currentProgram.nMatrixUniform, false, normalMatrix);
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
    mat4.rotate(newRotationMatrix, newRotationMatrix, degToRad(deltaX / 10), [0, 1, 0]);

    var deltaY = newY - lastMouseY;
    mat4.rotate(newRotationMatrix, newRotationMatrix, degToRad(deltaY / 10), [1, 0, 0]);

    mat4.multiply(mouseRotMatrix, newRotationMatrix, mouseRotMatrix);
    lastMouseX = newX;
    lastMouseY = newY;
}

function getHTMLObject(id1, id2, id3) {
    const val1 = document.getElementById(id1).value;
    const val2 = document.getElementById(id2).value;
    const val3 = document.getElementById(id3).value;
    return [val1, val2, val3];
}