import { zCheckbox } from '@/schemas/common/checkbox';
import styled from '@emotion/styled';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TextInput from './ui/TextInput';
import React from 'react';
import RadioInput from './ui/RadioInput';

type IForm = z.infer<typeof schema>;

const schema = z.object({
  code: z.string(),
  businessType: z.union([z.literal('법인(개인)'), z.literal('개인')]),
  // 차이가 뭐지
  purchase: zCheckbox(),
  purchase2: z.boolean(),
  sales: zCheckbox(),
  accountName: z.string(),
  companyNumber: z
    .string()
    .regex(new RegExp(/^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})/), '정확히 입력해주세요')
    .min(12)
    .max(12),
  address: z.string(),
  phone: z.string(),
});

const SampleForm = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IForm>({
    defaultValues: {
      code: '',
      businessType: '법인(개인)',
      purchase: undefined,
      purchase2: false,
      sales: undefined,
      accountName: '',
      companyNumber: '',
      address: '',
      phone: '',
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: IForm) => {
    console.log(data);
  };
  const onError = (error: any) => {
    console.log(error);
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* <FormWithControlProvider onSubmit={handleSubmit(onSubmit)} control={control} render={(control) => }>
        </FormWithControlProvider> */}
        <label>상품 코드</label>
        <TextInput control={control} {...register('code')} />
        <label>거래처명</label>
        <TextInput control={control} {...register('accountName')} />
        <label>주소</label>
        <TextInput control={control} {...register('address')} />
        <label>사업자 번호</label>
        <TextInput control={control} {...register('companyNumber')} />
        <label>사업자 구분</label>
        <RadioInput control={control} {...register('businessType')} />
        <label>법인(개인)</label>
        <RadioInput control={control} {...register('businessType')} />
        <label>개인</label>
        <div />
        <label>거래처 종류</label>
        <input {...register('purchase')} type="checkbox" />
        <label>매입</label>
        <input {...register('sales')} type="checkbox" />
        <label>매출</label>
        <label>매입2</label>
        <input {...register('purchase2')} type="checkbox" />
        <button type="submit">제출</button>
      </form>
    </Container>
  );
};

// const FormWithControlProvider = ({ children, onSubmit, control, render }) => (
//   <form onSubmit={onSubmit}>
//     {React.Children.map(children, child => {
//       return render(child, { control });
//     })}
//   </form>
// );
const Container = styled.div`
  position: fixed;
  top: 25%;
  left: 25%;
  width: 600px;
  padding: 20px;
  border: 1px solid black;
  word-break: keep-all;
  label {
    display: inline-block;
    width: 100px;
  }
`;
export default SampleForm;
