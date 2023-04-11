import React, { Component, useRef } from 'react';
import { MantineProvider, Input, List, Button } from '@mantine/core';
import axios from 'axios';
import axiosPrivate from '../../../API/axiosPrivate';
import { API_URL } from '../../../API/rootURL';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [],
      searchResults: [],
      searchTerm: '',
    };

    this.cancelToken = axios.CancelToken.source();
    this.node = React.createRef();
  }

  async componentDidMount() {
    document.addEventListener('mousedown', this.onIptClick);
    try {
      const { data } = await axiosPrivate.get(`${API_URL}parts`);
      this.setState({
        parts: data,
      });
    } catch (error) {
      console.log(error);
    }
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

  onLsChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const searchRes = this.state.parts.filter((part) => {
      const finalRes = part.name.toLowerCase();
      return finalRes.indexOf(searchTerm) !== -1;
    });

    this.setState({
      searchResults: searchRes,
      searchTerm: searchTerm,
    });
  };

  onSearchButtonClick = async () => {
    const searchTerm = this.state.searchTerm;

    try {
      const { data } = await axios.get(`/parts?search=${searchTerm}`, {
        cancelToken: this.cancelToken.token,
      });
      this.setState({
        searchResults: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  render() {
    return (
      <MantineProvider>
        <div style={{ padding: '30px', fontSize: '25px', margin: 'auto', borderColor: 'blue' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              style={{ margin: '15px', fontSize: '30px', marginBottom: '15px', flex: 1 }}
              onClick={this.onIptClick}
              onChange={this.onLsChange}
              type="text"
              placeholder="AutoTeil suchen..."
              ref={this.node}
            />
            <Button style={{ marginLeft: '10px' }} onClick={this.onSearchButtonClick}>
              Suchen
            </Button>
          </div>
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
