import identity from 'lodash/identity';
import groupByLodash from 'lodash/groupBy';
import { useForm } from 'react-hook-form';
import { pickBy } from 'lodash';

interface FormState {
  firstName: string;
  mail: string;
  age: string;
  occupation: string;
}

const Lodash = () => {
  const array = [
    { a: '1', b: '2' },
    { a: '2', b: '2' },
    { a: '3', c: '3' },
    { a: '4', d: 1 },
    { a: '1', e: 2 },
    { a: '2', f: '3' },
  ];
  const obj = groupByLodash(array, 'a');

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      mail: '1',
      age: '',
      occupation: '',
    },
  });
  const onSubmit = (data: FormState) => {
    const input = pickBy(data);
    console.log(data, input);
  };
  return (
    <div>
      <p>Default array : {JSON.stringify(array)}</p>
      {Object.keys(obj).map(key => (
        <p key={key}>
          {key} : {JSON.stringify(obj[key])}
        </p>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')}></input>
        <input {...register('age')}></input>
        <input {...register('mail')}></input>
        <input {...register('occupation')}></input>
        <input type="submit" value="버튼" />
      </form>
    </div>
  );
};

export default Lodash;
