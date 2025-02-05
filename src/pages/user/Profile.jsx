import { useEffect, useRef, useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import useAuth from '../../hooks/useAuth';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import { getUserById, updateUser } from '../../services/UsersServices';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import './Profile.css';

function Profile() {
    const { user } = useAuth();
    const { data: dataGetUser, loading: loadingGetUser, execute: executeGetUser } = useAsync(getUserById, [], false);
    const { data: dataUpdateUser, loading: loadingUpdateUser, error: errorUpdateUser, execute: executeUpdateUser } = useAsync(updateUser, [], false);
    const { showNotification } = useNotification();

    const [originalFormData, setOriginalFormData] = useState({});
    const [isEditing, setIsEditing] = useState({
        firstName: false,
        lastName: false,
        phone: false,
        street: false,
        number: false,
        apartment: false,
        city: false,
        state: false,
        country: false
    });
    const [hasChanges, setHasChanges] = useState(false);
    const inputRefs = useRef({});

    useEffect(() => {
        if (user) {
            executeGetUser(user.uid);
        }
    }, [user, executeGetUser]);

    useEffect(() => {
        if (dataUpdateUser) {
            showNotification('Usuario editado exitosamente', 'success');
            setIsEditing({
                firstName: false,
                lastName: false,
                phone: false,
                street: false,
                number: false,
                apartment: false,
                city: false,
                state: false,
                country: false
            });
        }
    }, [dataUpdateUser, showNotification]);

    useEffect(() => {
        if (errorUpdateUser) {
            showNotification(errorUpdateUser.message, 'danger');
        }
    }, [errorUpdateUser, showNotification]);

    const labels = {
        firstName: 'Nombre',
        lastName: 'Apellido',
        phone: 'Teléfono',
        street: 'Calle',
        number: 'Altura',
        apartment: 'Departamento',
        city: 'Ciudad',
        state: 'Provincia/Estado',
        country: 'País'
    };

    const initialFormData = {
        firstName: '',
        lastName: '',
        phone: '',
        street: '',
        number: '',
        apartment: '',
        city: '',
        state: '',
        country: ''
    };

    const {
        formData,
        formErrors,
        handleInputChange,
        handleBlur,
        setFormData,
        validateFormData
    } = useFormValidation(initialFormData);

    useEffect(() => {
        if (dataGetUser) {
            const userData = {
                firstName: dataGetUser.firstName || '',
                lastName: dataGetUser.lastName || '',
                phone: dataGetUser.phone || '',
                street: dataGetUser.street || '',
                number: dataGetUser.number || '',
                apartment: dataGetUser.apartment || '',
                city: dataGetUser.city || '',
                state: dataGetUser.state || '',
                country: dataGetUser.country || ''
            };
            setFormData(userData);
            setOriginalFormData(userData);
        }
    }, [dataGetUser, setFormData]);

    const handleEditClick = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
        if (inputRefs.current[field]) {
            inputRefs.current[field].focus();
        }
    };

    const handleCancelClick = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: false }));
        setFormData((prev) => ({ ...prev, [field]: originalFormData[field] }));
        setHasChanges(false);
    };

    const handleInputChangeWithCheck = (event) => {
        const { name, value } = event.target;

        handleInputChange(event);

        setHasChanges(() => {
            const updatedFormData = { ...formData, [name]: value };
            return Object.keys(updatedFormData).some(
                (key) => updatedFormData[key] !== originalFormData[key]
            );
        });
    };

    const handleFormCancelClick = () => {
        setFormData(originalFormData);
        setIsEditing({
            firstName: false,
            lastName: false,
            phone: false,
            street: false,
            number: false,
            apartment: false,
            city: false,
            state: false,
            country: false
        });
        setHasChanges(false);
    };

    const handleFormSaveClick = async (event) => {
        event.preventDefault();

        if (!validateFormData()) {
            showNotification('Por favor, complete los campos correctamente', 'danger');
            return;
        }

        await executeUpdateUser(user.id || dataGetUser?.id, formData);
    };

    return (
        <section className="custom-container d-flex flex-column text-center">
            {(loadingGetUser || loadingUpdateUser) && <Spinner />}

            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Perfil</h1>

                <form className="mx-auto col-12 col-lg-6 mb-5" onSubmit={handleFormSaveClick}>
                    {Object.keys(labels).map((field) => (
                        <div key={field} className="d-flex flex-column align-items-start mb-3">
                            <label htmlFor={field} className="form-label">
                                {labels[field]}
                            </label>

                            <div className="input-group">
                                <input
                                    type="text"
                                    id={field}
                                    ref={(el) => inputRefs.current[field] = el}
                                    className={`form-control ${!isEditing[field] ? 'non-editable' : ''}`}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleInputChangeWithCheck}
                                    onBlur={handleBlur}
                                    readOnly={!isEditing[field]}
                                    disabled={loadingUpdateUser}
                                />

                                {!isEditing[field] && (
                                    <span className="input-group-text" onClick={() => handleEditClick(field)}>
                                        <i className="bi bi-pencil" />
                                    </span>
                                )}

                                {isEditing[field] && (
                                    <span className="input-group-text" onClick={() => handleCancelClick(field)}>
                                        <i className="bi bi-x" />
                                    </span>
                                )}
                            </div>

                            {formErrors[field] && (
                                <div className="text-danger small text-start mt-1">
                                    {formErrors[field]}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="d-flex justify-content-between mt-5">
                        <button
                            type="button"
                            className="btn custom-btn"
                            onClick={handleFormCancelClick}
                            disabled={loadingUpdateUser || (!hasChanges && !Object.values(isEditing).some(Boolean))}
                        >
                            Cancelar
                            <i className="bi bi-x ms-2" />
                        </button>

                        <button
                            type="submit"
                            className="btn custom-btn"
                            disabled={loadingUpdateUser || !hasChanges}
                        >
                            Guardar
                            <i className="bi bi-check ms-2" />
                        </button>
                    </div>

                </form>

                <BackButton />
            </div>
        </section>
    );
}

export default Profile;