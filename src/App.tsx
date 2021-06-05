import {
  createMuiTheme,
  CssBaseline,
  Grid,
  Paper,
  Switch,
  ThemeProvider,
} from "@material-ui/core";
import DogelonmarsToken from "./abi/DogelonmarsToken.json";
import StakingCard from "./components/StakingCard";
import SwapToken from "./abi/SwapToken.json";
import ZingToken from "./abi/ZingToken.json";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.eth_requestAccounts;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-ethereum browser detected. You should consider MetaMask!"
      );
    }
  };

  const [account, setAccount] = useState("0x00");
  const [zing, setZing] = useState({});
  const [zingBalance, setZingBalance] = useState("0");
  const [dogelonmars, setDogelonmars] = useState({});
  const [dogelonmarsBalance, setDogelonmarsBalance] = useState("0");

  const [swap, setSwap] = useState({});
  const [swapBalance, setSwapBalance] = useState("0");

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();

    const zingTokenData = (ZingToken as any).networks[networkId];
    if (zingTokenData) {
      const zingToken = new web3.eth.Contract(
        (ZingToken as any).abi,
        zingTokenData.address
      );
      setZing(zingToken);

      let zingTokenBalance = await zingToken.methods.balanceOf(account).call();
      setZingBalance(zingTokenBalance.toString());
    } else {
      window.alert("ZingToken contract not deployed to detected network");
    }

    // load DogelonmarsToken
    const dogelonmarsTokenData = (DogelonmarsToken as any).networks[networkId];
    if (dogelonmarsTokenData) {
      const dogelonmarsToken = new web3.eth.Contract(
        (DogelonmarsToken as any).abi,
        dogelonmarsTokenData.address
      );
      setDogelonmars(dogelonmarsToken);
      let dogelonmarsTokenBalance = await dogelonmarsToken.methods
        .balanceOf(account)
        .call();
      setDogelonmarsBalance(dogelonmarsTokenBalance.toString());
    } else {
      window.alert(
        "DogelonmarsToken contract not deployed to detected network"
      );
    }

    // load SwapToken
    const swapTokenData = (SwapToken as any).networks[networkId];
    if (swapTokenData) {
      const swapToken = new web3.eth.Contract(
        (SwapToken as any).abi,
        swapTokenData.address
      );
      setSwap(swapToken);

      let stakingBalance = await swapToken.methods
        .stakingBalance(account)
        .call();
      setSwapBalance(stakingBalance.toString());
    } else {
      window.alert("SwapToken contract not deployed to detected network");
    }
  };

  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    loadWeb3();
    loadBlockchainData();
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ height: "100vh" }}>
        <Navbar account={account} />
        <Grid container justify="flex-end">
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh", minWidth: "100%" }}
        >
          <StakingCard />
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
