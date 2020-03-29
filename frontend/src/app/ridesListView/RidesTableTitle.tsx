import React from "react";
import {Button, Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import {Add, ArrowLeft, ArrowRight} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {cs} from "date-fns/locale";
import {addDays, format, subDays} from 'date-fns'

const useStyles = makeStyles(({spacing}) => ({
  title: {
    marginBottom: spacing(2)
  },
  link: {
    textDecoration: 'none',
  }
}));

type Props = {
  date: Date | null,
  setDate: (date: Date | null) => void;
}

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date: Date) {
    return format(date, "dd MMMM", { locale: cs });
  }
}

const RidesTableTitle: React.FC<Props> = ({date, setDate}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="space-between" alignItems="center" className={classes.title}>
        <Grid item>
          <Typography variant="h4">Přehled rozvozů</Typography>
        </Grid>
        <Grid item>
          <Link to="/" className={classes.link}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add/>}
            >
              Zadat nový rozvoz
            </Button>
          </Link>
        </Grid>
      </Grid>
      <IconButton onClick={() => setDate(subDays(date || new Date(), 1))}><ArrowLeft/></IconButton>
      <MuiPickersUtilsProvider utils={LocalizedUtils} locale={cs}>
        <DatePicker
          autoOk
          disableFuture
          maxDateMessage="Lze zobrazit pouze aktuální den a starší"
          format={'d. MMM yyyy'}
          label="Datum"
          className={classes.title}
          value={date}
          onChange={setDate}
        />
      </MuiPickersUtilsProvider>
      <IconButton onClick={() => setDate(addDays(date || new Date(), 1))}><ArrowRight/></IconButton>
    </>
  )
};

export default RidesTableTitle;
