import React, { useState } from 'react'
import {
  WidgetEventTypes,
  WindowState,
  NativeElement,
  QMouseEvent,
  QMainWindow
} from '@nodegui/nodegui'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'
const OSUtils = require('node-os-utils')

const containerStyle = `
  height: 52px;
  background-color: #ff0c0c;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

export interface IProps {
  window: React.RefObject<QMainWindow>
}

const Topbar = observer((props: IProps) => {
  const initialState = {
    x: 0,
    y: 0,
    isDragging: false
  }

  const [state, setState] = useState(initialState)

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
    if (
      windowState === WindowState.WindowMaximized &&
      OSUtils.os.platform() !== 'darwin'
    ) {
      current.showNormal()
      const halfWidth = current.geometry().width() / 2
      const moveX = event.x() - halfWidth
      const moveY = 0
      setState({ x: halfWidth, y: event.y(), isDragging: true })
      return current.move(moveX, moveY)
    }

    const moveX = event.globalX() - state.x
    const moveY = event.globalY() - state.y
    current.move(moveX, moveY)
  }

  const dragEnd = (e: NativeElement | undefined) => {
    if (!e) return
    setState({ ...state, isDragging: false })
  }

  const handleDbClick = (e: NativeElement | undefined) => {
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

  return (
    <View
      style={containerStyle}
      on={{
        [WidgetEventTypes.MouseButtonPress]: dragStart,
        [WidgetEventTypes.MouseMove]: dragMove,
        [WidgetEventTypes.MouseButtonRelease]: dragEnd,
        [WidgetEventTypes.MouseButtonDblClick]: handleDbClick
      }}
    >
      <Text>topbar</Text>
    </View>
  )
})

export default Topbar
