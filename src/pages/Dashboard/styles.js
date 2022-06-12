export const sx = {
  root: {
    margin: 'auto',
    marginTop: '48px',
    width: '100%',
    maxWidth: '600px',
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
  postContainer: {
    marginBottom: '8px'
  },
  name: {
    fontWeight: '600'
  },
  title: {
    color: '#777',
    marginBottom: '8px'
  },
  commentIcon: {
    color: '#1776d1',
    paddingTop: '2px',
    cursor: 'pointer'
  },
  comment: {
    color: '#1776d1',
    fontWeight: '600',
    cursor: 'pointer'
  },
  detailButton: {
    marginLeft: '36px !important',
    color: '#1776d1',
    fontWeight: '600',
    cursor: 'pointer'
  },
  pagination: {
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}