import { Button, makeStyles, Theme } from "@material-ui/core";
import classNames from 'classnames';
import { TextField } from "mui-rff";
import React from 'react';
import AddressAutocomplete from "./AddressAutocomplete";
import { When } from "./Condition";

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
  name: string
  updateAddress: (address: any) => void
};

const truthy = Boolean;
const falsy = (v: any) => !Boolean(v);

const AddressFormContainer: React.FC<Props> = ({ name, updateAddress, ...others }) => {
  const classes = useStyles();

  const handleSelect = (googleAddress: any) => {
    const address = {
      city: googleAddress.locality || googleAddress.political || googleAddress.administrative_area_level_2 || '',
      street: googleAddress.route || googleAddress.locality || '',
      houseNumber: googleAddress.street_number || googleAddress.town_square || googleAddress.premise || '',
      zipCode: googleAddress.postal_code || '',
      country: "Czech republic",
    };

    updateAddress(address);
  };

  const handleManualSelection = () => {
    const address = {
      country: "Czech republic",
    };

    updateAddress(address);
  };


  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>

      <When fieldName={`${name}.country`} condition={falsy}>
        <>
          <AddressAutocomplete onSelect={handleSelect}/>
          <Button onClick={() => handleManualSelection()}>Zadat adresu ručně</Button>
        </>
      </When>

      <When fieldName={`${name}.country`} condition={truthy}>
        <div className={classes.row}>

          <TextField
            label="Ulice"
            name={`${name}.street`}
            // TODO required={true}
            className={classes.marginRight}
            fullWidth
          />

          <TextField
            label="Číslo domu"
            name={`${name}.houseNumber`}
            // TODO required={true}
            fullWidth
          />
        </div>

        <div className={classes.row}>

          <TextField
            label="Město"
            name={`${name}.city`}
            // TODO required={true}
            className={classes.marginRight}
            fullWidth
          />

          <TextField
            label="PSČ"
            name={`${name}.zipCode`}
            // TODO required={true}
            fullWidth
            className={classes.marginRight}
          />

        </div>

      </When>

      <div className={classes.filler}/>

      <TextField
        label="Doplňující popis (nepovinné)"
        name={`${name}.description`}
        multiline
      />

    </div>
  )
};

export default AddressFormContainer;
