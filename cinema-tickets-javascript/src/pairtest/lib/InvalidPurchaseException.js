export default class InvalidPurchaseException extends Error {
  constructor() {
    super();
    this.name = 'InvalidPurchaseException';
  }
}
