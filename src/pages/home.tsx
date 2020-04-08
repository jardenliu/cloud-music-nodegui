import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import Topbar from 'components/topbar'
import Sidebar from 'components/sidebar'
import Playbar from 'components/playbar'
import { observer } from 'mobx-react'

const pageStyle = `
  flex: 1;
`

const containerStyle = `
  flex: 1;
  flex-direction: row;
`

const routerViewStyle = `
  flex: 1;
  background-color: #f5f5f5;
`

const HomePage = observer(() => {
  return (
    <View style={pageStyle}>
      <Topbar></Topbar>
      <View style={containerStyle}>
        <Sidebar></Sidebar>
        <View style={routerViewStyle}>
          <Text>router view</Text>
        </View>
      </View>
      <Playbar></Playbar>
    </View>
  )
})

export default HomePage
