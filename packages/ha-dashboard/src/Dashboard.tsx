import { Column, FabCard, EntitiesCardRow, Row, Group } from '@hakit/components';
import { EntityHistoryState, EntityName, useEntity, useHass, useHistory } from '@hakit/core';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';
import { Button, Drawer } from '@mui/material';
import * as R from 'ramda';
import { LineChart } from '@mui/x-charts';
import { minimatch } from 'minimatch';
import { useState } from 'react';

export const getValidMinimatch = (value: string, pattern: string): boolean => {
  return minimatch(value, pattern);
};
export const getFilterMinimatch = (_entities: HassEntity[], value: string, op: 'INCLUDE' | 'EXCLUDE' = 'INCLUDE'): HassEntity[] => {
  const _bool = op === 'INCLUDE';

  return _entities.reduce((acc: HassEntity[], _entity: HassEntity) => {
    return getValidMinimatch(_entity.entity_id as EntityName, value) === _bool ? [...acc, useEntity(_entity.entity_id as EntityName)] : acc;
  }, []);
};

export type EntityFilterObject = {
  entity_id: string;
};

export type EntityFilter = {
  include?: EntityFilterObject;
  exclude?: EntityFilterObject;
};

function Dashboard() {
  const { getAllEntities } = useHass();

  console.log('getAllEntities');
  const [open] = useState({ open: false });
  // const {open}= useState( {'open' :true} )

  const EntityListComponent = (props: EntityFilter) => {
    const entities: HassEntity[] = Object.values(getAllEntities());

    const _entitylistIncluded: HassEntity[] =
      props.include !== undefined ? getFilterMinimatch(entities, props.include.entity_id) : entities;

    const _entitylist: HassEntity[] =
      props.exclude !== undefined ? getFilterMinimatch(_entitylistIncluded, props.exclude.entity_id, 'EXCLUDE') : _entitylistIncluded;

    // const _entitylist: HassEntity[] = getFilterMinimatch(entities, props.pattern);
    return [
      _entitylist.map((_item: HassEntity) => {
        return <EntitiesCardRow entity={_item.entity_id as EntityName} />;
      }),
    ];
  };

  const getSENSORHistory = (sensor_id: EntityName): number[] => {
    const history = useHistory(sensor_id, {
      disable: false,
      significantChangesOnly: true,
      hoursToShow: 48, // defaults to 24
    });
    // Function to get readings every 5 minutes
    const getReadingsEvery5Minutes = (readings: EntityHistoryState[]): EntityHistoryState[] => {
      const fiveMinutesInSeconds = 60 * 60;
      return R.reduce(
        (acc: EntityHistoryState[], reading: EntityHistoryState) =>
          R.isEmpty(acc) || reading.lu - R.last(acc)!.lu >= fiveMinutesInSeconds ? [...acc, reading] : acc,
        [],
        readings
      );
    };
    return getReadingsEvery5Minutes(history.entityHistory).map((item: EntityHistoryState) => {
      return +item.s;
    });
  };

  return (
    <Column fullWidth>
      <Row alignItems='start' cssStyles={ {'background-color':'red'}}>
        <FabCard entity='binary_sensor.120g_powerstrip_status' />
      </Row>
      <Row fullHeight color={'red'}>
        <FabCard entity='light.living_room_lights_switch_1' icon='mdi:couch' onClick={function Ki() {}} service='toggle' />
        <LineChart series={[{ data: getSENSORHistory('sensor.bathroom_hygrometer_humidity') }]} height={300} />
      </Row>
      <h2>Successfully Authenticated!</h2>
      <p>The time below will update automatically from Home Assistant.</p>
      <Column cssStyles={ {'background-color':'red','width': '50%' }} >
        <Group title={'55g'}>
          <EntityListComponent exclude={{ entity_id: '*{light,usb}*' }} include={{ entity_id: 'switch.55*' }} />
        </Group>
        <Group title={'120g'}>
          <Row justifyContent={'end'} alignItems='start' fullWidth>
            <FabCard entity='binary_sensor.120g_powerstrip_status' />
          </Row>

          <EntityListComponent exclude={{ entity_id: '*{light,usb}*' }} include={{ entity_id: 'switch.120*' }} />
        </Group>
      </Column>

      <p>
        The state is You have <b>{Object.keys(getAllEntities()).length}</b> entities to start automating with! Have fun!
      </p>
    </Column>
  );
}

export default Dashboard;
