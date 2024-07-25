import { createTheme } from "@mui/material/styles";

const fontFamily = '"Ubuntu", sans-serif'

export const theme = createTheme({
  typography: {
    fontFamily: fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: 4, 
          color: "#121727",
          borderColor: "#121727",
          borderWidth: 3,
          borderRadius: 17,
          fontFamily: fontFamily,
          "&:hover": {
            borderWidth: 3,
            borderRadius: 17,
            borderColor: "#121727",
            backgroundColor: "#121727",
            color: "white"
          },
        },
      },
    },
   
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#121727",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#121727",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#121727",
            },
          },
        },
      },
    },
  },
});
