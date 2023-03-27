import { createTheme, LinkProps, ListItemButtonProps } from '@mui/material'

import { LinkComponent } from './linkComponents'

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root, #root > div': {
          height: '100%',
        },
        body: {
          background: '#fafafa',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkComponent,
      } as LinkProps, // https://github.com/mui/material-ui/issues/29942
    },
    MuiCardActionArea: {
      defaultProps: {
        LinkComponent,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        component: LinkComponent,
      } as ListItemButtonProps, // https://github.com/mui/material-ui/issues/29942
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginInline: 0,
        },
      },
    },
  },
})
