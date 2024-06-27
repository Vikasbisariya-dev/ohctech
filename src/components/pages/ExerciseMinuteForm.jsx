import Input from "../common/Input";
import PropTypes from "prop-types";
import {  Grid} from "@mui/material";
import SingleSelect from "../common/SingleSelect";

 const ExerciseMinuteForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
  setFieldValue,
exercise,
  handleSubmit,}) => {


    ExerciseMinuteForm.propTypes = {
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
                <SingleSelect
                    arr={exercise}
                    label="Exercise Name"
                    name="exercisename"
                    value={values.exercisename}
                    sx={{ width: '250px' }}
                    // onChange={(event, newValue) => {
                    //   const syntheticEvent = {
                    //     target: {
                    //       name: "exercisename",
                    //       value: newValue,
                    //     },
                    //   };
                    //   handleChange(syntheticEvent);
                    // }}
                    // handleChange ={handleChange}

                    onChange={(event, newValue) => {
                      setFieldValue('exercisename', newValue ? newValue.label : '');
                    }}

                    onBlur={handleBlur}
                    type="text"
                    helperText={
                      errors.exercisename && touched.exercisename ? (
                        <span style={{ color: "red" }}>{errors.exercisename}</span>
                      ) : null
                    }
                  />
                </Grid>
              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Minutes"
                  name="minutes"
                  type="number"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.minutes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.minutes && touched.minutes ? (
                      <span style={{ color: "red" }}>
                        {errors.minutes}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              </Grid>
      </form>
  )
}

export default ExerciseMinuteForm;

