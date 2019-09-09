import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TableCell, Table, TableBody } from '@material-ui/core';
import ExpandableRow from '../expandable-row';

jest.mock('../expand-indicator', () => ({ expanded }: {expanded: boolean}) => (expanded ? 'Collapse' : 'Expand'));

const inTable = (component: React.ReactNode) => (
  <Table>
    <TableBody>
      {component}
    </TableBody>
  </Table>
);

describe('<ExpandableRow />', () => {
  const DetailsPanel = jest.fn(() => <span>Details</span>);

  it('Should render the children cells in a table row', () => {
    const { container } = render(inTable(
      <ExpandableRow
        detailsPanel={DetailsPanel}
      >
        <TableCell>Cell 1</TableCell>
      </ExpandableRow>,
    ));

    const rows = container.querySelectorAll('tr');
    expect(rows).toHaveLength(1);
    const cells = rows[0].querySelectorAll('td');
    expect(cells).toHaveLength(1);
    expect(cells[0]).toHaveTextContent('Cell 1');
  });

  it('should not render the details panel if not expanded', async () => {
    const { queryByText } = render(inTable(
      <ExpandableRow
        detailsPanel={DetailsPanel}
      >
        <TableCell>Cell 1</TableCell>
      </ExpandableRow>,
    ));

    expect(await queryByText('Details')).toBeNull();
  });

  it('should render the details panel if expanded', async () => {
    const { container } = render(inTable(
      <ExpandableRow
        expanded
        detailsPanel={DetailsPanel}
      >
        <TableCell>Cell 1</TableCell>
        <TableCell>Cell 2</TableCell>
      </ExpandableRow>,
    ));

    const rows = container.querySelectorAll('tr');
    expect(rows).toHaveLength(2);
    const cells = rows[1].querySelectorAll('td');
    expect(cells).toHaveLength(1);
    expect(cells[0]).toHaveTextContent('Details');
    expect(cells[0]).toHaveAttribute('colspan', '2');
  });

  it('should animate the opening of the row', () => {
    const { container } = render(inTable(
      <ExpandableRow
        detailsPanel={DetailsPanel}
      >
        <TableCell>Cell 1</TableCell>
        <TableCell>Cell 2</TableCell>
      </ExpandableRow>,
    ));
  });
});
