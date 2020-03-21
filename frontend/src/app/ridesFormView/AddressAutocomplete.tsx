import {Grid, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import React from 'react';
// @ts-ignore
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import LocationOnIcon from '@material-ui/icons/LocationOn';

import 'react-google-places-autocomplete/dist/assets/index.css';

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
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
}));


type Props = StandardProps & {
  onSelect: (address: any) => void
};

const AddressAutocomplete: React.FC<Props> = ({ onSelect }) => {
  const classes = useStyles();

  function selectHandler(place:any) {
    console.log('TODO process place to address', place);
    // const placesService = new window.google.maps.places.AutocompleteService();
    // placesService.getDetails(request, callback);
    onSelect(place)
  }

  const renderItem = (option: any, onSelectSuggestion: any) => {
    const matches = option.structured_formatting.main_text_matched_substrings;
    const parts = parse(
      option.structured_formatting.main_text,
      matches.map((match: any) => [match.offset, match.offset + match.length]),
    );

    return (
      <Grid container alignItems="center"
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
            style={{marginBottom: 3}}
            fullWidth
          />
        )}
        onSelect={selectHandler}
        autocompletionRequest={{
          componentRestrictions: {
            country: ['cz'],
          }
        }}

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
