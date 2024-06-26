import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import DiagnosisBSMForm from './DiagnosisBSMForm';
// import { bodysystemForm } from './Validationform';
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
import * as Yup from 'yup';

 const bodysystemForm = Yup.object({
    diagnosis: Yup.string().required("Please enter Diagnosis Name"),
    system: Yup.string().required("Please enter Body System"),
  });

const DiagnosisBSMList = () => {

    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [diagnosis,setDiagnosis]  = useState([{}]);

    const [bodySystem,setBodySystem] = useState([{}]);

    const [fetchTrigger, setFetchTrigger] = useState(0)


    // const [diagnosisMap,setDiagnosisMap] = useState(new Map());
    
    // const [bodySystemMap, setBodySystemMap] = useState(new Map);




    // diagnosisMap.forEach((value, key) => {
    //     console.log(`${key}: ${value}`);
    //   });

    // console.log("map size",diagnosisMap.size);

    const initialValues = {
        diagnosis : '',
        system : '',
        
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
        validationSchema: bodysystemForm,
        // onSubmit: (values, action) => {

        //     const ailment = diagnosis.find(item => item.label === values.diagnosis);
        //     const ailmentid = ailment ? ailment.value : null;
              
        //     const ailmentSystem = bodySystem.find(item => item.label === values.system);
        //     const ailmentSystemid = ailmentSystem ? ailmentSystem.value : null;

        //         const key1 = 'ailmentId';
        //         const key2 = 'ailmentSystemId';
        //         values[key1] = values.diagnosis;
        //         values[key2] = values.system;
        //         delete values.diagnosis;
        //         delete values.system;

        //         values.ailmentId = ailmentid;
        //         values.ailmentSystemId = ailmentSystemid;
        //     console.log("final value",values),
        //     action.resetForm();
        //   },
        onSubmit: async (values, {resetForm}) => {
            
                const ailment = diagnosis.find(item => item.label === values.diagnosis);
                const ailmentid = ailment ? ailment.value : null;
                  
                const ailmentSystem = bodySystem.find(item => item.label === values.system);
                const ailmentSystemid = ailmentSystem ? ailmentSystem.value : null;
    
                    const key1 = 'ailmentId';
                    const key2 = 'ailmentSystemId';
                    values[key1] = values.diagnosis;
                    values[key2] = values.system;
                    delete values.diagnosis;
                    delete values.system;
    
                    values.ailmentId = ailmentid;
                    values.ailmentSystemId = ailmentSystemid;
             
           try {
               const response = await axiosClientPrivate.post('/dignosys-wise-body-systems', values);
               toast.success("Saved Successfully!",{
                   position:"top-center"
                }); 
                      // getting id(key,value) of last index
                //    const id = rowData[rowData.length-1].id;
                    
                //     console.log("new value",values);

                    // values.ailmentId = diagnosis.find(item => item.value == parseInt(values.ailmentId)).label;
                    // values.ailmentSystemId = bodySystem.find(item => item.value == parseInt(values.ailmentSystemId)).label;

                //     console.log("check value",values);

                //    const obj = {
                //        id : id+1,
                //        ...values
                //    }
                // // console.log(obj);
                // setRowData(rowData => [...rowData, obj]);
                console.log('Response:', response.data);
                resetForm();
                setFetchTrigger(prev => prev+1);
             } catch (error) {
            //    console.log(values);
               console.error('Error:', error);
             }
           },
      });

// diagnosis and system 
useEffect(() => {
    const controller = new AbortController();

    const getAllOhc = async () => {
        try {
            const response = await axiosClientPrivate.get('http://localhost:8080/ailment-systems', { signal: controller.signal });
            const items = response.data.content;
                // console.log(items);

                // const newDiagnosisMap = new Map();
                // items.forEach(item => newDiagnosisMap.set(item.ailmentSysName, item.id));
                // setBodysystem(newDiagnosisMap);

                // console.log(diagnosisMap.size);
                // const ailment = items.map((item)=>{
                //   // diagnosisMap.set(item.id,item.ailmentSysName);
                //   return item.ailmentSysName;
                // });

                const ailment = items.map((item)=>{
                  return {label : item.ailmentSysName,value : item.id};
                });

                
                setBodySystem(ailment);
                // console.log(ailment);

        } catch (err) {
            console.error("Failed to fetch data: ", err);
        }
    };

    getAllOhc();

    return () => {
        controller.abort();
    };

}, []);

