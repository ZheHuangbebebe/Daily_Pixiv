import React, {useState} from "react"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PageHeader, Tag, Button, Statistic, Switch, Row, Col, Carousel, Card, Divider, Pagination, Table, Space, Popover, Avatar, Select, Dropdown, Menu } from 'antd';
import { LeftOutlined, RightOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DownloadOutlined, TagsOutlined, FullscreenOutlined, ExpandAltOutlined, MoreOutlined } from "@ant-design/icons"
import { getTop } from "./getTop";
import Layout from "./Layout"
import "./dailyTop.css";
import {getIllustByMember} from "./getIllustByMember";
import {getIllustBySearchTag} from "./getIllustBySearchTag";
import {IllustInfo} from "./illustInfo"
import {getRelatedIllust} from "./getRelatedIllust"

const {Meta} = Card
const { Option } = Select;

export function DailyCard (props) {
  console.log(window.location)
  let params = {}
  if(props.hasOwnProperty("params")){
    params = props.params
  }
  const num = window.innerWidth>=1500?4:window.innerWidth<=1000?12:6
  const [mode, setMode] = useState("day")
  const [checked, setChecked] = useState(true)
  const [pic, setPic] = useState([])
  const [init, setInit] = useState(true)
  const [span, setSpan] = useState(num)
  const [page, setPage] = useState(1)
  const [illust, setIllust] = useState()
  const isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)
  window.addEventListener('resize', ()=>{
    setSpan(window.innerWidth>=1500?4:window.innerWidth<=1000?12:6)
  });
  if (init){
    if (isMobile) {
      setSpan(24)
    }
    renderPic(1, mode)
    setInit(false)
  }
  function renderPic(page, mode){
    setPage(page)
    if(params.hasOwnProperty("member")){
      getIllustByMember(props.params.member, page)
      .then(resp=>{
        let picList = resp.illusts
        for (let i=0;i<picList.length;i++){
          picList[i]["key"] = picList[i]["id"]
        }
        setPic(picList)
      })
      console.log("span: ",span)
    }
    else if(params.hasOwnProperty("tag")){
      getIllustBySearchTag(props.params.tag, page)
      .then(resp=>{
        let picList = resp.illusts
        let spanDict = {}
        for (let i=0;i<picList.length;i++){
          picList[i]["key"] = picList[i]["id"]
        }
        setPic(picList)
      })
    }
    else{
      getTop(mode, page)
      .then(resp=>{
        console.log(resp.illusts)
        let picList = resp.illusts
        let spanDict = {}
        for (let i=0;i<picList.length;i++){
          picList[i]["key"] = picList[i]["id"]
        }
        setPic(picList)
      })
    }

  }


  const TagsPopover = (props) => {
    const tags = props.tags
    return(
      <Popover overlayStyle={{maxWidth:"400px"}} content={tags.map(tag => {
        let colors = ['blue','geekblue', 'magenta', 'lime', 'green', 'cyan', 'purple', 'gold', 'orange'];
        let color = colors[Math.floor(0.5+Math.random()*colors.length)]
        return (
          <Tag style={{cursor:"pointer"}} draggable color={color} key={tag} onClick={()=>{
            window.open(window.location.origin+"/tag/"+tag.name,'_blank')
          }}>
            {tag.name}
          </Tag>
        );
      })}>
        <TagsOutlined key="tags" />
      </Popover>
    )
  }

  function SingleCard(props){
    const [size, setSize] = useState("medium")
    const data = props.data
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
        ><img onClick={()=>{setIllust(data)}} alt="example" src={data.image_urls[size].replace("pximg.net", "pixiv.cat")} /></Popover>}
        actions={[
          <TagsPopover tags={data.tags}/>,
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="1" onClick={()=>{setSize("medium")}}>普通</Menu.Item>
              <Menu.Item key="2" onClick={()=>{setSize("large")}}>高清</Menu.Item>

            </Menu>
          } placement="bottomCenter">
            <MoreOutlined/>
          </Dropdown>,
          // <Popover content="原图预览"><FullscreenOutlined key="downloads" onClick={()=>{
          //   let link = document.createElement("a")
          //   let url = ""
          //   if (data.meta_pages.length === 0){
          //     url = data.meta_single_page.original_image_url.replace("pximg.net", "pixiv.cat")
          //   }
          //   else{
          //     url = data.meta_pages[0].image_urls.original.replace("pximg.net", "pixiv.cat")
          //   }
          //   console.log(url)
          //   link.href = url
          //   link.target = "_blank"
          //   link.click()
          // }}/></Popover>,
        ]}
      /></>
    )
  }

  function PicCards(){
    const cols = []
    pic.forEach(data=>{
    cols.push(
      <Col span={span} key={data.key}
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

  const DailyTopContent = () => {
    return (
      <div
        style={{background:"white",margin:"12px", padding:"12px"}}
      >
        <div style={{marginBottom:24}}>
        {Object.keys(params).length === 0?<RankButton/>:<></>}
        <PicSize/>
        </div>
        <PicCards/>
        <Pagination style={{textAlign:"center"}} current={page} showSizeChanger={false} total={600} defaultPageSize={30} onChange={(p)=>{
          console.log(p)
          renderPic(p)
        }}/>
      </div>
    )
  }

  // const Title = (props) => {
  //   return (
  //     <PageHeader title={props.content} style={{background:"white",margin:"12px", padding:"12px"}}/>
  //     )
  // }

  const PicSize = () => {
    return (
      <>
      <h3 style={{display:"inline", marginRight:12, marginTop:"12px"}}>尺寸:</h3>
      <Switch
        checked={checked}
        checkedChildren="标准"
        unCheckedChildren="原图"
        onChange={(checked)=>{
          console.log(checked)
          setChecked(checked)
          setSpan(checked?num:0)
        }}
      />
      </>
    )
  }

  const RankButton = () => {
    return(
      <div style={{ display:"inline"}}>
        <h2 style={{display:"inline"}}><b>排行榜: </b></h2>
      <Select size="large"defaultValue={mode} style={{ width: 120 }} bordered={false} onChange={(v)=>{
        setMode(v)
        console.log(v)
        renderPic(1, v)
      }}>
        <Option value="day">日榜</Option>
        <Option value="week" >周榜</Option>
        <Option value="month">月榜</Option>
        <Option value="week_rookie">新人榜</Option>
        <Option value="week_original">原创榜</Option>
        <Option value="day_male">男性向</Option>
        <Option value="day_female">女性向</Option>
      </Select>
      </div>
    )
  }

  return (
    <>
      {/*{Object.keys(params).length === 0?<></>:params.member!==undefined?<Title content={params.member}/>:<Title content={params.tag}/>}*/}
      {illust === undefined?
        <DailyTopContent/>:
        <IllustInfo data={illust} back={setIllust}/>
      }
    </>
  )
}