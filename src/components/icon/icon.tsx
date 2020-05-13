import React from 'react'
import { Text } from '@nodegui/react-nodegui'
import { observer } from 'mobx-react'
import IconMap from './map'

import { create } from 'utils/style'

const style = create({
  view: {
    fontFamily: 'iconfont'
  }
})

type Icon = keyof typeof IconMap

export interface IProps {
  icon: Icon
  style?: string
  size?: number
}
// + (prop.style || '')
const Icon = observer((prop: IProps) => {
  const { size = 20 } = prop
  const sizeStyle = `font-size: ${size}px;`

  return (
    <Text style={style.view + sizeStyle + (prop.style || '')}>
      {IconMap[prop.icon]}
    </Text>
  )
})

export default Icon
