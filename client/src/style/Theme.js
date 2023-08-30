import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#e56069",
          "&:hover": {
            backgroundColor: "#ee919b",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#7062b8",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#7062b8",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#7062b8",
            },
          },
        },
      },
    },
  },
});
