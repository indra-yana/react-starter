import { redirect } from "react-router-dom";
import { deleteContact } from "../../core/repository/contact-repository";

export async function action({params}) {
    await deleteContact(params.id);
    return redirect('/contacts');
}