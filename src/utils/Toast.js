import Swal from "sweetalert2";

const showToast = ({ title, icon }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
  });
};

export const showSuccessToast = (props) => {
  showToast({ ...props, icon: "success" });
};

export const showErrorsToast = (props) => {
  showToast({ ...props, icon: "error" });
};

export const showWarningToast = (props) => {
  showToast({ ...props, icon: "warning" });
};

export const showInfoToast = (props) => {
  showToast({ ...props, icon: "info" });
};

export const showQuestionToast = (props) => {
  showToast({ ...props, icon: "question" });
};