useEffect(() => {
    const controller = new AbortController();
  
    const getAllOhc = async () => {
        try {
            const response = await axiosClientPrivate.get('http://localhost:8080/ailments', { signal: controller.signal });
            const items = response.data.content;
            //   console.log(items);
  
  
                  // const newDiagnosisMap = new Map();
                  // items.forEach(item => newDiagnosisMap.set(item.ailmentName, item.id));
                  // setDiagnosisMap(newDiagnosisMap);
  
  
              const diagnosisArr = items.map((item)=>{
                return {label : item.ailmentName,value : item.id};
              });
  
            //   console.log("check diagnosis",diagnosisArr);
              setDiagnosis(diagnosisArr);
              
            
            }
     catch (err) {
            console.error("Failed to fetch data: ", err);
        }
    };
  
    getAllOhc();
  
    return () => {
        controller.abort();
    };
  
  }, []);


    // to delete a row
   const handleDeleteRow = async (id) => {
    alert(id)
   if(window.confirm('Are you sure you want to delete this data?')){
   try {
       await axiosClientPrivate.delete(`/dignosys-wise-body-systems/${id}`);
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
                const response = await axiosClientPrivate.get('http://localhost:8080/dignosys-wise-body-systems?page=0&size=50', { signal: controller.signal });
                const items = response.data.content;
                      console.log(items);
                        // can be solved using map also
                        // const diagnosisMapCopy = new Map();
                        // const bodySystemMapCopy = new Map();
                    
                        // diagnosis.forEach(item => {
                        //     diagnosisMap.set( item.value , item.label);
                        // });
                    
                        // bodySystem.forEach(item => {
                        //     bodySystemMap.set(item.value, item.label);
                        //     // console.log();
                        // });

                        // console.log('Diagnosis Map:', Array.from(diagnosisMap.entries()));
                        // console.log('Body System Map:', Array.from(bodySystemMap.entries()));
                    
                        // setDiagnosisMap(diagnosisMap);
                        // setBodySystemMap(bodySystemMap);

                        // const updatedItems =  items.map(item => ({
                        //   ...item,
                        //   ailmentId: diagnosisMap.get(parseInt(item.ailmentId)) ,
                        //   ailmentSystemId: bodySystemMap.get(parseInt(item.ailmentSystemId)),
                        // //   console.log(item.ailmentId)
                        // }));

                        // this way also can be done
                        if(diagnosis.length>0 && bodySystem.length>0){
                            items.forEach(obj => {
                                obj.ailmentId = diagnosis.find(item => item.value == parseInt(obj.ailmentId)).label;
                                obj.ailmentSystemId = bodySystem.find(item => item.value == parseInt(obj.ailmentSystemId)).label;
                                // let ailmentIdObj = diagnosis.find(item => item.value == parseInt(obj.ailmentId));
                                // let ailmentSystemIdObj = bodySystem.find(item => item.value == parseInt(obj.ailmentSystemId));
                                
                                // obj.ailmentId = ailmentIdObj? ailmentIdObj.label : obj.ailmentId;
                                // obj.ailmentSystemId = ailmentSystemIdObj? ailmentSystemIdObj.label : obj.ailmentSystemId;
                              });
                        }
                        else{
                            console.log("Not found!");
                        }
                        

                        // console.log("itemmmm",items);
                    
                if (items.length > 0) {
            
                    const headerMappings = {
                        diagnosis: "Diagnosis",
                        system : "System",
                        
                    };
                   const  columns = Object.keys(items[0]).map(key => ({
                        field: key,
                        headerName: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                        //filter: true,
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

                setRowData(items);

            } catch(err) {
                console.error("Failed to fetch dataaaa: ", err);
                setRowData([]);
            }
        };

        getAllOhc();

        return () => {
            controller.abort();
        };

    }, [fetchTrigger,diagnosis,bodySystem,axiosClientPrivate]);

    const handleEdit = async (id) => {
        alert(id);
        try {
          const response = await axiosClientPrivate.get(`/dignosys-wise-body-systems/${id}`);
            console.log("before",response.data);

            // setFieldValue("id",response.data.id);
            values.id = response.data.id;
            const updateDiagnosis = diagnosis.find(item => item.value == parseInt(response.data.ailmentId)).label;
            const updateailmentSystem = bodySystem.find(item => item.value == parseInt(response.data.ailmentSystemId)).label;
            // console.log("checkkkkk",updateDiagnosis,updateailmentSystem);
            values.diagnosis = String(updateDiagnosis);
            values.system = String(updateailmentSystem);
            
            setFieldValue("diagnosis",String(updateDiagnosis));
            setFieldValue("system",String(updateailmentSystem));
            setFieldValue("lastModified", response.data.lastModified);
            setFieldValue("modifiedBy", response.data.modifiedBy);
            console.log("after",values);
            setId(id);
            setShowupdate(true);
            setOpenPopup(true);
            
        } catch (error) {
          console.error('Error fetching item for edit:', error);
        }
      };

      const handleUpdate = async (id)=> {
        alert(id);
        // console.log("final check",values);
        values.ailmentId = diagnosis.find(item => item.label == String(values.diagnosis)).value;
        values.ailmentSystemId = bodySystem.find(item => item.label == String(values.system)).value;
        delete values.diagnosis;
        delete values.system;
        console.log("final check",values);
        const update = values;
        try{
            //  console.log(values);
             await axiosClientPrivate.put(`/dignosys-wise-body-systems/${id}`,update);
             toast.success("Updated Successfully!",{
                position:"top-center",
                autoClose: 3000,
             });
             setFetchTrigger(prev => prev+1);
             resetForm();
            //  setRowData(rowData => [...rowData,values]);
        }
        catch(err){
            // console.log("after:- ",values);
            console.log(err);
        }
      }

      const exportpdf = async () => {
        
        const doc = new jsPDF();
        const header = [["Id","Diagnosis Name",'BodySystem Name']];
        const tableData = rowData.map(item => [
          item.id,
          item.ailmentId,
          item.ailmentSystemId,
          
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
        doc.save("DiagnosisBSMList.pdf");
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
            ailmentId: 20,
            ailmentSystemId: 25,
        };
  
        sheet.columns = [
          { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "Diagnosis Name", key: 'ailmentId', width: columnWidths.ailmentId, style: headerStyle },
          { header: "BodySystem Name", key: 'ailmentSystemId', width: columnWidths.ailmentSystemId, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                ailmentId: product.ailmentId,
                ailmentSystemId: product.ailmentSystemId,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'DiagnosisBSMList.xlsx';
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Diagnosis Body System Map">

                <DiagnosisBSMForm diagnosis={diagnosis} bodySystem={bodySystem}  values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default DiagnosisBSMList;
