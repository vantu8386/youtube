import Swal from "sweetalert2";
export const showMessage = (icon, message) => {
  return Swal.fire({
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const deleteMessage = (icon, message, deleteCallback) => {
  Swal.fire({
    title: message,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteCallback();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};
