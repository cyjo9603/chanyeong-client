import dayjs from 'dayjs';

export const dateFommater = (date: string | Date) => {
  return dayjs(date).format('YYYY년 M월 D일');
};
