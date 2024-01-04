import { envs } from "./envs.plugin";


describe( 'envs.plugin.ts', () => {

  test( 'should return env options', () => {

    expect( envs ).toEqual({
      PORT: 3000,
      PROD: false,
      mailer: {
        SERVICE: 'gmail',
        EMAIL: 'test@gmail.com',
        SECRET_KEY: 'test123456'
      },
      mongo: {
        URL: 'mongodb://chuli:123456789@localhost:27018',
        DB_NAME: 'NOC-TEST'
      }
    });
  });


  test( 'should return an error if not found env', async () => {
    expect.assertions(1);

    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
    } catch (error) {
      expect(`${ error }`).toContain('"PORT" should be a valid integer');
    }
  });

});
