import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import mainTheme from "./themes/mainTheme";
import { AppRouter } from "./routes/AppRouter";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function App() {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default App;
