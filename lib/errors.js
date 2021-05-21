//  Some cutom errors for different scenarios


export class NotFound extends Error {
  constructor() {
    super()
    this.name = 'NotFound'
  }
}

export class NotValid extends Error {
  constructor() {
    super()
    this.name = 'NotValid'
  }
}

export class NotUnique extends Error {
  constructor() {
    super()
    this.name = 'NotUnique'
  }
}

export class NotYours extends Error {
  constructor() {
    super()
    this.name = 'NotYours'
  }
}

export class NoMatch extends Error {
  constructor() {
    super()
    this.name = 'NoMatch'
  }
}


export class NoEmailMatch extends Error {
  constructor() {
    super()
    this.name = 'NoEmailMatch'
  }
}