// source prop should have 'data' property with geoJSON, or 'source' property with URL to geojson

import React from 'react';
import PropTypes from 'prop-types';

class GeoJsonSource extends React.Component {

  componentWillMount() {
    this.map = this.props.map.mapObject;
    // fetch data if necessary, add layer to map
    if (!this.props.source.data) {
      this.fetchData();
    } else {
      this.data = this.props.source.data;
      this.addSource();
    }
  }

  componentWillReceiveProps(nextProps) {
    // compare sql
    if (!(nextProps.source.data === this.props.source.data)) {
      this.data = nextProps.source.data;
      this.map.getSource(this.props.source.id).setData(this.data);
    }
  }

  fetchData() {
    const self = this;

    $.getJSON(this.props.source.source) // eslint-disable-line no-undef
      .then((data) => {
        self.data = data;
        self.addSource();
      });
  }

  addSource() {
    this.map.addSource(this.props.source.id, {
      type: 'geojson',
      data: this.data,
    });

    this.props.onLoaded(this.map.getStyle().sources);
  }

  render() {
    return null;
  }
}

GeoJsonSource.propTypes = {
  map: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  onLoaded: PropTypes.func.isRequired,
};

export default GeoJsonSource;
