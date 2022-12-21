import { useTranslation } from "react-i18next";

export default function ButtonEdit(props) {
    const { t } = useTranslation();
    const {
        text = '',
        onClick = (e) => { },
    } = props;

    return(
        <>
            <button type={'button'} className={`btn btn-sm btn-success m-1`} onClick={onClick} title={t('label.edit')}>
                <i className="text-light fas fa-edit"></i>
                {text}
            </button>
        </>
    )
}