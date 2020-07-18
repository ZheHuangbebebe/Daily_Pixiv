export function getIllustBySearchTag(tag, page){
  return (fetch("https://api.imjad.cn/pixiv/v2/?type=search&word="+tag+"&page="+page).then(resp=>resp.json()))
}