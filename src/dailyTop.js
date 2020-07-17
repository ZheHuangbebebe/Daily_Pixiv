import React, {useState} from "react"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PageHeader, Tag, Button, Statistic, Descriptions, Row, Col, Carousel, Card, Divider, Pagination, Table, Space, Popover } from 'antd';
import { LeftOutlined, RightOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons"
import QueueAnim from 'rc-queue-anim';
import { getWeeklyTop } from "./getWeeklyTop";
import "./dailyTop.css";

export function DailyTop () {
  const [pic, setPic] = useState([])
  const [init, setInit] = useState(true)
  if (init){
    getWeeklyTop()
      .then(resp=>{
        console.log(resp.illusts)
        let picList = resp.illusts
        for (let i=0;i<picList.length;i++){
          console.log(picList[i])
          picList[i]["key"] = picList[i]["id"]

        }
        setPic(picList)
      })
    setInit(false)
  }
  console.log(pic)
  const columns = [
    {
      title: 'Img',
      dataIndex: 'img',
      key: 'img',
      render: (_, record) => (
        <img style={{height:"256px"}} src={record.image_urls.medium.replace("pximg.net", "pixiv.cat")}/>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Popover content={<img src={record.image_urls.medium.replace("pximg.net", "pixiv.cat")}/>}>
          <a>{record.title}</a>
        </Popover>),
      fixed: true,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (_, record) => (
        <a>{record.user.name}</a>
      ),
      fixed: true,
    },
    {
      title: 'Tags',
      key: 'picTags',
      dataIndex: 'picTags',
      render: (_, record) => (
        <>
          {record.tags.map(tag => {
            let color =  'geekblue';
            return (
              <Tag color={color} key={tag}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
      fixed: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Dowloads</a>
        </Space>
      ),
      fixed: true,
    },
  ];

  const ImgPopover = () => {
    return null
  }

  const DailyTopPageHeader = () => {
    return (
      <PageHeader
        title="每日热门"
        style={{background:"white", margin:"12px"}}
      >
      </PageHeader>
    )
  }

  const DailyTable = () => {

  }

  const DailyTopContent = () => {
    return (
      <div
      style={{background:"white",margin:"12px", padding:"12px"}}
      >
        <Table columns={columns} dataSource={pic} />
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