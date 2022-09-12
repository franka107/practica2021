import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import mainTheme from "./themes/mainTheme";
import { AppRouter } from "./routes/AppRouter";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { es } from "date-fns/esm/locale";
// import Joyride from "react-joyride";
import { useEffect } from "react";
// import { useHistory } from "react-router-dom";

function App() {
  // const steps = [
  //   {
  //     content: <h2>Bienvenido a Contigo Pecuario !!</h2>,
  //     locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  //     placement: "center",
  //     target: "body",
  //   },
  //   {
  //     content: <h2>Logo</h2>,
  //     floaterProps: {
  //       disableAnimation: true,
  //     },
  //     spotlightPadding: 20,
  //     target: ".star-burst",
  //   },
  //   // {
  //   //   content: <h2>Sticky elements</h2>,
  //   //   floaterProps: {
  //   //     disableAnimation: true,
  //   //   },
  //   //   spotlightPadding: 20,
  //   //   target: ".report",
  //   // },
  //   {
  //     content: (
  //       <div>
  //         Sidebar
  //         <br />
  //         Click the menu above!
  //       </div>
  //     ),
  //     disableBeacon: true,
  //     disableOverlayClose: true,
  //     hideCloseButton: true,
  //     placement: "right",
  //     spotlightClicks: true,
  //     // styles: {
  //     //   options: {
  //     //     zIndex: 10000,
  //     //   },
  //     // },
  //     target: ".sidebar",
  //     title: "Menu",
  //   },
  //   {
  //     content: <h2>Control Animal</h2>,
  //     disableBeacon: true,
  //     disableOverlayClose: true,
  //     hideCloseButton: true,
  //     placement: "right",
  //     spotlightClicks: true,
  //     // styles: {
  //     //   options: {
  //     //     zIndex: 10000,
  //     //   },
  //     // },
  //     target: ".sidebar__control__animal",
  //     title: "Menu",
  //   },
  //   {
  //     content: <h2>Control Lechero</h2>,
  //     disableBeacon: true,
  //     disableOverlayClose: true,
  //     hideCloseButton: true,
  //     placement: "right",
  //     spotlightClicks: true,
  //     // styles: {
  //     //   options: {
  //     //     zIndex: 10000,
  //     //   },
  //     // },
  //     target: ".sidebar__control__milk",
  //     title: "Menu",
  //   },
  //   {
  //     content: "Boton de reporte",
  //     placement: "right",
  //     spotlightPadding: 0,
  //     styles: {
  //       options: {
  //         zIndex: 10000,
  //       },
  //     },
  //     target: ".report",
  //     title: "Sidebar",
  //   },
  // ];
  // const history = useHistory();

  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <AppRouter />
          {/* <Joyride
            continuous={true}
            run={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            steps={steps}
            styles={{
              options: {
                zIndex: 10000,
              },
            }}
          /> */}
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default App;
