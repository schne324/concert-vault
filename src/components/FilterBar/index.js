import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import debounce from 'debounce';
import './index.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 200,
    color: '#0b132b'
  },
  inputLabel: {
    color: '#3a506b'
  }
});

class FilterBar extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    sort: 'descending',
    filter: '',
    collapse: true
  };

  constructor() {
    super();
    this.update = debounce(this.update, 400);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.update(name, value);
  };

  handleCollapseChange = (e, checked) => {
    this.props.update('collapse', checked);
  };

  update(name, value) {
    this.props.update(name, value);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="FilterBar">
        <div className="FilterBar-row">
          <FormControl className={classes.formControl}>
            <TextField
              select
              label="Sort"
              id="sort"
              name="sort"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.sort}
            >
              <MenuItem value={'descending'}>Descending</MenuItem>
              <MenuItem value={'ascending'}>Ascending</MenuItem>
            </TextField>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="filter"
              name="filter"
              label="Filter"
              className={classes.textField}
              value={this.state.filter}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          </FormControl>
        </div>
        <FormControlLabel
          className="FilterBar-check"
          control={
            <Checkbox
              defaultChecked
              color="default"
              value="collapse"
              name="collapse"
              onChange={this.handleCollapseChange}
            />
          }
          label="Collapse multi-night runs"
        />
      </div>
    );
  }
}

export default withStyles(styles)(FilterBar);
