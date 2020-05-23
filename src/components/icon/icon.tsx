import React from 'react'
import { Text } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'
import IconMap from './map'

import { create } from 'utils/style'
import { WidgetEventListeners } from '@nodegui/react-nodegui/dist/components/View/RNView'
import { WidgetAttribute } from '@nodegui/nodegui'

const style = create({
  view: {
    fontFamily: 'iconfont'
  }
})

type Icon = keyof typeof IconMap

export interface IProps {
  id?: string
  icon: Icon
  style?: string
  size?: number
  on?: Partial<WidgetEventListeners>
}
// + (prop.style || '')
const Icon = observer((prop: IProps) => {
  const { size = 20, id = '', on = {} } = prop
  const sizeStyle = `font-size: ${size}px;`

  return (
    <Text
      id={id}
      style={style.view + sizeStyle + (prop.style || '')}
      on={on}
      attributes={{ [WidgetAttribute.WA_TransparentForMouseEvents]: false }}
    >
      {IconMap[prop.icon]}
    </Text>
  )
})

export default Icon
