interface Props {
  price: number | null;
}

const PriceInfo = ({ price }: Props) => (
  <div className='flex flex-col items-end'>
    <div className='text-sm'>
      <span>Yht: </span>
      <span className='font-semibold'>{price}€</span>
    </div>
    <span className='text-xs'>*Ei huomioitu mahdollista alennusta.</span>
  </div>
);

export default PriceInfo;
