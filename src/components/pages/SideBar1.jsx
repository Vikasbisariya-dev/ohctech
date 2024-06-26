import React, { useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
// import {
//   AssignmentInd,
//   Assignment,
//   Settings,
//   Info,
//   People,
//   LocalOffer,
//   HealthAndSafety,
//   ManageAccounts,
//   LocalHospital,
//   MenuBook,
// } from "@mui/icons-material";
// import Drawer from "@mui/material/Drawer";
// import LogoutIcon from "@mui/icons-material/Logout";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

import DutyRooster from '../../assets/images/DutyRooster.png';
// import Inventory from '../../assets/images/Inventory.png'
import OPDSetupMaster from '../../assets/images/OPS Setup Master.png'
// import StoreIssue from '../../assets/images/Store Issue.png'
import PatientManagement from '../../assets/images/Patient Management.png'
// import Reporting from '../../assets/images/Reporting.png'
import DataSetup from '../../assets/images/Data Setup.png'
// import BioWaste from '../../assets/images/Bio-Waste.png'
// import ChronicIllnessMaster from '../../assets/images/Chronic Illness Master.png'
import Logout from '../../assets/images/Logout.png';
import Back from '../../assets/images/back.png';
import useAxiosPrivate from "../../utils/useAxiosPrivate";
// import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../utils/useSessionStorage";
import { useEffect } from "react";
// import MuiDrawer from '@mui/material/Drawer';
import DateTime from "./DateTime";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from "react";
const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// const DrawerHeader = styled('div')(({ theme }) => ({
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   // ...theme.mixins.toolbar,
// }));



const SideBar1 = ()=> {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isCollapse, setIsCollapse] = useState(false);
  const [isopen,setIsOpen] = useState(false);
  

  const handleCollapse = (index) => {
    setIsCollapse((prevOpen) => (prevOpen === index ? null : index));
  };
  const handleOpen = (index) => {
    setIsOpen((prevOpen) => (prevOpen === index ? null : index));
  };

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const MiniDrawer = styled("div")(({ theme, open }) => ({
    width: isMobile ? "100vh" : 240,
    height:"100vh",
    backgroundColor:"white",
    // flexShrink: 0,
    transition: "width 0.2s ease-in-out",
    // whiteSpace: "nowrap",
    boxSizing: "border-box",
    border: "1px solid #dedede", // Add a 1px solid border
   ...(open && {
     ...openedMixin(theme),
    }),
   ...(!open && {
     ...closedMixin(theme),
    }),
  }));

  // const sidebararr = [
  //   {
  //     images: DutyRooster,
  //     title: "Duty Roster",
  //     children: [
  //       { 
  //         title: "Duty Roster 1", 
  //         subchild: ['Child 1', 'Child 2'] 
  //       }
  //     ],
  //   },
  //     {
  //       images: PatientManagement,
  //       title: "Patient Management",
  //       children: [
  //         {
  //           title:'Patient Management 1',
  //           subchild:[ 'Child 2', 'Child 3']
  //         }
  //       ]
  //     },
  //     {
  //       images: DataSetup,
  //       title: "Data Setup",
  //       children: [
  //         {
  //           title:'Data Setup 1',
  //           subchild:[ 'Child 2', 'Child 3']
  //         }
  //       ]
  //     },
  //     {
  //       images: OPSSetupMaster,
  //       title: "OPS Setup Master",
  //       children: [
  //         { 
  //          title:'Master',
  //          subchild:[ 'Child 2', 'Child 3']
  //         }
  //       ]
  //     },
  //     {
  //       images: ChronicIllnessMaster,
  //       title: "Chronic illness Master",
  //       children: [
  //       {
  //         title:'Chronic illness Master 1',
  //         subchild:[ 'Child 2', 'Child 3']
  //       }
  //       ]
  //     },
  //     {
  //         images: StoreIssue,
  //         title: "Store Issue",
  //         children: [
  //           {
  //             title:'Store Issue 1',
  //             subchild:[ 'Child 2', 'Child 3']
  //           }
  //           ]
  //     },
  //     {
  //         images: Inventory,
  //         title: "Inventory",
  //         children: [
  //           {
  //             title:'Inventory 1',
  //             subchild:[ 'Child 2', 'Child 3']
  //           }
  //           ]
  //     },
  //     {
  //         images: BioWaste,
  //         title: "Bio-Waste",
  //         children: [
  //           {
  //             title:'Bio-Waste 1',
  //             subchild:[ 'Child 2', 'Child 3']
  //           }
  //           ]
  //       },
  //       {
  //         images: Reporting,
  //         title: "Reporting",
  //         children: [
  //           {
  //             title:'Reporting 1',
  //             subchild:[ 'Child 2', 'Child 3']
  //           }
  //           ]
  //       },
  // ];



  // vikas
    // cosnt [data,setData] = useState([]);
   const axiosClientPrivate = useAxiosPrivate();
   const [data, setData] = useState([]);
  //  const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card
   const { sessionData, updateSessionData } = useSessionStorage("sessionData");
   const roleId = sessionData?.roleId;
 
  //  const [expandedItems, setExpandedItems] = useState([]);
  //  const handleItemClick = (index) => {
  //    // Toggle the expansion state of the clicked list item
  //    const newExpandedItems = [...expandedItems];
  //    newExpandedItems[index] = !newExpandedItems[index];
  //    setExpandedItems(newExpandedItems);
  //  };
   // const navigate = useNavigate();
 
   const runOnce = useRef(false);

   useEffect(() => {
    let isMounted = true;
     const controller = new AbortController();
 
     const getRoles = async () => {
       try {
         const response = await axiosClientPrivate.get(
           `/menu-access/${roleId}`,
           {
             signal: controller.signal,
           }
         );
            console.log("side bar menu: ",response.data),
            // setFetchTrigger(prev => prev+1);
         //   setData(JSON.stringify(response.data)); string
        //  setData(response.data);
        isMounted && setData(response.data);
       } catch (err) {
         console.error(err);
         setData([]);
       }
     };

     if(runOnce.current){
      getRoles();
     }
     
 
     return () => {
      isMounted = false;
       controller.abort();
       runOnce.current = true;
     };

   }, [axiosClientPrivate, roleId]);


console.log("menus",data);

// new 
  
const SidebarMap = {
  DataSetup: DataSetup,
  OPDSetupMaster: OPDSetupMaster,
  PatientManagement : PatientManagement,
  DutyRooster: DutyRooster,
//   EMP : employee,
//   PHY :  pharmacy
};



  return (
      <Box >
      <MiniDrawer open={open}>
      {/* <Divider /> */}
      {/* <ListItem>
              <ListItemIcon>
              <img src={"/ohctech_logo.jpeg"} width="150" height="20" />
              </ListItemIcon>
              <ListItemText/>
      </ListItem>
      <Divider /> */}
      <List>
      {data.map((item, index) => (
        <React.Fragment key={item.Id}>
          <ListItem disablePadding onClick={() => handleCollapse(index)}>
            <ListItemButton>
               
               <ListItemIcon>
               <img src={SidebarMap[item.iconText]} width="20"/>
              </ListItemIcon>
              {/*<ListItemText  primary={item.menuName} />*/}
              <ListItemText
                primary={
                  <Typography variant="body2" >
                    {item.menuName}
                  </Typography>
                }
              />
              {item.childMenus && (isCollapse === index ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          {item.childMenus && (
            <Collapse in={isCollapse === index} timeout="auto" unmountOnExit>
              <List  disablePadding sx={{ paddingLeft: '56px', margin : '0px' }} >
                {item.childMenus.map((secondItem, childIndex) => (
                  <React.Fragment key={secondItem.Id} >
                    <ListItem disablePadding onClick={() => handleOpen(childIndex)}>
                    
                    <Link to={secondItem.menuUrl} >
                    <ListItemButton sx={{  margin : '0px',paddingY: '0px' }} >
                      {/*<ListItemText primary={secondItem.name} onClick={() => handleOpen(childIndex)} />*/}
                      <ListItemText
                      onClick={() => handleOpen(childIndex)}
                      primary={
                        <Typography variant="body2" style={{ color: 'gray' }}>
                          {secondItem.name}
                        </Typography>
                      }
                    />

                      {secondItem.childMenus.length > 0
                        ? secondItem.childMenus && (isopen === childIndex ? <ExpandLess /> : <ExpandMore />)
                        : ''}
                    </ListItemButton> 
                  </Link>
                    </ListItem>
                    {secondItem.childMenus && (
                      <Collapse in={isopen === childIndex} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ paddingLeft: '56px' }}>
                          {secondItem.childMenus.map((thirdItem) => (
                            <ListItem key={thirdItem.Id} disablePadding>
                            <Link to={thirdItem.menuUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <ListItemButton>
                                <ListItemText primary={thirdItem.name} />
                              </ListItemButton>
                            </Link>
                          </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
     </List>
      <Toolbar>
     <Grid container direction="row" spacing={2}>
       {/* <Grid item> */}
       <IconButton
          // color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            // marginRight: 5,
            marginLeft: 0.5,
            ...(open && { display: 'none' }),
            // justifyContent: 'flex-end',
          }}
        >
          {open ? (
            <img src={Back} width="25px" />
          ) : (
            <img src={Back} width="25px" />
          )}
        </IconButton>
        {open && (
          <IconButton
            aria-label="close drawer"
            onClick={handleDrawerClose}
            sx={{
              marginLeft: 21,
              // justifyContent: 'flex-end',
            }}
          >
            <img src={Back} width="25px" />
          </IconButton>
        )}
        {/* </Grid> */}
        {/* <Grid item>
          <Typography variant="body1" component="div" sx={{ ml: 3, mt: 1 }}>
            <DateTime />
          </Typography>
        </Grid> */}
      </Grid>
      </Toolbar>
      
      <List>
        <ListItem  sx={{ position: 'absolute', top: "450px", width: '100%',ml: 3 ,mt: -2}}>
          <ListItemText primary={<DateTime />} />
        </ListItem>
        <Divider sx={{ position: 'absolute', top: "500px", width: '100%' }}/>
        <ListItem disablePadding sx={{ position: 'absolute', top: "500px", width: '100%' }}>
          <ListItemButton>
            <ListItemIcon>
              <img src={Logout} width="20" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </MiniDrawer>
    </Box>
  );
};

export default SideBar1;
