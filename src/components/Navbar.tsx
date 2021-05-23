import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import logo from "../images/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginTop: 6,
    },
    account: {
      marginTop: 6,
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <img src={logo} alt="logo" width="44" />
          <Typography variant="h6" className={classes.title}>
            Yield Farming Dapp
          </Typography>
          <Button color="inherit" className={classes.account}>
            0x00
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
