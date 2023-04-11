import React, { Component } from 'react';
import { MantineProvider, Input, List } from '@mantine/core';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [],
      searchResults: [],
    };

    this.cancelToken = '';
    this.onIptClick = this.onIptClick.bind(this);
    this.node = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onIptClick);
    this.fetchParts();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onIptClick);
  }

  onIptClick = (e) => {
    if (this.node.current.contains(e.target)) {
      return;
    }
    this.setState({
      searchResults: [],
    });
  };

  onLsChange = async (e) => {
    const searchTerm = e.target.value.toLowerCase();

    let searchRes = this.state.parts.filter((part) => {
      let finalRes = part.name.toLowerCase();
      return finalRes.indexOf(searchTerm) !== -1;
    });

    this.setState({
      searchResults: searchRes,
    });
  };

  async fetchParts() {
    if (this.isReqToken) {
      this.isReqToken.cancel();
    }

    this.isReqToken = axios.CancelToken.source();

    await axios
      .get('/parts', {
        cancelToken: this.isReqToken.token,
      })
      .then((res) => {
        this.setState({
          parts: res.data,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          console.log('Could not get');
        }
      });
  }

  render() {
    return (
      <MantineProvider>
        <div style={{ padding: '30px', fontSize: '25px', margin: 'auto', borderColor: 'blue' }}>
          <Input
            style={{ margin: '15px', fontSize: '30px', marginBottom: '15px' }}
            onClick={this.onIptClick}
            onChange={this.onLsChange}
            type="text"
            placeholder="AutoTeil suchen..."
            ref={this.node}
          />
          <List style={{ fontSize: '16px' }}>
            {this.state.searchResults.map((part) => {
              return <List.Item key={part._id}>{part.name}</List.Item>;
            })}
          </List>
        </div>
      </MantineProvider>
    );
  }
}

export default Search;
