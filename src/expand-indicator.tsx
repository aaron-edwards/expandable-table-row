import React from 'react';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

type Props = {
  expanded: boolean;
};

const useStyles = makeStyles({
  root: {
    transition: '0.25s',
  },
  expanded: {
    transform: 'rotate(180deg)',
  },
});

const ExpandIndicator = ({ expanded }: Props) => {
  const styles = useStyles();
  return (
    <ExpandMore className={
    [styles.root, expanded && styles.expanded]
      .filter(className => className)
      .join(' ')
  }
    />
  );
};

ExpandIndicator.defaultProps = { expanded: false };

export default ExpandIndicator;
