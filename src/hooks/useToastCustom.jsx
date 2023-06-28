import { useToast } from "@chakra-ui/react"

export function useToastCustom() {
  const toastChakra = useToast();

  const settingsToast = {
    position: 'top-right',
    duration: 5000,
    isClosable: true,
  }

  function toast({ title = null, status = 'success', description = null }) {

    return toastChakra({
      title,
      status,
      description,
      ...settingsToast
    })

  }

  function toastWithError(error = null) {

    if (error) {

      // Erros de validação do Laravel
      let errors
      if (errors = error.response?.data?.errors) {

        for (const error in errors) {

          errors[error].forEach((error) => {
            return toastChakra({
              title: error,
              status: 'error',
              ...settingsToast
            })
          })

        }

        return;
      }

      // Erros de regra de negócio da aplicação
      if (error.response?.data?.message) {
        const message = error.response.data.message

        return toastChakra({
          title: message,
          status: 'error',
          ...settingsToast
        })

      }

      // Erro genérico
      return toastChakra({
        title: 'Erro no servidor!',
        status: 'error',
        description: 'Falha ao se comunicar com o servidor',
        ...settingsToast
      })

    }
  }

  return { toast, toastWithError };

}