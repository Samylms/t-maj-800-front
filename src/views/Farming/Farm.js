import React, {  useState }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(10, 75)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  
}));
 

const Farm = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const [post, setPostArray] = useState([])
  
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    timer.current = setTimeout(() => {
        axios({
            method: 'get',
            url: 'http://' + (process.env.AI_HOST || 'localhost') + ':' + (process.env.AI_PORT || '5000') + '/report',
            headers: {
                'Content-Type': 'application/json'
            },
            crossdomain: true
            })
            .then(function (response) {
                //handle success
                console.log(response);
                setSuccess(true);
                setLoading(false);
                setPostArray([JSON.stringify(response.data)]);

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }, 2000); 
    
    }
  };

  return (
    <div className={classes.root}>
      
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Start prediction
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    
        

      <div>
            {
            post.map(function(object, i)
            {
               return <div  key={i}> 
                          { 
                          object
                         }
                      </div>; 
             })}
        </div>     
      </div>
    </div>
  );
}

 
export default Farm;