import * as React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import ExpandIndicator from '../src/expand-indicator';

storiesOf('ExpandIndicator', module)
  .addDecorator(withKnobs)
  .add('Indicator', () => (
    <ExpandIndicator expanded={boolean('Expanded', false)} />
  ));
