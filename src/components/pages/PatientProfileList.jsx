import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PatientInfoForm from "./PatientProfileForm"
import PropTypes from "prop-types";
import VisibilityIcon from '@mui/icons-material/Visibility';
// import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// const PatientValidationForm = Yup.object({
//     selectpatientcategory: Yup.string().required("Please choose patient category "),
//   pname: Yup.string().required("Please enter patient name"),
//   fhname: Yup.string().required("Please enter father anme "),
//   date: Yup.string().required("Please enter birth date"),
//   genderchoose: Yup.string().required("Please  genderchoose"),
//   blood: Yup.string().required("Please enter  blood"),
//   aadhar: Yup.string().required("Please enter aadhar"),
//   phone: Yup.string().required("Please enter phone number"),
//   village: Yup.string().required("Please enter village"),
//   post: Yup.string().required("Please enter post"),
//   ps: Yup.string().required("Please enter ps"),
//   tehsil:Yup.string().required("Please enter tehsil "),
//   district:Yup.string().required("Please enter district "),
//   state:Yup.string().required("Please enter sat"),
//   pin:Yup.string().required("Please enter pin"),
// });

const PatientProfileList = () => {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const axiosClientPrivate = useAxiosPrivate();
    const [id, setId] = useState(1);
    const [showupdate, setShowupdate] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const navigate = useNavigate();

    // public record PatientDto(Long id, String patientName, String fatherName, LocalDate dob, String gender, String bloodGroup, String aadharNo, String primaryPhone, String village, String post, String ps, String tehsil, String district, String state, Integer pinCode, Integer modifiedBy) {
    const initialValues = {
        selectpatientcategory: "",
        patientName: "",
        fatherName: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        aadharNo: "",
        primaryPhone: "",
        village: "",
        post: "",
        ps: "",
        tehsil: "",
        district: "",
        state: "",
        pinCode: "",
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
        //  validationSchema: PatientValidationForm,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axiosClientPrivate.post('/patients', values);
                toast.success("Saved Successfully!", {
                    position: "top-center"
                });
                setFetchTrigger(prev => prev + 1);
                console.log('Response:', response.data);
                resetForm();
                navigate(`/PatientAndContact/${ rowData[rowData.length-1].id + 1}`);
            } catch (error) {
                console.log(values);
                console.error('Error:', error);
            }
        },
    });

    const handleEdit = async (id) => {
        alert(id);
        try {
            const response = await axiosClientPrivate.get(`/patients/${id}`);
            console.log(response.data);
            setFieldValue("id", response.data.id);
            setFieldValue("selectpatientcategory", response.data.selectpatientcategory);
            setFieldValue("patientName", response.data.patientName);
            setFieldValue("fatherName", response.data.fatherName);
            setFieldValue("dob", response.data.dob);
            setFieldValue("gender", response.data.gender);
            setFieldValue("bloodGroup", response.data.bloodGroup);
            setFieldValue("aadharNo", response.data.aadharNo);
            setFieldValue("primaryPhone", response.data.primaryPhone);
            setFieldValue("village", response.data.village);
            setFieldValue("post", response.data.post);
            setFieldValue("ps", response.data.ps);
            setFieldValue("tehsil", response.data.tehsil);
            setFieldValue("district", response.data.district);
            setFieldValue("state", response.data.state);
            setFieldValue("pinCode", response.data.pinCode);
            setFieldValue("lastModified", response.data.lastModified);
            setFieldValue("modifiedBy", response.data.modifiedBy);
            setId(id);
            setShowupdate(true);
            setOpenPopup(true);
        } catch (error) {
            console.error('Error fetching item for edit:', error);
        }
    };

    const handleView = async (id) => {
        alert(id);
        try {
            const response = await axiosClientPrivate.get(`/patients/${id}`);
            console.log(response.data);
            setFieldValue("id", response.data.id);
            setFieldValue("selectpatientcategory", response.data.selectpatientcategory);
            setFieldValue("patientName", response.data.patientName);
            setFieldValue("fatherName", response.data.fatherName);
            setFieldValue("dob", response.data.dob);
            setFieldValue("gender", response.data.gender);
            setFieldValue("bloodGroup", response.data.bloodGroup);
            setFieldValue("aadharNo", response.data.aadharNo);
            setFieldValue("primaryPhone", response.data.primaryPhone);
            setFieldValue("village", response.data.village);
            setFieldValue("post", response.data.post);
            setFieldValue("ps", response.data.ps);
            setFieldValue("tehsil", response.data.tehsil);
            setFieldValue("district", response.data.district);
            setFieldValue("state", response.data.state);
            setFieldValue("pinCode", response.data.pinCode);
            setFieldValue("lastModified", response.data.lastModified);
            setFieldValue("modifiedBy", response.data.modifiedBy);
            setId(id);

            setViewMode(true);
            setOpenPopup(true);
        } catch (error) {
            console.error('Error fetching item for view:', error);
        }
    };

    const handleUpdate = async (id) => {
        alert(id);
        const update = values;
        try {
            console.log(values);
            await axiosClientPrivate.put(`/patients/${id}`, update);
            toast.success("Updated Successfully!", {
                position: "top-center",
                autoClose: 3000,
            });
            resetForm();
            setFetchTrigger(prev => prev + 1);
        } catch (err) {
            console.log(values);
            console.log(err);
        }
    }

    const handleDeleteRow = async (id) => {
        alert(id)
        if (window.confirm('Are you sure you want to delete this data?')) {
            try {
                await axiosClientPrivate.delete(`/patients/${id}`);
                setFetchTrigger(prev => prev + 1);
            } catch (error) {
                console.error('Error deleting row:', error);
            }
        }
    };

    const CustomActionComponent = ({ id }) => {
        CustomActionComponent.propTypes = {
            id: PropTypes.number.isRequired,
        };
        return <div>
            <Button onClick={() => handleView(id)}><VisibilityIcon /></Button>
            <Link to={`/PatientAndContact/${id}`}>
            <Button ><EditNoteRoundedIcon /></Button>
            </Link>
            <Button color="error" onClick={() => handleDeleteRow(id)}><DeleteSweepRoundedIcon /></Button>
        </div>
    };

    const pagination = true;
    const paginationPageSize = 50;
    const paginationPageSizeSelector = [50, 100, 200, 500];

    useEffect(() => {
        const controller = new AbortController();

        const getAllOhc = async () => {
            try {
                const response = await axiosClientPrivate.get(`http://localhost:8080/patients?page=0&size=${paginationPageSize}`, { signal: controller.signal });
                const items = response.data.content;
                // console.log("patient info : ",items);
                setRowData(items);
                if (items.length > 0) {
                    const headerMappings = {
                        selectpatientcategory: "Patient Category",
                        pname : "Patient name",
                        fhname : "FH Name",
                        date : "Date",
                        genderchoose : "Gender Choose",
                        blood : "Blood",
                        aadhar : "Aadhar",
                        phone : "Phone",
                        village : "Village",
                        post : "Post",
                        ps : "PS",
                        tehsil : "Tehsil",
                        district : "District",
                        pin : "Pin",
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
                        field: "Actions", cellRenderer: (params) => {
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
        const header = [['id', 'pname', "fhname", "date", "genderchoose", "blood", "aadhar", "phone", "village", "post", "ps", "tehsil", "district", "state", "pin"]];
        const tableData = rowData.map(item => [
            item.id,
            // item.selectpatientcategory,
            item.patientName,
            item.fatherName,
            item.dob,
            item.gender,
            item.bloodGroup,
            item.aadharNo,
            item.primaryPhone,
            item.village,
            item.post,
            item.ps,
            item.tehsil,
            item.district,
            item.state,
            item.pinCode,
        ]);
        doc.autoTable({
            head: header,
            body: tableData,
            startY: 20,
            theme: 'grid',
            margin: { top: 30 },
            styles: { fontSize: 5 },
            columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }
        //     columnStyles: {
        //     0: { cellWidth: 5 },   // id
        //     2: { cellWidth: 20 },   // pname
        //     3: { cellWidth: 20 },   // fhname
        //     4: { cellWidth: 15 },   // date
        //     5: { cellWidth: 20 },   // genderchoose
        //     6: { cellWidth: 5 },   // blood
        //     7: { cellWidth: 25 },   // aadhar
        //     8: { cellWidth: 15 },   // phone
        //     9: { cellWidth: 15 },   // village
        //     10: { cellWidth: 25 },  // post
        //     11: { cellWidth: 25 },  // ps
        //     12: { cellWidth: 15 },  // tehsil
        //     13: { cellWidth: 15 },  // district
        //     14: { cellWidth: 25 },  // state
        //     // 15: { cellWidth: 15 }   // pin
        // }
        });
        doc.save("PatientProfileList.pdf");
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
            // selectpatientcategory: 20,
            patientName: 20,
            fatherName: 20,
            dob: 20,
            gender: 20,
            bloodGroup: 20,
            aadharNo: 20,
            primaryPhone: 20,
            village: 20,
            post: 20,
            ps: 20,
            tehsil: 20,
            district: 20,
            state: 20,
            pinCode: 20,
        };

        sheet.columns = [
            { header: "id", key: 'id', width: columnWidths.id, style: headerStyle },
            // { header: "selectpatientcategory", key: 'cpname', width: columnWidths.cpname, style: headerStyle },
            { header: "pname", key: 'patientName', width: columnWidths.patientName, style: headerStyle },
            { header: "fhname", key: 'fatherName', width: columnWidths.fatherName, style: headerStyle },
            { header: "date", key: 'dob', width: columnWidths.dob, style: headerStyle },
            { header: "genderchoose", key: 'gender', width: columnWidths.gender, style: headerStyle },
            { header: "blood", key: 'bloodGroup', width: columnWidths.bloodGroup, style: headerStyle },
            { header: "aadhar", key: 'aadharNo', width: columnWidths.aadharNo, style: headerStyle },
            { header: "phone", key: 'primaryPhone', width: columnWidths.primaryPhone, style: headerStyle },
            { header: "village", key: 'village', width: columnWidths.village, style: headerStyle },
            { header: "post", key: 'post', width: columnWidths.post, style: headerStyle },
            { header: "ps", key: 'ps', width: columnWidths.ps, style: headerStyle },
            { header: "tehsil", key: 'tehsil', width: columnWidths.tehsil, style: headerStyle },
            { header: "district", key: 'district', width: columnWidths.district, style: headerStyle },
            { header: "state", key: 'state', width: columnWidths.state, style: headerStyle },
            { header: "pin", key: 'pinCode', width: columnWidths.pinCode, style: headerStyle },
        ];

        rowData.map(product => {
            sheet.addRow({
                id: product.id,
                // selectpatientcategory: product.selectpatientcategory,
                patientName: product.patientName,
                fatherName: product.fatherName,
                dob: product.dob,
                gender: product.gender,
                bloodGroup: product.bloodGroup,
                aadharNo: product.aadharNo,
                primaryPhone: product.primaryPhone,
                village: product.village,
                post: product.post,
                ps: product.ps,
                tehsil: product.tehsil,
                district: product.district,
                state: product.state,
                pinCode: product.pinCode,
            })
        });

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'PatientProfileList.xlsx';
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
                        <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon />}>PDF</Button>
                        <Button variant="contained" onClick={() => exportExcelfile()} color="success" endIcon={<DownloadIcon />}>Excel</Button>
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

            <Popup showupdate={showupdate} id={id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit} openPopup={openPopup} setOpenPopup={setOpenPopup} title="Patient Profile" viewMode={viewMode} setViewMode={setViewMode}>
                <PatientInfoForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} viewMode={viewMode} />
            </Popup>
        </>
    );
};

export default PatientProfileList;
