import * as MySQLConnector from './database/map.database';
import * as AuthRegister from './controllers/utils/auth.register'

MySQLConnector.init()

AuthRegister.Register("test","dan","12345")