import { create as _create } from './style'
export { units } from './units'

type Styles = Parameters<typeof _create>[0][string]

interface ExtraStyles {
  border: string
  borderLeft: string
  borderRight: string
  borderTop: string
  borderBottom: string
}
type ArgTypes = {
  [key: string]: Partial<Styles | ExtraStyles>
}

// | { [key: string]: Partial<ExtraStyles> }

type ReturnTypes = ReturnType<typeof _create>

export function create(arg: ArgTypes): ReturnTypes {
  return _create(arg as any)
}

export function createSheet(arg: ArgTypes): string {
  let result = ''
  const styles = create(arg)
  Object.keys(styles).forEach(key => {
    const style = styles[key]
    result += `
              ${key} {
                  ${style}
              }
          `
  })
  return result
}
