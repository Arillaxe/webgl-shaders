import './style.css';
import testFragment from './shaders/test.frag';
import testVert from './shaders/test.vert';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl =  canvas.getContext('webgl2') as WebGL2RenderingContext;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
gl.shaderSource(fragmentShader, testFragment);
gl.compileShader(fragmentShader);

const vertShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
gl.shaderSource(vertShader, testVert);
gl.compileShader(vertShader);

const program = gl.createProgram() as WebGLProgram;

gl.attachShader(program, vertShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
const screenResolutionUniformLocation = gl.getUniformLocation(program, "u_screenResolution");

let startTime: DOMHighResTimeStamp = NaN;
function render(timestamp: DOMHighResTimeStamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    const elapsedTime = (timestamp - startTime) * 0.001;

    gl.useProgram(program);

  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(timeUniformLocation, elapsedTime);
    gl.uniform2f(screenResolutionUniformLocation, window.innerWidth, window.innerHeight);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
