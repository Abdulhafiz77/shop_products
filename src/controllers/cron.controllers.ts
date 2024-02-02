// cronJob.ts
import * as cron from 'node-cron';
import { ProductManager } from '../repository';

cron.schedule('0 * * * *', async () => {
  console.log('Running cron job: Deleting expired products');
  try {
    await ProductManager.deleteExpiredProducts;
    console.log('Expired products deleted successfully!');
  } catch (error) {
    console.error('Error deleting expired products:', error);
  }
});