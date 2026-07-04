
export class Renderer {
  constructor(canvasRef) {
    this.canvasRef = canvasRef;
  }

  setCameraOrbit(orbit) {
    throw new Error('setCameraOrbit must be implemented by adapter.');
  }

  setCameraTarget(target) {
    throw new Error('setCameraTarget must be implemented by adapter.');
  }

  setFieldOfView(fov) {
    throw new Error('setFieldOfView must be implemented by adapter.');
  }

  setLighting(preset) {
    throw new Error('setLighting must be implemented by adapter.');
  }

  getCameraCoordinates() {
    throw new Error('getCameraCoordinates must be implemented by adapter.');
  }
}
