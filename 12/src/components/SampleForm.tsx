import { zCheckbox } from '@/schemas/common/checkbox';
import styled from '@emotion/styled';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from './ui/TextInput';
import React from 'react';
import RadioInput from './ui/RadioInput';
import PostcodeModal from './ui/PostcodeModal';

type IForm = z.infer<typeof schema>;

const enum BIZ_TYPE {
  COMPANY = 'C',
  PERSON = 'P',
}
const schema = z.object({
  code: z.string(),
  biz_type: z.union([z.literal('C'), z.literal('P')]),
  transaction: z.array(z.string()).min(1),
  accountName: z.string(),
  companyNumber: z
    .string()
    .regex(new RegExp(/^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})/), '정확히 입력해주세요')
    .min(12)
    .max(12),
  address1: z.string(),
  address2: z.string(),
  postal_code: z.string(),
  phone: z.string(),
});

const SampleForm = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      code: '',
      biz_type: 'C',
      transaction: [],
      accountName: '',
      companyNumber: '111-11-11111',
      address1: '',
      address2: '',
      postal_code: '',
      phone: '',
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: IForm) => {
    console.log(data.transaction, data.biz_type);
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
        <Input control={control} {...register('code')} />
        <label>거래처명</label>
        <Input control={control} {...register('accountName')} />
        <label>주소</label>
        <Input control={control} {...register('address1')} disabled />
        <label>상세 주소</label>
        <Input control={control} {...register('address2')} />
        <label>사업자 번호</label>
        <Input control={control} {...register('companyNumber')} />
        <label>사업자 구분</label>
        <input type="radio" {...register('biz_type')} value={BIZ_TYPE.COMPANY} />
        <label>법인(개인)</label>
        <input type="radio" {...register('biz_type')} value={BIZ_TYPE.PERSON} />
        <label>개인</label>
        <div />
        <label>거래처 종류</label>
        <input {...register('transaction')} value={'0'} type="checkbox" />
        <label>매입</label>
        <input {...register('transaction')} value={'1'} type="checkbox" />
        <label>매출</label>
        <PostcodeModal onSubmit={setValue} />
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
