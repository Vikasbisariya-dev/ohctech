import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Drawer,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  Typography,
  styled,
  // Divider,
  // List,
  // ListItem,
  // ListItemIcon,
  // ListItemText,
  useTheme,
  // useMediaQuery,
} from "@mui/material";
import React from 'react';
import MedicationIcon from "@mui/icons-material/Medication";
import { Notifications } from "@mui/icons-material";
import { useState } from "react";
// import ListMenu from "./ListMenu";
import MenuIcon from '@mui/icons-material/Menu';
// import { useEffect } from "react";
// import { useSessionStorage } from "../../utils/useSessionStorage";
// import useAxiosPrivate from "../../utils/useAxiosPrivate";
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ListItemButton from '@mui/material/ListItemButton';
import SideBar1 from "./SideBar1";
import help from '../../assets/images/Help.png';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const StyledToolBar = styled(Toolbar)({
  height: '75px',
  display: "flex",
  justifyContent: "space-between",
  padding: "3",
  border: "1px solid #ccc", // Add a border to the toolbar
  "@media (min-width: 100px) and (max-width: 370px)": {
    padding: "3",
    height: "70px",
    width:"80vh"
  },

});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  cursor: "pointer",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  "@media (max-width: 700px)": {
  gap: "10px",
  },
  "@media (max-width: 480px)": {
    gap: "5px",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  cursor: "pointer",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
"@media (max-width: 700px)": {
    gap: "5px",
  },
  "@media (max-width: 480px)": {
    gap: "3px",
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "20px",
  backgroundColor: "#F3F3F3",
  '&:hover': {
    backgroundColor: "#F3F3F3",
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '500px',
  "@media (max-width: 700px)": {
    width: "300px",
  },
  "@media (max-width: 480px)": {
    width: "200px",
  },

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:"#A9A9A9"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#A9A9A9",
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  //   "@media (max-width: 700px)": {
  //   width: "10ch",
  // },
  },
}));

