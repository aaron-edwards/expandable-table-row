import React from 'react';
import ExpandableRow from '../expandable-row';
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { TableCell, Table, TableBody } from '@material-ui/core';

jest.mock('../expand-indicator', () => ({expanded}: {expanded: boolean}) => expanded ? "Collapse" : "Expand");


const inTable = (component: React.ReactNode) => (
  <Table>
    <TableBody>
      {component}
    </TableBody>
  </Table>
); 

describe("<ExpandableRow />",  () => {
  const PanelContent = () => "Panel Content";
  it('should render the children', async () => {
    const { findByText } = render(inTable(
      <ExpandableRow expanded={PanelContent}>
        <TableCell>Cell 1</TableCell>
      </ExpandableRow>
    ));
    expect(await findByText("Cell 1")).toBeVisible()
  });

  it('should render an indicator on the left', () => {
    const { container } = render(inTable(
      <ExpandableRow expanded={PanelContent}>
        <TableCell>Cell 1</TableCell>
      </ExpandableRow>
    ));
    const expandCell = container.querySelectorAll('td')[0];
    expect(expandCell).toBeVisible();
    expect(expandCell).toHaveTextContent("Expand");
  });

  it('should not display the expandable panel by default', async () => {
    const { queryByText } = render(inTable(
      <ExpandableRow expanded={PanelContent}>
        <TableCell>Cell 1</TableCell>
      </ExpandableRow>
    ));
    expect(await queryByText("Panel Content")).toBeNull();
  });

  it('should display panel when indicator is clicked', async () => {
    const { queryByText } = render(inTable(
      <ExpandableRow expanded={PanelContent}>
        <TableCell>Cell 1</TableCell>
      </ExpandableRow>
    ));
    
    fireEvent.click(queryByText("Expand")!);

    const panel = await queryByText("Panel Content")

    expect(panel).not.toBeNull();
    expect(panel!.parentElement).toHaveAttribute('colspan', "2");
  });
});