import { HTMLInputTypeAttribute } from "react";

interface props {
    name: string,
    onChange: any,
    value: any,
    type: HTMLInputTypeAttribute,
    error?: string,
    required?: boolean,
    onBlur: any,
    touched: boolean | undefined
}

const FormikTextInput = (props: props) => {
    const { name, onChange, value, type, error, required, onBlur, touched } = props;
    return (
        <>
            <label htmlFor={name} className="capitalize">{name.replaceAll('_', ' ')}{required && <div className="text-danger inline"> (Required)</div>}</label>
            <input
                className="customInput"
                id={name}
                name={name}
                type={type}
                onChange={onChange}
                value={value}
                onBlur={onBlur}/>
            {
                error &&
                <p className="text-danger text-center">{touched && error}</p>
            }
        </>
    )
}

export default FormikTextInput