import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
var DateTime=()=>{
var showdate=new Date();
var day=showdate.getDay();
var month=showdate.getMonth();
var date=showdate.getDate();
var year=showdate.getFullYear();
var hours=showdate.getHours();
var minutes=showdate.getMinutes();
var seconds=showdate.getSeconds();

if(hours < 10)
    hours="0" +hours;
if(minutes < 10)
    minutes="0" +minutes;
if(seconds < 10)
    seconds="0" +seconds;
var months=["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"];
var week=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var dt=week[day]+", "+months[month]+" "+date+", "+year;
//var dt=showdate.toDateString();
//var displaytime=showdate.getHours()+"."+showdate.getMinutes()+"."+showdate.getSeconds();
var displaytime=hours+"."+minutes+"."+seconds;

return(
<Stack>
      <Typography
        component={'div'}
        style={{
          marginLeft: "10px",
          justifyContent: "center",
          textAlign: "left",
          fontSize: "13px",
          color: "#2979ff",
          borderRadius: "5px",
          backgroundColor: "#e3f2fd",
          width: "150px",
        }}
      >
        <Box sx={{ marginLeft: "8px", fontWeight: "fontWeightMedium" }}>
          {dt}
        </Box>
        <Box sx={{ marginLeft: "8px", fontWeight: "fontWeightMedium" }}>
          {displaytime}
        </Box>
      </Typography>
    </Stack>
);
}
export default DateTime;