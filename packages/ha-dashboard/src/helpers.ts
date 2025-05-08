import { minimatch } from 'minimatch'
import { HassEntity } from 'home-assistant-js-websocket'
import { EntityName, useEntity } from '@hakit/core'

const getValidMinimatch = (value: string, pattern: string): boolean => {
    return minimatch(value, pattern)
}

export const getFilterMinimatch = (
    _entities: HassEntity[],
    value: string,
    op: 'INCLUDE' | 'EXCLUDE' = 'INCLUDE',
): HassEntity[] => {
    const _bool = op === 'INCLUDE'

    return _entities.reduce((acc: HassEntity[], _entity: HassEntity) => {
        return getValidMinimatch(_entity.entity_id as EntityName, value) ===
            _bool
            ? [...acc, useEntity(_entity.entity_id as EntityName)]
            : acc
    }, [])
}
