import { FormControl, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";

const ExerciseForm = ({
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  // setFieldValue,
  handleSubmit,
}) => {

  ExerciseForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}    justifyContent="center" alignItems="center" sx={{width:300}}>
          
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <Grid container spacing={2}  justifyContent="center" alignItems="center">
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Enter Exercise Name"
                    name="exercisename"
                    type="text"
                    size="large"
                    value={values.exercisename}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.exercisename && touched.exercisename ? (
                        <span style={{ color: "red" }}>
                          {errors.exercisename}
                        </span>
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

export default ExerciseForm;

