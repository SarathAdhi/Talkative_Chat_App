import Swal from "sweetalert2";

const alert = ({ title, handleFunction }) => {
  Swal.fire({
    title: title,
    showDenyButton: true,
    confirmButtonText: "Update",
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.value) {
      handleFunction();
    }
  });
};

export const showAlert = ({ title, handleFunction }) => {
  alert({ title, handleFunction });
};

// export const showErrorAlert = ({ ...rest }) => {
//   showAlert({ ...rest });
// };

// export const showWarningAlert = ({ ...rest }) => {
//   showAlert({ ...rest });
// };

// export const showInfoAlert = ({ ...rest }) => {
//   showAlert({ ...rest });
// };

// export const showQuestionAlert = ({ ...rest }) => {
//   showAlert({ ...rest });
// };
