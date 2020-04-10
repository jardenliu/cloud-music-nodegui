import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'

const containerStyle = `
  height: 48px;
  border-top: 1px solid #e1e1e1;
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

const Playbar = observer(() => {
  return (
    <View style={containerStyle}>
      <Text>playbar</Text>
    </View>
  )
})

export default Playbar
