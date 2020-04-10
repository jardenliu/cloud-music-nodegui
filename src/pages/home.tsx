import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import Topbar from 'components/topbar'
import Sidebar from 'components/sidebar'
import Playbar from 'components/playbar'
import { observer } from 'mobx-react'
import { QMainWindow } from '@nodegui/nodegui'

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

export interface IProps {
  window: React.RefObject<QMainWindow>
}

const HomePage = observer((props: IProps) => {
  return (
    <View style={pageStyle}>
      <Topbar window={props.window}></Topbar>
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
