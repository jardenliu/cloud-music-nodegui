import { Window, hot, View } from '@nodegui/react-nodegui'
import React from 'react'
import {
  QIcon,
  WindowType,
  QMainWindow,
  WidgetAttribute,
  NativeElement
} from '@nodegui/nodegui'
import path from 'path'
import nodeguiIcon from 'assets/nodegui.jpg'
import HomePage from 'pages/home'
import { isMac } from 'utils/OS'
import { create, createSheet } from 'utils/style'
import { setTitleBarStyle } from 'nodegui-plugin-mac-title-bar'

const minSize = { width: 1000, height: 670 }
const winIcon = new QIcon(path.resolve(__dirname, nodeguiIcon))

class App extends React.Component {
  private readonly ref: React.RefObject<QMainWindow>

  constructor(props: any) {
    super(props)
    this.ref = React.createRef<QMainWindow>()
  }
  render() {
    return (
      <Window
        attributes={{ [WidgetAttribute.WA_TranslucentBackground]: true }}
        ref={this.ref}
        id="window"
        windowFlags={{
          [WindowType.FramelessWindowHint]: !isMac
          // [WindowType.NoDropShadowWindowHint]: false
        }}
        windowIcon={winIcon}
        windowTitle="网易云音乐"
        minSize={minSize}
        styleSheet={styleSheet}
      >
        <View style={style.container}>
          <HomePage window={this.ref}></HomePage>
        </View>
      </Window>
    )
  }

  componentDidMount() {
    if (isMac) {
      setTitleBarStyle(
        ((this.ref.current as unknown) as { native: NativeElement }).native,
        'hidden'
      )
    }
  }
}

const style = create({
  container: {
    flex: 1
  }
})

const styleSheet = createSheet({
  '#window': {
    borderRadius: 10
  },

  '#step-1, #step-2': {
    paddingTop: 9
  }
})

export default hot(App)
