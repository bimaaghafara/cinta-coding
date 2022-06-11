export const sx = {
  root: {
    margin: 'auto',
    marginTop: '48px',
    width: '100%',
    maxWidth: '450px',
    '& > *': {
      padding: '8px'
    }
  },
  searchInput: {
    margin: '24px 0',
    background: '#EEEEF1',
    borderRadius: '99px',
    '& input': {
      textAlign: 'center'
    },
    '& fieldset': {
      borderRadius: '99px'
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}