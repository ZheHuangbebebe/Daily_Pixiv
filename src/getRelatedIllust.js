export function getRelatedIllust(id, page){
  return (fetch("https://api.imjad.cn/pixiv/v2/?type=related&id="+id+"&page="+page).then(resp=>resp.json()))
}