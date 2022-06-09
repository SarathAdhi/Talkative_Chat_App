import Swal from "sweetalert2";

// customClass: {
//   container: '...',
//   popup: '...',
//   header: '...',
//   title: '...',
//   closeButton: '...',
//   icon: '...',
//   image: '...',
//   content: '...',
//   htmlContainer: '...',
//   input: '...',
//   inputLabel: '...',
//   validationMessage: '...',
//   actions: '...',
//   confirmButton: '...',
//   denyButton: '...',
//   cancelButton: '...',
//   loader: '...',
//   footer: '....',
//   timerProgressBar: '....',
// }

export const InputModal = async ({
  title,
  input,
  inputLabel,
  inputPlaceholder,
  inputAttributes,
  handleFunction,
}) => {
  const { value: name } = await Swal.fire({
    title,
    input,
    inputLabel,
    inputPlaceholder,
    inputAttributes,
    color: "black",
  });

  handleFunction(name);
};
