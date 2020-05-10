import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'
import { isMac } from 'utils/OS'
import { create } from 'utils/style'

const style = create({
  view: {
    width: 200,
    borderLeft: !isMac ? '1px solid #e1e1e1' : 'none',
    borderRight: '1px solid #e1e1e1'
  }
})
const Sidebar = observer(() => {
  return (
    <View style={style.view}>
      <Text>sidebar</Text>
    </View>
  )
})

export default Sidebar
