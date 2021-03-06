import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import WoogleForm from './Woogle/WoogleForm';


const options = ['AddURI', 'AddToDo', 'Logout'];

function Add(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [isWoogleForm, setIsWoogleForm] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState('toDoWoogles');

  const handleClick = () => {

    if(selectedIndex === 2){
      props.setLogin();
    }else{
      setIsWoogleForm(!isWoogleForm);
      if(selectedIndex === 0)
          setSelectedName('URLWoogles');
      else if(selectedIndex === 1){
        setSelectedName('toDoWoogles')
      }
    }
  };
 
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
      <span>
          <span id="WoogleForm">
              {isWoogleForm &&<WoogleForm 
              selectedName={selectedName}
              selectedIndex={selectedIndex}
              onCancelClick={handleClick} 
              onSubmitClick={(title, contents, selectedName)=>props.addWoogle(title, contents, selectedName)}/>}
          </span>
          
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="default" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            color="default"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 3}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
    </span>
  );
}

export default React.memo(Add);
