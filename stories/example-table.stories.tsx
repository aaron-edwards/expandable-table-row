import * as React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import {
  Table, TableHead, TableBody, TableCell,
} from '@material-ui/core';
import faker from 'faker';
import ExpandableRow from '../src/expandable-row';

const DetailsPanel = () => <div style={{ width: '100px', height: '100px', backgroundColor: 'green' }}>Details</div>;

const people = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
  const name = faker.name.findName();

  return {
    name,
  };
});

storiesOf('Expandable Row Table', module)
  .addDecorator(withKnobs)
  .add('Example', () => (
    <Table>
      <TableHead>
        <TableCell>Name</TableCell>
      </TableHead>
      <TableBody>
        {
          people.map(p => (
            <ExpandableRow
              detailsPanel={DetailsPanel}
              expanded={boolean('Expanded', false)}
            >
              <TableCell>{p.name}</TableCell>
            </ExpandableRow>
          ))
        }
      </TableBody>
    </Table>
  ));
