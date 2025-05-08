import { Column, FabCard, EntitiesCardRow, Row, Group, useBreakpoint } from '@hakit/components';
import { EntityHistoryState, EntityName, useIcon, useEntity, useHass, useHistory } from '@hakit/core';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';

import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import { numeric, tg } from '@snailicide/g-library';
import { LineChart } from '@mui/x-charts';
import { minimatch } from 'minimatch';
import { useState } from 'react';
import Form from '@rjsf/mui';
import {getJsonSchema,notification_dispatcher_schema} from "./schemas/api.ts";
import validator from '@rjsf/validator-ajv8';
import { JSONSchema7 } from "json-schema";
import {getFilterMinimatch} from "./helpers.js";

/*<Form
          schema={getJsonSchema(notification_dispatcher_schema,"notification_dispatcher_schema") as JSONSchema7
          }
          validator={validator}

      />,*/
export type EntityFilterObject = {
  entity_id: string;
};

export type EntityFilter = {
  include?: EntityFilterObject;
  exclude?: EntityFilterObject;
};

function Dashboard() {
  const { getAllEntities } = useHass();

  const bp = useBreakpoint();

  //binary_sensor.alert_state_warn_irregular_off
  const testAttr = useEntity('binary_sensor.alert_state_warn_irregular_off')
  console.log("entity", testAttr)
  const icon = useIcon('mdi:home', {
    color: 'red',
    fontSize: 50,
  });
  const EntityListComponent = (props: EntityFilter) => {
    const entities: HassEntity[] = Object.values(getAllEntities());

    const _entitylistIncluded: HassEntity[] =
      props.include !== undefined ? getFilterMinimatch(entities, props.include.entity_id) : entities;

    const _entitylist: HassEntity[] =
      props.exclude !== undefined ? getFilterMinimatch(_entitylistIncluded, props.exclude.entity_id, 'EXCLUDE') : _entitylistIncluded;

    return (
      <>
        {_entitylist.map((_item: HassEntity) => (
          <EntitiesCardRow key={_item.entity_id} entity={_item.entity_id as EntityName} />
        ))}
      </>
    );
  };

  const useSensorHistory = (sensor_id: EntityName): number[] => {
    const history = useHistory(sensor_id, {
      disable: false,
      significantChangesOnly: true,
      hoursToShow: 48, // defaults to 24
    });
    // console.log("----",history.entityHistory)

    const getReadingsEvery5Minutes = (readings: EntityHistoryState[]): number[] => {
      const fiveMinutesInSeconds = 45 * 60;

      const _result: (number)[] = readings
        .reduce<EntityHistoryState[]>((acc, _historyState) => {
          return R.isEmpty(acc) || _historyState.lu - R.last(acc)!.lu >= fiveMinutesInSeconds ? [...acc, _historyState] : acc;
        }, [])
        .map<number | false>(_historyState => {
          const result_val = numeric.parseStringToNumeric(_historyState.s);

          if (
            tg.isNotUndefined<number | bigint>(result_val) &&
            !tg.isBigInt(result_val) &&
            RA.isNotNaN(result_val) &&
            RA.isNumber(result_val)
          ) {
            const _mynum: number = Math.floor(result_val);
            return _mynum;
          } else {
            return false;
          }
        })
        .filter<number>((value: number | false) => {
          return value !== false;
        });

      console.log('myread', _result);
      return _result;
    };
    console.log('read', !history.loading ? getReadingsEvery5Minutes(history.entityHistory) : []);

    return !history.loading ? getReadingsEvery5Minutes(history.entityHistory) : [];
  };
  return (
    <Column fullWidth>
      <Column alignItems='start'>
        <div>BBP{JSON.stringify(bp)}</div>

        <div>hi</div>
        <FabCard entity='binary_sensor.120g_powerstrip_status' />
        <div>{icon}</div>
        <FabCard entity='light.living_room_lights_switch_1' icon='mdi:couch' service='toggle' />
      </Column>
      <Row fullHeight >
        <LineChart series={[{ data: useSensorHistory('sensor.bathroom_hygrometer_humidity') }]} height={300} />
      </Row>

      <Row fullWidth cssStyles={{ border: '1px solid red' }}>
        <Group xxs={6} xs={6} sm={6} md={12} title='55g' cssStyles={{ height: '100%' }}>
          <EntityListComponent exclude={{ entity_id: '*{light,usb}*' }} include={{ entity_id: 'switch.55*' }} />
        </Group>
        <Group xxs={6} xs={6} sm={6} md={12}  title={'120g'} cssStyles={{ height: '100%' }}>
          <Row justifyContent={'end'} alignItems='start' fullWidth>
            <FabCard entity='binary_sensor.120g_powerstrip_status'/>
          </Row>
          <EntityListComponent exclude={{ entity_id: '*{light,usb}*' }} include={{ entity_id: 'switch.120*' }} />
        </Group>
      </Row>
      <p className='bg-orange-900'>
        <h2>Successfully Authenticated!</h2>
        <p>The time below will update automatically from Home Assistant.</p>
        The state is You have <b>{Object.keys(getAllEntities()).length}</b> entities to start automating with! Have fun!
      </p>

    </Column>
  );
}

export default Dashboard;
