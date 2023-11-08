import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useGetCryptosQuery } from "../services/cryptoAPI";
//import CryptoCurrencies from "./CryptoCurrencies";
//import News from "./News";
import {CryptoCurrencies , News} from '../components'

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  //console.log(data)
  // Check if data is still loading or undefined
  if (isFetching || !data) {
    return <Loader/>;
  }
  if (data?.error) {
    return `Error: ${data.error.message}`;
  }

  const globalStats = data?.data?.stats;

  // Check if globalStats is defined before accessing properties
  if (!globalStats) {
    return "Data is not available";
  }

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32,32]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={globalStats.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total MarketCap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>

      <div className="home-heading-container">
      <Title level={2} className="home-title">
        Top 10 Cryptocurrencies in the world
      </Title>
      <Title level={3} className="show-more">
        {" "}
        <Link to="/cryptocurrencies">Show more</Link>
      </Title>
    </div>
    <CryptoCurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          {" "}
          <Link to="/News"> Show more</Link>
        </Title>
      </div>
      <News simplified/>
    </>
  );
};

export default Homepage;
