import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  FormControl,
  InputBase,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  withStyles,
} from "@material-ui/core";
import { coins } from "../utils/variables";
import { useState, ChangeEvent } from "react";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 475,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    stakingInput: {
      width: "100%",
    },
    rewardInput: {
      width: "100%",
      marginTop: 12,
    },
    stakeButton: {
      marginLeft: 8,
      marginRight: 8,
      marginTop: 16,
      width: "100%",
    },
  })
);

export default function StakingCard() {
  const classes = useStyles();

  const [stakingCoin, setStakingCoin] = useState("");
  const handleStakingChange = (event: ChangeEvent<{ value: unknown }>) => {
    setStakingCoin(event.target.value as string);
  };

  const [rewardCoin, setRewardCoin] = useState("");
  const handleRewardChange = (event: ChangeEvent<{ value: unknown }>) => {
    setRewardCoin(event.target.value as string);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <FormControl className={classes.stakingInput}>
          <InputLabel>Staking</InputLabel>
          <Select
            value={stakingCoin}
            onChange={handleStakingChange}
            input={<BootstrapInput />}
          >
            {coins.map((coin) => {
              return <MenuItem value={coin.toLowerCase()}>{coin}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.rewardInput}>
          <InputLabel>Reward</InputLabel>
          <Select
            value={rewardCoin}
            onChange={handleRewardChange}
            input={<BootstrapInput />}
          >
            {coins.map((coin) => {
              return <MenuItem value={coin.toLowerCase()}>{coin}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          className={classes.stakeButton}
        >
          Stake
        </Button>
      </CardActions>
    </Card>
  );
}
