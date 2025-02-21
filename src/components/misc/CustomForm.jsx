function CustomForm({ formConfig, formData, formErrors, handleInputChange, handleBlur, handleSubmit, submitText, submitDisabled = false }) {
    return (
        <form
            className="col-12 col-lg-6 mx-auto my-5"
            onSubmit={handleSubmit}
        >
            {/* Map over the form configuration object */}
            {Object.entries(formConfig).map(([field, config]) => {
                const errorId = `${field}-error`;
                return (
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
                            aria-describedby={formErrors[field] ? errorId : undefined}
                        />

                        {/* Show the error message if there is one */}
                        {formErrors[field] && (
                            <div
                                id={errorId}
                                className="small text-danger text-start mt-1"
                                aria-live="polite"
                                tabIndex="0"
                            >
                                {formErrors[field]}
                            </div>
                        )}
                    </div>
                );
            })}

            <button
                type="submit"
                className="btn custom-btn mt-3"
                disabled={submitDisabled}
            >
                {submitText}
            </button>
        </form>
    );
}

export default CustomForm;