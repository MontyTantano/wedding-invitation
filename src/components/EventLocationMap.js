import React, { Component } from 'react';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';
import EventLocationMapStyleIgnored from './EventLocationMap.scss';

const defaultState = {
  point: [47.21731, 39.808958],
  center: [47.217296, 39.808351],
  zoom: 17,
  controls: ['zoomControl', 'fullscreenControl']
};

const baseClass = 'event-location-map';

class EventLocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      curtainDown: true
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading, curtainDown } = this.state;

    if (loading) {
      return (
        <div className={`${baseClass} ${baseClass}_loading`}>
          <div className={`${baseClass}__ymaps`}>...Загрузка</div>
        </div>
      );
    }

    const curtainClasses = [
      `${baseClass}__curtain`,
      !curtainDown ? `${baseClass}__curtain_disable` : ''
    ].join(' ');

    return (
      <div className={baseClass}>
        <div
          className={curtainClasses}
          role="presentation"
          onClick={() => this.setState({ curtainDown: false })}
        >
          Нажмите чтобы активировать карту
        </div>
        <div className={`${baseClass}__ymaps`}>
          <YMaps>
            <Map
              defaultState={defaultState}
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
