import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Steps, Relationships } from '../constants';
import {
  createDatabaseEntity,
  createAccountDeviceRelationship,
} from './converter';

export async function fetchDevices({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const organizationEntity = (await jobState.getData(
    ACCOUNT_ENTITY_KEY,
  )) as Entity;

  await apiClient.iterateDatabases(async (database) => {
    const databaseEntity = await jobState.addEntity(
      createDatabaseEntity(database),
    );

    await jobState.addRelationship(
      createAccountDeviceRelationship(organizationEntity, databaseEntity),
    );
  });
}

export const deviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DEVICES,
    name: 'Fetch Devices',
    entities: [Entities.DEVICE],
    relationships: [Relationships.ACCOUNT_HAS_DEVICE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchDevices,
  },
];
