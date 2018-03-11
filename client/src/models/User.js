import { Model, attr } from 'redux-orm';

export class User extends Model {
  static modelName = 'User';
  static fields = {
    id: attr(),
    name: attr(),
    email: attr(),
    isAdmin: attr(),
    verified: attr()
  };
}

export default User;
