import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import CovidWahMasterForm from './CovidWahMasterForm';
//import {CovidWahMasterValidationForm } from './Validationform';
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

const CovidWahMasterValidationForm = Yup.object({

    hindi: Yup.string().required("Please enter in Hindi"),
    english: Yup.string().required("Please enter in English"),
    seq: Yup.string().required("Please enter Sequence"),
    type: Yup.string().required("Please enter  type"),
  });

const CovidWahMasterList = () => {


    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const initialValues = {
       hindi: "",
       english: "",
       type: "",
       seq:"",
       modifiedBy:"",   
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
        validationSchema: CovidWahMasterValidationForm,
         onSubmit: (values, action) => {
             console.log(values);
             action.resetForm();
          },
        // onSubmit: async (values, {resetForm}) => {
        // try {
        //     const response = await axiosClientPrivate.post('/business-units', values);
        //     toast.success("Saved Successfully!",{
        //         position:"top-center"
        //      }); 
        //            // getting id(key,value) of last index
        //         const id = rowData[rowData.length-1].id;
        //         const obj = {
        //             id : id+1,
        //             ...values
        //         }
        //      console.log(obj);
        //      setRowData(rowData => [...rowData, obj]);
        //     console.log('Response:', response.data);
        //     resetForm();
        //   } catch (error) {
        //     console.log(values);
        //     console.error('Error:', error);
        //   }
        // },
      });



      const handleEdit = async (id) => {
        alert(id);
        try {
          const response = await axiosClientPrivate.get(`/business-units/${id}`);
            console.log(response.data);
            setFieldValue("english",response.data.english);
            setFieldValue("hindi",response.data.hindi);
            setFieldValue("type",response.data.type);
            setFieldValue("seq",response.data.seq);
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
           setRowData(prevData => prevData.filter(row => row.type !== id));
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
                        english: "Question in English",
                        hindi: "Question in Hindi",
                        type: "Select Type",
                        seq: "Sequence",
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
                            const id = params.data.type;
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

    }, []);


     

    const exportpdf = async () => {
        const doc = new jsPDF();
        const header = [["Questions in English","Questions in Hindi","Select Type","Sequence"]];
        const tableData = rowData.map(item => [
          item.english,
          item.hindi,
          item.type,
          item.seq,
          
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
        doc.save("CovidWahMasterList.pdf");
    };


    const exportExcelfile = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
  
        const headerStyle = {

          alignment: { horizontal: 'center' }
          
      };
  
      sheet.getRow(1).font = { bold: true };
        
        const columnWidths = {
            english: 25,
            hindi: 15,
            type: 15,
            seq: 20,
      };
  
        sheet.columns = [
          { header: "Questions in English", key: 'english', width: columnWidths.english, style: headerStyle },
          { header: "Questions in Hindi", key: 'hindi', width: columnWidths.hindi, style: headerStyle },
          { header: "Select Type", key: 'type', width: columnWidths.type, style: headerStyle },
          { header: "Sequence", key: 'seq', width: columnWidths.seq, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                english: product.english,
                hindi: product.hindi,
                type: product.type,
                seq: product.seq,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'CovidWahMasterList.xlsx';
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Covidwah Questionaire Master ">

                <CovidWahMasterForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default CovidWahMasterList;

