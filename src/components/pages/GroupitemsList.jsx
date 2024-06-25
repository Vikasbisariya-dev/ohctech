import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';


import { GroupitemsValidationForm } from './Validationform';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import GroupitemsForm from './GroupitemsForm';
import PropTypes from "prop-types";

const GroupitemsList = () => {


    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0);


    const initialValues = {
       

        itemtype: "",
        itemname:"",
        cost:"",
        item:"",
        convertedquantity:"",
        unit:"",
        delete:"",
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
        validationSchema: GroupitemsValidationForm,
        onSubmit: async (values, {resetForm}) => {
        try {
            const response = await axiosClientPrivate.post('/medicallist', values);
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
       // alert(id);
        try {
          const response = await axiosClientPrivate.get(`/business-units/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("itemName",response.data.itemName);
            setFieldValue("itemCode",response.data.itemCode);
            setFieldValue("category",response.data.category);
            setFieldValue("itemform",response.data.itemform);
            setFieldValue("relatedAilmentSystem", response.data.relatedAilmentSystem);
            setFieldValue("usageCategory", response.data.usageCategory);

            setFieldValue("subClassification",response.data.subClassification);
            setFieldValue("salt",response.data.salt);
            setFieldValue("indication",response.data.indication);
            setFieldValue("contraindication",response.data.contraindication);
            setFieldValue("sideEffect", response.data.sideEffect);
            setFieldValue("interaction", response.data.interaction);

            setFieldValue("medicineprecaution",response.data.medicineprecaution);
            setFieldValue("reorderstorelevel",response.data.reorderstorelevel);
            setFieldValue("ministorelevel",response.data.ministorelevel);
            setFieldValue("minindentlevel",response.data.minindentlevel);
            setFieldValue("maxiindentlevel", response.data.maxiindentlevel);
            setFieldValue("reorderpercentagelevel", response.data.reorderpercentagelevel);

            setFieldValue("isprescription",response.data.isprescription);
            setFieldValue("stauts",response.data.stauts);
            setFieldValue("unitofmesurement",response.data.unitofmesurement);
            setFieldValue("remark",response.data.remark);
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
             await axiosClientPrivate.put(`/medicalitem/${id}`,update);
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
       // alert(id)
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
                const items = response.data.content;
                    // console.log(items);
                setRowData(items);
                if (items.length > 0) {
                   const  columns = Object.keys(items[0]).map(key => ({
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1),
                        filter: true,
                        floatingFilter: true,
                        sortable: true
                    }));

                    columns.unshift({
                        field: "Actions", cellRenderer:  (params) =>{
                            const id = params.data.buId;
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
        const header = [['Id','Item Name', 'Item Code',"Category","Item Form","Related Ailment System","Usage Category","Sub Classification","Salt","Indication","Contraindication"
        ,"Side Effect","Interaction","Medicine Precaution","Reorder Store Level","Mini Store Level","Minindent Level","Maxiindent Level","Reorder Percentage Level","Isprescription","Stauts","Unit of Mesurement"
      ,"Remark" ]];
        const tableData = rowData.map(item => [
            item.Id,
            item.itemName,
            item.itemCode,
            item.category,
            item.itemform,
            item.relatedAilmentSystem,
            item.usageCategory,
            item.subClassification,
            item.salt,
           item. indication,
           item. contraindication,
            item.sideEffect,
            item.interaction,
            item.medicineprecaution,
            item.reorderstorelevel,
            item.ministorelevel,
            item.minindentlevel,
            item.maxiindentlevel,
            item.reorderpercentagelevel,
            item.isprescription,
            item.stauts,
            item.unitofmesurement,
            item.remark,
          
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
        doc.save("GroupitemsList.pdf");
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
           
            itemName: 20,
            itemCode: 15,
            category: 25,
            itemform: 15,
            relatedAilmentSystem: 15,
            usageCategory: 15,
            subClassification: 26,
            salt: 10,
            indication: 15,
            contraindication: 15,
            sideEffect: 15,
            interaction: 15,

            medicineprecaution: 20,
            reorderstorelevel: 15,
            ministorelevel: 25,
            minindentlevel: 15,
            maxiindentlevel: 15,
            reorderpercentagelevel: 15,
            isprescription: 26,
            stauts: 10,
            unitofmesurement: 15,
            remark: 15,
            
      };
  
        sheet.columns = [
          { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "Item Name", key: 'itemName', width: columnWidths.itemName, style: headerStyle },
          { header: "Item Code", key: 'itemCode', width: columnWidths.itemCode, style: headerStyle },
          { header: "Category", key: 'category', width: columnWidths.category, style: headerStyle },

          { header: "Item Form", key: 'itemform', width: columnWidths.itemform, style: headerStyle },
          { header: "Related Ailment System", key: 'relatedAilmentSystem', width: columnWidths.relatedAilmentSystem, style: headerStyle },
          { header: "Usage Category", key: 'usageCategory', width: columnWidths.usageCategory, style: headerStyle },
          { header: "Sub Classification", key: 'subClassification', width: columnWidths.subClassification, style: headerStyle },

          { header: "Salt", key: 'salt', width: columnWidths.salt, style: headerStyle },
          { header: "Indication", key: 'indication', width: columnWidths.indication, style: headerStyle },
          { header: "Contraindication", key: 'contraindication', width: columnWidths.contraindication, style: headerStyle },
          { header: "Side Effect", key: 'sideEffect', width: columnWidths.sideEffect, style: headerStyle },

          { header: "Interaction", key: 'interaction', width: columnWidths.interaction, style: headerStyle },
          { header: "Medicine Precaution", key: 'medicineprecaution', width: columnWidths.medicineprecaution, style: headerStyle },
          { header: "Reorder Store Level", key: 'reorderstorelevel', width: columnWidths.reorderstorelevel, style: headerStyle },
          { header: "Mini Store Level", key: 'ministorelevel', width: columnWidths.ministorelevel, style: headerStyle },
          

          { header: "Minindent Level", key: 'minindentlevel', width: columnWidths.minindentlevel, style: headerStyle },
          { header: "Maxiindent Level", key: 'maxiindentlevel', width: columnWidths.maxiindentlevel, style: headerStyle },
          { header: "Reorder Percentage Level", key: 'reorderpercentagelevel', width: columnWidths.reorderpercentagelevel, style: headerStyle },
          { header: "Isprescription", key: 'isprescription', width: columnWidths.isprescription, style: headerStyle },

          { header: "Stauts", key: 'stauts', width: columnWidths.stauts, style: headerStyle },
          { header: "Unit of Mesurement", key: 'unitofmesurement', width: columnWidths.unitofmesurement, style: headerStyle },
          { header: "Remark", key: 'remark', width: columnWidths.remark, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                itemName: product.itemName,
                itemCode: product.itemCode,
                itemform: product.itemform,

                relatedAilmentSystem: product.relatedAilmentSystem,
                usageCategory: product.usageCategory,
                subClassification: product.subClassification,
                salt: product.salt,


                indication: product.indication,
                contraindication: product.contraindication,
                sideEffect: product.sideEffect,
                interaction: product.interaction,


                medicineprecaution: product.medicineprecaution,
                reorderstorelevel: product.reorderstorelevel,
                ministorelevel: product.ministorelevel,
                minindentlevel: product.minindentlevel,


                maxiindentlevel: product.maxiindentlevel,
                reorderpercentagelevel: product.reorderpercentagelevel,
                isprescription: product.isprescription,
                stauts: product.stauts,

                unitofmesurement: product.unitofmesurement,
                remark: product.remark,



            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'GroupitemsList.xlsx';
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

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Items ">

                <GroupitemsForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default GroupitemsList;
