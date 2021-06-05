import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
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

const Navbar = ({ account }: { account: string }) => {
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
            {account}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
