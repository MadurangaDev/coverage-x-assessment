import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { type TextFieldProps } from "@mui/material/TextField";
import { forwardRef, type ComponentType } from "react";
import { type ControllerFieldState } from "react-hook-form";
import { type SvgIconProps } from "@mui/material/SvgIcon";

type ICustomTextFieldProps = TextFieldProps & {
  fieldState: ControllerFieldState;
  StartIcon?: ComponentType<SvgIconProps>;
  EndIcon?: ComponentType<SvgIconProps>;
  slotProps?: {
    endIcon?: {
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      className?: string;
    };
  };
};

export const CustomTextField = forwardRef<
  HTMLInputElement,
  ICustomTextFieldProps
>(
  (
    {
      id,
      placeholder,
      label,
      type = "text",
      className = "",
      fieldState,
      StartIcon,
      EndIcon,
      slotProps,
      InputProps,
      multiline,
      ...otherProps
    },
    ref
  ) => {
    return (
      <Box className="custom-text-field-container">
        <TextField
          id={id}
          type={type}
          className={`custom-text-box ${className}`}
          placeholder={placeholder}
          label={label}
          variant="outlined"
          size="small"
          multiline={multiline}
          error={fieldState.invalid}
          // 👇 Correctly merge adornments with Autocomplete props
          InputProps={{
            ...InputProps,
            inputRef: ref,
            startAdornment: StartIcon ? (
              <InputAdornment position="start">
                <StartIcon className="h-5 w-5 text-gray-400" />
              </InputAdornment>
            ) : (
              InputProps?.startAdornment
            ),
            endAdornment: EndIcon ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={slotProps?.endIcon?.onClick}
                  className="group"
                >
                  <EndIcon
                    className={`h-5 w-5 text-gray-400 group-hover:text-gray-600 ${
                      slotProps?.endIcon?.className ?? ""
                    }`}
                  />
                </IconButton>
              </InputAdornment>
            ) : (
              InputProps?.endAdornment
            ),
          }}
          {...otherProps}
        />
        {fieldState.invalid && (
          <FormHelperText error={fieldState.invalid}>
            {fieldState.error?.message}
          </FormHelperText>
        )}
      </Box>
    );
  }
);

CustomTextField.displayName = "CustomTextField";
