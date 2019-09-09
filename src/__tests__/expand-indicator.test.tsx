import React from 'react';
import { render } from '@testing-library/react';
import ExpandIndicator from '../expand-indicator';

describe('<ExpandIndicator>', () => {
  it('should render an expand icon without the expand class', async () => {
    const { container } = render(<ExpandIndicator />);
    const svg = container.querySelector('svg');
    const classes = svg!.className.baseVal.split(' ') as String[];
    expect(classes.find(c => c.includes('expanded'))).toBeUndefined();
  });
  it('should render an expand icon with the expand class', async () => {
    const { container } = render(<ExpandIndicator expanded />);
    const svg = container.querySelector('svg');
    const classes = svg!.className.baseVal.split(' ') as String[];
    expect(classes.find(c => c.includes('expanded'))).toBeDefined();
  });
});
