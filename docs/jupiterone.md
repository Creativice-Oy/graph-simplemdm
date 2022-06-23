# Datastax Astra Integration with JupiterOne

## Datastax Astra + JupiterOne Integration Benefits

- Visualize Datastax Astra organization, users, roles, databases, and access
  lists in the JupiterOne graph.
- Map Datastax Astra users to employees in your JupiterOne account.
- Monitor changes to Datastax Astra databases and users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users, roles, databases, and access lists from
  Datastax Astra to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Datastax Astra supports token authorization.
- JupiterOne requires a TOKEN key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Datastax Astra

1. In the dashboard, click on Current Organization > Organization Settings
2. Go to Role Management > Add Custom Role and create a role
3. Set the name of the custom role
4. Check the following roles:

   - View DB
   - Read IP Access List
   - Read User
   - Read Organization
   - Read Custom Role

5. Enable "Apply permissions to all databases in this organization"
6. Click Create Role
7. Go to Token Management
8. Under Select Role, click the role you created
9. Save the details.

### In JupiterOne

TODO: List specific actions that must be taken in JupiterOne. Many of the
following steps will be reusable; take care to be sure they remain accurate.

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Datastax Astra** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Datastax Astra
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- {{additional provider-specific settings}} Enter the **Datastax Astra API Key**
  generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Datastax Astra** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources   | Entity `_type`          | Entity `_class` |
| ----------- | ----------------------- | --------------- |
| Account     | `simplemdm_account`     | `Account`       |
| Application | `simplemdm_application` | `Application`   |
| Device      | `simplemdm_device`      | `Device`        |
| User        | `simplemdm_user`        | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`   |
| --------------------- | --------------------- | ----------------------- |
| `simplemdm_account`   | **HAS**               | `simplemdm_application` |
| `simplemdm_account`   | **HAS**               | `simplemdm_device`      |
| `simplemdm_device`    | **HAS**               | `simplemdm_user`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
