import {Button, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import classNames from 'classnames';
import React from 'react';
import {FormContext, useFieldArray, useForm} from "react-hook-form";
import {v4 as uuidv4} from 'uuid';
import StopFormContainer from "./StopFormContainer";

const useStyles = makeStyles((theme: Theme) => {

  return {
    root: {},
    row: {
      display: 'flex',
      flexDirection: 'column'
    },
    fieldset: {
      border: 0,
      borderTop: `1px solid ${theme.palette.primary.light}`,
      borderLeft: `1px solid ${theme.palette.primary.light}`,
      marginBottom: theme.spacing(1)
    }
  }
});

type Props = StandardProps & {
  onSubmit: (event: any) => void;
};

enum StopKind {
  PICKUP = "PICKUP",
  DESTINATION = "DESTINATION",
  FALLBACK_DESTINATION = "FALLBACK_DESTINATION",
}

function getStopLabel(stopKind: StopKind) {
  switch (stopKind) {
    case 'PICKUP':
      return "Odesílatel:";

    case 'DESTINATION':
      return "Příjemce:";

    case 'FALLBACK_DESTINATION':
      return "Náhradní příjemce:";

  }
}

const RidesForm: React.FC<Props> = ({ onSubmit, ...others }) => {
  const classes = useStyles();
  const formMethods = useForm<any>({
      defaultValues: {
        stops: [
          {
            stopId: uuidv4(),
            kind: "PICKUP",
            notesForDriver: "COVID 19 cz"
          },
          {
            stopId: uuidv4(),
            kind: "DESTINATION",
            notesForDriver: "COVID 19 cz"
          }
        ]
      }
    }
  );
  const { control, handleSubmit } = formMethods

  const { fields } = useFieldArray(
    {
      control,
      name: "stops",
      keyName: 'stopId'
    }
  );

  return (
    <Grid>
      <FormContext {...formMethods} >
        <form {...others}
              className={classNames(classes.root, others.className)}
              onSubmit={handleSubmit(onSubmit)}>

          {fields.map((stop, index) => (
            <Grid item xs={12}>

              <fieldset className={classes.fieldset}>
                <legend><Typography>{getStopLabel(stop.kind)}</Typography></legend>
                <div key={stop.stopId}>
                  <StopFormContainer key={`stops[${index}]`} baseName={`stops[${index}]`} errorPath={['stops', index]}/>
                </div>

              </fieldset>
            </Grid>
          ))}

          <Grid item xs={12} className={classes.row}>
            <Button type="submit" variant="contained" color="primary">Odeslat</Button>
          </Grid>

        </form>
      </FormContext>
    </Grid>
  )
};

export default RidesForm;
