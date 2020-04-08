// store.js
import { createContext, useContext } from 'react'
import { observable, action, configure } from 'mobx'

// 强制使用action
configure({ enforceActions: 'observed' })

// 创建数据由于使用了装饰器 所以使用class声明
class Store {
  @observable count = 0

  // 注意this
  @action
  add = () => {
    this.count += 1
  }

  @action.bound
  reduce() {
    this.count -= 1
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
