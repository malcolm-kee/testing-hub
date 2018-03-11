import { ORM } from 'redux-orm';

import { Feature } from './Feature';
import { Link } from './Link';
import { Sprint } from './Sprint';
import { SprintItem } from './SprintItem';
import { User } from './User';

const oriOrm = new ORM();
oriOrm.register(Feature, Link, Sprint, SprintItem, User);

export const orm = oriOrm;

export default orm;
