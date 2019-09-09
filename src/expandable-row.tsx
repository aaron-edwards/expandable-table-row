import React, { ReactNode, ReactElement, useState } from 'react';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import { TableCell, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

type AnimationState = 'Collapsed' | 'Collapsing' | 'Expanded' | 'Expanding';

type ExpandableRowProps = {
  children?: ReactNode,
  expanded: boolean,
  detailsPanel: (props: {animationState: AnimationState}) => ReactElement;
} & TableRowProps;

const cssNames = (names: (string|undefined)[]) => names.filter(n => n !== undefined).join(' ');

const useStyles = makeStyles({
  mainExpanded: {
    '& td': {
      borderBottom: 'none',
    },
  },
  details: {
    '& td': {
      transition: '0.1s all ease',
    },
  },
  detailsAnimating: {
    '& td': {
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
});

const ExpandableRow = ({
  children, detailsPanel, expanded, ...tableRowProps
}: ExpandableRowProps) => {
  const DetailsPanelComponent = detailsPanel;
  const colSpan = React.Children.count(children);
  const [animationState, setAnimationState] = useState<AnimationState>(expanded ? 'Expanded' : 'Collapsed');
  const { mainExpanded, details, detailsAnimating } = useStyles();
  const animating = animationState === 'Collapsing' || animationState === 'Expanding';
  const displayed = (expanded || animating);

  return (
    <>
      <TableRow className={cssNames([displayed ? mainExpanded : undefined])} {...tableRowProps}>
        { children }
      </TableRow>
      { (expanded || animationState !== 'Collapsed')
      && (
      <TableRow className={cssNames([details, !expanded ? detailsAnimating : undefined])}>
        <TableCell colSpan={colSpan}>
          <Collapse
            appear
            in={expanded}
            onEntered={() => setAnimationState('Expanded')}
            onExited={() => setAnimationState('Collapsed')}
            onEntering={() => setAnimationState('Expanding')}
            onExit={() => setAnimationState('Collapsing')}
            exit
          >
            <DetailsPanelComponent animationState={animationState} />
          </Collapse>
        </TableCell>
      </TableRow>
      )
  }
    </>
  );
};

ExpandableRow.defaultProps = {
  expanded: false,
};

export default ExpandableRow;
