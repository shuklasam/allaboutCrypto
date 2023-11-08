import React, { useRef, useState } from 'react';
import { Select, Typography, Row, Col, Card, Avatar, Input } from 'antd';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoAPI';

import moment from 'moment';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCssChIOVNbcvd0kPZgdp2zBibJlD40FQKA2jtrI3n3Q&s';


const News = ({ simplified }) => {
  const linkRef = useRef(null); // Create a ref

  const [newsCategory , setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory ,
    count: simplified ? 6 : 12,
  });
  

  if (!cryptoNews?.value) return <Loader/>;

  return (
    <Row gutter={[24, 24]}>

    {!simplified && (
      <Col span={24}>

        <Select 
            showSearch
            className="Select-News"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}      
            filterOption={(input , option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins?.map((currency)=> <Option value={currency.name}>{currency.name}</Option>)}
            </Select>
      </Col>
    )}

      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel="noreferrer" ref={linkRef}>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img style={{maxWidth:'200px' , maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage } alt ="" />
              </div>
              <p>
                  {news.description.length > 100 
                    ? `${news.description.substring(0,100)}...`
                    : news.description
                  }
              </p>
              <div className='provider-container'>
                  <div>
                  <Avatar src = {news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
