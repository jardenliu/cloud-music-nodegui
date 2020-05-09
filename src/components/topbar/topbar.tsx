import React, { useState } from 'react'
import { WidgetEventTypes, QMainWindow } from '@nodegui/nodegui'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'
import topbarEvent from './event'
import { create } from 'utils/style'

const style = create({
  view: {
    height: 52,
    backgroundColor: '#ff0c0c',
    borderLeft: '1px solid #da0000',
    borderRight: '1px solid #da0000',
    borderTop: '1px solid #da0000',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
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
      <Text>topbar</Text>
    </View>
  )
})

export default Topbar
