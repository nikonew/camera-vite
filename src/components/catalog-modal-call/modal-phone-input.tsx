import { useAppDispatch } from '../../hook/hook-store';
import { postOrder } from '../../store/thunk/thunk';
import { InputMask } from '@react-input/mask';
import { TOrder } from '../../types/types';

type ModalPhoneInputProps = {
  idCamera: number;
  onClose: () => void;
}

export default function ModalPhoneInput ({idCamera, onClose}: ModalPhoneInputProps): JSX.Element {
  const dispatch = useAppDispatch();


  const handleClickButtonOrder = () => {
    const order: TOrder = {
      tel: '',
      coupon: null,
      camerasIds: [idCamera]
    };
    dispatch(postOrder(order));
    onClose();
  };

  return (
    <>
      <div className="custom-input form-review__item">
        <label>
          <span className="custom-input__label">
        Телефон
            <svg width={9} height={9} aria-hidden="true">
              <use xlinkHref="#icon-snowflake" />
            </svg>
          </span>
          <InputMask
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            type="tel"
            placeholder="Введите ваш номер +7 (__) ___-__-__ "
          />
        </label>
        <p className="custom-input__error"></p>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="submit"
          onClick={handleClickButtonOrder}
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Заказать
        </button>
      </div>
    </>

  );
}
