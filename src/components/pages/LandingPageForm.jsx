import Input from "../common/Input";
import PropTypes from "prop-types";
import {  Grid} from "@mui/material";

 const LandingPageForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
  //setFieldValue,
  handleSubmit,}) => {


    LandingPageForm.propTypes = {
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
                  label="Indicators"
                  name="indicators"
                  type="text"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.indicators}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.indicators && touched.indicators ? (
                      <span style={{ color: "red" }}>
                        {errors.indicators}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Actual"
                  name="actual"
                  type="number"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.actual}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.actual && touched.actual ? (
                      <span style={{ color: "red" }}>
                        {errors.actual}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Target"
                  name="target"
                  type="number"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.target}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.target && touched.target ? (
                      <span style={{ color: "red" }}>
                        {errors.target}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Percent"
                  name="percent"
                  type="number"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.percent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.percent && touched.percent ? (
                      <span style={{ color: "red" }}>
                        {errors.percent}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              </Grid>
      </form>
  )
}

export default LandingPageForm;

