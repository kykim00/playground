'use client';
import InputText from '@/components/ControlInputText';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
interface PageParams {
  params: {};
}

interface IForm {
  firstName: string;
  mail: string;
  age: string;
  occupation: string;
}
const schema = yup.object().shape({
  firstName: yup.string().required('반드시 입력해주세요.').max(10, '최대 10글자까지 입력 가능합니다.'),
  mail: yup
    .string()
    .required('반드시 입력해주세요.')
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
      '이메일 형식에 맞지 않습니다.',
    ),
  age: yup.string().when('occupation', {
    is: 'professor',
    then: schema => yup.string().required('직업이 교수님이라면 반드시 입력해주세요!!!!'),
  }),
  occupation: yup.string(),
});

const Page = ({ params }: PageParams) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: '',
      mail: '',
      age: '',
      occupation: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IForm) => {
    const firstName = watch('firstName');
    console.log(firstName);
    console.log(data);
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText control={control} {...register('firstName', { required: 'firstName을 반드시 입력해주세요.' })} />
      <p>{errors.firstName?.message}</p>
      <InputText control={control} name="mail" rules={{ required: '메일주소를 입력해주세요.' }} />
      <p>{errors.mail?.message}</p>
      <InputText control={control} name="occupation" />
      <p>{errors.occupation?.message}</p>
      <InputText control={control} name="age" />
      <p>{errors.age?.message}</p>
      <button>제출</button>
    </form>
  );
};

export default Page;
