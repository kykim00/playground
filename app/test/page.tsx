'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PageParams {
  params: {};
}

interface IForm {
  firstName: string;
  mail: string;
  age: string;
}
const Page = ({ params }: PageParams) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: '',
      mail: '',
      age: '',
    },
  });

  const onSubmit = (data: IForm) => {
    const firstName = watch('firstName');
    console.log(firstName);
    console.log(data);
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true })} aria-invalid={errors.firstName ? 'true' : 'false'} />
      {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}

      <input
        {...register('mail', { required: 'Email Address is required' })}
        aria-invalid={errors.mail ? 'true' : 'false'}
      />
      {errors.mail && <p role="alert">{errors.mail?.message}</p>}
      <input
        {...register('age', {
          required: 'over 10 required',
          // validate: {
          //   positive: val => parseInt(val) > 10,
          //   lessThan: val => parseInt(val) < 100,
          // },
          validate: value => {
            if (parseInt(value) < 10) {
              return 'over 10 required';
            }
            if (parseInt(value) >= 100) {
              return 'under 100 required';
            }
            return undefined;
          },
        })}
      />
      <p>{errors?.age?.message}</p>

      <input type="submit" />
    </form>
  );
};

export default Page;
