import { FormControl, Grid} from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";



const UnitForm = ({
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  setFieldValue,
  handleSubmit,
}) => {
    UnitForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };


//   const Medselect = ["Active", "Not Active"];
//   const isDefault = ["Yes", "No"];



  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{width:400}} >
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Unit ID"
                    name="id"
                    type="number"
                    size="large"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.id && touched.id? (
                        <span style={{ color: "red" }}>{errors.id}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="unit Name"
                    name="unitName"
                    type="text"
                    size="large"
                    value={values.unitName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.unitName && touched.unitName? (
                        <span style={{ color: "red" }}>{errors.unitName}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Remarks"
                    name="unitRemarks"
                    type="text"
                    size="large"
                    value={values.unitRemarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.unitRemarks && touched.unitRemarks? (
                        <span style={{ color: "red" }}>{errors.unitRemarks}</span>
                      ) : null
                    }
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};


export default UnitForm;
