import { connect } from 'mongoose';


interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}


export class MongoDatabase {

  static async connect( options: ConnectionOptions ) {

    const { mongoUrl, dbName } = options;

    try {
      await connect( mongoUrl, { dbName } );

      console.log('Mongo connected');

    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }

  }

}
