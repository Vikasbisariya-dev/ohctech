import { FormControl, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";
// const FoodNutrients = [
//   {
//     name: "carbohydrate",
//     // value: "Carbohydrate",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
// ];

const FoodNutritionMappingForm = ({
  FoodNutrients,
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  handleSubmit,
}) => {
  FoodNutritionMappingForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }} >
      <form onSubmit={handleSubmit}>
        {/* <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ width: 600 }}>
          <Grid item xs={12} justifyContent="center" alignItems="center"> */}
            <FormControl fullWidth>
              <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ width: 600 }}>
                {FoodNutrients.map((item, index) => (
                  <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" key={index}>
                    <Input
                      label={item.label}
                      name={item.name}
                      type="text"
                      size="large"
                      value={values[item.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors[item.name] && touched[item.name] ? (
                          <span style={{ color: "red" }}>{errors[item.name]}</span>
                        ) : null
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </FormControl>
          {/* </Grid>
        </Grid> */}
      </form>
    </div>
  );
};



export default FoodNutritionMappingForm;
