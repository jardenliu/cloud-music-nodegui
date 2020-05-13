import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import Topbar from 'components/topbar'
import Sidebar from 'components/sidebar'
import Playbar from 'components/playbar'
import { observer } from 'mobx-react'
import { QMainWindow } from '@nodegui/nodegui'
import { isMac } from 'utils/OS'
import Icon from 'components/icon'

import { create } from 'utils/style'

const style = create({
  page: {
    flex: 1
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  routerView: {
    flex: 1,
    borderRight: !isMac ? '1px solid #e1e1e1' : 'none',
    backgroundColor: '#f5f5f5'
  }
})

export interface IProps {
  window: React.RefObject<QMainWindow>
}

const HomePage = observer((props: IProps) => {
  return (
    <View style={style.page}>
      <Topbar window={props.window}></Topbar>
      <View style={style.view}>
        <Sidebar></Sidebar>
        <View style={style.routerView}>
          <Text>router view</Text>
          <Icon icon="remove"></Icon>
        </View>
      </View>
      <Playbar></Playbar>
    </View>
  )
})

export default HomePage
