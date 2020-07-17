export function getDailyTop(page){
  return (fetch("https://api.imjad.cn/pixiv/v2/?mode=day&type=rank&page="+page).then(resp=>resp.json()))
}