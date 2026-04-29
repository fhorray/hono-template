'use client';

import * as React from "react";
import { Input } from '~/client/components/ui/input';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '~/client/components/ui/field';

import { useFieldContext } from '~/client/hooks/use-form';
import { useStore } from '@tanstack/react-form';
import type { JSX, Child } from 'hono/jsx';

type InputProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  icon?: any;
  description?: string;
};

const InputField = ({ label, icon, description, ...props }: InputProps) => {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const Icon = icon;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={field.name}>
          {label}
          {props.required && '*'}
        </FieldLabel>
      )}

      <div className="relative w-full">
        {
          <span className="absolute top-2.5 left-2 max-w-4 max-h-4 object-cover">
            {Icon && <Icon className="w-4 h-4 opacity-45" />}
          </span>
        }

        <Input
          id={field.name}
          name={field.name}
          value={field.state.value ?? ''}
          onBlur={field.handleBlur}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            if (target) field.handleChange(target.value);
          }}
          aria-invalid={isInvalid}
          placeholder="Login button not working on mobile"
          autoComplete="off"
          {...props}
        />
      </div>

      {description && (
        <FieldDescription className="text-sm opacity-45">
          {description}
        </FieldDescription>
      )}
      <FieldError
        errors={errors.map((e) => ({
          message: e.message,
        }))}
      />
    </Field>
  );
};

export default InputField;
