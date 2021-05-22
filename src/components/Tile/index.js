import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

const displayDate = str => {
  const d = new Date(str);
  return `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
};
const styles = theme => ({
  tooltip: {
    backgroundColor: '#3a506b',
    color: '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    padding: '10px',
    margin: 0
  }
});

export function Tile({
  concert: { artist, notes, dates, location, venue },
  classes: { tooltip }
}) {
  const isFutureConcert = new Date(dates[0]) > Date.now();

  return (
    <div
      className={`List__item ${isFutureConcert ? 'List__item--future' : ''}`}
    >
      <div className="List__item-head">
        <h2>{artist}</h2>
        <p>{dates.map(displayDate).join(', ')}</p>
      </div>
      <p>
        {venue} - {location}
      </p>
      {notes && notes !== 'n/a' && (
        <Tooltip title={notes} classes={{ tooltip }}>
          <IconButton aria-label="Concert notes" className="List__item-info">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      )}
      {isFutureConcert && <div className="List__item-notice">Future</div>}
    </div>
  );
}

Tile.propTypes = {
  concert: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tile);
