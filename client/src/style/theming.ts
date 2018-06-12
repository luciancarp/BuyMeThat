import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiTheme } from 'material-ui/styles';
import {
  teal400, teal700, darkBlack, fullBlack, grey100, grey300, orangeA200, grey500,
  white
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

export const spaces = {
  narrow: 10,
  medium: 14,
  wide: 22,
};

export const palette = {
  primary1Color: teal400,
  primary2Color: teal700,
  primary3Color: grey300,
  accent1Color: orangeA200,
  accent2Color: grey100,
  accent3Color: grey500,
  textColor: darkBlack,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey300,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: teal400,
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack,
  backgroundColor: grey100,
};

const muiDefaultTheme: MuiTheme = {
  fontFamily: 'Roboto, sans-serif',
  palette,
};

export const materialUiTheme = getMuiTheme(muiDefaultTheme);
