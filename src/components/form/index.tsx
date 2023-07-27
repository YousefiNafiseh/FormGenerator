import { ReactElement } from "react";
import {
  FormProvider, SubmitErrorHandler,
  SubmitHandler,

  useForm,
  UseFormProps, UseFormReturn
} from "react-hook-form";
import { extendTheme } from "@chakra-ui/react";


type functionalChildren<T extends Record<string, any>> = (
  props: UseFormReturn<T>
) => JSX.Element;
type children<T extends Record<string, any>> =
  | ReactElement<UseFormReturn>
  | functionalChildren<T>;
type FormProps<TFormValues extends Record<string, any>> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: children<TFormValues>[] | children<TFormValues>;
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

  const getChild = <T,>(item: T) => {
    if (typeof item === "function") {
      return item(Form)
    } else return item
  }

  const newChild = () => {
    if (children && Array.isArray(children))
      return children.map((item) => getChild<children<TFormValues>>(item))
    else if (children) return getChild(children)
    else return null
  }

  return (
    <FormProvider {...Form}>
      <form id={id} onSubmit={Form.handleSubmit(onSubmit, onInvalid)}>
        {newChild()}
      </form>
    </FormProvider>
  )
}

export default Form 