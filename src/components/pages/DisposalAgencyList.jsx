import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';

//import { DisposalAgencyValidationForm } from './Validationform';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DisposalAgencyForm from './DisposalAgencyForm';
import * as Yup from 'yup';

const DisposalAgencyValidationForm = Yup.object({
  
    agencyName: Yup.string().required("Please enter agency Name"),
    agencyAddress: Yup.string().required("Please enter Agency Address"),
    registrationNo: Yup.string().required("Please enter registration no."),
    allocationRegNo: Yup.string().required("Please enter allocation"),
    hodName: Yup.string().required("Please enter hod name"),
    hodEmail: Yup.string().required("Please enter hod mail"),
    
  });

const DisposalAgencyList = () => {


    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();
    
    const [id,setId] = useState(1);
    
    const [showupdate,setShowupdate] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0);


    const initialValues = {
        agencyName: "",

        agencyAddress: "",
        registrationNo: "",
        allocationRegNo: "",
        hodName: "",
        hodEmail: "",
        modifiedBy:"",

        agencyaddress: "",
        registrationno: "",
        allocation: "",
        hodname: "",
        hodemail: ""

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
        validationSchema: DisposalAgencyValidationForm,
        // onSubmit: (values, action) => {
        //     console.log(values);
        //     action.resetForm();
        //   },
        onSubmit: async (values, {resetForm}) => {
        try {
            const response = await axiosClientPrivate.post('/disposal-agencies', values);
            toast.success("Saved Successfully!",{
                position:"top-center"
             }); 
                   // getting id(key,value) of last index
            //     const id = rowData[rowData.length-1].registrationno;
            //     const obj = {
            //         registrationno : id+1,
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
          const response = await axiosClientPrivate.get(`/disposal-agencies/${id}`);
            console.log(response.data);
            setFieldValue("agencyName",response.data.agencyName);

            setFieldValue("agencyAddress",response.data.agencyAddress);
            setFieldValue("registrationNo",response.data.registrationNo);
            setFieldValue("allocationRegNo",response.data.allocationRegNo);
            setFieldValue("hodName",response.data.hodName);
            setFieldValue("hodEmail",response.data.hodEmail);

            setFieldValue("buHeadName",response.data.buHeadName);
            setFieldValue("buId",response.data.buId);
            setFieldValue("buName",response.data.buName);

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
             await axiosClientPrivate.put(`/disposal-agencies/${id}`,update);
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


     // to delete a row
     const handleDeleteRow = async (id) => {
        alert(id)
       if(window.confirm('Are you sure you want to delete this data?')){
       try {
           await axiosClientPrivate.delete(`/disposal-agencies/${id}`);
        //    setRowData(prevData => prevData.filter(row => row.registrationno !== id));
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
                const response = await axiosClientPrivate.get('disposal-agencies', { signal: controller.signal });
                const items = response.data.content;
                    // console.log(items);

                setRowData(items);
                if (items.length > 0) {
                    const headerMappings = {
                        agencyName: "Agency Name",
                        agencyAddress : "Agency Address",
                        registrationNo : "Registration No",
                        allocationRegNo : "Allocation",
                        hodName : "HOD Name",
                        hodEmail : "HOD Email",
                    };
                   const  columns = Object.keys(items[0]).map(key => ({
                        field: key,
                        headerName:headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                       // filter: true,
                        floatingFilter: true,
                        sortable: true,
                        filter: 'agTextColumnFilter' ,
                        width: key === 'id' ? 100 : undefined,
                 
                    }));

                    columns.unshift({
                        field: "Actions", cellRenderer:  (params) =>{
                            const id = params.data.registrationno;
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
        const header = [['Agency Name', 'Agency Address', 'Registration No.', 'Allocation','HOD Name','HOD Email']];
        const tableData = rowData.map(item => [
          item.agencyName,
          item.agencyAddress,
          item.registrationNo,
          item.allocationRegNo,
          item.hodnNme,
          item.hodEmail,
          item.id,
          item.agencyName,
          item.buHeadName,
          item.buEmail,
          item.agencyName,
          item.buHeadName,
          item.buEmail,
          
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
        doc.save("DisposalAgencyList.pdf");
    };


    const exportExcelfile = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        
        const headerStyle = {
          
          alignment: { horizontal: 'center' }
          
      };
  
      sheet.getRow(1).font = { bold: true };
        
        const columnWidths = {
            agencyName: 20,
            agencyAddress: 15,
            registrationNo:20,
            allocationRegNo: 20,
            hodName: 15,
            hodEmail: 25,
      };
  
        sheet.columns = [
          { header: "Agency Name", key: 'agencyName', width: columnWidths.agencyName, style: headerStyle },
          { header: "Agency Address", key: 'agencyAddress', width: columnWidths.agencyAddress, style: headerStyle },
          { header: "Registration No.", key: 'registrationNo', width: columnWidths.registrationNo, style: headerStyle },
          { header: "Allocation", key: 'allocationRegNo', width: columnWidths.allocationRegNo, style: headerStyle },
          { header: "HOD  Name", key: 'hodName', width: columnWidths.hodName, style: headerStyle },
          { header: "HOD Email", key: 'hodEmail', width: columnWidths.hodEmail, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                agencyName: product.agencyName,
                agencyAddress: product.agencyAddress,
                registrationNo: product.registrationNo,
                allocationRegNo: product.allocationRegNo,
                hodName: product.hodName,
                hodEmail: product.hodEmail,
                id: product.id,
                buName: product.buName,
                buHeadName: product.buHeadName,
                buEmail: product.buEmail,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'DisposalAgencyList.xlsx';
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Disposal Agency Form">

                <DisposalAgencyForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default DisposalAgencyList;