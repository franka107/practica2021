import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import mainTheme from "./themes/mainTheme";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
