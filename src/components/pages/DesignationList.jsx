import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import DesignationForm from './DesignationForm';
//import { designationForm } from './Validationform';
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

const designationForm = Yup.object({
  designationName: Yup.string().min(2).max(25).required("Please enter Designation Name"),
  designationDesc: Yup.string().min(2).max(25).required("Please enter Designation Description"),
  designationCode: Yup.string().min(2).max(25).required("Please enter DesignationCode"),
  designationCollar: Yup.string().required("Please enter Designation Collar"),
    
});


const DesignationList = () => {

    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0);


    const initialValues = {
       

        designationName: "",
        designationCode: "",
        designationDesc: "",
        designationCollar: ""
    
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
        validationSchema: designationForm,
        // onSubmit: (values, action) => {
        //     console.log(values);
        //     action.resetForm();
        //   },
          onSubmit: async (values, {resetForm}) => {
            try {
                 await axiosClientPrivate.post('/designations', values);
                toast.success("Saved Successfully!",{
                    position:"top-center"
                 }); 
                       // getting id(key,value) of last index
                //     const id = rowData[rowData.length-1].id;
                //     console.log(id);
                //     const obj = {
                //         id : id+1,
                //         ...values
                //     }
                //  console.log(obj);
                //  setRowData(rowData => [...rowData, obj]);
                setFetchTrigger(prev => prev+1);

                console.log('Response:', obj);
                resetForm();
              } catch (error) {
                console.log(values);
                console.error('Error:', error);
              }
            },
      });

      const handleDeleteRow = async (id) => {
        //alert(id)
       if(window.confirm('Are you sure you want to delete this data?')){
       try {
           await axiosClientPrivate.delete(`/designations/${id}`);
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
                const response = await axiosClientPrivate.get('designations', { signal: controller.signal });
                const items = response.data.content;
                     console.log("fetch" ,items);
                
                if (items.length > 0) {

                    const headerMappings = {
                      designationName: "Designation Name",
                      designationCode : "Designation Code",
                      designationDesc : "Designation Description",
                      designationCollar : "Designation Collar",
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
       // alert(id);
        try {
          const response = await axiosClientPrivate.get(`/designations/${id}`);
            // console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("designationName",response.data.designationName);
            setFieldValue("designationCode",response.data.designationCode);
            setFieldValue("designationDesc",response.data.designationDesc);
            setFieldValue("designationCollar",response.data.designationCollar);
            setFieldValue("lastModified", response.data.lastModified);
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
             await axiosClientPrivate.put(`/designations/${id}`,update);
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

      const exportpdf = async () => {
        const doc = new jsPDF();
        const header = [['Id', 'Designation Name',"Designation code","Designation Desc","Designation Collar"]];
        const tableData = rowData.map(item => [
          item.id,
          item.designationName,
          item.designationCode,
          item.designationDesc,
          item.designationCollar
          
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
        doc.save("DesignationList.pdf");
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
            designationName: 20,
            designationCode: 15,
            designationDesc: 25,
            designationCollar: 25,
      };
        sheet.columns = [
          { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "Designation Name", key: 'designationName', width: columnWidths.designationName, style: headerStyle },
          { header: "Designation code", key: 'designationCode', width: columnWidths.designationCode, style: headerStyle },
          { header: "Designation Desc", key: 'designationDesc', width: columnWidths.designationDesc, style: headerStyle },
          { header: "Designation Collar", key: 'designationCollar', width: columnWidths.designationCollar, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                designationName: product.designationName,
                designationCode: product.designationCode,
                designationDesc: product.designationDesc,
                designationCollar: product.designationCollar,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'DesignationList.xlsx';
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
                        <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>}>Excel</Button>                    </ButtonGroup>

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

            <Popup showupdate={showupdate} id= {id}  setShowupdate={setShowupdate} handleUpdate={handleUpdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Designation ">

                <DesignationForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default DesignationList;
