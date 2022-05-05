import * as bcrypt from 'bcrypt';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    resolve(data);
  });
};

// export const getDbConnectionOptions = async (connectionName = 'default') => {
//   const options = await getConnectionOptions(
//     process.env.NODE_ENV || 'development'
//   );
//   return {
//     ...options,
//     name: connectionName,
//   };
// };

// export const getDbConnection = async (
//   connectionName = 'default'
// ): Promise<Connection> => {
//   return await getConnection(connectionName);
// };

// export const runDbMigrations = async (
//   connectionName = 'default'
// ): Promise<void> => {
//   const conn = await getDbConnection(connectionName);
//   await conn.runMigrations();
// };

export const comparePasswords = async (
  userPassword,
  currentPassword,
): Promise<boolean> => {
  return await bcrypt.compare(currentPassword, userPassword);
};
