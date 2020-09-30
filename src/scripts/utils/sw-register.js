const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
    } catch (error) {
      await Swal.fire(
        'Error!',
        'Service-worker install fail.',
        'error',
      );
    }
  } else {
    await Swal.fire(
      'PWA is not supported',
      'Some feature may wont work well.',
      'warning',
    );
  }
};

export default swRegister;
