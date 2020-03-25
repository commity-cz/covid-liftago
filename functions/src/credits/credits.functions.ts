import * as admin from "firebase-admin";

export async function resetDailyCredits() {
  console.info('Resetting daily credits');
  const organizations = await admin.firestore().collection('organizations').get();

  await Promise.all(organizations.docs.map(organizationDoc => {
    const organization = organizationDoc.data() as Organization;
    console.info(`Reset ${organization.name} credits to ${organization.dailyCredits}`);
    return organizationDoc.ref.update('currentCredits', organization.dailyCredits);
  }));

  console.info('Resetting global daily limit');
  const dailyLimitsDoc = admin.firestore().collection('limits').doc('daily');
  await dailyLimitsDoc.update('ridesToday', 0);
}
