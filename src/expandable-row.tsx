import React, { useState } from 'react';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ExpandIndicator from './expand-indicator';
import Collapse from '@material-ui/core/Collapse';

type ExpandableRowProps = {
  children?: React.ReactNode,
  expanded?: React.ReactNode
} & TableRowProps;

export default ({ children, expanded, ...tableRowProps}: ExpandableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cellCount = React.Children.count(children);
  return (
    <>
      <TableRow {...tableRowProps}>
        <>
          <TableCell onClick={() => setIsExpanded(!isExpanded)}>
            <ExpandIndicator expanded={isExpanded} />
          </TableCell>
          {children}
        </>
      </TableRow>
      <Collapse in={isExpanded} component={TableRow} unmountOnExit mountOnEnter>
        <TableCell colSpan={cellCount+1}>
          {expanded}
        </TableCell>
      </Collapse>
    </>
  )
};