import { Model, attr, fk } from 'redux-orm';

export class SprintItem extends Model {
  static modelName = 'SprintItem';
  static fields = {
    id: attr(),
    scenarioId: attr(),
    desc: attr(),
    name: attr(),
    status: attr(),
    feature: fk('Feature', 'sprintItems'),
    sprint: fk('Sprint', 'sprintItems')
  };

  static parse(sprintItemData) {
    const { featureId, ...restProps } = sprintItemData;
    const clonedData = {
      ...restProps,
      feature: featureId
    };
    this.upsert(clonedData);
    return sprintItemData.id;
  }
}

export default SprintItem;
