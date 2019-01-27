import React, { Component } from 'react';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';
import EventLocationMapStyleIgnored from './EventLocationMap.scss';

const mapState = {
  center: [47.21731, 39.808958],
  zoom: 17,
  controls: ['zoomControl', 'fullscreenControl']
};

const instanceRef = ref => ref && ref.behaviors.disable('scrollZoom');

class EventLocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="event-location-map event-location-map_loading">
          ...Загрузка
        </div>
      );
    }

    return (
      <div className="event-location-map">
        <YMaps>
          <Map
            defaultState={mapState}
            instanceRef={instanceRef}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
          >
            <GeoObject
              geometry={{
                type: 'Point',
                coordinates: mapState.center
              }}
              properties={{
                iconContent: 'Усадьба Голициных'
              }}
              options={{
                preset: 'islands#blackStretchyIcon'
              }}
            />
          </Map>
        </YMaps>
      </div>
    );
  }
}

export default EventLocationMap;
