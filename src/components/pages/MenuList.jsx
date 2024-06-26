import {AgGridReact} from 'ag-grid-react';
import { Box, Button, Stack, ButtonGroup } from "@mui/material";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import useAxiosPrivate from '../../utils/useAxiosPrivate';
// import  {menuValidationForm}  from './Validationform';
import Popup from "./Popup";
import MenuForm from './MenuForm';
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import * as Yup from 'yup';

export const menuValidationForm = Yup.object({
  menuid: Yup.number().required("Please enter Menu Id"),
  menuname: Yup.string().min(2).max(25).required("Please enter Menu Name"),
  menudescription : Yup.string().max(50).required("Please enter Menu Description"),
  menuurl : Yup.string().required("Please enter Menu Url"),
  parentmanu: Yup.string().required("Please enter Parent Menu"),
  displaysequence: Yup.string().required("Please enter Display Sequence"),
});

const MenuList = () => {

  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  const axiosClientPrivate = useAxiosPrivate();

  const [id,setId] = useState(1);

  const [showupdate,setShowupdate] = useState(false);

  const [fetchTrigger, setFetchTrigger] = useState(0);


  const initialValues = {
    // Id: "",
    menuName: "",
    menuDescription: "",
    menuUrl: "",
    parentMenu:"",
    displaySequence:"",
    childMenus : [],
    iconText : "",
    modifiedBy: ""
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: menuValidationForm,
    // onSubmit: (values, action) => {
    //   console.log(values);
    //   action.resetForm();
    // },

    onSubmit: async (values, {resetForm}) => {
      console.log(values);
     try {
         const response = await axiosClientPrivate.post('/menus', values);
         toast.success("Saved Successfully!",{
             position:"top-center"
          }); 
                // getting id(key,value) of last index
          //    const id = rowData[rowData.length-1].Id;
          //    const obj = {
          //     Id : id+1,
          //        ...values
          //    }
          // console.log(obj);
          // setRowData(rowData => [...rowData, obj]);
          setFetchTrigger(prev => prev+1);

         console.log('Response:', response.data);
         resetForm();
       } catch (error) {
         console.log(values);
         console.error('Error:', error);
       }
     },

  });



  const handleEdit = async (id) => {
    alert(id);
    try {
        // console.log(rowData);
      const response = await axiosClientPrivate.get(`/menus/${id}`);
        console.log(response.data);
        setFieldValue("Id",response.data.Id);
        setFieldValue("menuName",response.data.menuName);
        setFieldValue("menuUrl",response.data.menuUrl);
        setFieldValue("menuDescription",response.data.menuDescription);
        setFieldValue("displaySequence", response.data.displaySequence);
        setFieldValue("childMenus", response.data.childMenus);
        setFieldValue("iconText", response.data.iconText);
        setFieldValue("modifiedBy", response.data.modifiedBy);
        setFieldValue("parentMenu", response.data.parentMenu);

      setId(id);
      setShowupdate(true);
      setOpenPopup(true);
    } catch (error) {
      console.error('Error fetching item for edit:', error);
    }
  };

  

  // to delete a row
  const handleDeleteRow = async (id) => {
    alert(id)
   if(window.confirm('Are you sure you want to delete this data?')){
   try {
       await axiosClientPrivate.delete(`/menus/${id}`);
      //  setRowData(prevData => prevData.filter(row => row.id !== id));
      setFetchTrigger(prev => prev+1);

   } catch (error) {
       console.error('Error deleting row:', error);
   }
  }
  };

  
  const CustomActionComponent = ({id}) => {
    CustomActionComponent.propTypes = {
        id: PropTypes.number.isRequired,
      };
    return <div> <Button onClick={() =>  handleEdit(id)} > <EditNoteRoundedIcon /></Button>
       <Button color="error" onClick={() => handleDeleteRow(id)}> <DeleteSweepRoundedIcon/> </Button>  </div>

};

const pagination = true;
const paginationPageSize = 50;
const paginationPageSizeSelector = [50, 100, 200, 500];

useEffect(() => {
    const controller = new AbortController();

    const getAllOhc = async () => {
        try {
            const response = await axiosClientPrivate.get('/menus', { signal: controller.signal });
            const items = response.data.content;
            console.log(items);
            setRowData(items);
            console.log('rowData', items);
            if (items.length > 0) {

                const headerMappings = {
                  menuName: "Menu Name",
                  menuDescription : "Menu Description",
                  menuUrl : "Menu Url",
                  parentMenu : "Parent Menu",
                  displaySequence : "Display Sequence",
                  childMenus : "Child Menus",
                  iconText : "Icon Text",
                  modifiedBy : "Modified By",
               };

                const  columns = Object.keys(items[0]).map(key => ({
                    field: key,
                    headerName: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                    filter: true,
                    floatingFilter: true,
                    sortable: true,
                    width: key === 'id' ? 100 : undefined,
                }));

                columns.unshift({
                  // field: "Actions", cellRenderer: CustomActionComponent
                  field: "Actions", cellRenderer:  (params) =>{
                      const id = params.data.Id;
                      return <CustomActionComponent id={id} />
                  }
              });

                setColDefs(columns);
            }
            // updateData = items;
            
            // setRowData(prevData => [...prevData, ...items]);
            // setRowData(rowData => [...rowData, ...items]);
            setRowData(items);

        } catch (err) {
            console.error("Failed to fetch data: ", err);
            // setRowData([]);
        }
    };

    getAllOhc();

    return () => {
        controller.abort();
    };

},[fetchTrigger]);







const handleUpdate = async (id)=> {
alert(id);
const update = values;
try{
     console.log(values);
     await axiosClientPrivate.put(`/menus/${id}`,update);
     toast.success("Updated Successfully!",{
      position:"top-center",
      autoClose: 3000,
    });
     resetForm();
     setFetchTrigger(prev => prev+1);

}
catch(err){
     console.log("check",update);
    console.log(err);
}
}



  return (
    <>
    <ToastContainer />
      <Box
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // adjust width as necessary
      >
        <Stack
          sx={{ display: "flex", flexDirection: "row" }}
          marginY={1}
          paddingX={1}
        >
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineRoundedIcon />}
              onClick={() => {
                setOpenPopup(true);
              }}
            >
              Add New
            </Button>
            <Button
              variant="contained"
              color="success"
              endIcon={<ImportExportRoundedIcon />}
            >
              Export Data
            </Button>
          </ButtonGroup>
        </Stack>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            animateRows={true} // Optional: adds animation to row changes
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
       />
      </Box>

      <Popup
        setShowupdate={setShowupdate}
        showupdate={showupdate}
        handleUpdate = {handleUpdate}
        id= {id}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Fill The Details To Add New Menu"
      >
        <MenuForm
          values={values}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
        />
      </Popup>
    </>
  );
};

export default MenuList;
