import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message: string, icon?: string) => {
    $q.notify({
      type: 'positive',
      message: message || 'Sucesso!',
      icon: icon || 'check_circle',
    });
  };

  const notifyError = (message: string, icon?: string) => {
    $q.notify({
      type: 'negative',
      message: message || 'Falhou!',
      icon: icon || 'report_problem',
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
