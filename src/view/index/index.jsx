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
      '/v2/record/1003472?client_token=1003472_3221225472_1498792166_8f58929327ed89b6cf80bfdb1d0559f2'
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