const NewHeader = () => {
 
  // const axiosClientPrivate = useAxiosPrivate();
  // const [data,setData] = useState([]);
  // const { sessionData,updateSessionData } = useSessionStorage("sessionData");
  // const roleId = sessionData?.roleId;

  const [open, setOpen] = useState(false);

  // const [openItem, setOpenItem] = useState(false);

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const [fetchTrigger, setFetchTrigger] = useState(0);


  const theme = useTheme();
  
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // const handleClick = (index) => {
  //   setOpenItem(openItem === index ? null : index);
  // };

  // const handleDrawerOpen = () => {
  //   setToggleDrawer(true);
  // };

  // const handleDrawerClose = () => {
  //   setToggleDrawer(false);
  // };
  

    // const drawer = (
    //   <div>
    //      <ListItem>
    //         <ListItemIcon>
    //         <img src={"/ohctech_logo.jpeg"} width="150" height="20" />
    //         </ListItemIcon>
    //         <ListItemText/>
    //       </ListItem>
    //     <Divider />
    //     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    //       {/* <ListMenu handleClick={handleClick} openItem={openItem} /> */}
    //     </Box>
    //   </div>
    // );
  
    const container = window !== undefined ? () => window.document.body : undefined;
  
    
  return (
  <div style={{
    fontSize: theme.breakpoints.up('sm') ? '18px' : '5px',
    lineHeight: theme.breakpoints.between('md', 'lg') ? '1' : '1',
    fontWeight: theme.breakpoints.down('xs') ? 'bold' : 'normal',
  }}>
  
    <AppBar position="sticky" sx={{ backgroundColor: "white" ,width:'100%',
      "@media (min-width: 100px) and (max-width: 370px)": {
          width:"80vh"
        },
      "@media (min-width: 380px) and (max-width: 450px)": {
          width:"60vh"
        }

      }} 
      elevation={0}
    >

      
      <StyledToolBar>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <IconButton
          color='black'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display:{ sm: 'none' } }}
        >
          <MenuIcon/>
        </IconButton>
      </Box>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" },color: "blue" }}>
          <Drawer open={toggleDrawer} onClose={handleDrawerToggle}>
            {/* <ListMenu handleClick={handleClick} openItem={openItem} /> */}
          </Drawer>
          {/* <Drawer open={toggleDrawer} onClose={handleDrawerClose}>
            <ListMenu handleClick={handleClick} openItem={openItem} />
          </Drawer> */}
          <img src={"/ohctech_logo.jpeg"} width="150" height="20" alt="Logo"/>
        </Typography>
        <MedicationIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Navigate To…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Typography variant="h7" sx={{ display: { xs: "none", sm: "block" },color: "#41B06E" ,"@media (max-width: 790px)": {
            fontSize:"13px"}}}>
          Occupational Health Center
          <Typography  sx={{color: "#45474B" ,"@media (max-width: 790px)": {
            fontSize:"12px"}}}>
             (Delhi, Plant OHC)
        </Typography>
        </Typography>
        <Icons>
          {/* <Badge sx={{ backgroundColor: "#35374B" ,borderRadius: "20px", width: "20px",height:"20px",alignItems: 'center',
              justifyContent: 'center',}}>
            ?
          </Badge> */}
          <img src={help} width="20"/>
          <Badge badgeContent={1} color="error" sx={{ backgroundColor: "#0766AD",
              borderRadius: "20px",
              width: "35px",height:"35px",
              alignItems: 'center',
              justifyContent: 'center'}}>
            <Notifications/>
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 ,border:'black'}}
            src=""
            onClick={() => setOpen(true)}
          />
          <Typography variant="subtitle1" component={'div'} sx={{ color: "#45474B"}} onClick={() => setOpen(true)}>
            ADMIN1,
            <Typography variant="subtitle2"  sx={{ color: "#45474B",fontSize:"12px"}} onClick={() => setOpen(true)}>
              Application Admin
            </Typography>
          </Typography>
        </Icons>
        <UserBox>
          <Avatar
            sx={{ width: 30, height: 30 }}
            // src=""
            onClick={() => setOpen(true)}
          />
          <Typography variant="subtitle1"  component={'div'} sx={{ color: "#45474B",fontSize:"10px"}} onClick={() => setOpen(true)}>
            ADMIN1,
            <Typography variant="subtitle2"  sx={{ color: "#45474B",fontSize:"7px"}} onClick={() => setOpen(true)}>
              Application Admin
            </Typography>
          </Typography>
        </UserBox>
      </StyledToolBar>
      <Menu
            sx={{ mt: '60px'}}
            id="menu-appbar"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem><AccountCircleIcon/>Profile</MenuItem>
            <MenuItem><SwapHorizIcon/><Link to="/ohcSelection">Switch OHC</Link></MenuItem>
            <MenuItem><SwapHorizIcon/><Link to="/roleSelection">Switch Role</Link></MenuItem>
            <MenuItem><VpnKeyIcon/>Change Password</MenuItem>
            <MenuItem><LibraryBooksRoundedIcon/>Read Manual</MenuItem>
            <MenuItem><PowerSettingsNewRoundedIcon/>Logout</MenuItem>
      </Menu>
    </AppBar>
    
    {/* <nav> */}
      <Drawer
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        // sx={{
        //   // display: { xs: 'block', sm: 'none' },
        //   '& .MuiDrawer-paper': {
        //     boxSizing: 'border-box',
        //     width: drawerWidth,
        //     backgroundColor:"white",
        //     "@media (max-width: 599px)": {
        //     width: "200px",
        //     },
        //   },
        // }}
      >
      {/* {drawer} */}
        
        <SideBar1 />
      </Drawer>
      
    {/* </nav> */}
    {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <SideBar1 />
    </Box> */}
  </div>
    
  );
};
export default NewHeader;