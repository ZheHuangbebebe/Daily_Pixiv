export function getWeeklyTop(){
  return (fetch("https://api.imjad.cn/pixiv/v2/?mode=week&type=rank").then(resp=>resp.json()))
}