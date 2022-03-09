const Alert = ({alert: alert}) => {
    let classe = '';

    if (alert.status === 'error')
        classe = 'alert alert-danger';
    else
        classe = 'alert alert-success';

    if (alert.message.length > 0) {
        return (
            <div className={classe} role="alert">
                {alert.message}
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default Alert;