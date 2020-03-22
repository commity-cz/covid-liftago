import { Button, CircularProgress, Grid, Link, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { Add, Delete, Send } from '@material-ui/icons'
import classNames from 'classnames';
import * as R from 'ramda';
import React from 'react';
import { FormContext, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { StopKind } from "../../model";
import StopFormContainer from "./StopFormContainer";

const MIN_STOPS = 2;
const MAX_STOPS = 5;

function createNewStop() {
  return {
    stopId: uuidv4(),
    kind: StopKind.DESTINATION,
    noteForDriver: "COVID 19 cz"
  }
}

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

const useStyles = makeStyles(({ spacing }: Theme) => {

  return {
    root: {},
    row: {
      display: 'flex'
    },
    filler: {
      flex: 1
    },
    title: {
      marginBottom: spacing(2)
    },
    conditions: {
      textAlign: 'center',
      paddingTop: spacing(4)
    },
    fieldset: {
      padding: spacing(2),
      marginBottom: spacing(2),
    },
    marginRight: {
      marginRight: spacing(1)
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }
});

type Props = StandardProps & {
  onSubmit: (event: any) => void;
  isSubmittingData: boolean;
};

const RidesForm: React.FC<Props> = ({ onSubmit, isSubmittingData, ...others }) => {
  const classes = useStyles();

  const formMethods = useForm<any>({
      defaultValues: {
        stops: [
          {
            stopId: uuidv4(),
            kind: "PICKUP",
          },
          {
            stopId: uuidv4(),
            kind: "DESTINATION",
          }
        ]
      }
    }
  );
  const { control, handleSubmit, setValue, watch } = formMethods;

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "stops",
      keyName: 'stopId'
    }
  );

  /**
   *   ugly hack for re-rendering values after remove
   *
   *   There is some problem with react-hook-form and material UI combination
   *   After remove, value are not displayed.
   *
   *   update from 5.1.1 to 5.1.3 solve append, but remove is still need this workaround
   *
   *   TODO investigate this problem later
   */
  function customRemove(omitIndex: number) {
    const origValues = watch('stops');
    const values = R.remove(omitIndex, 1, origValues);

    setTimeout(() => {
      setValue(`stops`, values)
    }, 10)

    setTimeout(() => {
      setValue(`stops`, values)
    }, 15)

    remove(omitIndex)
  }

  return (
    <Grid>
      <FormContext {...formMethods} >
        <form {...others}
              className={classNames(classes.root, others.className)}
              onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" className={classes.title}>Pro objednání rozvozu prosím vyplňte následující
            formulář</Typography>
          {fields.map((stop, index) => (
            <Grid item xs={12} key={stop.stopId}>

              <Paper className={classes.fieldset}>
                <div className={classes.row}>
                  <Typography variant="h5">{getStopLabel(stop.kind)}</Typography>
                  <div className={classes.filler}/>
                  {index >= MIN_STOPS && (
                    <Button
                      aria-label="delete"
                      size="large"
                      onClick={() => {
                        customRemove(index);
                      }}
                      startIcon={<Delete/>}>
                      Odebrat
                    </Button>
                  )}
                </div>
                <StopFormContainer baseName={`stops[${index}]`} errorPath={['stops', index]}/>
              </Paper>
            </Grid>
          ))}

          <div className={classes.row}>
            {fields.length <= MAX_STOPS && (
              <Button type="button" size="large"
                      className={classes.marginRight}
                      fullWidth
                      onClick={() => append(createNewStop())}
                      startIcon={<Add/>}>
                Přidat další místo
              </Button>
            )}

            <div className={classes.filler}/>

            <Button type="submit" size="large" variant="contained" color="primary"
                    fullWidth
                    disabled={isSubmittingData}
                    endIcon={<Send/>}>
              Odeslat </Button>
            {isSubmittingData && <CircularProgress size={24} className={classes.buttonProgress}/>}
          </div>

          <Grid item xs={12} className={classes.conditions}>
            <Typography variant={"body2"}>
              Odesláním poptávky rozvozu vyjadřujete souhlas se Všeobecnými obchodními podmínkami spolecnosti
              Liftago CZ, s.r.o.
              (<Link target="_blank"
                     href={"https://www.liftago.com/vseobecne-obchodni-podminky/"}>https://www.liftago.com/vseobecne-obchodni-podminky/</Link>).
            </Typography>
          </Grid>

        </form>
      </FormContext>
    </Grid>
  )
};

export default RidesForm;
