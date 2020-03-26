import { Backdrop, Button, CircularProgress, Grid, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import { Add, Send } from '@material-ui/icons'
import classNames from 'classnames';
// @ts-ignore
import dotize from "dotize";
import arrayMutators from 'final-form-arrays'
import { makeValidate } from "mui-rff";
import React from 'react';
import { Form } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { Stop, StopKind } from "../../../model";
import StopFieldset from "./StopFieldset";
import { stopSchema } from "./StopFormContainer";

const MIN_STOPS = 2;
const MAX_STOPS = 5;

const useStyles = makeStyles(({ spacing, zIndex }: Theme) => {

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
    backdrop: {
      zIndex: zIndex.drawer + 1,
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

export const formSchema = yup.object().shape({
  stops: yup.array()
    .of(stopSchema)
    .min(MIN_STOPS)
});

const originalValidate = makeValidate(formSchema);

const validate = async (values: any) => {
  return originalValidate(values)
    .then(nestedErrors => dotize.convert(nestedErrors));
};

export type Stops = yup.InferType<typeof formSchema>
export type IncompleteStops = NestedPartial<Stops>

function createNewStop(kind = StopKind.DESTINATION) {
  return {
    stopId: uuidv4(),
    contact: {
      phoneNumber: '+420'
    },
    kind
  }
}

const defaultValues: IncompleteStops = {
  stops: [
    createNewStop(StopKind.PICKUP),
    createNewStop(StopKind.DESTINATION),
  ]
};
const subscription = { submitting: true, pristine: true };

type Props = StandardProps & {
  onSubmit: (data: Stops) => Promise<void>;
};

const RidesForm: React.FC<Props> = ({ onSubmit, ...others }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Form
        onSubmit={onSubmit}
        initialValues={defaultValues as any}
        validate={validate}
        subscription={subscription}
        key={subscription as any}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value)
          },
          ...arrayMutators
        }}
        render={({
                   handleSubmit,
                   submitting,
                   form: {
                     mutators: { push, remove, setValue }
                   },
                 }) => {
          return (
            <form {...others}
                  className={classNames(classes.root, others.className)}
                  onSubmit={handleSubmit}
                  noValidate={true}>
              <Typography variant="h4" className={classes.title}>
                Pro objednání rozvozu prosím vyplňte následující formulář
              </Typography>

              <FieldArray name="stops">
                {({ fields }) => {
                  return (
                    <>
                      {fields.value.map((stop: Stop, index: number) => (
                        <Grid item xs={12} key={stop.stopId}>
                          <StopFieldset
                            name={`stops[${index}]`}
                            kind={stop.kind}
                            removable={index >= MIN_STOPS}
                            updateValues={setValue}
                            onRemove={() => {
                              remove('stops', index);
                            }}
                          />
                        </Grid>
                      ))}

                      <div className={classes.row} key={'buttons'}>
                        {fields.value.length <= MAX_STOPS && (
                          <Button type="button" size="large"
                                  className={classes.marginRight}
                                  fullWidth
                                  onClick={() => push('stops', createNewStop())}
                                  startIcon={<Add/>}>
                            Přidat další místo
                          </Button>
                        )}

                        <div className={classes.filler}/>

                        <Button type="submit" size="large" variant="contained" color="primary"
                                fullWidth
                                disabled={submitting}
                                endIcon={<Send/>}>
                          Odeslat
                        </Button>
                        {submitting && (
                          <Backdrop className={classes.backdrop} open={true}>
                            <CircularProgress  size={36} color="inherit" />
                          </Backdrop>
                        )}
                      </div>

                    </>
                  )
                }}

              </FieldArray>

              <Grid item xs={12} className={classes.conditions}>
                <Typography variant={"body2"}>
                  Odesláním poptávky rozvozu vyjadřujete souhlas se Všeobecnými obchodními podmínkami spolecnosti
                  Liftago CZ, s.r.o.
                  (<Link target="_blank"
                         href={"https://www.liftago.com/vseobecne-obchodni-podminky/"}>https://www.liftago.com/vseobecne-obchodni-podminky/</Link>).
                </Typography>
              </Grid>

            </form>
          )
        }}/>
    </Grid>
  )
};

export default RidesForm;
