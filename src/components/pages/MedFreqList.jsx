import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import MedFreqForm from './MedFreqForm';
// import { MedValidationForm } from './Validationform';
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
// new
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// public record MedicineFrequencyDto(Long id, String medicineFrequency, String frequencyDescription, Float qty, String displayOrder, Integer active, Integer isDefault) {


import * as Yup from 'yup';


const MedValidationForm = Yup.object({

    medicineFrequency: Yup.string().required("Please enter medicine frequency"),
    frequencyDescription: Yup.string().required("Please enter description"),
    qty: Yup.string().required("Please enter calculated city"),
    displayOrder: Yup.string().required("Please enter display order"),
  });




const MedFreqList = () => {

    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0);

    const [paginationPageSize, setPaginationPageSize] = useState(50);

    const pagination = true;
    // const paginationPageSize = 50;
    const paginationPageSizeSelector = [50, 100, 200, 500];

    const initialValues = {
        medicineFrequency:"",
        frequencyDescription: "",
        qty:"",
        displayOrder: "",
        active:"",
        isDefault: ""
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

        validationSchema: MedValidationForm,

        // onSubmit: (values, action) => {
        //     console.log(values);
        //     action.resetForm();
        //   },
        onSubmit: async (values, {resetForm}) => {
            try {
                const response = await axiosClientPrivate.post('/medicine-frequencies', values);
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


    // const handleDelete = (id)=>{
    //         // alert("Delete item!")
    //         alert(id);
    // } 

    // to delete a row
    const handleDeleteRow = async (id) => {
        alert(id)
       if(window.confirm('Are you sure you want to delete this data?')){
       try {
           await axiosClientPrivate.delete(`/medicine-frequencies/${id}`);
        //    setRowData(prevData => prevData.filter(row => row.buId !== id));
        setFetchTrigger(prev => prev+1);

       } catch (error) {
           console.error('Error deleting row:', error);
       }
   }
   };



    const handleEdit = async (id) => {
        alert(id);
        try {
          const response = await axiosClientPrivate.get(`/medicine-frequencies/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("medicineFrequency",response.data.medicineFrequency);
            setFieldValue("frequencyDescription",response.data.frequencyDescription);
            setFieldValue("qty",response.data.qty);
            setFieldValue("displayOrder",response.data.displayOrder);
            setFieldValue("active",response.data.active);
            setFieldValue("isDefault",response.data.isDefault);
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
             await axiosClientPrivate.put(`/medicine-frequencies/${id}`,update);
             toast.success("Updated Successfully!",{
                position:"top-center",
                autoClose: 3000,
             });
             resetForm();
            // setRowData(rowData => [...rowData,values]);
            setFetchTrigger(prev => prev+1);

        }
        catch(err){
            console.log(values);
            console.log(err);
        }
      }


      const CustomActionComponent = ({id}) => {
        CustomActionComponent.propTypes = {
            id: PropTypes.number.isRequired,
          };
        return <div> <Button onClick={() =>  handleEdit(id)} > <EditNoteRoundedIcon /></Button>
           <Button color="error" onClick={() => handleDeleteRow(id)}> <DeleteSweepRoundedIcon /> </Button> </div>
    
    };
    

   

    useEffect(() => {
        const controller = new AbortController();

        const getAllOhc = async () => {
            try {
                const response = await axiosClientPrivate.get(`http://localhost:8080/medicine-frequencies?page=0&size=${paginationPageSize}`, { signal: controller.signal });
                const items = response.data.content;
                    // console.log("new",items);
                setRowData(items);

                if (items.length > 0) {

                    const headerMappings = {

                        medicineFrequency: "Medicine frequency",
                        frequencyDescription: "Description",
                        qty: "calculatedCity",
                        displayOrder: "displayOrder",
                        active: "status",
                        isDefault: "select default",


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

    }, [paginationPageSize,fetchTrigger,axiosClientPrivate]);


    const exportpdf = async () => {
        
        const doc = new jsPDF();
        const header = [['Id', 'MEDICINE FREQUENCY',"DESCRIPTION","DAILY CALCULATED QTY","DISPLAY ORDER","STATUS","IS DEFAULT"]];
        const tableData = rowData.map(item => [
          item.id,
          item.medicineFrequency,
          item.frequencyDescription,
          item.qty,
          item.displayOrder,
          item.active,
          item.isDefault,
          
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

        doc.save("MedFreqList.pdf");

    };

    const exportExcelfile = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
  
        const headerStyle = {
          alignment: { horizontal: 'center' }
          
      };
  
      sheet.getRow(1).font = { bold: true };
        
        const columnWidths = {
            id: 10,
            medicineFrequency: 20,
            frequencyDescription: 20,
            qty: 25,
            displayOrder: 20,
            active: 20,
            isDefault: 25,
      };
      
  
        sheet.columns = [
          { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "MEDICINE FREQUENCY", key: 'medicineFrequency', width: columnWidths.medicineFrequency, style: headerStyle },
          { header: "DESCRIPTION", key: 'frequencyDescription', width: columnWidths.frequencyDescription, style: headerStyle },
          { header: "DAILY CALCULATED QTY", key: 'qty', width: columnWidths.qty, style: headerStyle },
          { header: "DISPLAY ORDER", key: 'displayOrder', width: columnWidths.displayOrder, style: headerStyle },
          { header: "STATUS", key: 'active', width: columnWidths.active, style: headerStyle },
          { header: "IS DEFAULT", key: 'isDefault', width: columnWidths.isDefault, style: headerStyle },

      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                medicineFrequency: product.medicineFrequency,
                frequencyDescription: product.frequencyDescription,
                qty: product.qty,
                displayOrder: product.displayOrder,
                active: product.active,
                isDefault: product.isDefault,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;

            anchor.download = 'MedFreqList.xlsx';

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

                <Stack sx={{ display: 'flex', flexDirection: 'row' }} marginY={1} paddingX={1}>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => { setOpenPopup(true) }}>Add New</Button>
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Medicine Frequency">

                <MedFreqForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default MedFreqList;
