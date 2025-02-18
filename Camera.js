class Camera {
    constructor(position = [0, 0, 0], target = [0, 0, -1]) {
        this.position = new Vector3(position);
        this.fov = 60
        this.target = new Vector3(target);
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.up = new Vector3([0, 1, 0]);

        this.speed = 0.1;
        this.panSpeed = 15;

        this.aspect = 1;

        // Unneccessary Aspect Code (WEBGL SETUP ALREADY DOES THIS)
        // this.aspect = window.innerWidth / window.innerHeight;

        // window.addEventListener("resize", (e) => {
        //     this.aspect = window.innerWidth / window.innerHeight;

        //     this.calculateViewProjection();
        // });

        this.calculateViewProjection();
    }

    moveForward() {
        let f = new Vector3();
        f.set(this.target);
        f.sub(this.position);
        f.normalize();
        f.mul(this.speed);
        this.target.add(f);
        this.position.add(f);
        this.calculateViewProjection();
    }

    moveBackwards() {
        let f = new Vector3();
        f.set(this.position);
        f.sub(this.target);
        f.normalize();
        f.mul(this.speed);
        this.target.add(f);
        this.position.add(f);
        this.calculateViewProjection();
    }

    moveLeft() {
        let f = new Vector3();
        f.set(this.target);
        f.sub(this.position);
        let s = new Vector3();
        s.set(Vector3.cross(this.up, f));
        s.normalize();
        s.mul(this.speed);
        this.target.add(s);
        this.position.add(s);
        this.calculateViewProjection();
    }


    moveRight() {
        let f = new Vector3();
        f.set(this.position);
        f.sub(this.target);
        let s = new Vector3();
        s.set(Vector3.cross(this.up, f));
        s.normalize();
        s.mul(this.speed);
        this.target.add(s);
        this.position.add(s);
        this.calculateViewProjection();
    }

    panHorizontal(alpha) {
        let f = new Vector3();
        f.set(this.target);
        f.sub(this.position);
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(alpha * this.panSpeed, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        let f_prime = new Vector3();
        f_prime.set(rotationMatrix.multiplyVector3(f));
        f_prime.add(this.position)
        this.target.set(f_prime);
        this.calculateViewProjection();
    }



    calculateViewProjection() {
        this.viewMatrix.setLookAt(
            ...this.position.elements,
            ...this.target.elements,
            ...this.up.elements
        );

        this.projectionMatrix.setPerspective(this.fov, this.aspect, 0.01, 10);
    }
}
