export default function FilterPrice ():JSX.Element {
  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input type="number" name="price" placeholder="от" />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input type="number" name="priceUp" placeholder="до" />
        </label>
      </div>
    </div>
  );
}
