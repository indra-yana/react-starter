export default function AvatarPreview(props) {

    const {
        src = '/assets/img/avatar-profile.png',
        handleId = 'avatar-preview',
        className = '',
    } = props;

    return (
        <>
            <img className={`img-fluid rounded-circle border border-1 border-secondary avatar-95 ${className}`} src={src} id={handleId} alt="Avatar Preview" />
        </>
    )
}