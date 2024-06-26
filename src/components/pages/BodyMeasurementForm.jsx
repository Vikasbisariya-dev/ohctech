import Input from "../common/Input";
import PropTypes from "prop-types";
import {  Grid} from "@mui/material";
// import SingleSelect from "../common/SingleSelect";

 const BodyMeasurementForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
//   setFieldValue,
  handleSubmit,}) => {


    BodyMeasurementForm.propTypes = {
      values: PropTypes.object.isRequired,
      touched: PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired,
      handleBlur: PropTypes.func.isRequired,
      handleChange: PropTypes.func.isRequired,
      setFieldValue: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
    };

    // const DeepFry = ["Yes","No"];

  return (
          <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Weight"
                  name="weight"
                  type="text"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.weight && touched.weight ? (
                      <span style={{ color: "red" }}>
                        {errors.weight}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="In Kgs"
                  name="inKgs"
                  type="number"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.inKgs}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.inKgs && touched.inKgs ? (
                      <span style={{ color: "red" }}>
                        {errors.inKgs}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              </Grid>
      </form>
  )
}

export default BodyMeasurementForm;

