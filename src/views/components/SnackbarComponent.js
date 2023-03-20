import React,{useEffect,useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const SnackbarComponent = ({getStateData,visible,message}) => {
    const [openAlert, setopenAlert] = useState({show:false});
    useEffect(() => {
        setopenAlert(state => ({ ...state, show:!visible?false:true}));
    }, [visible])
    const handleClose = (event , reason) => {
        if (reason === 'clickaway'){
          return;
        }
        setopenAlert(state => ({ ...state, show:false}));
        getStateData(false)
    }
    return (
        <React.Fragment>
            <Snackbar open={openAlert.show}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                autoHideDuration={6000}
                message={message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </React.Fragment>
    )
}
export default SnackbarComponent