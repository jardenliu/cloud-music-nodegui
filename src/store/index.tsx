// store.js
import { createRef } from 'react'
import { createContext, useContext } from 'react'
import { observable, action, configure } from 'mobx'
import { QMainWindow } from '@nodegui/nodegui'

// 强制使用action
configure({ enforceActions: 'observed' })

// 创建数据由于使用了装饰器 所以使用class声明
class Store {
  @observable mainWindow: React.RefObject<QMainWindow> = createRef<
    QMainWindow
  >()

  // 注意this
  @action
  setMainWindow = (window: React.RefObject<QMainWindow>) => {
    this.mainWindow = window
  }
}

// 创建context
const storesContext = createContext({
  store: new Store()
})

// 其他组件获取store
export const useStores = () => {
  return useContext(storesContext)
}
