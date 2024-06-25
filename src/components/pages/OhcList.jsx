import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import OhcForm from './OhcForm';
import { ValidationForm } from './Validationform';
import {  useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExcelJS from 'exceljs';
// const ExcelJS = require('exceljs');
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from "prop-types";

// import { useMemo } from 'react';

// test
// test
// test
// test
// test
// test



const OhcList = ()=> {

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [rowData, setRowData] = useState([]);

    const axiosClientPrivate = useAxiosPrivate();

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const [paginationPageSize, setPaginationPageSize] = useState(2);
    
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    
    const [paginationTotalRowCount, setPaginationTotalRowCount] = useState(0);  // need to getallOhc
   
    // const [data, setData] = useState([]);// I added

    // const pageSizeOptions = [50, 100, 200, 500];
    const pageSizeOptions = [2, 4, 8, 10];

    const [fetchTrigger, setFetchTrigger] = useState(0);




    let initialValues = {
        ohcName: "",
        ohcCode: "",
        ohcDescription: "",
        address: "",
        state: "",
        fax: "",
        primaryPhone: "",
        primaryEmail: "",
        pinCode: "",
        ohcType: "",
        ohcLogo: "",
        ohcLogoType: "",
        iconColor: "",
        iconText: "",
        ohcCategory: "",
        lastModified: "",
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
        resetForm
      } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationForm,
        onSubmit: async (values, {resetForm}) => {
        try {
                 await axiosClientPrivate.post('/ohcs', values);
                 toast.success("Saved Successfully!",{
                    position:"top-center"
                 });
                //  setRowData(prevRowData => [...prevRowData, values]);
                //  setRowData(rowData => [...rowData, values]);
                setFetchTrigger(prev => prev+1);

                 console.log(values);
                 resetForm();
          } catch (error) {
            console.log(values);
            console.error('Error:', error);
          }
        },
      });

      const CustomActionComponent = ({id}) => {
        CustomActionComponent.propTypes = {
            id: PropTypes.number.isRequired,
          };
        return <div> <Button onClick={() =>  handleEdit(id)} > <EditNoteRoundedIcon /></Button>
           <Button color="error" onClick={() => handleDeleteRow(id)}> <DeleteSweepRoundedIcon /> </Button> </div>
    
    };


