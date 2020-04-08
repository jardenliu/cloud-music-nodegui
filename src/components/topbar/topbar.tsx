import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'

const containerStyle = `
  height: 52px;
  background-color: #ff0c0c;
`

const Topbar = observer(() => {
  return (
    <View style={containerStyle}>
      <Text>topbar</Text>
    </View>
  )
})

export default Topbar
