import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import Tile from '../Tile';
import FilterBar from '../FilterBar';
import './index.css';

const searchFields = ['artist', 'location', 'venue'];

class List extends Component {
  static propTypes = {
    concerts: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      sort: 'descending',
      filter: '',
      collapse: true,
      displayConcerts: [],
      allConcerts: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setConcerts();
  }

  setConcerts = () => {
    const { filter } = this.state;
    const allConcerts = this.sort(this.props.concerts).reduce((acc, c) => {
      return this.state.collapse
        ? acc.concat(c)
        : acc.concat(
            c.dates.map(date => ({
              ...c,
              dates: [date]
            }))
          );
    }, []);
    const displayConcerts = allConcerts.filter(c => {
      if (!filter) {
        return true;
      }

      return !!searchFields.find(field =>
        c[field].toLowerCase().includes(filter.toLowerCase())
      );
    });

    this.setState({
      loading: false,
      displayConcerts,
      allConcerts
    });
  };

  sort = concerts => {
    return [...concerts].sort((a, b) => {
      switch (this.state.sort) {
        case 'ascending':
          if (new Date(a.dates[0]) > new Date(b.dates[0])) {
            return 1;
          }
          if (new Date(a.dates[0]) < new Date(b.dates[0])) {
            return -1;
          }
          return 0;
        case 'descending':
          if (new Date(a.dates[0]) > new Date(b.dates[0])) {
            return -1;
          }
          if (new Date(a.dates[0]) < new Date(b.dates[0])) {
            return 1;
          }
          return 0;
        default:
          return 0;
      }
    });
  };

  updateFilters = (key, value) => {
    this.setState({ [key]: value }, () => this.setConcerts());
  };

  render() {
    const displayConcerts = this.state.displayConcerts.map((c, i) => (
      <Tile key={`${i}-${c.dates[0]}`} concert={c} />
    ));
    return (
      <main className="List">
        <FilterBar update={this.updateFilters} />
        <p role="status">
          Displaying {displayConcerts.length} of {this.state.allConcerts.length}{' '}
          concerts
        </p>
        <FlipMove className="List__wrap">{displayConcerts}</FlipMove>
      </main>
    );
  }
}

export default List;
