import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import SectionForm from './SectionForm';
//import { sectionForm } from './Validationform';
import { useFormik } from "formik";
// import { WidthFull } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from "prop-types";
import * as Yup from 'yup';

const sectionForm = Yup.object({
    buId: Yup.string().min(2).max(25).required("Please enter Bussiness Unit"),
    deptId: Yup.string().min(2).max(25).required("Please enter Department Name"),
    sectionName: Yup.string().min(2).max(25).required("Please enter Section Name"),
    sectionHeadName: Yup.string().min(2).max(25).required("Please enter Section Head"),
    sectionHeadEmail: Yup.string().email().required("Please enter Section Email"),
       
  });

const SectionList = () => {

    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0);


    const initialValues = {
       

        buId: "",
        deptId: "",
        sectionName: "",
        sectionHeadName: "",
        sectionHeadEmail:""
    
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
        validationSchema: sectionForm,
        // onSubmit: (values, action) => {
        //     console.log(values);
        //     action.resetForm();
        //   },
          onSubmit: async (values, {resetForm}) => {
             console.log(values);
            try {
                const response = await axiosClientPrivate.post('/sections', values);
                toast.success("Saved Successfully!",{
                    position:"top-center"
                 }); 
                       // getting id(key,value) of last index
                //     const id = rowData[rowData.length-1].buId;
                //     const obj = {
                //         buId : id+1,
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

   // to delete a row
   const handleDeleteRow = async (id) => {
   // alert(id)
   if(window.confirm('Are you sure you want to delete this data?')){
   try {
       await axiosClientPrivate.delete(`/sections/${id}`);
    //    setRowData(prevData => prevData.filter(row => row.id !== id));
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
                const response = await axiosClientPrivate.get(`http://localhost:8080/sections?page=${0}&size=${3}`, { signal: controller.signal });
                const items = response.data.content;
                    console.log(items);
                    console.log(response.data);
                
                if (items.length > 0) {

                    const headerMappings = {
                        buId: "BuId",
                        deptId : "Dept Id",
                        sectionName : "SectionName",
                        sectionHeadName : "Section Head Name",
                        sectionHeadEmail : "Section Head Email",
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
      //  alert(id);
        try {
          const response = await axiosClientPrivate.get(`/sections/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("buId",response.data.businessUnit.id);
            setFieldValue("deptId",response.data.department.id);
            setFieldValue("sectionName",response.data.sectionName);
            setFieldValue("sectionHeadName",response.data.sectionHeadName);
            setFieldValue("sectionHeadEmail",response.data.sectionHeadName);
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
       // alert(id);
        console.log(values);
        const update = values;
        try{
            //  console.log(values);
             await axiosClientPrivate.put(`/sections/${id}`,update);
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
        const header = [["Bussiness Unit","Department Id",'Section Name',"Section Head","Section Head Email"]];
        const tableData = rowData.map(item => [
          item.buId,
          item.deptId,
          item.sectionName,
          item.sectionHeadName,
          item.sectionHeadEmail,
          
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
        doc.save("SectionList.pdf");
    };


    const exportExcelfile = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        
  
        const headerStyle = {
          alignment: { horizontal: 'center' }
          
      };
  
      sheet.getRow(1).font = { bold: true };
        
        const columnWidths = {
            buId: 20,
            deptId: 20,
            sectionName: 15,
            sectionHeadName: 25,
               sectionHeadEmail : 25
        };
  
        sheet.columns = [
          { header: "Bussiness Unit", key: 'buId', width: columnWidths.buId, style: headerStyle },
          { header: "Department Id", key: 'deptId', width: columnWidths.deptId, style: headerStyle },
          { header: "Section Name", key: 'sectionName', width: columnWidths.sectionName, style: headerStyle },
          { header: "Section Head", key: 'sectionHeadName', width: columnWidths.sectionHeadName, style: headerStyle },
          { header: "Section Head Email", key: 'sectionHeadEmail', width: columnWidths.sectionHeadEmail, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                buId: product.buId,
                deptId: product.deptId,
                sectionName: product.sectionName,
                sectionHeadName: product.sectionHeadName,
                sectionHeadEmail: product.sectionHeadEmail,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'SectionList.xlsx';
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Section ">

                <SectionForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default SectionList;
