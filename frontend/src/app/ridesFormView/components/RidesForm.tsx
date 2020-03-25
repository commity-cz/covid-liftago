import { Button, CircularProgress, Grid, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import { Add, Send } from '@material-ui/icons'
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays'
import { Debug, makeValidate } from "mui-rff";
import React from 'react';
import { Form } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { Address, Contact, StopKind } from "../../../model";
import StopFieldset from "./StopFieldset";
import { stopSchema } from "./StopFormContainer";

const MIN_STOPS = 2;
const MAX_STOPS = 5;

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

export interface Stop {
  stopId: string,
  contact: Contact,
  locations: {
    address: Address
  },
  noteForDriver: string
  kind: StopKind
}

export const formSchema = yup.object().shape({
  stops: yup.array()
    .of(stopSchema)
    .min(MIN_STOPS)
    .max(MAX_STOPS),
});

const validate = makeValidate(formSchema);

export type Stops = yup.InferType<typeof formSchema>
export type IncompleteStops = NestedPartial<Stops>

function createNewStop() {
  return {
    stopId: uuidv4(),
    kind: StopKind.DESTINATION
  }
}

type Props = StandardProps & {
  onSubmit: (event: any) => void;
  isSubmittingData: boolean;
};

const defaultValues: IncompleteStops = {
  stops: [
    {
      stopId: uuidv4(),
      contact: {
        phoneNumber: '+420'
      },
      kind: "PICKUP",
    },
    {
      stopId: uuidv4(),
      kind: "DESTINATION",
      contact: {
        phoneNumber: '+420'
      },
    }
  ]
};

const subscription = { submitting: true, pristine: true };

const RidesForm: React.FC<Props> = ({ onSubmit, isSubmittingData, ...others }) => {
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
                                disabled={isSubmittingData}
                                endIcon={<Send/>}>
                          Odeslat </Button>
                        {isSubmittingData && <CircularProgress size={24} className={classes.buttonProgress}/>}
                      </div>

                    </>
                  )
                }}

              </FieldArray>

              <Grid item xs={12}>
                <pre>
                  <Debug/>
                </pre>
              </Grid>

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
