import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import DepartmentForm from './DepartmentForm';
//import { departmentForm } from './Validationform';
import { useFormik } from "formik";
// import { WidthFull } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import PropTypes from "prop-types";
import * as Yup from 'yup';

 const departmentForm = Yup.object({
  buId: Yup.string().min(2).max(25).required("Please enter Bussiness Unit "),
  departmentName: Yup.string().min(2).max(25).required("Please enter Department Name"),
  departmentHeadName: Yup.string().min(2).max(25).required("Please enter Department Head Email"),
  departmentEmail: Yup.string().email().required("Please enter Department Head Email"),
     
});


const DepartmentList = () => {

    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0);


    const initialValues = {


        buId : "",
        departmentName : "",
        departmentHeadName : "",
        departmentEmail : "",
        lastModified: "",
        modifiedBy: ""
        // DeptName: "",
        // BussinessUnit: "",
        // DeptHeadName: "",
        // DeptHeadEmail:""
     
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
        validationSchema: departmentForm,
        // onSubmit: (values, action) => {
        //     console.log(values);
        //      action.resetForm();
        //   },
          onSubmit: async (values, {resetForm}) => {
            try {
                const response = await axiosClientPrivate.post('/departments', values);
                toast.success("Saved Successfully!",{
                    position:"top-center"
                 }); 
                       // getting id(key,value) of last index
                //     const id = rowData[rowData.length-1].id;
                //     const obj = {
                //         id : id+1,
                //         ...values
                //     }
                //  console.log(obj);
                //  setRowData(rowData => [...rowData, obj]);
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
        //alert(id);
        try {
          const response = await axiosClientPrivate.get(`/departments/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("buId",response.data.buId);
            setFieldValue("departmentName",response.data.departmentName);
            setFieldValue("departmentHeadName",response.data.departmentHeadName);
            setFieldValue("departmentEmail",response.data.departmentEmail);
            // setFieldValue("lastModified", response.data.lastModified);
            // setFieldValue("modifiedBy", response.data.modifiedBy);
          setId(id);
          setShowupdate(true);
          setOpenPopup(true);
        } catch (error) {
          console.error('Error fetching item for edit:', error);
        }
      };

      const handleUpdate = async (id)=> {
       // alert(id);
        const update = values;

        try{
             console.log(values);
             await axiosClientPrivate.put(`/departments/${id}`,update);
             toast.success("Updated Successfully!",{
                position:"top-center",
                autoClose: 3000,
             });
             resetForm();
            //  setRowData(rowData => [...rowData,values]);
            setFetchTrigger(prev => prev+1);

        }
        catch(err){
            console.log(values);
            console.log(err);
        }
      }



    const handleDeleteRow = async (id) => {
      //  alert(id)
        try {
            await axiosClientPrivate.delete(`/departments/${id}`);

            const newData = rowData.filter(row => row.id !== id);
            // setRowData(newData);
            setFetchTrigger(prev => prev+1);

        } catch (error) {
            console.error('Error deleting row:', error);
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
                const response = await axiosClientPrivate.get('departments', { signal: controller.signal });
                const items = response.data.content;
                //  console.log(items);
                console.log(items);
                if (items.length > 0) {

                    const headerMappings = {
                      buId: "Bussiness Id",
                      departmentName : "Department Name",
                      departmentHeadName : "Department Head Name",
                      departmentEmail : "Department Email",
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


    const exportpdf = async () => {
        
        const doc = new jsPDF();
        const header = [['Bussiness Unit ID','Department Name',"Department Head Name","Department Head Email",'Department ID']];
        const tableData = rowData.map(item => [
          item.buId,
          item.departmentName,
          item.departmentHeadName,
          item.departmentEmail,
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
        doc.save("DepartmentList.pdf");
    };


    const exportExcelfile = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
       
        const headerStyle = {
          alignment: { horizontal: 'left' }
          
      };
  
      sheet.getRow(1).font = { bold: true };
        
        const columnWidths = {
            buId: 15,
            departmentName: 25,
            departmentHeadName: 25,
            departmentEmail: 25,
      };
  
        sheet.columns = [
          { header: "Bussiness Unit ID", key: 'buId', width: columnWidths.buId, style: headerStyle },
          { header: "Department Name", key: 'departmentName', width: columnWidths.departmentName, style: headerStyle },
          { header: "Department Head Name", key: 'departmentHeadName', width: columnWidths.departmentHeadName, style: headerStyle },
          { header: "Department Head Email", key: 'departmentEmail', width: columnWidths.departmentEmail, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                buId: product.buId,
                departmentName: product.departmentName,
                departmentHeadName: product.departmentHeadName,
                departmentEmail: product.departmentEmail,
                
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'DepartmentList.xlsx';
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Department ">

                <DepartmentForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default DepartmentList;
