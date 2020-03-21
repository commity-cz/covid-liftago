import {Button, Grid, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
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
    conditions: {
      textAlign: 'center',
      paddingTop: `${theme.spacing(4)}px`
    },
    fieldset: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
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
            noteForDriver: "COVID 19 cz"
          },
          {
            stopId: uuidv4(),
            kind: "DESTINATION",
            noteForDriver: "COVID 19 cz"
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
            <Grid item xs={12} key={stop.stopId}>

              <Paper className={classes.fieldset}>
                <legend><Typography>{getStopLabel(stop.kind)}</Typography></legend>
                <StopFormContainer key={`stops[${index}]`} baseName={`stops[${index}]`} errorPath={['stops', index]}/>
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12} className={classes.row}>
            <Button type="submit" size="large" variant="contained" color="primary">Odeslat</Button>
          </Grid>

          <Grid item xs={12} className={classes.conditions}>
            <Typography variant={"body2"}>
              Odesláním poptávky rozvozu vyjadřujete souhlas se Všeobecnými obchodními podmínkami spolecnosti Liftago
              CZ, s.r.o.
              (<a
              href={"https://www.liftago.com/vseobecne-obchodni-podminky/"}>https://www.liftago.com/vseobecne-obchodni-podminky/</a>).
            </Typography>
          </Grid>

        </form>
      </FormContext>
    </Grid>
  )
};

export default RidesForm;
