import * as React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Table, TableBody, TableCell } from '@material-ui/core';
import ExpandableRow from '../src/expandable-row';


const DetailsPanel = () => <div style={{ width: '100px', height: '100px', backgroundColor: 'green' }}>Details</div>;

storiesOf('ExpandableRow', module)
  .addDecorator(withKnobs)
  .add('ExpandableRow', () => (
    <Table>
      <TableBody>
        <ExpandableRow
          detailsPanel={DetailsPanel}
          expanded={boolean('Expanded', false)}
        >
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
          <TableCell>Cell 3</TableCell>
        </ExpandableRow>
      </TableBody>
    </Table>
  ));
