import { Outlet } from "react-router";
// import Header from "./Header";
// import Footer from "./Footer";
import { Box, Stack } from "@mui/material";
// import RightBar from "./RightBar";
// import LeftBar from "./LeftBar";
import BottomRightDial from './BottomRightDial'
import NewHeader from "./NewHeader";
import SideBar1 from "./SideBar1";
import ListMenu from "./ListMenu";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const Root = () => {
  return (
    <Box >
      {/*<Header />*/}
      <NewHeader />
      <Stack   direction="row" spacing={2} justifyContent="space-between">
        {/* <LeftBar /> */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SideBar1 />
        </Box>
        <Box flex={4} p={2}>
          <Outlet />
        </Box>

        {/* <Footer /> */}
        {/*<RightBar />*/}
        <BottomRightDial />
      </Stack>
    </Box>
  );
};

export default Root;
