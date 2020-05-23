import {
  QMainWindow,
  WidgetEventTypes,
  NativeElement,
  QMouseEvent,
  CursorShape,
  QRect
} from '@nodegui/nodegui'
import os from 'os'

declare module '@nodegui/nodegui' {
  export class QMainWindow {
    isResizing: boolean
  }
}

export const CURSOR_MAP: { [key: string]: number } = {
  '-1': CursorShape.ArrowCursor,
  0: CursorShape.SizeVerCursor,
  1: CursorShape.SizeFDiagCursor,
  2: CursorShape.SizeBDiagCursor,
  3: CursorShape.SizeHorCursor,
  4: CursorShape.SizeHorCursor,
  5: CursorShape.SizeVerCursor,
  6: CursorShape.SizeBDiagCursor,
  7: CursorShape.SizeFDiagCursor
}

export const POINTER_STATE = {
  TOP: 0,
  TOP_LEFT: 1,
  TOP_RIGHT: 2,
  LEFT: 3,
  RIGHT: 4,
  BOTTOM: 5,
  BOTTOM_LEFT: 6,
  BOTTOM_RIGHT: 7
}

type StateKey = keyof typeof POINTER_STATE

export const STATE_MAP = Object.keys(POINTER_STATE).reduce(
  (map, key: string) => {
    map[POINTER_STATE[key as StateKey]] = key as StateKey
    return map
  },
  {} as { [key: number]: StateKey }
)

const DEFAULT_OPTIONS = {
  distance: 2,
  force: false
}

type EventHandler = {
  [key in WidgetEventTypes]: any
}

export default class WindowResize {
  win: QMainWindow // target window
  options: typeof DEFAULT_OPTIONS
  poinerState: number = -1

  resizing: boolean = false
  resizeState: number = -1
  winRect: QRect | undefined

  position = {
    x: 0,
    y: 0,
    globalX: 0,
    globalY: 0
  }

  get winWidth() {
    if (!this.win) return 0
    return this.win.geometry().width()
  }

  get winHeight() {
    if (!this.win) return 0
    return this.win.geometry().height()
  }

  get winMinWidth() {
    return this.win.minimumSize().width()
  }

  get winMinHeight() {
    return this.win.minimumSize().height()
  }

  get winMaxWidth() {
    return this.win.maximumSize().width()
  }

  get winMaxHeight() {
    return this.win.maximumSize().height()
  }

  eventHandler: Partial<EventHandler> = {
    [WidgetEventTypes.HoverMove]: this.handleHoverMove.bind(this),
    [WidgetEventTypes.MouseMove]: this.handleMouseMove.bind(this),
    [WidgetEventTypes.MouseButtonRelease]: this.handleMouseRelease.bind(this),
    [WidgetEventTypes.MouseButtonPress]: this.handleMousePress.bind(this)
  }

  constructor(win: QMainWindow, options?: Partial<typeof DEFAULT_OPTIONS>) {
    this.win = win
    this.options = { ...DEFAULT_OPTIONS, ...options } // merge options
    if (os.platform() !== 'darwin' || this.options.force) {
      this.setupEventListener() //  use `@nodegui/plugin-title-bar` instead on darwin
    }
  }

  private setupEventListener() {
    if (!this.win) return
    Object.keys(this.eventHandler).forEach(key => {
      this.win.addEventListener(
        key as WidgetEventTypes,
        this.eventHandler[key as WidgetEventTypes]
      )
    })
  }

  handleMousePress(e: NativeElement | undefined) {
    if (this.poinerState >= 0 && e) {
      this.resizing = true
      this.win.isResizing = true
      this.resizeState = this.poinerState
      const event = new QMouseEvent(e)
      this.winRect = this.win.geometry()
      this.position = {
        x: event.x(),
        y: event.y(),
        globalX: event.globalX(),
        globalY: event.globalY()
      }
    }
  }

  handleMouseMove(e: NativeElement | undefined) {
    if (!this.resizing || !e || !this.winRect) return
    const event = new QMouseEvent(e)

    let { left, width } = this.getHorizontalCoordinate(event)
    let { top, height } = this.getVerticalCoordinate(event)

    this.win.setGeometry(left, top, width, height)
  }

  getHorizontalCoordinate(event: QMouseEvent) {
    let left: number = this.winRect?.left() || 0
    let width: number = this.winRect?.width() || 0

    let isLeft = STATE_MAP[this.resizeState].toLowerCase().match('left')
    let isRight = STATE_MAP[this.resizeState].toLowerCase().match('right')

    if (isLeft) {
      left = event.globalX() - this.position.x
      width = width - (event.globalX() - this.position.globalX)
    }

    if (isRight) {
      width = event.globalX() - this.position.globalX + width
    }

    if (this.isWidthOutOfRange(width)) {
      left = this.win.geometry().left()
      width = this.winWidth
    }
    return { left, width }
  }

  getVerticalCoordinate(event: QMouseEvent) {
    let top: number = this.winRect?.top() || 0
    let height: number = this.winRect?.height() || 0

    let isTop = STATE_MAP[this.resizeState].toLowerCase().match('top')
    let isBottom = STATE_MAP[this.resizeState].toLowerCase().match('bottom')

    if (isTop) {
      top = event.globalY() - this.position.y
      height = height - (event.globalY() - this.position.globalY)
    }

    if (isBottom) {
      height = event.globalY() - this.position.globalY + height
    }

    if (this.isHeightOutOfRange(height)) {
      top = this.win.geometry().top()
      height = this.winHeight
    }
    return { top, height }
  }

  handleMouseRelease(e: NativeElement | undefined) {
    this.resizing = false
    this.win.isResizing = false
  }

  handleHoverMove(e: NativeElement | undefined) {
    if (!e) return
    this.setMousePointerState(e)
    this.setCursor()
  }

  setCursor() {
    if (!this.resizing) {
      this.win.setCursor(CURSOR_MAP[this.poinerState])
    }
  }

  isWidthOutOfRange(width: number) {
    return width > this.winMaxWidth || width < this.winMinWidth
  }

  isHeightOutOfRange(height: number) {
    return height > this.winMaxHeight || height < this.winMinHeight
  }

  setMousePointerState(e: NativeElement) {
    const event = new QMouseEvent(e)
    const { distance } = this.options
    const x = event.x()
    const y = event.y()

    if (x <= distance * 2 && y <= distance * 2) {
      this.poinerState = POINTER_STATE.TOP_LEFT
    } else if (x <= distance * 2 && y >= this.winHeight - distance * 2) {
      this.poinerState = POINTER_STATE.BOTTOM_LEFT
    } else if (x >= this.winWidth - distance * 2 && y <= distance * 2) {
      this.poinerState = POINTER_STATE.TOP_RIGHT
    } else if (
      x >= this.winWidth - distance * 2 &&
      y >= this.winHeight - distance * 2
    ) {
      this.poinerState = POINTER_STATE.BOTTOM_RIGHT
    } else if (x <= distance) {
      this.poinerState = POINTER_STATE.LEFT
    } else if (x >= this.winWidth - distance) {
      this.poinerState = POINTER_STATE.RIGHT
    } else if (y <= distance) {
      this.poinerState = POINTER_STATE.TOP
    } else if (y >= this.winHeight - distance) {
      this.poinerState = POINTER_STATE.BOTTOM
    } else {
      this.poinerState = -1
    }
  }

  public destory() {
    Object.keys(this.eventHandler).forEach(key => {
      this.win.removeEventListener(
        key as WidgetEventTypes,
        this.eventHandler[key as WidgetEventTypes]
      )
    })
  }
}
