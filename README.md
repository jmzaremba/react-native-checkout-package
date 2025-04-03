# 🧾 react-native-checkout-package

A lightweight React Native SDK for integrating [Checkout.com](https://www.checkout.com) card payments.  
Provides a customizable `<PaymentForm />` component with built-in validation, theming, and localisation.

---

## 🚀 Installation

```sh
npm install react-native-checkout-package
```

or

```sh
yarn add react-native-checkout-package
```

## 🔧 Usage

Wrap your app or screen with the PaymentFormProvider, passing your Checkout.com public key:

```tsx
import {
  PaymentFormProvider,
  PaymentForm,
} from 'react-native-checkout-package';

export default function CheckoutScreen() {
  const [message, setMessage] = useState('');

  const { isSubmitting, submit } = usePaymentForm({
    onSuccess: (token) => {
      setMessage(`Token: ${token}`);
    },
    onError: (error) => {
      setMessage(`Error: ${error}`);
    },
  });

  return (
    <PaymentFormProvider apiKey="pk_test_your_public_key_here">
      <View>
        <PaymentForm />
      </View>
    </PaymentFormProvider>
  );
}
```

## ✍️ PaymentFormProvider Props

| Prop |	Type |	Required |	Description |
| - | - | - | - |
| apiKey |	string	|  ✅	| Your Checkout.com public key |
| theme |	object |	❌ |	Optional styles to override input appearance |
| localisation	 | object |	❌ |	Override default field labels/placeholders |

## ✍️ usePaymentForm Params

| Prop |	Type |	Required |	Description |
| - | - | - | - |
| onSuccess |	(token: string) => void	| ✅ | Called with card token on success |
| onError |	(error: string) => void |	✅ |	Called with error message |


## 🎨 Theming
Pass a theme prop to PaymentFormProvider to override styles for text, labels, and input borders:

```tsx
theme={{
  inputTextStyle: { fontSize: 16, color: 'black' },
  inputTextErrorStyle: { borderColor: 'red' },
  inputTextSuccessStyle: { borderColor: 'green' },
}}
```

## 🌍 Localisation
Provide custom labels and placeholders:

```tsx
localisation={{
  cardNumberLabel: 'Card Number',
  cardNumberPlaceholder: '1234 5678 9012 3456',
  expiryLabel: 'Expiry Date',
  expiryPlaceholder: 'MM/YY',
  cvcLabel: 'Security Code',
  cvcPlaceholder: 'CVC',
}}
```

## ✅ Validation
Built-in client-side validation includes:

Card number format (16 digits)

Expiry format (MM/YY)

CVC (3–4 digits)

## 🧪 Testing
The package is fully tested using Jest and React Native Testing Library. Custom form logic is handled via external store and React hooks for stability and isolation.

## Example App

Checkout the [README.md](https://github.com/jmzaremba/react-native-flow-checkout/blob/main/example/README.md) in the example directory

## 🧑‍💻 Contributing
See the contributing guide to learn how to contribute and run the development workflow locally.

## 📄 License
MIT
