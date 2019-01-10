# `Endpass UI components`

## Usage

```sh
import Components from '@endpass/ui';

Object.values(Components).forEach(component => Vue.component(component.name, component));
```

or

```sh
import { form, components } from '@endpass/ui';

const { VButton } = form;
const { VModal } = components;

Vue.component(VButton.name, VButton);
Vue.component(VModal.name, VModal);
```

or

```sh
<template>
  <v-modal/>
</template>

<script>
import { components } from '@endpass/ui';

export default {
  name: 'YourComponentName'
  components: {
    components.VModal,
  },
};
</script>
```

## Available Components

### Form

* VButton
* VCheckbox
* VForm
* VInput
* VPassword
* VRadio
* VSelect
* VTextarea

### Components

* VList
* VModal
* VPageLoader
* VPagination
* VSpinner

## Customization

Use the following SASS variables for customization in your app:

```sh
$medium-grey: hsl(0, 0%, 50%);
$dark-grey: hsl(0, 0%, 30%);
$purple: #4b0472;
$white: #fff;

$primary: $purple;
$danger: #ff3860;

$heading-font-family: 'Proxima Nova', 'Open Sans', 'Helvetica Neue', sans-serif;
```

## Install

```sh
yarn add @endpass/ui
```

## Contribute

```sh
git clone https://github.com/endpass/endpass-core
cd packages/ui
yarn
```

### Build

```sh
yarn build
```

or

```sh
yarn build-watch
```

### Running Tests

```sh
yarn test
```