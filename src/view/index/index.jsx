import React from 'react';
import PageTitle from 'react-mobx-boilerplate-js/libs/decorator/PageTitle';
import JWPlayer from 'src/libs/components/JWPlayer';
import JWMutiplePlayerWithController from 'src/libs/components/JWMutiplePlayerWithController';
import { Button, Input } from 'antd';
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
      '/v2/record/1003472?client_token=1003472_0_1498532724_b10773aab9b1bf6046e97a3046c3eca0&begin=1498406400'
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
              timeline={true}
              m3u8List={[data.videos]}
              splitScreenCount={2}
            />}
        </div>
      </div>
    );
  }
}

export default IndexView;
