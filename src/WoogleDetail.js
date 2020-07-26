import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WoogleDetail(props) {
  const classes = useStyles();
  const detailCard = document.getElementById('detailCard');
  console.log( props.detailComp.x);
  detailCard.style.left = props.detailComp.x+"px";
  detailCard.style.top = props.detailComp.y+"px";
  
  return (
      
    <Card id="detailCard" className={classes.root} >
      <CardContent>
        <Typography variant="h5" component="h2">
            {props.detailComp.woogle.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.detailComp.woogle.contents}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="detailCardBtn"size="small" onClick={props.showDetail}><CancelPresentationIcon/></Button>
      </CardActions>
    </Card>
  );
}
