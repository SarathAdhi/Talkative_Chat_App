import Swal from "sweetalert2";

const showToast = async ({ title, icon }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    padding: "5px",
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

export const showSuccessToast = async (props) => {
  showToast({ ...props, icon: "success" });
};

export const showErrorsToast = async (props) => {
  showToast({ ...props, icon: "error" });
};

export const showWarningToast = async (props) => {
  showToast({ ...props, icon: "warning" });
};

export const showInfoToast = async (props) => {
  showToast({ ...props, icon: "info" });
};

export const showQuestionToast = async (props) => {
  showToast({ ...props, icon: "question" });
};
