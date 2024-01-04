import { envs } from "../../../config/plugins";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";


describe('log.model.ts', () => {

  beforeAll( async () => {
    const { URL, DB_NAME } = envs.mongo;

    await MongoDatabase.connect({
      mongoUrl: URL,
      dbName: DB_NAME,
    });
  });

  afterAll( async () => {
    await MongoDatabase.closeConnection();
  });


  test('Should return LogModel', async () => {

    const data = {
      level: 'low',
      message: 'test-message',
      origin: 'log.model.test.ts',
    };

    const log = await LogModel.create( data );

    expect( log ).toEqual( expect.objectContaining({
      ...data,
      createdAt: expect.any(Date),
      id: expect.any(String),
    }));

    await LogModel.findByIdAndDelete( log.id );
  });


  test('Should return the schema object', () => {

    const schema = LogModel.schema.obj;

    expect( schema ).toEqual( expect.objectContaining({
      level: {
        type: expect.any(Function),
        enum: ['low', 'medium', 'high'],
        default: 'low',
      },
      message: {
        type: expect.any(Function),
        require: true,
      },
      origin: {
        type: expect.any(Function),
      },
      createdAt: expect.any(Object),
    }))
  });

});
