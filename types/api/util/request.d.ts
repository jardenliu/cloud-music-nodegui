declare module 'NeteaseCloudMusicApi/util/request' {
  export interface CustomObject {
    [key: string]: any
  }

  export type Method = 'POST' | 'GET' | 'DELETE' | 'OPTIONS' | 'PUT'
  export interface RequestData extends CustomObject {}
  export interface RequestOption {
    ua?: string
    cookie?: CustomObject | string
    crypto: 'weapi' | 'eapi' | 'linuxapi'
    url?: string
    proxy?: string
  }

  export interface ResponceData {
    state: number | string
    body: CustomObject | any
    cookie?: CustomObject | string
  }

  export function request(
    method: Method,
    url: string,
    data: RequestData,
    options: RequestOption
  ): Promise<ResponceData>

  export type Request = typeof request

  export default request
}
