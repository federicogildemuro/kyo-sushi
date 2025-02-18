function CustomForm({ formConfig, formData, formErrors, handleInputChange, handleBlur, handleSubmit, submitText }) {
    return (
        <form
            className="col-12 col-lg-6 mx-auto my-5"
            onSubmit={handleSubmit}
        >
            {Object.entries(formConfig).map(([field, config]) => (
                <div
                    key={field}
                    className="d-flex flex-column align-items-start mb-3"
                >
                    <label
                        htmlFor={field}
                        className="form-label"
                    >
                        {config.label}
                    </label>

                    <input
                        type={config.type}
                        id={field}
                        className="form-control"
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />

                    {formErrors[field] &&
                        <div className="small text-danger text-start mt-1">
                            {formErrors[field]}
                        </div>
                    }
                </div>
            ))}

            <button
                type="submit"
                className="btn custom-btn mt-3"
            >
                {submitText}
            </button>
        </form>
    );
}

export default CustomForm;