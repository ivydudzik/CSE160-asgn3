class Camera {
    constructor(position = [0, 0, 0], target = [1, 1, 1]) {
        this.position = new Vector3(position);
        this.fov = 60
        this.target = new Vector3(target);
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.up = new Vector3([0, 1, 0]);

        this.speed = 5000.0;

        this.aspect = window.innerWidth / window.innerHeight;

        window.addEventListener("resize", (e) => {
            this.aspect = window.innerWidth / window.innerHeight;

            this.calculateViewProjection();
        });

        this.calculateViewProjection();
    }

    moveForward() {
        let f = new Vector3();
        f.set(this.position);
        f.sub(this.target);
        f.normalize();
        f.mul(this.speed);
        this.target += f;
        this.position += f;
        this.calculateViewProjection();
    }

    calculateViewProjection() {
        this.viewMatrix.setLookAt(
            ...this.position.elements,
            ...this.target.elements,
            ...this.up.elements
        );

        this.projectionMatrix.setPerspective(this.fov, this.aspect, 0.01, 1000);
    }
}
