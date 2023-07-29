import { ReactNode } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm
} from "react-hook-form";

type FormProps<TFormValues extends Record<string, any>> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
  id?: string;
  onInvalid?: SubmitErrorHandler<TFormValues>;
  formProviderProps?: UseFormReturn<TFormValues, any>;
} & UseFormProps<TFormValues>;

const Form = <TFormValues extends Record<string, any>>({
  onSubmit,
  children,
  id,
  onInvalid,
  formProviderProps,
  ...useFormProps
}: FormProps<TFormValues>) => {
  const newForm = useForm<TFormValues>({
    ...useFormProps,
    mode: useFormProps.mode || "onBlur",
  });
  const Form = formProviderProps ? formProviderProps : newForm

  return (
    <FormProvider {...Form}>
      <form id={id} onSubmit={Form.handleSubmit(onSubmit, onInvalid)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form 