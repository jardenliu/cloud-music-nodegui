import { Text, Window, hot, View } from '@nodegui/react-nodegui'
import React from 'react'
import {
  QIcon,
  WindowType,
  QMainWindow,
  WidgetAttribute
} from '@nodegui/nodegui'
import path from 'path'
import nodeguiIcon from 'assets/nodegui.jpg'
import HomePage from 'pages/home'

const minSize = { width: 1000, height: 670 }
const winIcon = new QIcon(path.resolve(__dirname, nodeguiIcon))

class App extends React.Component {
  private readonly windowRef: React.RefObject<QMainWindow>

  constructor(props: any) {
    super(props)
    this.windowRef = React.createRef<QMainWindow>()
  }
  render() {
    return (
      <Window
        attributes={{ [WidgetAttribute.WA_TranslucentBackground]: true }}
        ref={this.windowRef}
        windowFlags={{
          [WindowType.FramelessWindowHint]: true
          // [WindowType.NoDropShadowWindowHint]: false
        }}
        windowIcon={winIcon}
        windowTitle="网易云音乐"
        minSize={minSize}
        style={windowStyle}
      >
        <View style={containerStyle}>
          <HomePage window={this.windowRef}></HomePage>
        </View>
      </Window>
    )
  }
}

const windowStyle = `
  border-radius: 10px;
`

const containerStyle = `
  flex: 1; 
`

const styleSheet = `
  #welcome-text {
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }

  #step-1, #step-2 {
    font-size: 18px;
    padding-top: 10px;
    padding-horizontal: 20px;
  }
`

export default hot(App)
