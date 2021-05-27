import {
  createMuiTheme,
  CssBaseline,
  Grid,
  Paper,
  Switch,
  ThemeProvider,
} from "@material-ui/core";
import Navbar from "./components/Navbar";
import StakingCard from "./components/StakingCard";
import { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ height: "100vh" }}>
        <Navbar />
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
