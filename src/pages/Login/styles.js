export const sx = {
  root: {
    padding: '24px 10%'
  },
  cintaCoding: {
    fontWeight: '600',
    fontSize: {
      xs: '16px',
      sm: '18px',
      md: '24px'
    }
  },
  loginModalButton: {
    borderRadius: '99px',
    width: '99px',
    textTransform: 'none'
  },
  person: {
    marginTop: {
      xs: '100px',
      sm: '72px',
      md: '48px'
    },
    maxWidth: '100%'
  },
  closeButton: {
    width: '48px',
    margin: '20px 24px',
    alignSelf: 'flex-end'
  },
  formTitle: {
    fontWeight: '600',
    fontSize: '24px',
    mt: '75px',
    mb: '100px'
  },
  loginFormContainer: {
    textAlign: 'center'
  },
  loginButton: {
    width: '270px',
    borderRadius: '99px',
    height: '40px'
  },
  field: {
    margin: '36px',
    '& .MuiInputBase-root': {
      width: '270px',
      borderRadius: '99px',
    },
    '& .MuiInputBase-input': {
      padding: '12px 12px 12px 24px'
    },
    '& .MuiInputLabel-root': {
      lineHeight: '16px',
      paddingLeft: '8px',
      '&.Mui-focused': {
        padding: '0'
      }
    },
  }
}