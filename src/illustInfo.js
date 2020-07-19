import React, {useState} from "react"
import {PageHeader, Button, Descriptions, Avatar, Popover, Tag, Card, Dropdown, Menu, Col, Row} from "antd";
import {TagsOutlined, MoreOutlined} from "@ant-design/icons"
import {getRelatedIllust} from "./getRelatedIllust";

export function IllustInfo(props){
  const data = props.data
  const [page, setPage] = useState(1)
  const [relatedPic, setRelatedPic] = useState([])
  const [init, setInit] = useState(true)
  const num = window.innerWidth>=1500?4:window.innerWidth<=1000?12:6

  if (init){
    getMoreRelatedIllust()
    setInit(false)
  }

  function getMoreRelatedIllust(){
    getRelatedIllust(data.id, page).then(resp=>{
      setPage(page+1)
      setRelatedPic(resp.illusts)
    })
  }

  const tagsRender = () => {
    const tags = data.tags
    return(
      tags.map(tag => {
        let colors = ['blue','geekblue', 'magenta', 'lime', 'green', 'cyan', 'purple', 'gold', 'orange'];
        let color = colors[Math.floor(0.5+Math.random()*colors.length)]
        return (
          <Tag style={{cursor:"pointer"}} draggable color={color} key={tag}>
            {tag.name}
          </Tag>
        );
      })
    )
  }
  console.log(tagsRender())

  const InfoPageHeader = () => {
    const tags = tagsRender()
    return <PageHeader
      style={{background:"white", margin: 12}}
      onBack={() => props.back()}
      title={data.title}
      subTitle={<><Avatar src={data.user.profile_image_urls.medium.replace("pximg.net", "pixiv.cat")}/> {data.user.name}</>}
    >

      <Descriptions column={1}>
        <Descriptions.Item label="创作时间">{data.create_date}</Descriptions.Item>
      </Descriptions>
      <div style={{marginBottom:12}}>
        {tags}
      </div>
      <Descriptions column={1}>
        <Descriptions.Item label="作品描述"><div dangerouslySetInnerHTML={{"__html":data.caption}}/></Descriptions.Item>
      </Descriptions>
    </PageHeader>
  }

  function getOriginalUrl(){
    let url = ""
    if (data.meta_pages.length === 0){
      url = data.meta_single_page.original_image_url.replace("pximg.net", "pixiv.cat")
    }
    else{
      url = data.meta_pages[0].image_urls.original.replace("pximg.net", "pixiv.cat")
    }
    return url
  }

  const InfoContent = () => {
    console.log(getOriginalUrl())
    return (
      <div style={{background:"white", margin: 12, textAlign:"center"}}>
      <img style={{padding:12, width:"100vh"}} onLoad={console.log(1111)} src={getOriginalUrl()}/>
      </div>
      )
  }

  const RelatedIllust = () => {
    console.log(data.id)

    return (
      <div
        style={{background:"white",margin:"12px", padding:"12px"}}
      >
        <div style={{marginBottom:24}}>
        <h1 style={{display:"inline", marginRight:12}}>相关作品</h1>
        <a onClick={getMoreRelatedIllust}>换一批</a>
        </div>
        <PicCards/>
      </div>
    )
  }

  function SingleCard(props){
    const [size, setSize] = useState("medium")
    const data = props.data
    console.log(data)
    return (
      <>
        {/*{size}*/}
        <Card
          hoverable
          id={`card_${data.key}`}
          bodyStyle={{padding:0}}
          cover={<Popover
            content={<div><Avatar src={data.user.profile_image_urls.medium.replace("pximg.net", "pixiv.cat")}/> <a onClick={()=>{
              window.open(window.location.origin+"/member/"+data.user.id,'_blank')

            }}
            >{data.user.name}</a></div>}
            title={<div style={{padding:12}}>{data.title}</div>}
          ><img alt="example" src={data.image_urls[size].replace("pximg.net", "pixiv.cat")} onClick={()=>{
              let link = document.createElement("a")
              let url = ""
              if (data.meta_pages.length === 0){
                url = data.meta_single_page.original_image_url.replace("pximg.net", "pixiv.cat")
              }
              else{
                url = data.meta_pages[0].image_urls.original.replace("pximg.net", "pixiv.cat")
              }
              console.log(url)
              link.href = url
              link.target = "_blank"
              link.click()
            }}/></Popover>}/></>
    )
  }

  function PicCards(){
    const cols = []
    relatedPic.forEach(data=>{
      cols.push(
        <Col  span={num} key={data.key}
             style={{ height:"auto", display:"inline"}}
        >
          <SingleCard data={data}/>
        </Col>
      )
    })
    return (
      <Row gutter={[16, 16]}>
        {cols}
      </Row>
    )
  }

  return (
    <>
    <InfoPageHeader/>
    <InfoContent/>
    <RelatedIllust/>
    </>
  )
}