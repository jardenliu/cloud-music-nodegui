import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'

import { create } from 'utils/style'

const style = create({
  view: {
    height: 48,
    backgroundColor: '#fff',
    border: '1px solid #e1e1e1',
    borderTop: '2px solid #e1e1e1',
    borderBottom: '2px solid #e1e1e1',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
})

const Playbar = observer(() => {
  return (
    <View style={style.view}>
      <Text>playbar</Text>
    </View>
  )
})

export default Playbar
