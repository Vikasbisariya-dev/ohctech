import { FormControl, Grid } from "@mui/material";
import Input from "../common/Input";
import PropTypes from "prop-types";

 const MenuForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
  // setFieldValue,
  handleSubmit,
}) => {

    MenuForm.propTypes = {
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
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{width:400}} >
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input 
                  label="Menu Name"
                  name="menuName"
                  type="text"
                  size="large"
                  value={values.menuName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                  errors.menuName && touched.menuName ? (
                    <span style={{ color: "red" }}>
                      {errors.menuName}
                    </span>
                  ) : null
                  }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input 
                  label="Menu Description"
                  name="menuDescription"
                  type="text"
                  size="large"
                  value={values.menuDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                  errors.menuDescription && touched.menuDescription ? (
                    <span style={{ color: "red" }}>
                      {errors.menuDescription}
                    </span>
                  ) : null
                  }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input 
                  label="Menu Url"
                  name="menuUrl"
                  type="text"
                  size="large"
                  value={values.menuUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                  errors.menuUrl && touched.menuUrl ? (
                    <span style={{ color: "red" }}>
                      {errors.menuUrl}
                    </span>
                  ) : null
                  }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input 
                  label="Parent Menu"
                  name="parentMenu"
                  type="number"
                  size="large"
                  value={values.parentMenu}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                      errors.parentMenu && touched.parentMenu ? (
                        <span style={{ color: "red" }}>
                          {errors.parentMenu}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input 
                  label="Display Sequence"
                  name="displaySequence"
                  type="text"
                  size="large"
                  value={values.displaySequence}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                      errors.displaySequence && touched.displaySequence ? (
                        <span style={{ color: "red" }}>
                          {errors.displaySequence}
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
  )
}

export default MenuForm;

