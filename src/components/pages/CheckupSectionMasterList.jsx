import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import CheckupSectionMasterForm from './CheckupSectionMasterForm';
//import { CheckupSectionMasterValidationForm } from './Validationform';
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

      
export const CheckupSectionMasterValidationForm = Yup.object({
    CheckupSectionName: Yup.string().min(2).max(25).required("Please enter  Checkup SectionName"),
    Description: Yup.string().min(2).max(25).required("Please enter Description"),
    Notes: Yup.string().min(2).max(25).required("Please enter Notes"),
    Comments: Yup.string().min(2).max(25).required("Please enter Comments"),
    SetStatus: Yup.string().min(2).max(25).required("Please enter SetStatus"),
    ApplicableRules: Yup.string().min(2).max(25).required("Please enter ApplicableRules"),
    SectionSequence: Yup.string().email().required("Please enter SectionSequence"),
    Interpretation: Yup.string().required("Please enter Interpretation"),
    
});

const CheckupSectionMasterList = () => {


    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const initialValues = {
       
        CheckupSectionName:"",
        Description:"",
        Notes:"",
        Comments:"",
        SetStatus:"",
        ApplicableRules:[],
        SectionSequence:"",
        Interpretation:"",
        lastModified:"",
        modifiedBy:""

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
        validationSchema: CheckupSectionMasterValidationForm,
        onSubmit: async (values, {resetForm}) => {
        try {
            const response = await axiosClientPrivate.post('/business-units', values);
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
        alert(id);
        try {
          const response = await axiosClientPrivate.get(`/business-units/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("CheckupSectionName",response.data.CheckupSectionName);
            setFieldValue("Description",response.data.Description);
            setFieldValue("Notes",response.data.Notes);
            setFieldValue("Comments",response.data.Comments);
            setFieldValue("SetStatus",response.data.SetStatus);
            setFieldValue("ApplicableRules",response.data.ApplicableRules);
            setFieldValue("SectionSequence",response.data.SectionSequence);
            setFieldValue("Interpretation",response.data.Interpretation);
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
        const update = values;
        try{
             console.log(values);
             await axiosClientPrivate.put(`/business-units/${id}`,update);
             toast.success("Updated Successfully!",{
                position:"top-center",
                autoClose: 3000,
             });
             resetForm();
             //setRowData(rowData => [...rowData,values]);
             setFetchTrigger(prev => prev+1);

        }
        catch(err){
            console.log(values);
            console.log(err);
        }
      }


     // to delete a row
     const handleDeleteRow = async (id) => {
        alert(id)
       if(window.confirm('Are you sure you want to delete this data?')){
       try {
           await axiosClientPrivate.delete(`/business-units/${id}`);
        //    setRowData(prevData => prevData.filter(row => row.buId !== id));
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
                const response = await axiosClientPrivate.get('business-units', { signal: controller.signal });
                const items = response.data;
                    // console.log(items);
                setRowData(items);
                if (items.length > 0) {
                    const headerMappings = {
                        CheckupSectionName: "Checkup Section Name",
                        Description: "Description",
                        Notes: "Notes",
                        Comments: "Comments",
                        SetStatus: "Set Status",
                        ApplicableRules: "Applicable Rules",
                        SectionSequence: "Section Sequence",
                        Interpretation: "Interpretation",
                      };


                      const  columns = Object.keys(items[0]).map(key => ({
                        field: key,
                        headerName: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                      // filter: true,
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
        const header = [['id', 'CheckupSectionName',"Description","Notes","Comments","SetStatus","ApplicableRules","SectionSequence","Interpretation"]];
        const tableData = rowData.map(item => [
          item.id,
          item.CheckupSectionName,
          item.Description,
          item.Notes,
          item.Comments,
          item.SetStatus,
          item.ApplicableRules,
          item.SectionSequence,
          item.Interpretation,
          
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
        doc.save("CheckupSectionMasterList.pdf");
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
            id: 10,
            CheckupSectionName: 15,
            Description: 20,
            Notes: 20,
            Comments: 15,
            SetStatus: 15,
            ApplicableRules: 20,
            SectionSequence: 15,
            Interpretation: 15,
          
      };
  
        sheet.columns = [
          { header: "id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "CheckupSectionName", key: 'buName', width: columnWidths.buName, style: headerStyle },
          { header: "Description", key: 'buHeadName', width: columnWidths.buHeadName, style: headerStyle },
          { header: "Notes", key: 'buEmail', width: columnWidths.buEmail, style: headerStyle },
          { header: "Comments", key: 'buId', width: columnWidths.buId, style: headerStyle },
          { header: "SetStatus", key: 'buName', width: columnWidths.buName, style: headerStyle },
          { header: "ApplicableRules", key: 'buHeadName', width: columnWidths.buHeadName, style: headerStyle },
          { header: "SectionSequence", key: 'buEmail', width: columnWidths.buEmail, style: headerStyle },
          { header: "Interpretation", key: 'buEmail', width: columnWidths.buEmail, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                CheckupSectionName: product.CheckupSectionName,
                Description: product.Description,
                Notes: product.Notes,
                Comments: product.Comments,
                SetStatus: product.SetStatus,
                ApplicableRules: product.ApplicableRules,
                SectionSequence: product.SectionSequence,
                Interpretation: product.Interpretation,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'CheckupSectionMasterList.xlsx';
            anchor.click();
            // anchor.URL.revokeObjectURL(url);
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Checkup Section Master">

                <CheckupSectionMasterForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default CheckupSectionMasterList;
