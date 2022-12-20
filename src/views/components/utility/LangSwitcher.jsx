import { useTranslation } from 'react-i18next';
import { LANG } from '../../../lang/i18n';

export default function LangSwitcher(props) {

    const { i18n } = useTranslation();

    function handleLangChanged(e) {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <>
            <select className="form-control form-control-sm" defaultValue={i18n.resolvedLanguage} onChange={handleLangChanged}>
                {Object.keys(LANG).map((lng) => (
                    <option key={lng} value={lng}>{LANG[lng].nativeName}</option>
                ))}
            </select>
        </>
    )
}