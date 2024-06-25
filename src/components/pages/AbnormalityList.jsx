import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import AbnormalityForm from "./AbnormalityForm"
// import { AbnormValidationForm } from './Validationform';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from "prop-types";
import * as Yup from 'yup';

const AbnormValidationForm = Yup.object({
    abnormalityName: Yup.string().min(2).max(25).required("Please enter Abnormality Name"),
    wellnessProgram: Yup.string().min(2).max(25).required("Please enter Wellness Programs"),
  });



const AbnormalityList = () => {


    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0);


    const initialValues = {
        abnormalityName : "",
        wellnessProgram: "",
      };

    
      const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
        resetForm
      } = useFormik({
        initialValues: initialValues,
         validationSchema: AbnormValidationForm,
        // onSubmit: (values, action) => {
        //     console.log(values);
        //     action.resetForm();
        //   },
        onSubmit: async (values, {resetForm}) => {
            console.log(values);
           try {
               const response = await axiosClientPrivate.post('/abnormalities', values);
               toast.success("Saved Successfully!",{
                   position:"top-center"
                }); 
                      
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
    //alert(id)
   if(window.confirm('Are you sure you want to delete this data?')){
   try {
       await axiosClientPrivate.delete(`/abnormalities/${id}`);
      // setRowData(prevData => prevData.filter(row => row.id !== id));
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
                const response = await axiosClientPrivate.get('http://localhost:8080/abnormalities?page=0&size=5', { signal: controller.signal });
                const items = response.data.content;
                    // console.log(items);
                
                if (items.length > 0) {

                    const headerMappings = {
                        abnormalityName: "Abnormality Name",
                        wellnessProgram : "Wellness Program",
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
    //    alert(id);
        try {
          const response = await axiosClientPrivate.get(`/abnormalities/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("abnormalityName",response.data.abnormalityName);
            setFieldValue("wellnessProgram",response.data.wellnessProgram);
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
     //   alert(id);
        console.log(values);
        const update = values;
        try{
            //  console.log(values);
             await axiosClientPrivate.put(`/abnormalities/${id}`,update);
             toast.success("Updated Successfully!",{
                position:"top-center",
                autoClose: 3000,
             });
             resetForm();
            setFetchTrigger(prev => prev+1);
        }
        catch(err){
            console.log("after:- ",values);
            console.log(err);
        }
      }

      const exportpdf = async () => {
        
        const doc = new jsPDF();
        const header = [["Id","Parameter value Name",'Wellness Progarms']];
        const tableData = rowData.map(item => [
          item.id,
          item.abnormalityName,
          item.wellnessProgram,
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
        doc.save("AddDocDetailList.pdf");
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
            ailmentName: 25,
            ailmentDesc: 25,
            ailmentCode: 25,
        };
  
        sheet.columns = [
          { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "Doctor", key: 'ailmentName', width: columnWidths.ailmentName, style: headerStyle },
          { header: "Doctor Emp Code", key: 'ailmentDesc', width: columnWidths.ailmentDesc, style: headerStyle },
          { header: "Doctor Details", key: 'ailmentCode', width: columnWidths.ailmentCode, style: headerStyle },
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                doctorName: product.doctorName,
                doctorEmpId: product.doctorEmpId,
                doctorDesc: product.doctorDesc,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'AddDocDetailList.xlsx';
            anchor.click();
            
        })
    }

    return (
        <>
        <ToastContainer />
            <Box
                className="ag-theme-quartz" 
                style={{ height: 500 }}
            >

                <Stack sx={{ display: 'flex', flexDirection: 'row' }} marginY={1} paddingX={1}>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => { setOpenPopup(true) }}>Add New</Button>
                        <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon/>}>PDF</Button>
                        <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>}>Excel</Button>
                    </ButtonGroup>

                </Stack>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    animateRows={true} 
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </Box>

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Anormality Master">

                <AbnormalityForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default AbnormalityList;
