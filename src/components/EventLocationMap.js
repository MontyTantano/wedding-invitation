import React, { Component } from 'react';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';
import EventLocationMapStyleIgnored from './EventLocationMap.scss';

const defaultState = {
  point: [47.21731, 39.808958],
  center: [47.217296, 39.808351],
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
        <div className="event-location-map__ymaps">
          <YMaps>
            <Map
              defaultState={defaultState}
              instanceRef={instanceRef}
              modules={['control.ZoomControl', 'control.FullscreenControl']}
            >
              <GeoObject
                geometry={{
                  type: 'Point',
                  coordinates: defaultState.point
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
      </div>
    );
  }
}

export default EventLocationMap;
