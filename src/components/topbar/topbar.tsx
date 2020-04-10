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
    y: 0
  }

  const [state, setState] = useState(initialState)

  const dragStart = (e: NativeElement | undefined) => {
    if (!e) return
    const event = new QMouseEvent(e)
    setState({ x: event.x(), y: event.y() })
  }

  const dragMove = (e: NativeElement | undefined) => {
    if (!e) return
    const event = new QMouseEvent(e)
    const moveX = event.globalX() - state.x
    const moveY = event.globalY() - state.y
    props.window.current!.move(moveX, moveY)
  }

  const dragEnd = (e: NativeElement | undefined) => {
    if (!e) return
  }

  const handleDbClick = (e: NativeElement | undefined) => {
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
