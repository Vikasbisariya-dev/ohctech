import {AgGridReact} from 'ag-grid-react';
import { Box, Button, Stack, ButtonGroup } from "@mui/material";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import useAxiosPrivate from '../../utils/useAxiosPrivate';
// import  {userValidationForm}  from './Validationform';
//import { roleValidationForm } from './Validationform';
//import { EmployeeCadreValidationForm } from './Validationform';
import Popup from "./Popup";
//import R from './RoleForm';
//import New2Form from './New2Form';
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import EmployeeCadreForm from "../pages/EmployeeCadreForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from "prop-types";
import * as Yup from 'yup';

const EmployeeCadreValidationForm = Yup.object({
  empCadre: Yup.string().required("Please enter Employee Cadre Name"),
  remarks: Yup.string().required("Please enter Remarks"),
  medicalClaimLimit : Yup.number().required("Please enter Claim Limit"),
});


const EmployeeCadreList = () => {

  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  const axiosClientPrivate = useAxiosPrivate();

  const [id,setId] = useState(1);

  const [showupdate,setShowupdate] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);


  const initialValues = {
    empCadre: "",
    medicalClaimLimit: "",
    remarks: "",
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
    validationSchema: EmployeeCadreValidationForm,
    onSubmit: async (values, {resetForm}) => {
      console.log(values);
     try {
         const response = await axiosClientPrivate.post('/emp-cadres', values);
         toast.success("Saved Successfully!",{
             position:"top-center"
          }); 
                // getting id(key,value) of last index
          //    const id = rowData[rowData.length-1].id;
          //    const obj = {
          //        id : id+1,
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

  


  // to delete a row
  const handleDeleteRow = async (id) => {
    alert(id)
   if(window.confirm('Are you sure you want to delete this data?')){
   try {
       await axiosClientPrivate.delete(`/emp-cadres/${id}`);
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
     <Button color="error" onClick={() => handleDeleteRow(id)}> <DeleteSweepRoundedIcon /> </Button> </div>

};

const pagination = true;
const paginationPageSize = 50;
const paginationPageSizeSelector = [50, 100, 200, 500];

useEffect(() => {
    const controller = new AbortController();

    const getAllOhc = async () => {
        try {
            const response = await axiosClientPrivate.get(`http://localhost:8080/emp-cadres?page=1&size=5`, { signal: controller.signal });
            console.log("before",response.data);
            const items = response.data.content;
              console.log("after",items);
            if (items.length > 0) {

  
                const headerMappings = {
                  empCadre: "Employee Cadre",
                  medicalClaimLimit : "Medical Claim Limit",
                  remarks : "Remarks",
                };
                const columns = Object.keys(items[0]).map(key => ({
                      field: key,
                      headerName: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                      //filter: true,
                      floatingFilter: true,
                      sortable: true,
                      filter: 'agTextColumnFilter' ,
                      width: key === 'id' ? 100 : undefined,
                }));

                columns.unshift({
                  field: "Actions", cellRenderer:  (params) =>{
                      const id = params.data.id;
                      return <CustomActionComponent id={id} />
                  }
              });

                setColDefs(columns);
            }

            setRowData(items);

        } catch (err) {
            console.error("Failed to fetch data: ", err);
            setRowData([]);
        }
    };

    getAllOhc();

    return () => {
        controller.abort();
    };

}, [fetchTrigger]);


const handleEdit = async (id) => {
  alert(id);
  try {
    const response = await axiosClientPrivate.get(`/emp-cadres/${id}`);
      console.log(response.data);
      setFieldValue("id",response.data.id);
      setFieldValue("empCadre",response.data.empCadre);
      setFieldValue("medicalClaimLimit",response.data.medicalClaimLimit);
      setFieldValue("remarks",response.data.remarks);
      setFieldValue("lastModified", response.data.lastModified);
      setFieldValue("modifiedBy", response.data.modifiedBy);
      setId(id);
      setShowupdate(true);
      setOpenPopup(true);
  } catch (error) {
    console.error('Error fetching item for edit:', error);
  }
};


const handleUpdate = async (id)=> {
  alert(id);
  console.log(values);
  const update = values;
  try{
      //  console.log(values);
       await axiosClientPrivate.put(`/emp-cadres/${id}`,update);
       toast.success("Updated Successfully!",{
          position:"top-center",
          autoClose: 3000,
       });
       resetForm();
      //  setRowData(rowData => [...rowData,values]);
      setFetchTrigger(prev => prev+1);

  }
  catch(err){
      console.log("after:- ",values);
      console.log(err);
  }
}

const exportpdf = async () => {
        
  const doc = new jsPDF();
  const header = [["id","Employee Cadre",'Medical Claim Limit',"Remarks"]];
  const tableData = rowData.map(item => [
    item.id,
    item.empCadre,
    item.medicalClaimLimit,
    item.remarks,
  ]);
  doc.autoTable({
    head: header,
    body: tableData,
    startY: 20, 
    theme: 'grid', 
    margin: { top: 30 },
    styles: { fontSize: 5 },
    columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }
});
  doc.save("EmployeeCadreList.pdf");
};


const exportExcelfile = async () => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('My Sheet');
  

  const headerStyle = {
    alignment: { horizontal: 'center' }
    
};

sheet.getRow(1).font = { bold: true };
  
  const columnWidths = {
      id: 20,
      empCadre: 20,
      medicalClaimLimit: 15,
      remarks: 25,
        
  };

  sheet.columns = [
    { header: "id", key: 'id', width: columnWidths.id, style: headerStyle },
    { header: "Employee Cadre", key: 'empCadre', width: columnWidths.empCadre, style: headerStyle },
    { header: "Medical Claim Limit", key: 'medicalClaimLimit', width: columnWidths.medicalClaimLimit, style: headerStyle },
    { header: "Remarks", key: 'remarks', width: columnWidths.remarks, style: headerStyle },    
];

  rowData.map(product =>{
      sheet.addRow({
          id: product.id,
          empCadre: product.empCadre,
          medicalClaimLimit: product.medicalClaimLimit,
          remarks: product.remarks,
      })
  });

  workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'EmployeeCadreList.xlsx';
      anchor.click();
  })
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
            <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon/>}>PDF</Button>
                        <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>}>Excel</Button>
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
         showupdate={showupdate}
         id= {id}
        handleUpdate={handleUpdate}
         setShowupdate={setShowupdate}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Employee Cadre Form"
      >
        <EmployeeCadreForm
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

export default EmployeeCadreList;