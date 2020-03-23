import {Change, EventContext} from "firebase-functions/lib/cloud-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import * as R from 'ramda';
import * as admin from "firebase-admin";

export function onOrganizationWrite(change: Change<DocumentSnapshot>, context: EventContext) {
  const organizationId = context.params.organizationId;
  const oldUsers = change.before.data()?.users as string[] || [];
  const newUsers = change.after.data()?.users as string[] || [];

  console.info(`Organization write: ${organizationId}`);
  console.info(`Users before: ${oldUsers}`);
  console.info(`Users after: ${newUsers}`);

  const removedUsers = R.difference(oldUsers, newUsers);
  const addedUsers = R.difference(newUsers, oldUsers);

  console.info(`Removed users: ${removedUsers}`);
  console.info(`Added users: ${addedUsers}`);

  return Promise.all([
    removeUsersFromOrganization(removedUsers),
    addUsersToOrganization(organizationId, addedUsers)
  ]);
}

function removeUsersFromOrganization(usersToRemove: string[]) {
  return Promise.all(
    usersToRemove.map(user => {
      admin.auth().setCustomUserClaims(user, {organization: null})
        .catch(e => console.error(`Failed to remove organization from user claim, userId ${user}`, e));
    })
  );
}

function addUsersToOrganization(organizationId: string, usersToAdd: string[]) {
  return Promise.all(
    usersToAdd.map(user => {
      admin.auth().setCustomUserClaims(user, {organization: organizationId})
        .catch(e => console.error(`Failed to add organization to user claim, userId ${user}`, e));
    })
  );
}
