import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'

const containerStyle = `
  width: 200px;
  border-right: 1px solid #e1e1e1;
`

const Sidebar = observer(() => {
  return (
    <View style={containerStyle}>
      <Text>sidebar</Text>
    </View>
  )
})

export default Sidebar
