import { Grid, LinearProgress, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from "autosuggest-highlight/parse";
import React from 'react';
// @ts-ignore
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { convert } from "./addressConversion";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  suggestions: {
    position: 'absolute',
    zIndex: 101,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    minWidth: 300
  },
  suggestion: {
    cursor: 'pointer'
  }
}));


type Props = StandardProps & {
  onSelect: (address: any) => void,
  error?: boolean
};

const AddressAutocomplete: React.FC<Props> = ({ error, onSelect }) => {
  const classes = useStyles();

  function selectHandler(place: any) {
    geocodeByPlaceId(place.place_id)
      .then(convert)
      .then(onSelect);
  }

  const renderItem = (option: any, onSelectSuggestion: any) => {
    const matches = option.structured_formatting.main_text_matched_substrings;
    const parts = parse(
      option.structured_formatting.main_text,
      matches.map((match: any) => [match.offset, match.offset + match.length]),
    );

    return (
      <Grid key={option.id}
            container
            alignItems="center"
            className={classes.suggestion}
            onClick={() => onSelectSuggestion(option)}>
        <Grid item>
          <LocationOnIcon className={classes.icon}/>
        </Grid>
        <Grid item xs>
          <Typography>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
              {part.text}
            </span>
            ))}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {option.structured_formatting.secondary_text}
          </Typography>
        </Grid>
      </Grid>
    );
  }


  return (

    <div className={classes.root}>
      <GooglePlacesAutocomplete
        placeholder=""
        renderInput={(props: any) => (
          <TextField
            inputProps={props}
            label="Vyhledat adresu"
            style={{ marginBottom: 3 }}
            error={error}
            fullWidth
          />
        )}
        onSelect={selectHandler}
        autocompletionRequest={{
          componentRestrictions: {
            country: ['cz'],
          }
        }}

        loader={
          <Paper className={classes.suggestions}>
            <LinearProgress variant="indeterminate"/>
            <Typography>Loading...</Typography>
          </Paper>
        }

        renderSuggestions={(active: any, suggestions: any, onSelectSuggestion: any) => (
          <Paper className={classes.suggestions}>
            {
              suggestions.map((suggestion: any) => renderItem(suggestion, onSelectSuggestion))
            }
          </Paper>
        )}

      />
    </div>
  );
}

export default AddressAutocomplete;
