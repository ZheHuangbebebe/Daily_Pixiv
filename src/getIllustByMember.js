export function getIllustByMember(id, page){
  return (fetch("https://api.imjad.cn/pixiv/v2/?type=member_illust&id="+id+"page="+page).then(resp=>resp.json()))
}