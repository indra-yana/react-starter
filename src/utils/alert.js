import Swal from "sweetalert2";

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: true,
	timer: 5000,
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

export {
	Toast,
	ToastDelete
};