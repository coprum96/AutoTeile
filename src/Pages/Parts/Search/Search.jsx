import React, { Component } from 'react';
import { MantineProvider, Input, List } from '@mantine/core';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Posts: [],
    };

    this.cancelToken = '';
    this.onIptClick = this.onIptClick.bind(this);
    this.node = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onIptClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onIptClick);
  }

  onIptClick = (e) => {
    if (this.node.current.contains(e.target)) {
      return;
    }
    this.setState({
      Posts: [],
    });
  };

  onLsChange = async (e) => {
    if (this.isReqToken) {
      this.isReqToken.cancel();
    }

    this.isReqToken = axios.CancelToken.source();

    await axios
      .get('https://jsonplaceholder.typicode.com/albums', {
        isReqToken: this.isReqToken.token,
      })
      .then((res) => {
        this.setState({
          Posts: res.data,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          console.log('Could not get');
        }
      });

    let filterSearch = e.target.value.toLowerCase();

    let searchRes = this.state.Posts.filter((e) => {
      let finalRes = e.title.toLowerCase();
      return finalRes.indexOf(filterSearch) !== -1;
    });

    this.setState({
      Posts: searchRes,
    });
  };

  render() {
    return (
      <MantineProvider>
        <div style={{ padding: '30px', fontSize: '25px', margin: 'auto', backgroundColor: "#63759F" }}>
          <Input
            style={{ margin: '15px', fontSize: '30px', marginBottom: '15px' }}
            onClick={this.onIptClick}
            onChange={this.onLsChange}
            type="text"
            placeholder="AutoTeil suchen..."
            ref={this.node}
          />
          <List style={{ fontSize: '16px' }}>
            {this.state.Posts.map((res) => {
              return <List.Item key={res.id}>{res.title}</List.Item>;
            })}
          </List>
        </div>
      </MantineProvider>
    );
  }
}

export default Search;
