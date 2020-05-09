import { QMouseEvent, NativeElement, WindowState } from '@nodegui/nodegui'
import { IProps, State } from './topbar'
import { isMac, isLinux, isWin } from 'utils/OS'
import { Dispatch, SetStateAction } from 'react'

type Store = [State, Dispatch<SetStateAction<State>>]

export default function TopbarEvent(store: Store, props: IProps) {
  const [state, setState] = store

  const dragStart = (e: NativeElement | undefined) => {
    if (!e) return

    const event = new QMouseEvent(e)
    setState({ x: event.x(), y: event.y(), isDragging: true })
  }

  const dragMove = (e: NativeElement | undefined) => {
    const { current } = props.window
    if (!e || !current || !state.isDragging) return
    const event = new QMouseEvent(e)
    const windowState = current.windowState()
    if (windowState === WindowState.WindowMaximized && !isMac()) {
      current.showNormal()

      if (isLinux()) {
        setTimeout(() => {
          const halfWidth = current.geometry().width() / 2
          const moveX = event.x() - halfWidth
          const moveY = 0
          setState({ x: halfWidth, y: event.y() + 25, isDragging: true })
          return current.move(moveX, moveY)
        })
        return
      }

      if (isWin()) {
        const halfWidth = current.geometry().width() / 2
        const moveX = event.x() - halfWidth
        const moveY = 0
        setState({ x: halfWidth, y: event.y(), isDragging: true })
        return current.move(moveX, moveY)
      }
    }

    const moveX = event.globalX() - state.x
    const moveY = event.globalY() - state.y
    current.move(moveX, moveY)
  }

  const dragEnd = (e: NativeElement | undefined) => {
    if (!e) return
    setState({ ...state, isDragging: false })
  }

  const dbClick = (e: NativeElement | undefined) => {
    if (!e) return
    const { current } = props.window
    if (!current) return
    const windowState = current.windowState()

    if (windowState === WindowState.WindowMaximized) {
      current.showNormal()
    }

    if (windowState === WindowState.WindowNoState) {
      current.showMaximized()
    }
  }

  return {
    dragStart,
    dragMove,
    dragEnd,
    dbClick
  }
}
