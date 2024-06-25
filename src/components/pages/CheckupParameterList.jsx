import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import { CheckupParameterValidationForm } from './Validationform';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CheckupParameterForm from './CheckupParameterForm';
import PropTypes from "prop-types";
//import MultipleSelect from '../common/MultipleSelect';
//import TextField from '@mui/material';
const CheckupParameterList = () => {


    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0);

    const initialValues = {
        
        cpname: "",
        healthkeyname:"",
        startingrange:"",
        endingrange:"",
        lessrisk:"",
        morerisk:"",
        lessadvice:"",
        moreadvice:"",
        section:"",
        columnorder:"",
        placeholder:"",
        parametervaluename:"",
        inputtype:"",
        checkuptype:"",
        status:"",
        edit:"",
        selectunit:"",
        refrange:"",
        opd:"",
        daycare:"",
        injury:"",
        rangerule:"",
        parent:"",
        mandatory:"",
        default:"",
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
        validationSchema: CheckupParameterValidationForm,
        onSubmit: async (values, {resetForm}) => {
        try {
            const response = await axiosClientPrivate.post('/medicallist', values);
            toast.success("Saved Successfully!",{
                position:"top-center"
             }); 
                   // getting id(key,value) of last index
               // const id = rowData[rowData.length-1].buId;
              //  const obj = {
                  //  buId : id+1,
                   // ...values
             //   }
             //console.log(obj);
             //setRowData(rowData => [...rowData, obj]);
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
          const response = await axiosClientPrivate.get(`/business-units/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("cpname",response.data.cpname);
            setFieldValue(" healthkeyname",response.data. healthkeyname);
            setFieldValue("startingrange",response.data.startingrange);
            setFieldValue("endingrange",response.data.endingrange);
            setFieldValue("lessrisk", response.data.lessrisk);
            setFieldValue("morerisk", response.data.morerisk);

            setFieldValue("lessadvice",response.data.lessadvice);
            setFieldValue("moreadvice",response.data.moreadvice);
            setFieldValue("section",response.data.section);
            setFieldValue("columnorder",response.data.columnorder);
            setFieldValue("placeholder", response.data.placeholder);
            setFieldValue("parametervaluename", response.data.parametervaluename);

            setFieldValue("inputtype",response.data.inputtype);
            setFieldValue("checkuptype",response.data.checkuptype);
            setFieldValue("status",response.data.status);
            setFieldValue("edit",response.data.edit);
            setFieldValue("selectunit", response.data.selectunit);
            setFieldValue("refrange", response.data.refrange);

            setFieldValue("opd",response.data.opd);
            setFieldValue("daycare",response.data.daycare);
            setFieldValue("injury",response.data.injury);
            setFieldValue("rangerule",response.data.rangerule);
            setFieldValue("parent",response.data.parent);
            setFieldValue("mandatory",response.data.mandatory);
            setFieldValue("default",response.data.default);
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
      //  alert(id);
        const update = values;
        try{
             console.log(values);
             await axiosClientPrivate.put(`/medicalitem/${id}`,update);
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
       // alert(id)
       if(window.confirm('Are you sure you want to delete this data?')){
       try {
           await axiosClientPrivate.delete(`/business-units/${id}`);
           //setRowData(prevData => prevData.filter(row => row.buId !== id));
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
                const items = response.data.content;
                    // console.log(items);
                setRowData(items);
                if (items.length > 0) {

                    const headerMappings = {
                        cpname: "Checkup Name",
                        healthkeyname : "Health key name",
                        startingrange : "Starting range",
                        endingrange : "Ending range",
                        lessrisk : "Lessrisk",
                        morerisk : "Morerisk",
                        lessadvice : "Less advice",
                        moreadvice : "More advice",
                        section : "Section",
                        columnorder : "Columnorder",
                        parametervaluename : "Parameter value name",
                        inputtype : "Input type",
                        status : "Status",
                        edit : "Edit",
                        selectunit : "Select Unit",
                        refrange : "Ref Range",
                        opd : "Opd",
                        daycare : "Day care",
                        injury : "Injury",
                        rangerule : "Rangerule",
                        parent : "Parent",
                        mandatory : "Mandatory",
                        default : "Default",
                        lastModified : "LastModified",
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
        const header = [['Id','Cp Name', 'Health Key Name',"Starting Range","Ending Range","Less Risk","More Risk","Less Advice","More Advice","Section","Column Order"
        ,"Place Holder","Parameter Value Name","Input Type","Checkup Type","Status","Edit","Select Unit","Refrange","OPD","Day Care","Injury"
      ,"Range Rule","Parent","Mandatory","Default" ]];
        const tableData = rowData.map(item => [
            item.id,
            item.cpname,
            item.healthkeyname,
            item.startingrange,
            item.endingrange,
            item.lessrisk,
            item.morerisk,
            item.lessadvice,
            item.moreadvice,
            item.section,
            item.columnorder,
            item.placeholder,
            item.parametervaluename,
            item.inputtype,
            item.checkuptype,
            item.status,
            item.edit,
            item.selectunit,
            item.refrange,
            item.opd,
            item.daycare,
            item.injury,
            item.rangerule,
            item.parent,
            item.mandatory,
            item.default,
          
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
        doc.save("CheckupParameterList.pdf");
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
            cpname: 20,
            healthkeyname: 20,
            startingrange: 20,
            endingrange: 20,
            lessrisk: 20,
            morerisk: 20,
            lessadvice: 20,
            moreadvice: 20,
            section: 20,
            columnorder: 20,
            placeholder: 20,
            parametervaluename: 20,
            inputtype: 20,
            checkuptype: 20,
            status: 20,
            edit: 20,
            selectunit: 20,
            refrange: 20,
            opd: 10,
            daycare: 10,
            injury: 10,
            rangerule: 20,
            parent: 20,
            mandatory: 20,
            default: 20,
           
            
      };
  
        sheet.columns = [
          { header: "id", key: 'buId', width: columnWidths.buId, style: headerStyle },
          { header: "Cp Name", key: 'cpname', width: columnWidths.cpname, style: headerStyle },
          { header: "Health Key Name", key: 'healthkeyname', width: columnWidths.healthkeyname, style: headerStyle },
          { header: "Starting Range", key: 'startingrange', width: columnWidths.startingrange, style: headerStyle },

          { header: "Ending Range", key: 'endingrange', width: columnWidths.endingrange, style: headerStyle },
          { header: "Less Risk", key: 'lessrisk', width: columnWidths.lessrisk, style: headerStyle },
          { header: "More Risk", key: 'morerisk', width: columnWidths.morerisk, style: headerStyle },
          { header: "Less Advice", key: 'lessadvice', width: columnWidths.lessadvice, style: headerStyle },

          { header: "More Advice", key: 'moreadvice', width: columnWidths.moreadvice, style: headerStyle },
          { header: "Section", key: 'section', width: columnWidths.section, style: headerStyle },
          { header: "Column Order", key: 'columnorder', width: columnWidths.columnorder, style: headerStyle },
          { header: "Place Holder", key: 'placeholder', width: columnWidths.placeholder, style: headerStyle },

          { header: "Parameter Value Name", key: 'parametervaluename', width: columnWidths.parametervaluename, style: headerStyle },
          { header: "Input Type", key: 'inputtype', width: columnWidths.inputtype, style: headerStyle },
          { header: "Checkup Type", key: 'checkuptype', width: columnWidths.checkuptype, style: headerStyle },
          { header: "Status", key: 'status', width: columnWidths.status, style: headerStyle },
          

          { header: "Edit", key: 'edit', width: columnWidths.edit, style: headerStyle },
          { header: "Select Unit", key: 'selectunit', width: columnWidths.selectunit, style: headerStyle },
          { header: "Refrange", key: 'refrange', width: columnWidths.refrange, style: headerStyle },
          { header: "OPD", key: 'opd', width: columnWidths.opd, style: headerStyle },

          { header: "Day Care", key: 'daycare', width: columnWidths.daycare, style: headerStyle },
          { header: "Injury", key: 'injury', width: columnWidths.injury, style: headerStyle },
          { header: "Range Rule", key: 'rangerule', width: columnWidths.rangerule, style: headerStyle },
          { header: "Parent", key: 'parent', width: columnWidths.parent, style: headerStyle },
          { header: "Mandatory", key: 'mandatory', width: columnWidths.mandatory, style: headerStyle },
          { header: "Default", key: 'default', width: columnWidths.default, style: headerStyle },
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                cpname: product.cpname,
                healthkeyname: product.healthkeyname,
                startingrange: product.startingrange,
                endingrange: product.endingrange,
                lessrisk: product.lessrisk,
                morerisk: product.morerisk,
                lessadvice: product.lessadvice,
                moreadvice: product.moreadvice,
                section: product.section,
                columnorder: product.columnorder,
                placeholder: product.placeholder,
                parametervaluename: product.parametervaluename,
                inputtype: product.inputtype,
                checkuptype: product.checkuptype,
                status: product.status,
                edit: product.edit,
                selectunit: product.selectunit,
                refrange: product.refrange,
                opd: product.opd,
                daycare: product.daycare,
                injury: product.injury,
                rangerule: product.rangerule,
                parent: product.parent,
                mandatory: product.mandatory,
                default: product.default,
                

              



            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'ChekupParameterList.xlsx';
            anchor.click();
            // anchor.URL.revokeObjectURL(url);
        })
    }
   

    return (
        <>
        <ToastContainer />
            <Box
                className="ag-theme-quartz" 
                style={{ height: 660 }}
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Checkup Parameter Form">

                < CheckupParameterForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default  CheckupParameterList;
