import { Model, attr } from 'redux-orm';

export class Feature extends Model {
  static modelName = 'Feature';
  static fields = {
    id: attr(),
    name: attr(),
    requireLogin: attr()
  };
  static parse(featureData) {
    const { Link } = this.session;
    const clonedData = {
      ...featureData,
      links: featureData.links.map(link => Link.parse({ ...link, feature: featureData.id }))
    };

    this.upsert(clonedData);
    return clonedData.id;
  }
  toJSON() {
    const data = {
      ...this.ref,
      links: this.links.withModels.map(link => link.toJSON())
    };
    return data;
  }
}

export default Feature;
