const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' });

jest.setTimeout(10000);

beforeAll(async () => {
  const uri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/portfolio_test';
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});