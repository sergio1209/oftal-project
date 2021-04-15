import {createConnection} from "typeorm";

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mongodb',
      url: 'mongodb+srv://root:root@cluster0.1odkf.mongodb.net/ophthalmologistDB?retryWrites=true&w=majority',
      logging: true,
      synchronize: true,
      ssl: true,
      useUnifiedTopology: true,
      entities: ['dist/domain/entity/*.js']
    })
  }
]