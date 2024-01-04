import { MongoDatabase } from './init';


describe( 'Init MongoDB', () => {

  afterAll( MongoDatabase.closeConnection );


  test( 'Shoul connect to MongoDB', async () => {
    expect.assertions(0);

    try {
      await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: process.env.MONGO_URL!,
      });

    } catch (error) {
      expect(true).toBe(true);
    }
  });


  test( 'Should throw an error', async () => {
    expect.assertions(1);

    try {
      await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://test:test@testhost:27017',
      });

    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});
