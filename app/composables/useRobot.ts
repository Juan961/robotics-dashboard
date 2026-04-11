


const useRobot = reactive({
  wheelRadius: 0.021,
  wheelDistance: 0.155,
  setRobotParams(wheelRadius: number, wheelDistance: number) {
    this.wheelRadius = wheelRadius
    this.wheelDistance = wheelDistance
  },
  linearVelocity: 0,
  angularVelocity: 0,
  calculateLinearVelocity(distance: number, time: number) {
    return distance / time
  },
  calculateAngularVelocity(angle: number, time: number) {
    return angle / time
  },
  calculateWheelVelocities(linearVelocity: number, angularVelocity: number) {
    const vLeft = (2 * linearVelocity - (angularVelocity * this.wheelDistance)) / 2
    const vRight = (2 * linearVelocity + (angularVelocity * this.wheelDistance)) / 2
    return { vLeft, vRight }
  },
  referenceLeft: 0,
  referenceRight: 0,
  updateReferences(linearVelocity: number, angularVelocity: number) {
    const { vLeft, vRight } = this.calculateWheelVelocities(linearVelocity, angularVelocity)
    this.referenceLeft = vLeft / this.wheelRadius
    this.referenceRight = vRight / this.wheelRadius
  },

})

export default () => useRobot
