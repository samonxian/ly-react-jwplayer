import React from 'react';
import PageTitle from 'react-mobx-boilerplate-js/libs/decorator/PageTitle';
import JWPlayer from 'src/libs/components/JWPlayer';
import JWMutiplePlayerWithController from 'src/libs/components/JWMutiplePlayerWithController';
import { Button, Input, Spin } from 'antd';
import fetchDecorator from 'src/libs/decorator/fetch';

@fetchDecorator
@PageTitle('主页')
class IndexView extends React.Component {
  state = {};
  changeUrlEvent = e => {
    this.setState({
      url: document.getElementById('input').value
    });
  };
  componentDidMount() {
    this.fetchOne(
      '/v2/record/1003472?client_token=1003472_2147483648_1504425374_506e86a3ebf31e38d2684eef36bbfbcd'
    ).then(data => {
      this.setState({
        data: data
      });
    });
  }
  render() {
    let { url, data } = this.state;
    return (
      <div
        className="padding-all-20"
        style={{
          padding: '20px'
        }}
      >
        {
          !data &&
          <Spin />
        }
        {false &&
          <div>
            <Input id="input" />
            <Button
              type="primary"
              className="mt10 mb10"
              onClick={this.changeUrlEvent}
            >
              切换源
            </Button>
          </div>}
        {url && <JWPlayer url={url} width="100%" />}
        <div
          style={{
            width: '100%'
          }}
        >
          {data &&
            <JWMutiplePlayerWithController
              title="test"
              titles={
                [<span>1</span>,<span>2</span>]
              }
              timeline={true}
              urls={[data.videos,data.videos]}
              splitScreenCount={2}
              gap={20}
            />}
          {data &&
            <JWMutiplePlayerWithController
              timeline={true}
              live={ true }
              urls={['xddd']}
              splitScreenCount={2}
            />}
        </div>
      </div>
    );
  }
}

export default IndexView;
