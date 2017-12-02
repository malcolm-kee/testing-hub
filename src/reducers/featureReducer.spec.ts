import 'jest';
import * as deepFreeze from 'deep-freeze';

import featureActionCreators from 'actionCreators/featureActionCreators';

import featureReducer, { State } from './featureReducer';

const oldState: State = {
  byId: ['0z', '100x'],
  byHash: {
    '0z': {
      id: '0z',
      name: 'feature0z',
      links: [
        {
          env: 'prod',
          url: 'test0z.com'
        }
      ],
      requireLogin: false,
      createdBy: 'Malcolm Tee'
    },
    '100x': {
      id: '100x',
      name: 'feature100x',
      links: [
        {
          env: 'uat',
          url: 'uat100x.com'
        }
      ],
      requireLogin: true,
      createdBy: 'Malcolm X'
    }
  }
};
const features = [
  {
    id: '1a',
    name: 'object1a',
    links: [
      {
        env: 'prod',
        url: 'testprod.com'
      }
    ],
    requireLogin: false,
    createdBy: 'Malcolm Kee'
  },
  {
    id: '2b',
    name: 'object2b',
    links: [
      {
        env: 'qa',
        url: 'testqa.com'
      }
    ],
    requireLogin: true,
    createdBy: 'Mkee 2',
    lastUpdatedBy: 'Dududu'
  }
];

test('setFeatures', () => {
  const finalState: State = {
    byId: ['1a', '2b'],
    byHash: {
      '1a': {
        id: '1a',
        name: 'object1a',
        links: [
          {
            env: 'prod',
            url: 'testprod.com'
          }
        ],
        requireLogin: false,
        createdBy: 'Malcolm Kee'
      },
      '2b': {
        id: '2b',
        name: 'object2b',
        links: [
          {
            env: 'qa',
            url: 'testqa.com'
          }
        ],
        requireLogin: true,
        createdBy: 'Mkee 2',
        lastUpdatedBy: 'Dududu'
      }
    }
  };

  deepFreeze(oldState);

  expect(featureReducer(oldState, featureActionCreators.setFeatures(features))).toEqual(finalState);
});

test('addFeature', () => {
  const finalState: State = {
    byId: ['0z', '100x', '1a'],
    byHash: {
      '0z': {
        id: '0z',
        name: 'feature0z',
        links: [
          {
            env: 'prod',
            url: 'test0z.com'
          }
        ],
        requireLogin: false,
        createdBy: 'Malcolm Tee'
      },
      '100x': {
        id: '100x',
        name: 'feature100x',
        links: [
          {
            env: 'uat',
            url: 'uat100x.com'
          }
        ],
        requireLogin: true,
        createdBy: 'Malcolm X'
      },
      '1a': {
        id: '1a',
        name: 'object1a',
        links: [
          {
            env: 'prod',
            url: 'testprod.com'
          }
        ],
        requireLogin: false,
        createdBy: 'Malcolm Kee'
      }
    }
  };

  deepFreeze(oldState);

  expect(featureReducer(oldState, featureActionCreators.addFeature(features[0]))).toEqual(finalState);
});

test('updateFeature', () => {
  const finalState: State = {
    byId: ['0z', '100x'],
    byHash: {
      '0z': {
        id: '0z',
        name: 'featureabc',
        links: [
          {
            env: 'prod',
            url: 'test0z.com'
          }
        ],
        requireLogin: true,
        createdBy: 'Malcolm Tee',
        lastUpdatedBy: 'Malcolm Kee'
      },
      '100x': {
        id: '100x',
        name: 'feature100x',
        links: [
          {
            env: 'uat',
            url: 'uat100x.com'
          }
        ],
        requireLogin: true,
        createdBy: 'Malcolm X'
      }
    }
  };
  const updatedFeature = {
    id: '0z',
    name: 'featureabc',
    links: [
      {
        env: 'prod',
        url: 'test0z.com'
      }
    ],
    requireLogin: true,
    createdBy: 'Malcolm Tee',
    lastUpdatedBy: 'Malcolm Kee'
  };

  deepFreeze(oldState);

  expect(featureReducer(oldState, featureActionCreators.updateFeature(updatedFeature))).toEqual(finalState);
});

test('deleteFeature', () => {
  const finalState: State = {
    byId: ['100x'],
    byHash: {
      '100x': {
        id: '100x',
        name: 'feature100x',
        links: [
          {
            env: 'uat',
            url: 'uat100x.com'
          }
        ],
        requireLogin: true,
        createdBy: 'Malcolm X'
      }
    }
  };

  deepFreeze(oldState);

  expect(featureReducer(oldState, featureActionCreators.deleteFeature('0z'))).toEqual(finalState);
});
