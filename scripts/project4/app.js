// Initialize GL
var gl;
function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) { }
    if (!gl) {
        alert("Could not initialize WebGL");
    }
}

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

    // Check for linder errors
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

