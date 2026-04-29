import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import InputField from '~/client/components/form/input';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();


export const { useAppForm: useForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
  },
  formComponents: {
  },
});