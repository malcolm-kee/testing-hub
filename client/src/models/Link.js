import { Model, attr, fk } from 'redux-orm';

export class Link extends Model {
  static get modelName() {
    return 'Link';
  }
  static get fields() {
    return {
      id: attr(),
      env: attr(),
      url: attr(),
      feature: fk('Feature', 'links')
    };
  }
  static parse(linkData) {
    this.upsert(linkData);
    return linkData.id;
  }
}

export default Link;
