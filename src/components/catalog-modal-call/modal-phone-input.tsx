import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hook/hook-store';
import { postOrder } from '../../store/thunk/thunk';
import { useEffect } from 'react';


type ModalPhoneInput = {
    userTel: string;
}

export default function ModalPhoneInput (): JSX.Element {
  const {
    register,
    formState: { errors },
  } = useForm<ModalPhoneInput>();
  const dispatch = useAppDispatch();

  useEffect (() => {
    dispatch(postOrder);
  });


  return (
    <form >
      <div className="custom-input form-review__item">
        <label>
          <span className="custom-input__label">
        Телефон
            <svg width={9} height={9} aria-hidden="true">
              <use xlinkHref="#icon-snowflake" />
            </svg>
          </span>
          <input
            type="tel"
            placeholder="Введите ваш номер"
            {...register('userTel',{
              required: true,
              pattern:{
                value: /^(\+7|8)\s*\(?9\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
                message: 'Пожалуйста, введите действительный номер'
              }})}
          />
        </label>
        {errors.userTel?.type === 'required' && <p className="custom-input__error">{errors.userTel.message}</p>}
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="submit"
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Заказать
        </button>
      </div>
    </form>
  );
}
