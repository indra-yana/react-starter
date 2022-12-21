import { useTranslation } from "react-i18next";

export default function ButtonDelete(props) {
    const { t } = useTranslation();
    const {
        text = '',
        onClick = (e) => { },
    } = props;

    return(
        <>
            <button type={'button'} className={`btn btn-sm btn-danger m-1`} onClick={onClick} title={t('label.delete')}>
                <i className="text-light fas fa-trash-alt"></i>
                {text}
            </button>
        </>
    )
}