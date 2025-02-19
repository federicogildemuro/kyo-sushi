function ProfileInfo({ user }) {
    /* Destructure user properties */
    const { firstName = '', lastName = '', email = '', phone = '', address = '' } = user || {};

    /* Format user name */
    const formattedName = firstName || lastName ? `${firstName} ${lastName}` : '';

    /* Format user address */
    const formattedAddress = address ? `${address.street || ''} ${address.number || ''}${address.apartment ? ` ${address.apartment}` : ''} - ${address.city || ''} (${address.state || ''}, ${address.country || ''})` : '';

    return (
        <div className="col-12 col-md-6 text-center text-md-start mx-auto my-5 p-5 custom-border">
            <p><strong>Nombre: </strong> {formattedName}</p>

            <p><strong>Correo electrónico: </strong> {email}</p>

            <p><strong>Teléfono: </strong> {phone}</p>

            <p><strong>Dirección: </strong> {formattedAddress}</p>
        </div>
    );
}

export default ProfileInfo;