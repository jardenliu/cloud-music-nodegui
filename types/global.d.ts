declare interface NodeModule {
  // fixed webpack hot module injection
  hot?: {
    _acceptedDependencies: {
      [key: string]: () => any
    }
    _declinedDependencies: {
      [key: string]: any
    }
    _selfAccepted: boolean
    _selfDeclined: boolean
    _disposeHandlers: any[]
    _main: boolean
    active: boolean
    accept: (dep, callback?) => void
    decline: (dep?) => void
    dispose: (callback) => void
    addDisposeHandler: (callback) => void
    removeDisposeHandler: (callback) => void
    check: (apply) => Promise<any>
    apply: (options) => Promise<any>
    status: (l) => any
    addStatusHandler: (callback) => void
    removeStatusHandler: (callback) => void
    data: any
  }
}

declare interface NodeRequire {
  context: any
}
