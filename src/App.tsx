import {
  createMuiTheme,
  CssBaseline,
  Grid,
  Paper,
  Switch,
  ThemeProvider,
} from "@material-ui/core";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import React, { useState } from "react";

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
      </Paper>
    </ThemeProvider>
  );
};

export default App;
