import { Stack } from "@mui/material";
import { Box, Container } from "@mui/material";
// import ohcimg from "../../../public/ohc.jpg";
// import group from "../../../public/Group.jpg";
import group from '../../assets/images/Group.jpg'
// import RoleCard from "./RoleCard";
import chiefmedoff from "../../assets/images/ChiefMedicalOfficer.png";
import reception from "../../assets/images/Reception.png";
import applicationadmin from "../../assets/images/Application Admin.png";
import medicalExamination from "../../assets/images/Medical Examination.png";
import employee from "../../assets/images/Employee.jpg";
import pharmacy from "../../assets/images/Pharmacy.png";
import useAxiosPrivate from "../../utils/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSessionStorage } from "../../utils/useSessionStorage";
import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import logo from '../../assets/images/Ohctech-logo-white.png'
// Ohctech-logo-white.png
const RoleSelection = () => {

  // const [icons] = useState([
  //   { image: medicalExamination, name: "Medical Examination" },
  //   { image: reception, name: "Reception" },
  //   { image: applicationadmin, name: "Application Admin" },
  //   { image: chiefmedoff, name: "Chief Medical Officer" },
  //   { image: employee, name: "Employee" },
  //   { image: pharmacy, name: "Pharmacy" },
  // ]);

  // from old starting

  const axiosClientPrivate = useAxiosPrivate();
  const [roles, setRoles] = useState([]);
  // const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card
  const { sessionData, updateSessionData } = useSessionStorage("sessionData");
  const user = sessionData?.userId;
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();

    const getRoles = async () => {
      try {
        const response = await axiosClientPrivate.get(
          `/users/roles/${user}`,
          `/menu-access/${user}`,
          {
            signal: controller.signal,
          }
        );
        // console.log(response.data);
        setRoles(response.data);
      } catch (err) {
        console.error(err);
        setRoles([]);
      }
    };

    getRoles();

    return () => {
      controller.abort();
    };
  }, [axiosClientPrivate, user]);

  // console.log(roles);

  const handleRoleClick = (id) => {
    if (id === null || id === "" || id === undefined) {
      return;
    }

    updateSessionData({ roleId: id });
    navigate("/AdminDashboard");
  };

  //  Ending

  const RoleImage = {
    AA: applicationadmin,
    ME: medicalExamination,
    REC : reception,
    CMO: chiefmedoff,
    EMP : employee,
    PHY :  pharmacy
};

  return (
    <Stack spacing={0} direction="row">
       <Box
        sx={{
          width: "50vw",
          height: "100vh",
          display: { xs: "none", sm: "block" },
          position: "relative",
        }}
      >
        <img style={{ height: "100vh", width: "50vw" }} src={group} alt="" />
        {/* <Box
          sx={{
            position: "absolute",
            top: '2rem',
            left: '5rem',
            p: 2,  
          }}
        >
          <img src={logo} alt="Logo" style={{ width: '150px' }} /> 
        </Box> */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            p: 3,
            
          }}
        >
          <Typography sx={{ mb: 4, fontWeight:'bold' }} ><img src={logo} alt="Logo" style={{ width: '150px' }}/></Typography> 
          <Typography variant="h6" sx={{mb:2}}>Nice to see you again</Typography>
          <Typography variant="h4" sx={{ mb: 2, fontWeight:'bold' }}>
            WELCOME BACK
          </Typography>
          <div
                  style={{
                    width: "5vw",
                    // margin: "1rem auto",
                    height: "4px",
                    backgroundColor: "white",
                    borderRadius:'6px'
                  }}
                ></div>
          <Typography variant="h9" sx={{ mb: 2 ,mt:2}}>
            OHCTECH is a venture conceptualized by Occupational Health Experts and developed by Techsyneric Technologies professionals who wanted to develop Occupational health solutions
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100vw", sm: "50vw" },
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            height: "100%",
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           alignContent:'center'
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center", 
              alignItems: "center",
              textAlign: "center",
              flexWrap: "wrap",
              // marginTop: "1rem",
              height: "80%",
              // marginBottom: "1rem",
              // gap: "1rem", 
            }}
          >
            {roles.map((item,index) => (
             <div style={{ display: "block", justifyContent: "center", alignContent: "center" }} key={index}>
             <Card
               sx={{ width: 145, height: 145, margin: "0.5rem" }} 
               onClick={() => handleRoleClick(item.id)}
             >
               <CardActionArea
                 sx={{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "center",
                   justifyContent: "center",
                   height: "100%",
                 }}
               >
                 <CardMedia
                   component="img"
                   image={RoleImage[item.iconText]}
                   alt="image"
                   sx={{
                     width: 60,
                     height: 60,
                     objectFit: "contain",
                     marginBottom: 2,
                   }}
                 />
                 <Typography variant="body2">{item.roleName}</Typography>
               </CardActionArea>
             </Card>
           </div>
            ))}
          </Box>
        </Container>
      </Box>
    </Stack>
  );
};
 
export default RoleSelection;
