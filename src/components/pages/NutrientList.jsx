import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import NutrientForm from './FoodMasterForm';
// import { VaccineValidationForm } from './Validationform';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from "prop-types";
// new
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as Yup from 'yup';
import EmpHealthDasboard from './EmpHealthDashboard';
import { Link } from 'react-router-dom';

const NutrientValidationForm = Yup.object({
  foodId: Yup.string().required("Please Enter Food Name "),
  calories: Yup.string().required("Please Enter Calories Amount"),
  addedSugar: Yup.string().required("Please Enter Amount of AddedSuger "),
  maida: Yup.string().required("Please Enter The Amount of Maida"),
  quantityInGrams: Yup.string().required("Please  Enter Quantity In Gram"),
  proteins: Yup.string().required("Please Enter Protein Amount"),
  deepFried: Yup.string().required("Please Choose Deep Fried Or Not"),
  saturatedFats: Yup.string().required("Please Enter Amount Of Saturated Fat"),
  
});


const NutrientList = () => {


    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0);

    const [paginationPageSize, setPaginationPageSize] = useState(2);

    const [foodname,setFoodname] = useState([{}]);


    // const [change, setChange] = useState("";)

    // console.log("check",paginationPageSize);

    // Long id, Long foodId, String calories, String addedSugar, String maida,
    //                             String quantityInGrams, String proteins, String deepFried, String saturatedFats) {


    const initialValues = {
        // foodId:"",
        foodname:"",
        calories:"",
        addedSugar:"",
        maida:"",
        quantityInGrams:"",
        proteins:"",
        deepFried:"",
        saturatedFats:"",
        
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
        validationSchema:NutrientValidationForm,
        // onSubmit: (values, action) => {
        //     console.log(values);
        //     action.resetForm();
        //   },
        onSubmit: async (values, {resetForm}) => {

            const fooddish = foodname.find(item => item.label === values.foodname);
            const dishid = fooddish ? fooddish.value : null;
            values['foodId'] = values.foodname;
            delete values.foodname;
            values.foodId = dishid;
        try {
            const response = await axiosClientPrivate.post('/nutrients', values);
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

      

      const handleEdit = async (id) => {
        alert(id);
        try {
          const response = await axiosClientPrivate.get(`/nutrients/${id}`);
            console.log(response.data);

            values.id = response.data.id;
            const updateDish = foodname.find(item => item.value == parseInt(response.data.foodId)).label;
            values.foodname = String(updateDish);


            setFieldValue("id",response.data.id);
            setFieldValue("foodname",String(updateDish));
            setFieldValue("calories",response.data.calories);
            setFieldValue("addedSugar",response.data.addedSugar);
            setFieldValue("maida",response.data.maida);
            setFieldValue("quantityInGrams",response.data.quantityInGrams);
            setFieldValue("proteins",response.data.proteins);
            setFieldValue("deepFried",response.data.deepFried);
            setFieldValue("saturatedFats",response.data.saturatedFats);
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
        values.foodId = foodname.find(item => item.label == String(values.foodname)).value;
        delete values.foodname;
        const update = values;
        try{
             console.log(values);
             await axiosClientPrivate.put(`/nutrients/${id}`,update);
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


     // to delete a row
     const handleDeleteRow = async (id) => {
        alert(id)
       if(window.confirm('Are you sure you want to delete this data?')){
       try {
           await axiosClientPrivate.delete(`/nutrients/${id}`);
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

    
    
    // const paginationPageSizeSelector = [50, 100, 200, 500];
    const pageSizeOptions = [2, 4, 8, 10];

    useEffect(() => {
        const controller = new AbortController();
    
        const getAllOhc = async () => {
            try {
                const response = await axiosClientPrivate.get('http://localhost:8080/foods', { signal: controller.signal });
                const items = response.data.content;
                    console.log("food name :-",items);
    
                    // const newDiagnosisMap = new Map();
                    // items.forEach(item => newDiagnosisMap.set(item.ailmentSysName, item.id));
                    // setBodysystem(newDiagnosisMap);
    
                    // console.log(diagnosisMap.size);
                    // const ailment = items.map((item)=>{
                    //   // diagnosisMap.set(item.id,item.ailmentSysName);
                    //   return item.ailmentSysName;
                    // });
    
                    const foodname = items.map((item)=>{
                      return {label : item.foodName,value : item.id};
                    });
    
                    
                    setFoodname(foodname);
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
                const response = await axiosClientPrivate.get(`http://localhost:8080/nutrients?page=0&size=${paginationPageSize}`, { signal: controller.signal });
                const items = response.data.content;
                    console.log("new",items);
                setRowData(items);

                if(foodname.length>0){
                    items.forEach(obj => {
                        obj.foodId = foodname.find(item => item.value == parseInt(obj.foodId)).label;
                      });
                }
                else{
                    console.log("Not found!");
                }



                if (items.length > 0) {

                    const headerMappings = {
                        vaccineName: "Vaccine Name",
                        vaccineCompany : "Company",
                        vaccineDesc : "Description",
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

    }, [paginationPageSize,foodname,fetchTrigger,axiosClientPrivate]);


     

    const exportpdf = async () => {
        
        const doc = new jsPDF();
        const header = [['Id', 'Food name',"Quantity in grams","Calories","Protein","Added sugar","Deep fried","Maida","Saturated fats"]];
        const tableData = rowData.map(item => [
          item.id,
          item.foodId,
          item.quantityInGrams,
          item.calories,
          item.proteins,
          item.addedSugar,
          item.deepFried,
          item.maida,
          item.saturatedFats,
          
          
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
        doc.save("NutrientList.pdf");
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
            foodId: 20,
            quantityInGrams: 20,
            calories: 25,
            proteins: 20,
            addedSugar: 25,
            deepFried: 25,
            maida: 20,
            saturatedFats: 25,
      };
      
  
        sheet.columns = [
          { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "Food name", key: 'foodId', width: columnWidths.foodId, style: headerStyle },
          { header: "Quantity in grams", key: 'quantityInGrams', width: columnWidths.quantityInGrams, style: headerStyle },
          { header: "Calories", key: 'calories', width: columnWidths.calories, style: headerStyle },
          { header: "Protein", key: 'proteins', width: columnWidths.proteins, style: headerStyle },
          { header: "Added sugar", key: 'addedSugar', width: columnWidths.addedSugar, style: headerStyle },
          { header: "Deep fried", key: 'deepFried', width: columnWidths.deepFried, style: headerStyle },
          { header: "Maida", key: 'maida', width: columnWidths.maida, style: headerStyle },
          { header: "Saturated fats", key: 'saturatedFats', width: columnWidths.saturatedFats, style: headerStyle },          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                foodId: product.foodId,
                quantityInGrams: product.quantityInGrams,
                calories: product.calories,
                proteins: product.proteins,
                addedSugar: product.addedSugar,
                deepFried: product.deepFried,
                maida: product.maida,
                saturatedFats: product.saturatedFats,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'NutrientList.xlsx';
            anchor.click();
            // anchor.URL.revokeObjectURL(url);
        })
    }
   

    // filter
    const [temp,setTemp] = useState("");

    const onFilterChanged = (params) => {
        const filterModel = params.api.getFilterModel();
        setTemp(filterModel)
        // console.log("search string",filterModel);
        // fetchFilteredData(filterModel);
    };

    console.log("tempppp filter",temp);



//  index page
const [index,setIndex] = useState();

// const gridOptions = useMemo(() => ({
    
//     // pagination: true,
//     // paginationPageSize: 10,
//     // rowModelType: 'serverSide',
//     // cacheBlockSize: 10,
//     // serverSideStoreType: 'partial',
//     paginationNumberFormatter: (params) => {
//       return `Page ${params.value + 1}`;
//     },
//     // onGridReady: params => {
//     //   params.api.setServerSideDatasource(serverSideDatasource());
//     // },
//     onRowClicked: (event) => {
//         setIndex(event.node.rowIndex);
//     },
//   }), []);


//   const paginationNumberFormatter = useCallback((params) => {
//     return "[" + params.value.toLocaleString() + "]";  
//   }, []);

  console.log("index for next page : ",index);
  
//   console.log("grid api");

    return (
        <>
        <ToastContainer />
            <Box
                className="ag-theme-quartz" 
                style={{ height: '58vh' }}
            >
            <EmpHealthDasboard />
                <Stack sx={{ display: 'flex', flexDirection: 'row' }} marginY={1} paddingX={1}>
                <ButtonGroup variant="contained" aria-label="Basic button group" >
                <Link to="/PatientAndContact/:id">
                <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />} sx={{marginRight : "5px",}} >
                Patient Profile
               </Button>
               </Link>
               <Link to="/PatientAndContact/:id">
                <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />} sx={{marginRight : "5px"}} >
                    Contact
                </Button>
                </Link>
                </ButtonGroup>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '250px' }}>
                    <Button variant="contained" endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => { setOpenPopup(true) }} sx={{marginRight : "5px"}}>Add New</Button>
                    <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon/>}>PDF</Button>
                    <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>} sx={{marginLeft : "5px"}}>Excel</Button>
                </div>
                
                 
                </Stack>
                <Box
      className="ag-theme-alpine"
      style={{
        height: '100%', // Set the height
        width: '100%'    // Set the width
      }}
    >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    animateRows={true} 
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={pageSizeOptions}
                  //  Sx={{height:'100%',width: '100%'}}
                    onPaginationChanged={(event) => {
                        setPaginationPageSize(event.api.paginationGetPageSize());
                        setIndex(event.api.paginationGetCurrentPage());
                    }}
                    
                    onFilterChanged={onFilterChanged}
                    // paginationNumberFormatter={paginationNumberFormatter}
                    // onGridReady={(params) => {
                    //     params.api.paginationGoToPage(currentPageIndex);
                    // }}
                    // paginationTotalRowCount = {200}
                    // paginationGetPageSize = {200}
                    
                />
  </Box>
            </Box>

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Nutrition Master">

                <NutrientForm foodname={foodname} values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default NutrientList;
