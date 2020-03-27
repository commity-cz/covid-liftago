import { Button, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Delete } from "@material-ui/icons";
import React from 'react';
import { StopKind } from "../../../model";
import StopFormContainer from "./StopFormContainer";

const useStyles = makeStyles(({ spacing }: Theme) => ({
    root: {
      padding: spacing(2),
      marginBottom: spacing(2),
    },
    row: {
      display: 'flex'
    },
    filler: {
      flex: 1
    }
  }
));


function getStopLabel(stopKind: StopKind) {
  switch (stopKind) {
    case 'PICKUP':
      return "Odesílatel (místo vyzvednutí)";

    case 'DESTINATION':
      return "Příjemce (místo doručení)";

    case 'FALLBACK_DESTINATION':
      return "Náhradní příjemce (náhradní místo doručení)";

  }
}

type Props = StandardProps & {
  name: string
  kind: StopKind
  removable: boolean
  updateValues: (path: string, value: any) => void
  onRemove: () => void
};

const StopFieldset: React.FC<Props> = ({ kind, name, removable, onRemove, updateValues, ...others }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.row}>
        <Typography variant="h5">{getStopLabel(kind)}</Typography>
        <div className={classes.filler}/>
        {removable && (
          <Button
            aria-label="delete"
            size="large"
            onClick={onRemove}
            startIcon={<Delete/>}>
            Odebrat
          </Button>
        )}
      </div>
      <StopFormContainer name={name} kind={kind} updateValues={updateValues}/>
    </Paper>
  )
};

export default StopFieldset;
