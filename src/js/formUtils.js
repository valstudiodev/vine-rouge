"use strict"

export function formUtils() {
  typeSwitcher()
  const cart = new CartAdd()
}
// ===========================================================================================

// ===========================================================================================
// -----------------------------
// typeSwitcher form
// -----------------------------
export function typeSwitcher() {
  // Знаходимо всі інпути з класом 'type-switcher'
  const inputs = document.querySelectorAll('.type-switcher');

  inputs.forEach(input => {
    const desiredType = input.getAttribute('data-type');
    // 🔑 Ключова зміна: Зберігаємо початковий текст placeholder
    const originalPlaceholder = input.getAttribute('data-placeholder');

    // 1. Обробник події ФОКУС (focus)
    input.addEventListener('focus', function () {
      // Змінюємо тип на бажаний ('date' або 'time')
      this.type = desiredType;
    });

    // 2. Обробник події ВТРАТА ФОКУСУ (blur)
    input.addEventListener('blur', function () {

      // 1. Перевіряємо, чи поточний тип — це той, який ми хочемо приховати
      if (this.type === desiredType) {

        // 2. Ключова перевірка: Якщо поле візуально порожнє
        if (this.value === "") {

          // 🔑 КРОК ВИПРАВЛЕННЯ: Примусово скидаємо значення перед зміною типу.
          // Це обходить проблеми кешування та внутрішніх значень браузера.
          this.value = "";

          // Повертаємо тип назад на 'text'
          this.type = 'text';

          // Відновлюємо placeholder
          this.placeholder = originalPlaceholder;
        }
      }
    });

    // 3. Додатковий крок: Встановлюємо правильний тип, якщо є значення при завантаженні
    if (input.value) {
      input.type = desiredType;
    }

    // Переконаємось, що інпут починає з 'text' і має коректний placeholder
    if (!input.value && input.type !== 'text') {
      input.type = 'text';
      input.placeholder = originalPlaceholder;
    }
  });
}




class CartAdd {
  cartCount;

  constructor() {
    this.cartCount = 0
    this.initCart()
  }

  updateCounter(currentCounter, quantity) {
    return currentCounter + quantity
  }

  renderCounter(count) {
    const container = document.querySelector(`.actions-header__button--icon-shop-cart span`)
    if (!container) return

    container.textContent = String(count)
  }

  handleAddToCart = (event) => {
    event.preventDefault()

    const newCount = this.updateCounter(this.cartCount, 1)

    this.cartCount = newCount
    this.renderCounter(this.cartCount)
  }

  initCart() {
    this.renderCounter(0)

    document.addEventListener('click', (e) => {
      const target = e.target

      const addBtn = target.closest('.item-actions-card__btn--icon-shop-cart')
      if (!addBtn) return

      this.handleAddToCart(e)
    });
  }
}


