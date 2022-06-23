import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Steps, Relationships } from '../constants';
import { createUserEntity, createDeviceUserRelationship } from './converter';

export async function fetchUsers({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.DEVICE._type },
    async (deviceEntity) => {
      await apiClient.iterateUsers(deviceEntity.id as string, async (user) => {
        const userEntity = await jobState.addEntity(createUserEntity(user));

        await jobState.addRelationship(
          createDeviceUserRelationship(deviceEntity, userEntity),
        );
      });
    },
  );
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USERS,
    name: 'Fetch Users',
    entities: [Entities.USER],
    relationships: [Relationships.DEVICE_HAS_USER],
    dependsOn: [Steps.DEVICES],
    executionHandler: fetchUsers,
  },
];
