import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: 200,
          padding: 4, 
          color: "#121727",
          borderColor: "#121727",
          borderWidth: 3,
          borderRadius: 17,
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
