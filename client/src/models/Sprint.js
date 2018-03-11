import { Model, attr } from 'redux-orm';

export class Sprint extends Model {
  static modelName = 'Sprint';
  static fields = {
    id: attr(),
    name: attr(),
    url: attr(),
    desc: attr()
  };

  static parse(sprintData) {
    const { SprintItem } = this.session;
    const clonedData = {
      ...sprintData,
      sprintItems: sprintData.sprintItems.map(item =>
        SprintItem.parse({ ...item, sprint: sprintData.id })
      )
    };
    this.upsert(clonedData);
    return sprintData.id;
  }
}

export default Sprint;
