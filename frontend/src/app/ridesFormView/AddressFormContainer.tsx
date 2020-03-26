import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Controller, ErrorMessage, useFormContext } from "react-hook-form";
import { getFullName, hasError } from "../../formFunctions";
import AddressAutocomplete from "./AddressAutocomplete";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceBetween',
  },
  row: {
    display: 'flex',
  },
  filler: {
    flex: 1,
  },
  marginRight: {
    marginRight: theme.spacing(1)
  }
}));

type Props = StandardProps & {
  errorPath: (string | number)[]
  baseName?: string
};

const AddressFormContainer: React.FC<Props> = ({ baseName = '', errorPath = [], ...others }) => {
  const classes = useStyles();
  const { register, formState, control, errors, setValue, watch } = useFormContext();

  const names = useMemo(() => ({
    street: getFullName(baseName, 'street'),
    houseNumber: getFullName(baseName, 'houseNumber'),
    city: getFullName(baseName, 'city'),
    zipCode: getFullName(baseName, 'zipCode'),
    country: getFullName(baseName, 'country'),
    description: getFullName(baseName, 'description'),
    formVisible: getFullName(baseName, 'formVisible'),
  }), [baseName]);

  const metaFormVisible = watch(names.formVisible);
  const [showAddressForm, setShowAddressForm] = useState(metaFormVisible);

  // TODO consider custom input registration for stable data model, instead of hidden input flag
  const formVisible = metaFormVisible || showAddressForm;

  const handleSelect = (googleAddress: any) => {
    const address = {
      city: googleAddress.locality || googleAddress.political || googleAddress.administrative_area_level_2 || '',
      street: googleAddress.route || googleAddress.locality || '',
      houseNumber: googleAddress.street_number || googleAddress.town_square || googleAddress.premise || '',
      zipCode: googleAddress.postal_code || '',
      country: "Czech republic",
      formVisible: "true"
    };

    setShowAddressForm(true);

    // we need set values after address form rendering
    setTimeout(() => {
      setValue(baseName, address)
    }, 100);
  };

  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>

      {!formVisible && (
        <>
          <AddressAutocomplete onSelect={handleSelect}
                               error={formState.isSubmitted && !formVisible}/>
          <Button onClick={() => setShowAddressForm(true)}>Zadat adresu ručně</Button>
        </>
      )}

      {formVisible && (
        <>
          <div className={classes.row}>
            <Controller as={TextField}
                        name={names.street}
                        error={hasError(errors, names.street)}
                        label="Ulice"
                        rules={{ required: "Vyplňte název ulice" }}
                        helperText={<ErrorMessage errors={errors} name={names.street}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
                        className={classes.marginRight}
            />

            <Controller as={TextField}
                        name={names.houseNumber}
                        error={hasError(errors, names.houseNumber)}
                        label="Číslo domu"
                        rules={{ required: "Vyplňte číslo domu" }}
                        helperText={<ErrorMessage errors={errors} name={names.houseNumber}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
            />
          </div>

          <div className={classes.row}>
            <Controller as={TextField}
                        name={names.city}
                        error={hasError(errors, names.city)}
                        label="Město"
                        rules={{ required: "Vyplňte název města" }}
                        helperText={<ErrorMessage errors={errors} name={names.city}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
                        className={classes.marginRight}

            />

            <Controller as={TextField}
                        name={names.zipCode}
                        error={hasError(errors, names.zipCode)}
                        label="PSČ"
                        rules={{
                          required: "Vyplňte PSČ",
                          pattern: { value: /\d\d\d ?\d\d/, message: 'Vyplňte PSČ ve formátu 123 45' }
                        }}
                        helperText={<ErrorMessage errors={errors} name={names.zipCode}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
            />

          </div>
          <input type="hidden" name={names.country} ref={register}/>
        </>
      )}

      <div className={classes.filler}/>

      <input type="hidden" name={names.formVisible} ref={register}/>

      <Controller as={TextField}
                  name={names.description}
                  label="Doplňující popis (nepovinné)"
                  control={control}
                  defaultValue=""
                  multiline
      />
    </div>
  )
};

export default AddressFormContainer;