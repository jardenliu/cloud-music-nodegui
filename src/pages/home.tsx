import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'

const HomePage = observer(() => {
  return (
    <View>
      <Text>Home Page</Text>
    </View>
  )
})

export default HomePage
