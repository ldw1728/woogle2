import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './SearchBarMenu.css';



const ITEM_HEIGHT = 20;

const srcs = [
  {name : 'Google', src : "https://www.google.co.kr/search?newwindow=1&hl=ko&sxsrf=ALeKk03jEBWYnFAFvfIVMOzwOEWzg1rr3w%3A1594108516201&ei=ZCoEX7rfC8OUr7wP0p2agAo&q=", color:"#f2f2f2"},
  {name : 'Naver', src : "https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=", color:"#03cf5d"},
  {name : 'Youtube', src : "https://www.youtube.com/results?search_query=", color:"#ff0000"}
]

export default function SearchBarMenu(props) {
  const options = srcs.map(e => e.name);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    props.onChange(srcs.find(e=>e.name === event.target.innerText));
  };

  return (
    <span className="SearchBarMenu">
      <IconButton
        className='iconBtn'
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
}
