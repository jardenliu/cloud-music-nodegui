import React, { useState } from 'react'
import { WidgetEventTypes, QMainWindow } from '@nodegui/nodegui'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'
import topbarEvent from './event'

const containerStyle = `
  height: 52px;
  background-color: #ff0c0c;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

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
      style={containerStyle}
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
