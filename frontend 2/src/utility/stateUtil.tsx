import FormState from "../redux/states/formState";

export const resetState = (): FormState => {
  const formState: FormState = {
    loading: false,
    isSuccess: false,
    isError: false,
    errorStack: null,
    loadingSpinner:false,
  };
  return formState;
};

export const fulfilledState = (): FormState => {
  const formState: FormState = {
    loading: false,
    isSuccess: true,
    isError: false,
    errorStack: null,
    loadingSpinner:false,
  };
  return formState;
};

export const pendingState = (): FormState => {
  const formState: FormState = {
    loading: true,
    isSuccess: false,
    isError: false,
    errorStack: null,
    loadingSpinner:false,
  };
  return formState;
};

export const rejectedState = (message?: string): FormState => {
  const formState: FormState = {
    loading: false,
    isError: true,
    isSuccess: false,
    errorStack: null,
    loadingSpinner:false,
  };
  return formState;
};

