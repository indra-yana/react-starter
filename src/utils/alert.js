import Swal from "sweetalert2";
import i18n from "../lang/i18n";

export const SwalMixin = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: true,
	timer: 8000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
});

const ToastDelete = Swal.mixin({
	icon: "warning",
	showCancelButton: true,
	showConfirmButton: true,
	customClass: {
		confirmButton: 'btn btn-danger me-3',
		cancelButton: 'btn btn-secondary'
	},
	buttonsStyling: false
});

export const Toast = {
	error: (message) => {
		SwalMixin.fire({
			icon: 'error',
			title: message
		});
	},
	success: (message) => {
		SwalMixin.fire({
			icon: 'success',
			title: message
		});
	},
	warning: (message) => {
		SwalMixin.fire({
			icon: 'warning',
			title: message
		});
	},
	delete: (title = undefined, message = undefined) => {
		return ToastDelete.fire({
			title: title || i18n.t('label.delete_confirm'),
			html: message || i18n.t('label.delete_sure'),
			confirmButtonText: i18n.t('label.delete_yes'),
			cancelButtonText: i18n.t('label.delete_no'),
		});
	},
};