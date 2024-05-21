import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import AilmentSystemForm from './AilmentSystemForm';
//import { AilValidationForm } from './Validationform';
import { AilValidationForm } from './Validationform';
import { useFormik } from "formik";
// import axios from 'axios';
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AilmentTimingList = () => {

    const [rowData, setRowData] = useState([]);

        const [colDefs, setColDefs] = useState([]);
    
        const [openPopup, setOpenPopup] = useState(false);
    
        const axiosClientPrivate = useAxiosPrivate();
    
        const [id,setId] = useState(1);
    
        const [showupdate,setShowupdate] = useState(false);
    
        const initialValues = {
            ailmentSysName : "",
            ailmentSysDesc: "",
            ailmentSysCode: "",
            
            
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
            validationSchema: AilValidationForm,
            // onSubmit: (values, action) => {
            //     console.log(values);
            //     action.resetForm();
            //   },
            onSubmit: async (values, {resetForm}) => {
                console.log(values);
               try {
                   const response = await axiosClientPrivate.post('/ailment-systems', values);
                   toast.success("Saved Successfully!",{
                       position:"top-center"
                    }); 
                          // getting id(key,value) of last index
                       const id = rowData[rowData.length-1].id;
                       const obj = {
                           id : id+1,
                           ...values
                       }
                    console.log(obj);
                    setRowData(rowData => [...rowData, obj]);
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
           await axiosClientPrivate.delete(`/ailment-systems/${id}`);
           setRowData(prevData => prevData.filter(row => row.id !== id));
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
                    const response = await axiosClientPrivate.get('http://localhost:8080/ailment-systems?page=0&size=5', { signal: controller.signal });
                    const items = response.data.content;
                        // console.log(items);
                    
                    if (items.length > 0) {
                       const  columns = Object.keys(items[0]).map(key => ({
                            field: key,
                            headerName: key.charAt(0).toUpperCase() + key.slice(1),
                            filter: true,
                            floatingFilter: true,
                            sortable: true
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
    
        }, []);
    
        const handleEdit = async (id) => {
            alert(id);
            try {
              const response = await axiosClientPrivate.get(`/ailment-systems/${id}`);
                console.log(response.data);
                setFieldValue("id",response.data.id);
                setFieldValue("ailmentSysName",response.data.ailmentSysName);
                setFieldValue("ailmentSysDesc",response.data.ailmentSysDesc);
                setFieldValue("ailmentSysCode",response.data.ailmentSysCode);
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
                 await axiosClientPrivate.put(`/ailment-systems/${id}`,update);
                 toast.success("Updated Successfully!",{
                    position:"top-center",
                    autoClose: 3000,
                 });
                 resetForm();
                //  setRowData(rowData => [...rowData,values]);
            }
            catch(err){
                console.log("after:- ",values);
                console.log(err);
            }
          }
    
          const exportpdf = async () => {
            
            const doc = new jsPDF();
            const header = [["Id","Ailment System Name",'Ailment System Desc',"Ailment System Code"]];
            const tableData = rowData.map(item => [
              item.id,
              item.ailmentSysName,
              item.ailmentSysDesc,
              item.ailmentSysCode,
              
            ]);
            doc.autoTable({
              head: header,
              body: tableData,
              startY: 20, // Start Y position for the table
              theme: 'grid', // Optional theme for the table
              margin: { top: 30 }, // Optional margin from top
              styles: { fontSize: 5 },
              columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }
          });
            doc.save("AilmentTimingList.pdf");
        };
    
    
        const exportExcelfile = async () => {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('My Sheet');
            
      
            const headerStyle = {
              // font: { bold: true, size: 12 },
              alignment: { horizontal: 'center' }
              
          };
      
          sheet.getRow(1).font = { bold: true };
            
            const columnWidths = {
                id: 20,
                ailmentSysName: 25,
                ailmentSysDesc: 25,
                ailmentSysCode: 25,
            };
      
            sheet.columns = [
              { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
              { header: "Ailment System Name", key: 'ailmentSysName', width: columnWidths.ailmentSysName, style: headerStyle },
              { header: "Ailment System Desc", key: 'ailmentSysDesc', width: columnWidths.ailmentSysDesc, style: headerStyle },
              { header: "Ailment System Code", key: 'ailmentSysCode', width: columnWidths.ailmentSysCode, style: headerStyle },
          ];
      
            rowData.map(product =>{
                sheet.addRow({
                    id: product.id,
                    ailmentSysName: product.ailmentSysName,
                    ailmentSysDesc: product.ailmentSysDesc,
                    ailmentSysCode: product.ailmentSysCode,
                })
            });
      
            workbook.xlsx.writeBuffer().then(data => {
                const blob = new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = 'AilmentTimingList.xlsx';
                anchor.click();
                // anchor.URL.revokeObjectURL(url);
            })
        }

    return (
        <>
        <ToastContainer />
            <Box
                className="ag-theme-quartz" // applying the grid theme
                style={{ height: 500 }} // adjust width as necessary
            >

                <Stack sx={{ display: 'flex', flexDirection: 'row' }} marginY={1} paddingX={1}>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => { setOpenPopup(true) }}>Add new</Button>
                        <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon/>}>PDF</Button>
                        <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>}>Excel</Button>                    </ButtonGroup>

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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Ailment Timing">

                <AilmentSystemForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>

            
        </>
    );
};

export default AilmentTimingList;
