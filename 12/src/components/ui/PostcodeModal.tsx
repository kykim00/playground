import DaumPostcodeEmbed from 'react-daum-postcode';

const PostcodeModal = ({ onSubmit }: any) => {
  const handleComplete = (data: any) => {
    console.log('data', data);

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    onSubmit('address1', fullAddress);
    onSubmit('postal_code', data.zonecode);
  };

  return <DaumPostcodeEmbed onComplete={handleComplete} />;
};

export default PostcodeModal;