// to fetch data
useEffect(() => {

  const controller = new AbortController();

  const getAllOhc = async () => {
      try {
          const response = await axiosClientPrivate.get(`http://localhost:8080/ohcs?page=${currentPageIndex}&size=${paginationPageSize}`, { signal: controller.signal });
             console.log(response)
          const items = response.data.content;
                console.log("fetch");
                console.log(items);
                setRowData(items);
                setPaginationTotalRowCount(items.length);

          if (items.length > 0) {
              const headerMappings = {
                ohcName: "Ohc Name",
                ohcCode : "Ohc Code",
                ohcDescription : "Ohc Description",
                address : "Address",
                state : "State",
                fax : "Fax",
                primaryPhone : "Primary Phone",
                primaryEmail : "Primary Email",
                pinCode : "PinCode",
                ohcType : "Ohc Type",
                ohcLogo : "Ohc Logo",
                ohcLogoType : "Ohc Logo Type",
                iconColor : "Icon Color",
                iconText : "Icon Text",
                ohcCategory : "Ohc Category",
                lastModified : "Last Modified",
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
                  field: "Actions", cellRenderer:  (params) =>{
                      const id = params.data.id;
                      return <CustomActionComponent id={id} />
                  }
              });

              setColDefs(columns);
          }

          // setRowData(items);

      } catch (err) {

          console.error("Failed to fetch data: ", err);
          setRowData([]);
      }
  };

  getAllOhc();

  return () => {
      controller.abort();
  };




}, [fetchTrigger,axiosClientPrivate]);

  
   



    
const handleEdit = async (id) => {
  try {
    const response = await axiosClientPrivate.get(`/ohcs/${id}`);
      console.log(response.data);
      setFieldValue("id",response.data.id);
      setFieldValue("ohcName",response.data.ohcName);
      setFieldValue("ohcCode",response.data.ohcCode);
      setFieldValue("ohcDescription",response.data.ohcDescription);
      setFieldValue("address", response.data.address);
      setFieldValue( "state", response.data.state);
      setFieldValue("fax", response.data.fax);
      setFieldValue("primaryPhone", response.data.primaryPhone);
      setFieldValue("primaryEmail", response.data.primaryEmail);
      setFieldValue("pinCode", response.data.pinCode);
      setFieldValue("ohcType", response.data.ohcType);
      setFieldValue("ohcLogo", response.data.ohcLogo);
      setFieldValue("ohcLogoType", response.data.ohcLogoType);
      setFieldValue("iconColor", response.data.iconColor);
      setFieldValue("iconText", response.data.iconText);
      setFieldValue("ohcCategory", response.data.ohcCategory);
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
  const update = values;
  try{
       console.log(values);
       await axiosClientPrivate.put(`/ohcs/${id}`,update);
       toast.success("Updated Successfully!",{
          position:"top-center",
          autoClose: 3000,
       });
       resetForm();
       setFetchTrigger(prev => prev+1);

  }
  catch(err){
      console.log(values);
      console.log(err);
  }
}


// to delete a row
        const handleDeleteRow = async (id) => {
             // alert(id)
            if(window.confirm('Are you sure you want to delete this data?')){
            try {
                await axiosClientPrivate.delete(`/ohcs/${id}`);
                // setRowData(prevData => prevData.filter(row => row.id !== id));
                setFetchTrigger(prev => prev+1);

            } catch (error) {
                console.error('Error deleting row:', error);
            }
        }
        };

    
  const exportpdf = async () => {
      
      const doc = new jsPDF();
      const header = [['Id', 'Ohc Name',"Ohc Code","Ohc Description","Address","State","Fax","Primary Phone","Primary Email","Pin Code","Ohc Type","Icon Color","Icon Text","Ohc Category"]];
      const tableData = rowData.map(item => [
        item.id,
        item.ohcName,
        item.ohcCode,
        item.ohcDescription,
        item.state,
        item.fax,
        item.primaryPhone,
        item.primaryEmail,
        item.ohcType,
        item.iconColor,
        item.iconText,
        item.OhcCategory,
        
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
      doc.save("OhcList.pdf");
  };


  // For Excel
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
        ohcName: 20,
        ohcCode: 15,
        ohcDescription: 25,
        state: 15,
        fax: 15,
        primaryPhone: 15,
        primaryEmail: 26,
        pinCode: 10,
        ohcType: 15,
        iconColor: 15,
        iconText: 15,
        OhcCategory: 15
    };

      sheet.columns = [
        { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
        { header: "Ohc Name", key: 'ohcName', width: columnWidths.ohcName, style: headerStyle },
        { header: "Ohc Code", key: 'ohcCode', width: columnWidths.ohcCode, style: headerStyle },
        { header: "Ohc Description", key: 'ohcDescription', width: columnWidths.ohcDescription, style: headerStyle },
        { header: "Address", key: "address", width: columnWidths.address, style: headerStyle },
        { header: "State", key: 'state', width: columnWidths.state, style: headerStyle },
        { header: "Fax", key: 'fax', width: columnWidths.fax, style: headerStyle },
        { header: "Primary Phone", key: 'primaryPhone', width: columnWidths.primaryPhone, style: headerStyle },
        { header: "Primary Email", key: 'primaryEmail', width: columnWidths.primaryEmail, style: headerStyle },
        { header: "Pin Code", key: "pinCode", width: columnWidths.pinCode, style: headerStyle },
        { header: "Ohc Type", key: 'ohcType', width: columnWidths.ohcType, style: headerStyle },
        { header: "Icon Color", key: 'iconColor', width: columnWidths.iconColor, style: headerStyle },
        { header: "Icon Text", key: 'iconText', width: columnWidths.iconText, style: headerStyle },
        { header: "Ohc Category", key: 'OhcCategory', width: columnWidths.OhcCategory, style: headerStyle }
    ];

      rowData.map(product =>{
          sheet.addRow({
              id: product.id,
              ohcName: product.ohcName,
              ohcCode: product.ohcCode,
              ohcDescription: product.ohcDescription,
              state: product.state,
              fax: product.fax,
              primaryPhone: product.primaryPhone,
              primaryEmail: product.primaryEmail,
              ohcType: product.ohcType,
              iconColor: product.iconColor,
              iconText: product.iconText,
              OhcCategory: product.OhcCategory,
          })
      });

      workbook.xlsx.writeBuffer().then(data => {
          const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'OhcList.xlsx';
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
                        <Button variant="contained" endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => { setOpenPopup(true) }}>Add New</Button>
                        <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon/>}>PDF</Button>
                        <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>}>Excel</Button>
                    </ButtonGroup>

                </Stack>
                <AgGridReact
                   
                    // data={data} //I changed
                    rowData={rowData}
                    columnDefs={colDefs}
                    animateRows={true} // Optional: adds animation to row changes
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={pageSizeOptions}
                    paginationTotalRowCount={paginationTotalRowCount}
                    // domLayout='autoHeight'
                    onGridReady={(params) => {
                        params.api.paginationGoToPage(currentPageIndex);
                    }}
                    onPaginationChanged={(event) => {
                    setPaginationPageSize(event.api.paginationGetPageSize());
                    // setCurrentPageIndex(0);
                    // setCurrentPageIndex(event.api.paginationGetCurrentPage() + 1);
                    }}
                />
            </Box>

            <Popup handleUpdate={handleUpdate} setShowupdate={setShowupdate} showupdate={showupdate}   id= {id} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Fill The Details To Add New Ohc">

                <OhcForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default OhcList;
