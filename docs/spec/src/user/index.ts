import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://a.simplemdm.com/api/v1/devices/{device_id}/users
     * PATTERN: Fetch Child Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'simplemdm_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'simplemdm_user_uses_device',
        sourceType: 'simplemdm_user',
        _class: RelationshipClass.USES,
        targetType: 'simplemdm_device',
      },
    ],
    dependsOn: ['fetch-devices'],
    implemented: true,
  },
];
