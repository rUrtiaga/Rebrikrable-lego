import * as React from 'react';
import renderer from 'react-test-renderer';

import { LegoButton } from '../LegoButton';

it(`Lego-Button renders correctly`, () => {
  const tree = renderer.create(<LegoButton title='this is a title' onPress={()=>{}}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
