export const sx = {
  back: {
    margin: '24px 0',
    cursor: 'pointer',
    padding: '0'
  },
  root: {
    margin: 'auto',
    marginTop: '48px',
    width: '100%',
    maxWidth: '600px',
    '& > *': {
      padding: '8px'
    }
  },
  label: {
    width: '100px',
    display: 'inline-block',
    verticalAlign: 'top',
    fontWeight: '600',
    color: '#777'
  },
  separator: {
    width: '18%',
    display: 'inline-block',
    verticalAlign: 'top',
    fontWeight: '600',
    color: '#777'
  },
  value: {
    width: {
      xs: '100%',
      sm: '55%',
    },
    display: 'inline-block',
    fontWeight: '600'
  },
}