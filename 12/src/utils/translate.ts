type Dictionary = {
  [key: string]: string;
};

const dict: Dictionary = {
  id: '아이디',
  title: '제목',
  description: '설명',
  price: '가격',
  discountPercentage: '할인율',
  rating: '평점',
  stock: '재고',
  brand: '브랜드 명',
  category: '카테고리',
  account: '계정과목',
  date: '일시',
  shop: '거래처',
  amount: '합계금액',
  department: '예산부서(코스트센터)',
  reason: '적요',
  status: '결재',
};

export const translate = (key: string) => {
  return dict[key] ?? '';
};
