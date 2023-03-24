interface Errors {
  [key: string]: string;
}

export default class FormError extends Error {
  public errors: Errors;

  constructor(errors: Errors) {
    super();
    this.errors = errors;
  }
}
