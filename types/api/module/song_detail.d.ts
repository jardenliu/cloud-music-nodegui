declare module 'NeteaseCloudMusicApi/module/song_detail' {
  import { Request, ResponceData } from 'NeteaseCloudMusicApi/util/request'
  export interface SongDetailQuery {
    ids: string
    proxy?: string
    cookie?: string
  }

  export interface SongDetail {
    name: string
    id: number
    pst: number
    t: number
    ar: any[]
    alia: any[]
    pop: number
    st: number
    rt: string
    fee: number
    v: number
    crbt: null
    cf: string
    al: {
      id: number
      name: string
      picUrl: string
      tns: any[]
      pic: number
    }
    dt: number
    h: { br: number; fid: number; size: number; vd: number }
    m: { br: number; fid: number; size: number; vd: number }
    l: { br: number; fid: number; size: number; vd: number }
    a: null
    cd: string
    no: number
    rtUrl: null
    ftype: number
    rtUrls: any[]
    djId: number
    copyright: number
    s_id: number
    mark: number
    originCoverType: number
    mv: number
    rtype: number
    rurl: null
    mst: number
    cp: number
    publishTime: number
  }

  export interface Privilege {
    id: number
    fee: number
    payed: number
    st: number
    pl: number
    dl: number
    sp: number
    cp: number
    subp: number
    cs: boolean
    maxbr: number
    fl: number
    toast: boolean
    flag: number
    preSell: boolean
    playMaxbr: number
    downloadMaxbr: number
  }

  export interface SongDetailResponce extends ResponceData {
    status: number
    body: {
      code: number
      privileges: Privilege[]
      songs: SongDetail[]
    }
    cookie: string[]
  }

  export default function SongDetailApi<
    S extends SongDetailQuery,
    T extends Request
  >(query: S, request: T): Promise<SongDetailResponce>
}
