import React, {useState} from "react"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PageHeader, Tag, Button, Statistic, Descriptions, Row, Col, Carousel, Card, Divider, Pagination, Table, Space, Popover } from 'antd';
import { LeftOutlined, RightOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DownloadOutlined, TagsOutlined, FullscreenOutlined } from "@ant-design/icons"
import QueueAnim from 'rc-queue-anim';
import { getWeeklyTop } from "./getWeeklyTop";
import "./dailyTop.css";

const {Meta} = Card

export function DailyCard () {
  const [pic, setPic] = useState([])
  const [init, setInit] = useState(true)
  const [span, setSpan] = useState(4)

  if (init){
    let isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)
    if (isMobile) {
      setSpan(24)
    }
    getWeeklyTop()
      .then(resp=>{
        console.log(resp.illusts)
        let picList = resp.illusts
        for (let i=0;i<picList.length;i++){
          picList[i]["key"] = picList[i]["id"]

        }
        setPic(picList)
      })
    setInit(false)
  }
  console.log(pic)

  const DailyTopPageHeader = () => {
    return (
      <PageHeader
        title="每日热门"
        style={{background:"white", margin:"12px"}}
      >
      </PageHeader>
    )
  }

  const TagsPopover = (props) => {
    const tags = props.tags
    return(
      <Popover overlayStyle={{maxWidth:"300px"}} content={tags.map(tag => {
        let color =  'geekblue';
        return (
          <Tag color={color} key={tag}>
            {tag.name}
          </Tag>
        );
      })}>
        <TagsOutlined key="tags" />
      </Popover>
    )
  }

  const PicCards = () => {
    const cols = []
    console.log(pic)
    pic.forEach(data=>{
    cols.push(
      <Col span={span} key={data.key}
           style={{ height:"auto", display:"inline"}}
      >
      <Card
        hoverable
        cover={<img alt="example" src={data.image_urls.medium.replace("pximg.net", "pixiv.cat")} />}
        actions={[
          <TagsPopover tags={data.tags}/>,
          <FullscreenOutlined key="downloads" onClick={()=>{
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
          }}/>,
        ]}
      >
          <Meta title={data.title} description={<a>{data.user.name}</a>} />
      </Card>
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
        <PicCards/>
      </div>
    )
  }
  return (
    <>
      <DailyTopPageHeader/>
      <DailyTopContent/>
    </>
  )
}