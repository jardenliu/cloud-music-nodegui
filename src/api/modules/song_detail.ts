import request from 'NeteaseCloudMusicApi/util/request'
import SongDetail, {
  SongDetailQuery
} from 'NeteaseCloudMusicApi/module/song_detail'

export const SongDetailApi = async (query: SongDetailQuery) => {
  let details = await SongDetail(query, request)
  if (details.status === 200 && details.body.code === 200) {
    return details.body.songs
  }
  return []
}
