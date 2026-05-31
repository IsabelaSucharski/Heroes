import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shape: {
    borderRadius: 9999,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          textTransform: 'none',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 32,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 32,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: '50%',
        },
      },
    },
  },
});