import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    '& h6': {
      color: 'red'
    }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" color='secondary'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
    
    const {open2} = props;
    const [open, setOpen] = React.useState(open2);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            WARNING – YOU SHOULD ONLY USE THIS APP ON A PERMANENTLY OFFLINE COMPUTER!
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" gutterBottom>
          This app does <b>NOT</b> save your Helium wallet information! This app will automatically reset and delete all history in 20 minutes! 
          You are responsible for saving your Phrase, your <b>SALT (usually four digits)</b>, and the <b>SALT Position</b>! 
          If you lose this information, you will <b>EVER</b> be able to recover your Helium wallet! By clicking the CONTINUE button below, 
          you are agreeing to all Terms and Conditions located here, HNT-ICE.com/terms Begin at <b>Step 1</b>, 
          type your secret Phrase. <b>NOTE: Spacing, capitalization, and punctuation matter!</b> Then at <b>Step 2, BE VERY CAREFUL TO NOT REMOVE ANY CHARACTERS!</b> 
          Add your SALT here, your <b>SALT Position matters!</b> As a result, you will now see your Helium public wallet address. 
          Use a QR Code scanning app on your mobile phone to save your wallet address. 
          </Typography>

          <Typography variant="body2" gutterBottom color='error'>
          Repeat these steps several times to be certain that you get the EXACT same result. <b>Save your secret PHRASE, SALT, and the POSITION in a secure location!</b>
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
