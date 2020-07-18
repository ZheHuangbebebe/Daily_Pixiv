export function getTop(mode, page){
  return (fetch("https://api.imjad.cn/pixiv/v2/?mode="+mode+"&type=rank&page="+page).then(resp=>resp.json()))
}