import Swal from "sweetalert2";

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
	confirmButtonText: "Yes, delete it!",
	cancelButtonText: 'No, cancel!',
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
	confirmDelete: ToastDelete,
};