import React, { useState } from 'react'
import {
  WidgetEventTypes,
  QMainWindow,
  NativeElement,
  WindowState
} from '@nodegui/nodegui'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'
import topbarEvent from './event'
import { create, createSheet } from 'utils/style'
import { isMac } from 'utils/OS'
import Icon from 'components/icon'

const style = create({
  view: {
    height: 52,
    backgroundColor: '#ff0c0c',
    borderLeft: !isMac ? '1px solid #da0000' : 'none',
    borderRight: !isMac ? '1px solid #da0000' : 'none',
    borderTop: !isMac ? '1px solid #da0000' : 'none',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  right: {}
})

const button = {
  color: '#898989'
}

const buttonHover = {
  color: '#ffffff'
}

const hintStyles = createSheet({
  '#hints': {
    flexDirection: 'row'
  },
  '#minimize-btn': button,
  '#maximize-btn': button,
  '#close-btn': button,
  '#minimize-btn:hover': buttonHover,
  '#maximize-btn:hover': buttonHover,
  '#close-btn:hover': buttonHover
})

export interface IProps {
  window: React.RefObject<QMainWindow>
}

export interface State {
  x: number
  y: number
  isDragging: boolean
}

const Topbar = observer((props: IProps) => {
  const initialState: State = {
    x: 0,
    y: 0,
    isDragging: false
  }

  const store = useState(initialState)
  const event = topbarEvent(store, props)

  const handleMinimize = () => {
    const { window } = props
    window.current?.showMinimized()
  }

  const handleMaximize = (e: NativeElement | undefined) => {
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

  const handleClose = () => {
    const { window } = props
    window.current?.close()
  }

  const hint = (
    <View id="hints" styleSheet={hintStyles}>
      <Icon
        id="minimize-btn"
        icon="remove"
        size={30}
        on={{ [WidgetEventTypes.MouseButtonPress]: handleMinimize }}
      ></Icon>
      <Icon
        id="maximize-btn"
        icon="square"
        on={{ [WidgetEventTypes.MouseButtonRelease]: handleMaximize }}
      ></Icon>
      <Icon
        id="close-btn"
        icon="close"
        size={30}
        on={{ [WidgetEventTypes.MouseButtonPress]: handleClose }}
      ></Icon>
    </View>
  )

  return (
    <View
      id="topbar"
      style={style.view}
      on={{
        [WidgetEventTypes.MouseButtonPress]: event.dragStart,
        [WidgetEventTypes.MouseMove]: event.dragMove,
        [WidgetEventTypes.MouseButtonRelease]: event.dragEnd,
        [WidgetEventTypes.MouseButtonDblClick]: event.dbClick
      }}
    >
      <View id="topbar-left"></View>
      <View id="topbar-right" style={style.right}>
        {isMac ? undefined : hint}
      </View>
    </View>
  )
})

export default Topbar
