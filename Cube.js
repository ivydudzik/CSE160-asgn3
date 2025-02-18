class Cube {
    constructor() {
        this.vertices = null;
        this.uvs = null;
        this.vertexBuffer = null;
        this.uvBuffer = null;
        this.texture0 = null;

        this.position = new Vector3([0, 0, 0]);
        this.rotation = new Vector3([0, 0, 0]);
        this.scale = new Vector3([1, 1, 1]);
        this.modelMatrix = new Matrix4();

        this.setVertices();
        this.setUvs();
    }

    setImage(gl, imagePath) {
        if (this.texture0 === null) {
            this.texture0 = gl.createTexture();
        }

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        // check pntr to shdr unifrnm var
        if (u_Texture0 < 0) {
            console.warn("could not find uniform location");
        }

        const img = new Image();

        img.onload = () => {
            gl.activeTexture(gl.TEXTURE0);

            gl.bindTexture(gl.TEXTURE_2D, this.texture0);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                img
            );

            // set uniform to texture slot (match 32)
            gl.uniform1i(u_Texture0, 0);
        };

        img.crossOrigin = "anonymous";
        img.src = imagePath;
    }

    setVertices() {
        // prettier-ignore
        this.vertices = new Float32Array([
            //FRONT
            -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
            //LEFT
            -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5,
            //RIGHT
            0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5,
            0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
            //TOP
            -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
            //BACK
            0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
            //BOTTOM
            -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5
        ]);
    }

    setUvs() {
        // prettier-ignore
        this.uvs = new Float32Array([
            // FRONT
            0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1,
            // LEFT
            0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1,
            // RIGHT
            0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1,
            // TOP
            1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0,
            // BACK
            0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0,
            // BOTTOM
            0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1,
        ]);
    }

    calculateMatrix() {
        let [x, y, z] = this.position.elements;
        let [rx, ry, rz] = this.rotation.elements;
        let [sx, sy, sz] = this.scale.elements;

        this.modelMatrix
            .setTranslate(x, y, z)
            .rotate(rx, 1, 0, 0)
            .rotate(ry, 0, 1, 0)
            .rotate(rz, 0, 0, 1)
            .scale(sx, sy, sz);
    }

    render(gl, camera) {
        this.calculateMatrix();

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
        gl.uniformMatrix4fv(u_ViewMatrix, false, camera.viewMatrix.elements);
        gl.uniformMatrix4fv(
            u_ProjectionMatrix,
            false,
            camera.projectionMatrix.elements
        );

        if (this.vertexBuffer === null) {
            this.vertexBuffer = gl.createBuffer();
            if (!this.vertexBuffer) {
                console.log("Failed to create the buffer object");
                return -1;
            }
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        if (this.uvBuffer === null) {
            this.uvBuffer = gl.createBuffer();
            if (!this.uvBuffer) {
                console.log("Failed to create the buffer object");
                return -1;
            }
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_UV);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}